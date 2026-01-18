
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import { PrismaClient } from '@prisma/client';

const execAsync = util.promisify(exec);
const prisma = new PrismaClient();

export async function POST(request: Request) {
    let logs: string[] = [];
    const log = (msg: string) => { console.log(msg); logs.push(msg); };

    try {
        const { key } = await request.json();

        if (key !== 'admin123') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        log('🔄 Starting Migration Process...');

        // Strategy 1: Attempt CLI push (often fails on Vercel serverless due to path/binary issues)
        try {
            log('Attempting: npx prisma db push...');
            const { stdout, stderr } = await execAsync('npx prisma db push --accept-data-loss');
            log('CLI Output: ' + stdout);
            if (stderr) log('CLI Warning/Error: ' + stderr);
        } catch (e: any) {
            log('⚠️ CLI Migration Failed (Expected on Serverless): ' + e.message);
        }

        // Strategy 2: Raw SQL Fallback (Robust)
        // We manually patch the missing columns based on the known schema diff.
        log('🛡️ Attempting: SQL Patch Fallback...');

        try {
            // 1. Fix User Table (Critical Blocker)
            await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "code" TEXT DEFAULT 'USR-000';`);
            await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "profileData" JSONB;`);
            await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);`);
            // Ensure User.code is unique if not already
            // await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_code_key" ON "User"("code");`); 
            log('✅ Patched "User" table.');

            // 2. Fix Service & PricingPlan Tables (Missing Data Blocker)
            await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "Service" (
                "id" SERIAL NOT NULL,
                "code" TEXT NOT NULL,
                "nameEn" TEXT NOT NULL,
                "nameAr" TEXT NOT NULL,
                "descriptionEn" TEXT NOT NULL,
                "descriptionAr" TEXT,
                "type" TEXT NOT NULL,
                "basePrice" DECIMAL(10,2) NOT NULL,
                "currency" TEXT NOT NULL DEFAULT 'SAR',
                "slaDays" INTEGER NOT NULL DEFAULT 3,
                "isActive" BOOLEAN NOT NULL DEFAULT true,
                CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
            );
        `);
            // Add Unique Index on Service.code
            try { await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "Service_code_key" ON "Service"("code");`); } catch (e) { }
            log('✅ Verified "Service" table.');

            await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "PricingPlan" (
                "id" SERIAL NOT NULL,
                "code" TEXT NOT NULL,
                "name" TEXT NOT NULL,
                "description" TEXT,
                "billingCycle" TEXT NOT NULL,
                "price" DECIMAL(10,2) NOT NULL,
                "currency" TEXT NOT NULL DEFAULT 'SAR',
                "features" JSONB NOT NULL,
                "isActive" BOOLEAN NOT NULL DEFAULT true,
                CONSTRAINT "PricingPlan_pkey" PRIMARY KEY ("id")
            );
        `);
            try { await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "PricingPlan_code_key" ON "PricingPlan"("code");`); } catch (e) { }
            log('✅ Verified "PricingPlan" table.');

            // 3. Request Table Columns
            await prisma.$executeRawUnsafe(`ALTER TABLE "Request" ADD COLUMN IF NOT EXISTS "code" TEXT DEFAULT 'REQ-TEMP';`);
            await prisma.$executeRawUnsafe(`ALTER TABLE "Request" ADD COLUMN IF NOT EXISTS "planId" INTEGER;`);
            await prisma.$executeRawUnsafe(`ALTER TABLE "Request" ADD COLUMN IF NOT EXISTS "serviceId" INTEGER;`);
            await prisma.$executeRawUnsafe(`ALTER TABLE "Request" ADD COLUMN IF NOT EXISTS "expertId" INTEGER;`);
            log('✅ Patched "Request" table.');

        } catch (sqlError: any) {
            log('❌ SQL Patch Failed: ' + sqlError.message);
            throw sqlError;
        }

        return NextResponse.json({
            success: true,
            message: 'Schema Migration Attempted',
            output: logs.join('\n')
        });

    } catch (e: any) {
        console.error("Migration failed:", e);
        return NextResponse.json({
            error: 'Migration failed',
            details: String(e),
            output: logs.join('\n')
        }, { status: 500 });
    }
}
