
import { NextResponse } from 'next/server';
import { PrismaClient, Role, UserStatus, ServiceType, BillingCycle } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { key } = await request.json();

        if (key !== 'admin123') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('🌱 Starting manual seed...');

        // 1. Create Admin
        const adminPassword = await hash('admin123', 10);
        await prisma.user.upsert({
            where: { email: 'admin@finume.com' },
            update: {
                role: Role.ADMIN,
                status: UserStatus.ACTIVE,
                passwordHash: adminPassword,
                code: 'ADM-001'
            },
            create: {
                id: 1,
                code: 'ADM-001',
                email: 'admin@finume.com',
                passwordHash: adminPassword,
                name: 'Super Admin',
                role: Role.ADMIN,
                status: UserStatus.ACTIVE,
                profileData: { department: 'Headquarters' }
            },
        });

        // 2. Create Expert
        const expertPassword = await hash('expert123', 10);
        await prisma.user.upsert({
            where: { email: 'expert@finume.com' },
            update: {
                role: Role.EXPERT,
                status: UserStatus.ACTIVE,
                passwordHash: expertPassword,
                code: 'EXP-001'
            },
            create: {
                id: 2,
                code: 'EXP-001',
                email: 'expert@finume.com',
                passwordHash: expertPassword,
                name: 'Ahmed Al-Expert',
                role: Role.EXPERT,
                status: UserStatus.ACTIVE,
                profileData: {
                    title: 'Senior Auditor',
                    skills: ['VAT', 'Zakat', 'Auditing'],
                    bio: 'Certified SOCPA auditor with 10 years experience.'
                }
            },
        });

        // 3. Create Client
        const clientPassword = await hash('client123', 10);
        await prisma.user.upsert({
            where: { email: 'client@company.com' },
            update: {
                role: Role.CLIENT,
                status: UserStatus.ACTIVE,
                passwordHash: clientPassword,
                code: 'CUS-001'
            },
            create: {
                id: 3,
                code: 'CUS-001',
                email: 'client@company.com',
                passwordHash: clientPassword,
                name: 'Tech Corp',
                role: Role.CLIENT,
                status: UserStatus.ACTIVE,
                profileData: {
                    companyName: 'Tech Solutions Ltd',
                    industry: 'IT Services',
                    crNumber: '1010101010'
                }
            },
        });

        // 4. Services
        await prisma.service.upsert({
            where: { code: 'SER-001' },
            update: {},
            create: {
                code: 'SER-001',
                nameEn: 'VAT Registration',
                nameAr: 'التسجيل في ضريبة القيمة المضافة',
                descriptionEn: 'Complete VAT registration service for new businesses.',
                type: ServiceType.ONE_TIME,
                basePrice: 500.00,
                currency: 'SAR',
                slaDays: 3
            }
        });

        await prisma.service.upsert({
            where: { code: 'SER-002' },
            update: {},
            create: {
                code: 'SER-002',
                nameEn: 'Quarterly VAT Filing',
                nameAr: 'الإقرار الضريبي الربع سنوي',
                descriptionEn: 'Review and submission of quarterly VAT returns.',
                type: ServiceType.RECURRING,
                basePrice: 1500.00,
                currency: 'SAR',
                slaDays: 5
            }
        });

        // 5. Plans
        await prisma.pricingPlan.upsert({
            where: { code: 'PAC-001' },
            update: {},
            create: {
                code: 'PAC-001',
                name: 'Monthly Bookkeeping (Basic)',
                description: 'Essential bookkeeping for small startups.',
                billingCycle: BillingCycle.MONTHLY,
                price: 999.00,
                currency: 'SAR',
                features: ['Up to 50 transactions', 'Monthly Report', 'VAT Ready']
            }
        });

        return NextResponse.json({ success: true, message: 'Seed completed successfully' });

    } catch (e: any) {
        console.error("Seed error:", e);
        return NextResponse.json({
            error: 'Seed failed',
            details: e.message || String(e),
            code: e.code,
            meta: e.meta
        }, { status: 500 });
    }
}
