
import React, { useState } from 'react';
import { Shield, AlertTriangle, AlertCircle, Check, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const RiskCalculator = () => {
    const { language, t } = useAppContext();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showResult, setShowResult] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        vatRegistered: '',
        vatMonths: 0,
        zakatAnnual: '',
        zakatLastYear: '',
        einvoiceIntegrated: '',
        einvoiceElectronic: '',
        qawaemSubmit: '',
        noticeReceived: '',
        revenue: ''
    });

    const isArabic = language === 'ar';

    const translations = {
        en: {
            headline: 'Instant ZATCA & Qawaem Compliance Check for Saudi SMEs',
            subheadline: 'See if your business is fully compliant in 60 seconds and estimate your potential fine exposure—without sharing any bank passwords.',
            stepTitle: (current: number, total: number) => `Step ${current} of ${total}`,
            vat: 'VAT Compliance',
            zakat: 'Zakat & Income Tax',
            einvoice: 'E-Invoicing (ZATCA Phase 2)',
            qawaem: 'Qawaem / Financial Statements',
            notices: 'General Compliance',
            revenue: 'Annual Revenue',
            calculate: 'Calculate My Risk',
            next: 'Next',
            back: 'Back',
            resultsHeadline: 'Your Compliance Risk Result',
            summary: 'Summary',
            ctaMessage: 'Connect with a Finume accountant today and convert your status.',
            green: {
                title: 'Status: Fully Compliant',
                message: 'Great news. Your current answers indicate that your business is broadly compliant with ZATCA, Zakat, VAT and Qawaem requirements.',
                exposure: 'Estimated penalty exposure today: between SAR 0 and SAR 2,000 only.',
                cta: 'Lock in your Green Status with Finume',
                body: 'Stay ahead of new ZATCA waves and Qawaem deadlines with an always-on compliance team for as low as SAR 500/month.'
            },
            yellow: {
                title: 'Status: At Risk of Non-Compliance',
                message: 'Your answers show gaps in your VAT, Zakat, e-invoicing or Qawaem processes that could trigger penalties.',
                exposure: 'Estimated penalty exposure today: between SAR 2,000 and SAR 50,000 depending on future checks.',
                cta: 'Fix Your Risk Before ZATCA Does',
                body: 'Connect with a Finume accountant today and convert your status from Yellow to Green with a flat monthly protection plan.'
            },
            red: {
                title: 'Status: High Risk – Not Compliant',
                message: 'Your current answers indicate a high probability of non-compliance across VAT, Zakat, e-invoicing or Qawaem requirements.',
                exposure: 'Estimated penalty exposure today: between SAR 50,000 and SAR 500,000+ if issues are not corrected.',
                cta: 'Get Protected Before Your CR Is at Risk',
                body: 'Start a Finume "Fine Protection" plan now and let our experts clean up your history and manage all future filings.'
            }
        },
        ar: {
            headline: 'فحص التزام فوري مع الزكاة والضريبة والقوائم للمنشآت السعودية',
            subheadline: 'اعرف خلال ٦٠ ثانية إذا كانت منشأتك ملتزمة أو معرّضة لغرامات تقديرية – بدون طلب أي بيانات بنكية حساسة.',
            stepTitle: (current: number, total: number) => `الخطوة ${current} من ${total}`,
            vat: 'ضريبة القيمة المضافة',
            zakat: 'الزكاة وضريبة الدخل',
            einvoice: 'الفاتورة الإلكترونية (مرحلة الربط)',
            qawaem: 'منصة قوائم / القوائم المالية',
            notices: 'الالتزام العام',
            revenue: 'الإيرادات السنوية',
            calculate: 'احسب المخاطر',
            next: 'التالي',
            back: 'الخلف',
            resultsHeadline: 'نتائج مخاطر الالتزام',
            summary: 'الملخص',
            ctaMessage: 'تواصل مع محاسب فينوم اليوم وحسّن حالة التزامك.',
            green: {
                title: 'الحالة: ملتزم بالكامل',
                message: 'أخبار ممتازة. إجاباتك تشير إلى أن منشأتك ملتزمة بشكل عام مع متطلبات الزكاة، الضريبة، الفاتورة الإلكترونية والقوائم.',
                exposure: 'قيمة الغرامات المتوقعة حاليًا: بين ٠ و٢٬٠٠٠ ريال سعودي فقط.',
                cta: 'ثبّت وضعك الأخضر مع فينوم',
                body: 'ابقَ متتقدمًا على موجات هيئة الزكاة والضريبة ومواعيد القوائم مع فريق التزام يعمل لصالحك ابتداءً من ٥٠٠ ريال شهريًا.'
            },
            yellow: {
                title: 'الحالة: في منطقة خطر عدم الالتزام',
                message: 'إجاباتك توضح وجود ثغرات في ضريبة القيمة المضافة أو الزكاة أو الفوترة الإلكترونية أو القوائم قد تؤدي إلى غرامات.',
                exposure: 'قيمة الغرامات المتوقعة حاليًا: بين ٢٬٠٠٠ و٥٠٬٠٠٠ ريال سعودي.',
                cta: 'عالِج الخطر قبل ما تعالجه الهيئة',
                body: 'اربط منشأتك اليوم مع محاسب معتمد عبر فينوم وحوّل حالتك من أصفر إلى أخضر باشتراك شهري ثابت.'
            },
            red: {
                title: 'الحالة: خطر مرتفع – غير ملتزم',
                message: 'إجاباتك الحالية تشير إلى احتمال كبير لعدم الالتزام في ضريبة القيمة المضافة أو الزكاة أو الفوترة الإلكترونية أو القوائم.',
                exposure: 'قيمة الغرامات المتوقعة حاليًا: بين ٥٠٬٠٠٠ و٥٠٠٬٠٠٠+ ريال سعودي.',
                cta: 'احمِ سجلك التجاري قبل ما يصبح مهددًا',
                body: 'اشترك الآن في باقة "حماية الغرامات" من فينوم، ودع فريق الخبراء يتولى تصحيح الماضي وإدارة جميع الالتزامات.'
            }
        }
    };

    const copy = isArabic ? translations.ar : translations.en;

    const calculateRisk = () => {
        let score = 0;

        // VAT
        if (formData.vatRegistered === 'No' && (formData.revenue !== '< 375k' && formData.revenue !== '')) {
            score += 5;
        } else if (formData.vatRegistered === 'Yes') {
            if (formData.vatMonths >= 3 && formData.vatMonths <= 6) score += 3;
            if (formData.vatMonths > 6) score += 6;
        }

        // Zakat
        if (formData.zakatAnnual === 'No') {
            score += 4;
        } else if (formData.zakatLastYear === 'Never') {
            score += 7;
        }

        // E-Invoicing
        if (formData.einvoiceIntegrated === 'No') score += 6;
        if (formData.einvoiceIntegrated === 'Not sure') score += 4;

        // Qawaem
        if (formData.qawaemSubmit === 'No') score += 5;

        // Notices
        if (formData.noticeReceived === 'Yes') score += 4;
        if (formData.noticeReceived === 'Not sure') score += 2;

        return score;
    };

    const getResult = (score: number) => {
        if (score <= 3) return { status: 'GREEN', color: 'bg-emerald-500', icon: Shield, band: 'SAR 0 – 2,000' };
        if (score <= 9) return { status: 'YELLOW', color: 'bg-amber-500', icon: AlertTriangle, band: 'SAR 2,000 – 50,000' };
        return { status: 'RED', color: 'bg-rose-500', icon: AlertCircle, band: 'SAR 50,000 – 500,000+' };
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const score = calculateRisk();
    const result = getResult(score);

    return (
        <section className="relative py-24 overflow-hidden bg-slate-900">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {copy.headline}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        {copy.subheadline}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {!showResult ? (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                    style={{ width: `${(step / 3) * 100}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-10">
                                <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">
                                    {copy.stepTitle(step, 3)}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(s => (
                                        <div key={s} className={`w-2 h-2 rounded-full ${s === step ? 'bg-blue-500' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="min-h-[350px]">
                                {step === 1 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <span className="text-blue-400 text-xs">01</span>
                                                </div>
                                                {copy.vat}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Yes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, vatRegistered: opt }))}
                                                        className={`py-4 rounded-2xl font-bold transition-all border ${formData.vatRegistered === opt ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                    </button>
                                                ))}
                                            </div>
                                            {formData.vatRegistered === 'Yes' && (
                                                <div className="mt-6">
                                                    <label className="text-sm text-slate-400 block mb-3 font-medium">
                                                        {isArabic ? 'كم شهر منذ آخر إقرار ضريبي؟' : 'Months since last VAT return?'}
                                                    </label>
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {[0, 3, 6, 12].map(m => (
                                                            <button
                                                                key={m}
                                                                onClick={() => setFormData(f => ({ ...f, vatMonths: m }))}
                                                                className={`py-2 rounded-xl text-xs font-bold border transition-all ${formData.vatMonths === m ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                                                            >
                                                                {m}+
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                                    <span className="text-purple-400 text-xs">02</span>
                                                </div>
                                                {copy.zakat}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Yes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, zakatAnnual: opt }))}
                                                        className={`py-4 rounded-2xl font-bold transition-all border ${formData.zakatAnnual === opt ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                                    <span className="text-emerald-400 text-xs">03</span>
                                                </div>
                                                {copy.einvoice}
                                            </h4>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Yes', 'No', 'Not sure'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, einvoiceIntegrated: opt }))}
                                                        className={`py-4 rounded-2xl font-bold text-sm transition-all border ${formData.einvoiceIntegrated === opt ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : opt === 'No' ? (isArabic ? 'لا' : 'No') : (isArabic ? 'غير متأكد' : 'Not sure')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                                    <span className="text-indigo-400 text-xs">04</span>
                                                </div>
                                                {copy.qawaem}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Yes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, qawaemSubmit: opt }))}
                                                        className={`py-4 rounded-2xl font-bold transition-all border ${formData.qawaemSubmit === opt ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                                    <span className="text-amber-400 text-xs">05</span>
                                                </div>
                                                {copy.notices}
                                            </h4>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Yes', 'No', 'Not sure'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, noticeReceived: opt }))}
                                                        className={`py-4 rounded-2xl font-bold text-sm transition-all border ${formData.noticeReceived === opt ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-500/20' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : opt === 'No' ? (isArabic ? 'لا' : 'No') : (isArabic ? 'غير متأكد' : 'Not sure')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                                                    <span className="text-rose-400 text-xs">06</span>
                                                </div>
                                                {copy.revenue}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['< 375k', '375k-3m', '3m-40m', '> 40m'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, revenue: opt }))}
                                                        className={`py-3 rounded-2xl font-bold text-sm transition-all border ${formData.revenue === opt ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/20' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
                                {step > 1 && (
                                    <button
                                        onClick={handleBack}
                                        className="flex-1 py-4 px-6 rounded-2xl font-bold bg-white/5 text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/10"
                                    >
                                        <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                                        {copy.back}
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        className="flex-[2] py-4 px-6 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center gap-2 hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-500/20"
                                    >
                                        {copy.next}
                                        <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowResult(true)}
                                        className="flex-[2] py-4 px-6 rounded-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center gap-2 hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl shadow-blue-500/20 text-lg uppercase tracking-tight"
                                    >
                                        {copy.calculate}
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in zoom-in-95 duration-500">
                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
                                {/* Status Orb */}
                                <div className={`absolute -top-24 -right-24 w-64 h-64 ${result.color} opacity-20 blur-[100px] rounded-full`} />

                                <div className="text-center mb-12">
                                    <div className={`w-24 h-24 rounded-3xl ${result.color} border-4 border-white/20 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-current`}>
                                        <result.icon className="w-12 h-12 text-white" />
                                    </div>

                                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl ${result.color} mb-6`}>
                                        {result.status === 'GREEN' ? copy.green.title : result.status === 'YELLOW' ? copy.yellow.title : copy.red.title}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        {result.status === 'GREEN' ? copy.green.message : result.status === 'YELLOW' ? copy.yellow.message : copy.red.message}
                                    </h3>

                                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-10">
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">{isArabic ? 'قيمة الغرامات المتوقعة' : 'Estimated Penalty Exposure'}</p>
                                        <p className="text-4xl md:text-5xl font-black text-white">{result.band}</p>
                                        <p className="text-slate-500 text-sm mt-4 italic">
                                            {result.status === 'GREEN' ? copy.green.exposure : result.status === 'YELLOW' ? copy.yellow.exposure : copy.red.exposure}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                        <Shield className="w-48 h-48 rotate-12" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-2xl font-black mb-3">
                                            {result.status === 'GREEN' ? copy.green.cta : result.status === 'YELLOW' ? copy.yellow.cta : copy.red.cta}
                                        </h4>
                                        <p className="text-blue-100 mb-8 max-w-lg leading-relaxed font-medium">
                                            {result.status === 'GREEN' ? copy.green.body : result.status === 'YELLOW' ? copy.yellow.body : copy.red.body}
                                        </p>
                                        <button
                                            onClick={() => navigate('/pricing')}
                                            className="w-full md:w-auto py-5 px-12 bg-white text-blue-900 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-50 transition-all shadow-xl text-lg uppercase tracking-tight"
                                        >
                                            {isArabic ? 'ابدأ الآن' : 'Get Started Now'}
                                            <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowResult(false);
                                        setStep(1);
                                    }}
                                    className="mt-8 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
                                >
                                    <ArrowLeft className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                                    {isArabic ? 'إعادة الفحص' : 'Re-calculate Risk'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RiskCalculator;
