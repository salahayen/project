
import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlanCalculator = () => {
    const navigate = useNavigate();
    const [revenue, setRevenue] = useState(200000);
    const [transactions, setTransactions] = useState('< 50');
    const [employees, setEmployees] = useState('None');
    const [recommendedPlan, setRecommendedPlan] = useState('PAC-BASIC');

    // Logic to determine plan
    useEffect(() => {
        let plan = 'PAC-BASIC';

        // Logic based on inputs
        if (revenue > 5000000 || transactions === '300+' || employees === '10+') {
            plan = 'PAC-PRO';
        } else if (revenue > 375000 || transactions === '50-300' || employees === '1-10') {
            plan = 'PAC-STD';
        } else {
            plan = 'PAC-BASIC';
        }

        setRecommendedPlan(plan);
    }, [revenue, transactions, employees]);

    const plans = {
        'PAC-BASIC': {
            name: 'CR Guard (Basic)',
            description: 'Dormant / Low-Activity CRs',
            features: ['Zero-filing VAT', 'Annual Qawaem (Basic)', 'Zakat "Estimated" Filing'],
            price: 500,
            tagline: '"Best for maintaining legal status with minimal activity"'
        },
        'PAC-STD': {
            name: 'ZATCA Shield (Standard)',
            description: 'Active Shops / Cafes',
            features: ['Quarterly VAT Filing', 'Monthly Bookkeeping', 'E-Invoicing Review'],
            price: 1750,
            tagline: '"Avoid fines & stay compliant"'
        },
        'PAC-PRO': {
            name: 'Audit Proof (Pro)',
            description: 'Funded Startups / Contractors',
            features: ['Full Monthly Closing', 'Cost Center Accounting', 'Audit Coordination'],
            price: 5000,
            tagline: '"CFO-level governance"'
        }
    };

    const currentPlan = plans[recommendedPlan];

    const handleGetStarted = () => {
        // Redirect to pricing page with highlight
        navigate(`/pricing?highlight=${recommendedPlan}`);
    };

    return (
        <div className="bg-slate-900 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white mb-4">Calculate Your Tier</h2>
                    <p className="text-slate-400 text-lg">Answer 3 simple questions to find the perfect compliance package for your business.</p>
                </div>

                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Inputs */}
                    <div className="flex-1 space-y-10">
                        <h3 className="text-2xl font-bold text-slate-900">Configure Your Needs</h3>

                        {/* Annual Revenue */}
                        <div>
                            <div className="flex justify-between mb-4">
                                <label className="text-sm font-semibold text-slate-700">Annual Revenue</label>
                                <span className="text-2xl font-black text-slate-900">{revenue.toLocaleString()} <span className="text-sm text-slate-500 font-normal">SAR</span></span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="100000"
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <span>Startup</span>
                                <span>Growth</span>
                                <span>Enterprise</span>
                            </div>
                        </div>

                        {/* Monthly Transactions */}
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-4 block">Monthly Transactions</label>
                            <div className="grid grid-cols-3 gap-4">
                                {['< 50', '50-300', '300+'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setTransactions(opt)}
                                        className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${transactions === opt
                                            ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-600 ring-offset-2'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Employees */}
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-4 block">Employees</label>
                            <div className="grid grid-cols-3 gap-4">
                                {['None', '1-10', '10+'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setEmployees(opt)}
                                        className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${employees === opt
                                            ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-600 ring-offset-2'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Result */}
                    <div className="lg:w-1/3 bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-4 left-4 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                            Recommended Plan
                        </div>

                        <div className="mt-8">
                            <h3 className="text-3xl font-black text-slate-900 mb-2">{currentPlan.name}</h3>
                            <p className="text-slate-500 mb-6">{currentPlan.description}</p>

                            <div className="space-y-3 mb-8">
                                {currentPlan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="text-sm text-slate-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-100 p-4 rounded-xl mb-8 italic text-slate-600 text-sm border-l-4 border-blue-500">
                                {currentPlan.tagline}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-4xl font-black text-slate-900">{currentPlan.price.toLocaleString()}  SAR</span>
                                <span className="text-slate-500 text-sm mb-1 font-medium">PER MONTH</span>
                            </div>

                            <button
                                onClick={handleGetStarted}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-xl"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanCalculator;
