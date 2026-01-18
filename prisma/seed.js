
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean up (Optional, be careful in prod)
  // await prisma.request.deleteMany();
  // await prisma.user.deleteMany();
  // ...

  // 2. Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@finume.com' },
    update: {},
    create: {
      code: 'ADM-001',
      email: 'admin@finume.com',
      passwordHash: adminPassword,
      name: 'Super Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
      profileData: { department: 'Headquarters' }
    },
  });
  console.log('👤 Admin created:', admin.code);

  // 3. Create Expert
  const expertPassword = await bcrypt.hash('expert123', 10);
  const expert = await prisma.user.upsert({
    where: { email: 'expert@finume.com' },
    update: {},
    create: {
      code: 'EXP-001',
      email: 'expert@finume.com',
      passwordHash: expertPassword,
      name: 'Ahmed Al-Expert',
      role: 'EXPERT',
      status: 'ACTIVE',
      profileData: {
        title: 'Senior Auditor',
        skills: ['VAT', 'Zakat', 'Auditing'],
        bio: 'Certified SOCPA auditor with 10 years experience.'
      }
    },
  });
  console.log('🎓 Expert created:', expert.code);

  // 4. Create Client
  const clientPassword = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@company.com' },
    update: {},
    create: {
      code: 'CUS-001',
      email: 'client@company.com',
      passwordHash: clientPassword,
      name: 'Tech Corp',
      role: 'CLIENT',
      status: 'ACTIVE',
      profileData: {
        companyName: 'Tech Solutions Ltd',
        industry: 'IT Services',
        crNumber: '1010101010'
      }
    },
  });
  console.log('🏢 Client created:', client.code);

  // 5. Services
  const service1 = await prisma.service.upsert({
    where: { code: 'SER-001' },
    update: {},
    create: {
      code: 'SER-001',
      nameEn: 'VAT Registration',
      nameAr: 'التسجيل في ضريبة القيمة المضافة',
      descriptionEn: 'Complete VAT registration service for new businesses.',
      type: 'ONE_TIME',
      basePrice: 500.00,
      currency: 'SAR',
      slaDays: 3
    }
  });

  const service2 = await prisma.service.upsert({
    where: { code: 'SER-002' },
    update: {},
    create: {
      code: 'SER-002',
      nameEn: 'Quarterly VAT Filing',
      nameAr: 'الإقرار الضريبي الربع سنوي',
      descriptionEn: 'Review and submission of quarterly VAT returns.',
      type: 'RECURRING',
      basePrice: 1500.00,
      currency: 'SAR',
      slaDays: 5
    }
  });
  console.log('📦 Services created');

  // 6. Plans
  const plan1 = await prisma.pricingPlan.upsert({
    where: { code: 'PAC-001' },
    update: {},
    create: {
      code: 'PAC-001',
      name: 'Monthly Bookkeeping (Basic)',
      description: 'Essential bookkeeping for small startups.',
      billingCycle: 'MONTHLY',
      price: 999.00,
      currency: 'SAR',
      features: ['Up to 50 transactions', 'Monthly Report', 'VAT Ready']
    }
  });
  console.log('💎 Plans created');

  // 7. Request (Draft)
  const req = await prisma.request.upsert({
    where: { code: 'REQ-001' },
    update: {},
    create: {
      code: 'REQ-001',
      clientId: client.id,
      serviceId: service1.id,
      status: 'DRAFT',
      priority: 'NORMAL',
      description: 'We need VAT registration ASAP.',
      metadata: { notes: 'Please call me' }
    }
  });
  console.log('📝 Sample Request created:', req.code);

  console.log('✅ Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
