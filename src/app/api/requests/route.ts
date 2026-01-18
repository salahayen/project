
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { clientId, serviceId, amount, description, batches } = body;

        // 1. Resolve Client (Code -> ID)
        const client = await prisma.user.findUnique({ where: { code: clientId } });
        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404, headers: corsHeaders });
        }

        // 2. Resolve Service (Code -> ID)
        let serviceIntId: number | null = null;
        if (serviceId) {
            const service = await prisma.service.findUnique({ where: { code: serviceId } });
            if (service) serviceIntId = service.id;
        }

        // 3. Generate Request Code
        const reqCode = `REQ-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

        // 4. Handle files from "batches"
        // Flatten batches into a list of file creates
        const filesToCreate: any[] = [];
        if (batches && Array.isArray(batches)) {
            batches.forEach((b: any) => {
                if (b.files && Array.isArray(b.files)) {
                    b.files.forEach((f: any) => {
                        filesToCreate.push({
                            name: f.name,
                            size: typeof f.size === 'string' ? parseInt(f.size) : f.size, // Ensure int
                            type: 'SOURCE', // Default to source for creation
                            url: f.url,
                            uploaderId: client.id
                        });
                    });
                }
            });
        }

        // 5. Create Request
        const newRequest = await prisma.request.create({
            data: {
                code: reqCode,
                clientId: client.id,
                serviceId: serviceIntId,
                status: 'NEW', // Enum
                description: description || '',
                files: {
                    create: filesToCreate
                }
            },
            include: {
                files: true
            }
        });

        // 6. Map Response (Code -> ID)
        const responseData = {
            ...newRequest,
            id: newRequest.code,
            clientId: client.code, // string
            serviceId: serviceId, // string
            // Adapt files back to batches strictly for return if needed, but frontend might just need optimistic
            batches: []
        };

        return NextResponse.json(responseData, { headers: corsHeaders });
    } catch (error) {
        console.error('Error creating request:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500, headers: corsHeaders });
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const clientIdParam = url.searchParams.get('clientId');

        const where: any = {};
        if (clientIdParam) {
            // Resolve Code -> ID
            const client = await prisma.user.findUnique({ where: { code: clientIdParam } });
            if (client) {
                where.clientId = client.id;
            } else {
                return NextResponse.json([], { headers: corsHeaders }); // Client not found = no requests
            }
        }

        const requests = await prisma.request.findMany({
            where,
            include: {
                files: true,
                service: true,
                expert: true // Relation is 'expert', not 'assignedExpert' in new schema? Checking...
                // Schema says: expertId Int?  expert User? @relation("ExpertRequests"...)
            },
            orderBy: { createdAt: 'desc' }
        });

        // Map to frontend structure
        const formattedRequests = requests.map((r: any) => {
            // Group files into "batches" for frontend compatibility
            // We can treat all files as one batch for now, or split by type
            const virtualBatch = {
                id: `BATCH-${r.id}`,
                date: r.createdAt.toISOString(),
                files: r.files.map((f: any) => ({
                    ...f,
                    id: String(f.id), // Int to String
                    size: String(f.size || 0) + ' B'
                })),
                status: 'COMPLETED'
            };

            return {
                ...r,
                id: r.code, // Adapter: Int -> Code
                clientId: clientIdParam || 'UNKNOWN', // Should map better but OK for filter
                serviceName: r.service?.nameEn || 'Unknown Service',
                expertName: r.expert?.name || null,
                dateCreated: r.createdAt.toISOString().split('T')[0],
                batches: r.files.length > 0 ? [virtualBatch] : []
            };
        });

        return NextResponse.json(formattedRequests, { headers: corsHeaders });
    } catch (error) {
        console.error('Error fetching requests:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, batches, status } = body; // id is the Code (REQ-...)

        if (!id) {
            return NextResponse.json({ error: 'Request ID required' }, { status: 400, headers: corsHeaders });
        }

        // 1. Resolve Request Code -> ID
        const request = await prisma.request.findUnique({
            where: { code: id },
            include: { client: true }
        });

        if (!request) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404, headers: corsHeaders });
        }

        // 2. Handle Files (Append Only Strategy for this demo)
        if (batches && Array.isArray(batches)) {
            const filesToCreate: any[] = [];
            batches.forEach((b: any) => {
                if (b.files && Array.isArray(b.files)) {
                    b.files.forEach((f: any) => {
                        // Only add if it looks new? 
                        // For simplicity in this "Batch" emulation, we create all files passed that don't have a numeric ID (which implies they are new from frontend)
                        // But frontend sends "f-timestamp" for temp IDs.
                        if (String(f.id).startsWith('f-')) {
                            filesToCreate.push({
                                name: f.name,
                                size: typeof f.size === 'string' ? parseInt(f.size) : 0, // Parse "1.2 MB" or similar if needed, simplified here
                                type: 'SOURCE',
                                url: f.url || '#',
                                uploaderId: request.clientId
                            });
                        }
                    });
                }
            });

            if (filesToCreate.length > 0) {
                await prisma.request.update({
                    where: { id: request.id },
                    data: {
                        files: {
                            create: filesToCreate
                        }
                    }
                });
            }
        }

        // 3. Update Status and Assignment
        const updateData: any = {};
        if (status) updateData.status = status;

        // Handle assignment by expert Code or ID (Adapter)
        const { assignedExpertId } = body;
        if (assignedExpertId) {
            // If it's a code starting with EXP-, resolve it
            if (typeof assignedExpertId === 'string' && assignedExpertId.startsWith('EXP-')) {
                const expert = await prisma.user.findUnique({ where: { code: assignedExpertId } });
                if (expert) {
                    updateData.expertId = expert.id;
                    // Auto-transition to IN_PROGRESS if just matched? Let frontend decide status.
                }
            } else if (typeof assignedExpertId === 'string' && assignedExpertId.startsWith('USR-')) {
                // Fallback if expert uses generic USR (shouldn't happen but safe)
                const expert = await prisma.user.findUnique({ where: { code: assignedExpertId } });
                if (expert) updateData.expertId = expert.id;
            } else {
                // If it's an int ID passed directly (rare but possible in internal logic)
                updateData.expertId = Number(assignedExpertId);
            }
        }

        if (Object.keys(updateData).length > 0) {
            await prisma.request.update({
                where: { id: request.id },
                data: updateData
            });
        }

        return NextResponse.json({ success: true }, { headers: corsHeaders });

    } catch (error) {
        console.error('Error updating request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
