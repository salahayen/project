
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean up Legacy Data
  try {
    await prisma.pricingPlan.delete({ where: { code: 'PAC-001' } });
    console.log('🗑️ Legacy plan PAC-001 deleted');
  } catch (e) {
    // Ignore if not found
  }

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
  const servicesData = [
    {
      code: 'SER-001',
      nameEn: 'VAT Filing',
      nameAr: 'إقرار ضريبة القيمة المضافة',
      descriptionEn: 'Complete VAT return filing with ZATCA compliance review.',
      type: 'RECURRING',
      basePrice: 500.00,
      currency: 'SAR',
      slaDays: 3
    },
    {
      code: 'SER-002',
      nameEn: 'Monthly Bookkeeping',
      nameAr: 'مسك الدفاتر الشهرية',
      descriptionEn: 'Professional financial record keeping and categorization.',
      type: 'RECURRING',
      basePrice: 2500.00,
      currency: 'SAR',
      slaDays: 5
    },
    {
      code: 'SER-003',
      nameEn: 'Financial Audit',
      nameAr: 'المراجعة المالية',
      descriptionEn: 'Full annual financial audit by certified auditor.',
      type: 'ONE_TIME',
      basePrice: 15000.00,
      currency: 'SAR',
      slaDays: 14
    },
    {
      code: 'SER-004',
      nameEn: 'Zakat Advisory',
      nameAr: 'استشارات الزكاة',
      descriptionEn: 'Expert consultation on Zakat calculation and filing.',
      type: 'ONE_TIME',
      basePrice: 1000.00,
      currency: 'SAR',
      slaDays: 2
    },
    {
      code: 'SER-005',
      nameEn: 'CFO Advisory',
      nameAr: 'استشارة المدير المالي',
      descriptionEn: 'Strategic financial planning and growth auditing.',
      type: 'RECURRING',
      basePrice: 5000.00,
      currency: 'SAR',
      slaDays: 7
    }
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { code: s.code },
      update: s,
      create: s
    });
  }
  console.log('📦 Services created');

  // 6. Plans
  // 20% discount logic is handled in frontend, we store monthly base price here.
  const plansData = [
    {
      code: 'PAC-BASIC',
      name: 'CR Guard (Basic)',
      description: 'Dormant / Low-Activity CRs',
      billingCycle: 'MONTHLY',
      price: 500.00,
      currency: 'SAR',
      features: ['Zero-filing VAT', 'Annual Qawaem (Basic)', 'Zakat "Estimated" Filing'],
      // We'll store extra UI data in features or description if needed, or rely on frontend matching
    },
    {
      code: 'PAC-STD',
      name: 'ZATCA Shield (Standard)',
      description: 'Active Shops / Cafes',
      billingCycle: 'MONTHLY',
      price: 1750.00,
      currency: 'SAR',
      features: ['Quarterly VAT Filing', 'Monthly Bookkeeping', 'E-Invoicing Review'],
    },
    {
      code: 'PAC-PRO',
      name: 'Audit Proof (Pro)',
      description: 'Funded Startups / Contractors',
      billingCycle: 'MONTHLY',
      price: 5000.00,
      currency: 'SAR',
      features: ['Full Monthly Closing', 'Cost Center Accounting', 'Audit Coordination'],
    }
  ];

  for (const p of plansData) {
    await prisma.pricingPlan.upsert({
      where: { code: p.code },
      update: { ...p, isActive: true },
      create: { ...p, isActive: true }
    });
  }
  console.log('💎 Plans created');

  // 7. Request (Draft)
  const service1 = await prisma.service.findUnique({ where: { code: 'SER-001' } });

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
