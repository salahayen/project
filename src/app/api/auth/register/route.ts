
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';

// Validation Schema
const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['CLIENT', 'EXPERT']).default('CLIENT'),
    companyName: z.string().optional(), // For Client
    industry: z.string().optional(),    // For Client
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = RegisterSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
        }

        const { name, email, password, role, companyName, industry } = result.data;

        // 1. Check if user exists
        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create User
        // Note: Avatar generation is nice to keep
        // const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`; // Schema doesn't have avatarUrl on User root anymore, maybe put in profileData?

        const codePrefix = role === 'EXPERT' ? 'EXP' : 'CUS';
        const code = `${codePrefix}-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

        const newUser = await prisma.user.create({
            data: {
                code,
                name,
                email,
                passwordHash: hashedPassword,
                role: role as any, // Cast to enum
                status: 'ACTIVE', // Default active
                profileData: role === 'CLIENT' ? {
                    companyName,
                    industry: industry || 'General',
                    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
                } : {
                    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
                },
                // Create Default Permissions if Client
                permissions: role === 'CLIENT' ? {
                    create: {
                        canViewReports: true,
                        canUploadDocs: true,
                        canDownloadInvoices: true,
                        canRequestCalls: true,
                        canSubmitTickets: true,
                        canViewMarketplace: false
                    }
                } : undefined
            },
            include: { permissions: true }
        });

        // 4. Generate Token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 5. Return
        // const { password: _, ...userWithoutPassword } = newUser; // User type change
        const { passwordHash, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            user: userWithoutPassword,
            token
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
