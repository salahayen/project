
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, CreditCard, Lock, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';

const ClientCheckout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, createRequest, updateRequest, services, plans } = useAppContext();

    const params = new URLSearchParams(location.search);
    const planId = params.get('planId');
    const serviceId = params.get('serviceId');
    const billing = params.get('billing');

    const [step, setStep] = useState(1); // 1: Confirm, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [request, setRequest] = useState<any>(null);

    // Mock Payment State
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const selectedPlan = planId ? plans.find(p => p.id === planId || p.code === planId) : null;
    const selectedService = serviceId ? services.find(s => s.id === serviceId || s.code === serviceId) : null;
    const item = selectedPlan || selectedService;

    const price = selectedPlan
        ? (billing === 'YEARLY' ? Math.floor(selectedPlan.price * 0.8 * 12) : selectedPlan.price)
        : selectedService?.price || 0;

    const vat = price * 0.15;
    const total = price + vat;

    useEffect(() => {
        if (!user) {
            // Should be handled by protected route wrapper, but safety check
            navigate(`/login?redirect=${location.pathname}${location.search}`);
        }
    }, [user, navigate, location]);

    const handleCreateRequest = async () => {
        setLoading(true);
        setError('');
        try {
            // Create request with PENDING_PAYMENT status
            // Note: In a real app, we'd pass the plan/service details
            const reqData = {
                title: `Order for ${item?.name || 'Service'}`,
                description: `Checkout for ${item?.name}`,
                serviceId: selectedService?.id,
                planId: selectedPlan?.id,
                status: 'PENDING_PAYMENT', // Ensure DB supports this or use DRAFT
                metadata: {
                    billingCycle: billing,
                    price: price,
                    vat: vat,
                    total: total
                }
            };

            // Create request with PENDING_PAYMENT status
            const newReq = await createRequest(reqData);
            setRequest(newReq);

            setStep(2);
            setLoading(false);

        } catch (err: any) {
            console.error(err);
            setError('Failed to create order. Please try again.');
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(async () => {
            if (request && request.id) {
                try {
                    await updateRequest(request.id, { status: 'PAID' });
                } catch (e) {
                    console.error('Failed to update request to PAID', e);
                }
            }
            // On success:
            setStep(3);
            setLoading(false);
        }, 2000);
    };

    const handleCancel = async () => {
        if (confirm('Are you sure you want to cancel this payment?')) {
            if (request && request.id) {
                try {
                    await updateRequest(request.id, { status: 'CANCELLED' });
                } catch (e) {
                    console.error('Failed to cancel request', e);
                }
            }
            navigate('/client/requests');
        }
    };

    if (!item) return <div className="p-20 text-center">Loading or Invalid Item...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Steps Header */}
                <div className="mb-10">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'} transition-all`}>
                                {step > s ? <CheckCircle size={20} /> : s}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <span>Review</span>
                        <span>Payment</span>
                        <span>Confirmation</span>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                    {/* Step 1: Review Order */}
                    {step === 1 && (
                        <div className="p-8 md:p-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Order Summary</h2>

                            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                        <p className="text-slate-500 text-sm">{selectedPlan ? (billing === 'YEARLY' ? 'Yearly Billing' : 'Monthly Billing') : 'One-time Service'}</p>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">{price.toLocaleString()} SAR</p>
                                </div>
                                <div className="border-t border-slate-200 my-4 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Subtotal</span>
                                        <span>{price.toLocaleString()} SAR</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>VAT (15%)</span>
                                        <span>{vat.toLocaleString()} SAR</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                                    <span className="font-black text-slate-900 text-lg">Total</span>
                                    <span className="font-black text-blue-600 text-2xl">{total.toLocaleString()} SAR</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCreateRequest}
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? 'Processing...' : 'Proceed to Payment'} <ArrowRight size={18} />
                            </button>
                            <button onClick={handleCancel} className="mt-4 w-full text-slate-400 font-bold text-sm hover:text-red-500 transition-colors">
                                Cancel Order
                            </button>
                        </div>
                    )}

                    {/* Step 2: Payment */}
                    {step === 2 && (
                        <div className="p-8 md:p-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <Lock className="text-green-500" /> Secure Payment
                            </h2>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none font-mono"
                                            required
                                        />
                                        <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            placeholder="MM/YY"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none font-mono"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">CVC</label>
                                        <input
                                            type="text"
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value)}
                                            placeholder="123"
                                            maxLength={3}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none font-mono"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start gap-3">
                                    <AlertTriangle className="shrink-0" size={18} />
                                    <p>This is a secure 256-bit SSL encrypted payment. No real money will be charged in this demo environment.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                                >
                                    {loading ? 'Processing Payment...' : `Pay ${total.toLocaleString()} SAR`}
                                </button>
                                <button type="button" onClick={() => setStep(1)} className="mt-4 w-full text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
                                    Back to Summary
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="p-12 text-center">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <CheckCircle size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Payment Successful!</h2>
                            <p className="text-slate-500 text-lg mb-8">
                                Your request has been confirmed. You will be redirected to your dashboard shortly.
                            </p>
                            <button
                                onClick={() => navigate('/client/requests')}
                                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ClientCheckout;
