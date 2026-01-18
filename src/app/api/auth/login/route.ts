
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';

export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // 1. Find User
        const user = await prisma.user.findUnique({
            where: { email },
            include: { permissions: true } // Include permissions if client
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 2. Compare Password
        let isValid = false;

        // A. Try Bcrypt
        isValid = await bcrypt.compare(password, user.passwordHash);

        // B. Fallback checks removed for production security.

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // 3. Generate Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 4. Return User (clean) + Token
        const { passwordHash: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
