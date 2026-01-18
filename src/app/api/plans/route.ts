import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// Limits Mapping (Hardcoded for UI compatibility as DB schema doesn't have this structure yet)
const PLAN_LIMITS: Record<string, any> = {
    'PAC-001': {
        revenue: { label: '< 375k SAR', value: 375000 },
        transactions: { label: '< 50 / mo', value: 50 },
        invoices: { label: '< 5 / mo', value: 5 },
        bills: { label: '< 10 / mo', value: 10 },
        bankAccounts: { label: '1 Account', value: 1 },
        employees: { label: 'None', value: 0 },
        features: { international: false, stock: 'Basic', contracts: false }
    },
    'PAC-002': {
        revenue: { label: '< 5M SAR', value: 5000000 },
        transactions: { label: 'Up to 300 / mo', value: 300 },
        invoices: { label: 'Unlimited', value: 9999 },
        bills: { label: 'Up to 100', value: 100 },
        bankAccounts: { label: 'Up to 3', value: 3 },
        employees: { label: 'Up to 10', value: 10 },
        features: { international: 'Basic', stock: 'Basic', contracts: 'Basic' }
    },
    'PAC-003': {
        revenue: { label: 'Unlimited', value: 99999999 },
        transactions: { label: 'Unlimited', value: 9999 },
        invoices: { label: 'Unlimited', value: 9999 },
        bills: { label: 'Unlimited', value: 9999 },
        bankAccounts: { label: 'Unlimited', value: 99 },
        employees: { label: 'Unlimited', value: 999 },
        features: { international: true, stock: 'Full', contracts: true }
    }
};

export async function GET() {
    try {
        const plans = await prisma.pricingPlan.findMany();

        const parsedPlans = plans.map(p => ({
            ...p,
            id: p.code, // Adapter: Frontend uses string ID
            features: p.features, // Prisma handles JSON parsing automatically
            limits: PLAN_LIMITS[p.code] || PLAN_LIMITS['PAC-001'] // Use code for lookup
        }));

        // Sort by price to ensure order: Basic -> Standard -> Pro
        parsedPlans.sort((a, b) => a.price - b.price);

        return NextResponse.json(parsedPlans, { headers: corsHeaders });
    } catch (error) {
        console.error('Error fetching plans:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
