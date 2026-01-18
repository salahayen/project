
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany({
            include: { permissions: true }
        });

        // Split by role for frontend convenience, matches AppContext expectation
        const clients = users.filter(u => u.role === 'CLIENT');
        const experts = users.filter(u => u.role === 'EXPERT');
        const admins = users.filter(u => u.role === 'ADMIN');

        // Remove passwords and Map to Frontend Types
        const cleanUsers = (list: any[]) => list.map(({ passwordHash, code, profileData, ...rest }) => ({
            ...rest,
            id: code, // Adapter: Frontend expects string ID
            ...(profileData as object || {}), // Spread profile fields
        }));

        return NextResponse.json({
            clients: cleanUsers(clients),
            experts: cleanUsers(experts),
            admins: cleanUsers(admins)
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, status } = body; // id is Code (EXP-...)

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const user = await prisma.user.findUnique({ where: { code: id } });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        await prisma.user.update({
            where: { id: user.id },
            data: { status }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
