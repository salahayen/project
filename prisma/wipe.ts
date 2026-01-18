import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🗑️  Starting database wipe...');

    // Order matters due to foreign key constraints
    // Delete child tables first

    // 1. Transaction related
    await prisma.transaction.deleteMany();

    // 2. File related
    await prisma.uploadedFile.deleteMany();
    await prisma.fileBatch.deleteMany();

    // 3. Request related
    await prisma.request.deleteMany();

    // 4. User related/dependent
    await prisma.chatMessage.deleteMany();
    await prisma.gamificationProfile.deleteMany();
    await prisma.complianceLog.deleteMany();
    await prisma.payoutRequest.deleteMany();
    await prisma.clientFeaturePermissions.deleteMany();

    // 5. Core entities
    await prisma.user.deleteMany();
    await prisma.service.deleteMany();
    await prisma.pricingPlan.deleteMany();
    await prisma.platformSettings.deleteMany();

    console.log('✅ Database wiped successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
