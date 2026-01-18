import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Check, X, HelpCircle, AlertTriangle } from 'lucide-react';

const PricingTable = () => {
    const navigate = useNavigate();
    const { plans, user } = useAppContext();
    const [showOverage, setShowOverage] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const toggleBilling = () => {
        setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
    };

    const calculatePrice = (basePrice: number) => {
        if (billingCycle === 'yearly') {
            // Show monthly equivalent (20% off)
            return Math.floor(basePrice * 0.8).toLocaleString();
        }
        return basePrice.toLocaleString();
    };

    if (!plans || plans.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-white mb-4">Transparent Pricing</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                    Simple, flat-rate pricing for peace of mind. No hidden fees, no hourly billing surprises.
                </p>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center gap-4">
                    <div className="bg-slate-800 p-1 rounded-full flex items-center cursor-pointer select-none border border-slate-700">
                        <div
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Monthly
                        </div>
                        <div
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Yearly
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${billingCycle === 'yearly' ? 'bg-green-500 text-white' : 'bg-green-900/30 text-green-400'}`}>
                                -20%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {plans.map(plan => {
                    const price = billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price;
                    const isPopular = plan.name.includes('Standard'); // ZATCA Shield is popular

                    return (
                        <div key={plan.id} className={`relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 ${isPopular ? 'border-2 border-blue-500 shadow-2xl scale-105 z-10' : 'border border-slate-200 shadow-lg hover:shadow-xl'}`}>

                            {isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-black text-slate-900">{price.toLocaleString()}</span>
                                    <span className="text-lg font-bold text-slate-400 ml-2"> SAR / mo</span>
                                </div>
                                {billingCycle === 'yearly' && (
                                    <p className="text-xs text-green-600 font-bold mt-2">
                                        Billed {Math.floor(plan.price * 12 * 0.8).toLocaleString()} SAR yearly
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {(plan.features || []).map((feature: any, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                                        <div className="mt-0.5 bg-green-100 text-green-600 rounded-full p-0.5 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => {
                                    if (user) {
                                        navigate(`/client/checkout?planId=${plan.id}&billing=${billingCycle}`);
                                    } else {
                                        navigate(`/login?redirect=/client/checkout&planId=${plan.id}&billing=${billingCycle}`);
                                    }
                                }}
                                className={`w-full py-3 rounded-xl font-bold transition-all ${isPopular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700' // Keeping all buttons blue/prominent as per UI request usually
                                    }`}
                            >
                                Get Started
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Comparison Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden mt-12">
                <div className="p-10 border-b border-slate-100 bg-slate-50/50 text-center">
                    <h3 className="text-2xl font-black text-slate-900">Compare Plans</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-white">
                                <th className="p-6 pl-10 text-slate-400 font-bold uppercase tracking-wider text-xs w-1/3">Features</th>
                                <th className="p-6 text-center font-bold text-slate-900">CR Guard</th>
                                <th className="p-6 text-center font-bold text-slate-900">ZATCA Shield</th>
                                <th className="p-6 text-center font-bold text-slate-900">Audit Proof</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { name: 'VAT Registration', vals: [true, true, true] },
                                { name: 'Quarterly Filing', vals: [false, true, true] },
                                { name: 'Monthly Bookkeeping', vals: [false, true, true] },
                                { name: 'Dedicated Accountant', vals: [false, 'Shared', 'Dedicated'] },
                                { name: 'Zakat Filing', vals: ['Estimated', true, true] },
                                { name: 'Audit Support', vals: [false, false, true] },
                                { name: 'CFO Consultation', vals: [false, false, 'Monthly'] },
                                { name: 'Fine Guarantee', vals: ['Basic', 'Full', 'Full + Legal'] },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-5 pl-10 font-bold text-slate-700">{row.name}</td>
                                    {row.vals.map((val, idx) => (
                                        <td key={idx} className="p-5 text-center">
                                            {val === true ? <Check className="mx-auto text-green-500" size={20} /> :
                                                val === false ? <span className="text-slate-300">—</span> :
                                                    <span className={`font-bold ${idx === 2 ? 'text-slate-900' : 'text-slate-500'}`}>{val}</span>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PricingTable;
