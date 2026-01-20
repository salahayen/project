
import React, { useState } from 'react';
import { Shield, AlertTriangle, AlertCircle, Check, ArrowRight, ArrowLeft, Info, RefreshCcw } from 'lucide-react';
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
            green: {
                title: 'Status: Fully Compliant (Green Shield)',
                message: 'Great news. Your current answers indicate that your business is broadly compliant with ZATCA, Zakat, VAT and Qawaem requirements.',
                exposure: 'Estimated penalty exposure today: between SAR 0 and SAR 2,000 only, mostly routine adjustments.',
                cta: 'Lock in your Green Status with Finume',
                body: 'Stay ahead of new ZATCA waves and Qawaem deadlines with an always-on compliance team for as low as SAR 500/month.'
            },
            yellow: {
                title: 'Status: At Risk of Non-Compliance (Yellow Alert)',
                message: 'Your answers show gaps in your VAT, Zakat, e-invoicing or Qawaem processes that could trigger penalties.',
                exposure: 'Estimated penalty exposure today: between SAR 2,000 and SAR 50,000 depending on future checks and filings.',
                cta: 'Fix Your Risk Before ZATCA Does',
                body: 'Connect with a Finume accountant today and convert your status from Yellow to Green with a flat monthly protection plan.'
            },
            red: {
                title: 'Status: High Risk – Not Compliant (Red Alert)',
                message: 'Your current answers indicate a high probability of non-compliance across VAT, Zakat, e-invoicing or Qawaem requirements.',
                exposure: 'Estimated penalty exposure today: between SAR 50,000 and SAR 500,000+ if issues are not corrected before audits or automated checks.',
                cta: 'Get Protected Before Your CR Is at Risk',
                body: 'Start a Finume "Fine Protection" plan now and let our experts clean up your history and manage all future filings for a predictable monthly fee.'
            }
        },
        ar: {
            headline: 'فحص التزام فوري مع الزكاة والضريبة والقوائم للمنشآت السعودية',
            subheadline: 'اعرف خلال ٦٠ ثانية إذا كانت منشأتك ملتزمة أو معرّضة لغرامات تقديرية – بدون طلب أي بيانات بنكية حساسة.',
            stepTitle: (current: number, total: number) => `الخطوة ${current} من ${total}`,
            vat: 'ضريبة القيمة المضافة',
            zakat: 'الزكاة وضريبة الدخل',
            einvoice: 'الفاتورة الإلكترونية (ZATCA 2)',
            qawaem: 'منصة قوائم / القوائم المالية',
            notices: 'الالتزام العام',
            revenue: 'الإيرادات السنوية',
            calculate: 'احسب المخاطر',
            next: 'التالي',
            back: 'الخلف',
            resultsHeadline: 'نتائج مخاطر الالتزام',
            summary: 'الملخص',
            green: {
                title: 'الحالة: ملتزم بالكامل (درع أخضر)',
                message: 'أخبار ممتازة. إجاباتك تشير إلى أن منشأتك ملتزمة بشكل عام مع متطلبات الزكاة، الضريبة، الفاتورة الإلكترونية والقوائم.',
                exposure: 'قيمة الغرامات المتوقعة حاليًا: بين ٠ و٢٬٠٠٠ ريال سعودي فقط، في حدود التعديلات الروتينية.',
                cta: 'ثبّت وضعك الأخضر مع فينوم',
                body: 'ابقَ متتقدمًا على موجات هيئة الزكاة والضريبة ومواعيد القوائم مع فريق التزام يعمل لصالحك ابتداءً من ٥٠٠ ريال شهريًا.'
            },
            yellow: {
                title: 'الحالة: في منطقة خطر عدم الالتزام (تنبيه أصفر)',
                message: 'إجاباتك توضح وجود ثغرات في ضريبة القيمة المضافة أو الزكاة أو الفوترة الإلكترونية أو القوائم قد تؤدي إلى غرامات.',
                exposure: 'قيمة الغرامات المتوقعة حاليًا: بين ٢٬٠٠٠ و٥٠٬٠٠٠ ريال سعودي حسب الفحص والمتابعة القادمة.',
                cta: 'عالِج الخطر قبل ما تعالجه الهيئة',
                body: 'اربط منشأتك اليوم مع محاسب معتمد عبر فينوم وحوّل حالتك من أصفر إلى أخضر باشتراك شهري ثابت للحماية من الغرامات.'
            },
            red: {
                title: 'الحالة: خطر مرتفع – غير ملتزم (إنذار أحمر)',
                message: 'إجاباتك الحالية تشير إلى احتمال كبير لعدم الالتزام في ضريبة القيمة المضافة أو الزكاة أو الفوترة الإلكترونية أو القوائم.',
                exposure: 'قيمة الغرامات المتوقعة حاليًا: بين ٥٠٬٠٠٠ و٥٠٠٬٠٠٠+ ريال سعودي إذا لم تُصحّح الأوضاع قبل الفحص أو التدقيق الآلي.',
                cta: 'احمِ سجلك التجاري قبل ما يصبح مهددًا',
                body: 'اشترك الآن في باقة "حماية الغرامات" من فينوم، ودع فريق الخبراء يتولى تصحيح الماضي وإدارة جميع الالتزامات المستقبلية برسوم شهرية ثابتة.'
            }
        }
    };

    const copy = isArabic ? translations.ar : translations.en;

    const trackEvent = (name: string, props: any) => {
        console.log(`[Tracking] Event: ${name}`, props);
        // Integrate with real analytics (GA4, Mixpanel, etc) here
    };

    const calculateRisk = () => {
        let score = 0;

        // VAT
        if (formData.vatRegistered === 'No' && (formData.revenue !== '< 375k' && formData.revenue !== '')) {
            score += 5;
        } else if (formData.vatRegistered === 'Yes') {
            if (formData.vatMonths >= 3 && formData.vatMonths <= 6) score += 3;
            else if (formData.vatMonths > 6) score += 6;
        }

        // Zakat
        if (formData.zakatAnnual === 'No') {
            score += 4;
        } else if (formData.zakatLastYear === 'Never' || parseInt(formData.zakatLastYear) < 2022) {
            score += 7;
        } else if (parseInt(formData.zakatLastYear) < 2024) {
            score += 4;
        }

        // E-Invoicing
        if (formData.einvoiceIntegrated === 'No') score += 6;
        else if (formData.einvoiceIntegrated === 'Not sure') score += 4;

        // Qawaem
        if (formData.qawaemSubmit === 'No') score += 5;

        // Notices
        if (formData.noticeReceived === 'Yes') score += 4;
        else if (formData.noticeReceived === 'Not sure') score += 2;

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

    const handleSubmit = () => {
        trackEvent("risk_calculated", { score, band: result.band });
        setShowResult(true);
    };

    const handleCTAClick = () => {
        trackEvent("risk_cta_clicked", { band: result.band });
        navigate('/pricing');
    };

    return (
        <section className="relative py-24 overflow-hidden bg-slate-900 border-t border-white/5">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {copy.headline}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {copy.subheadline}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {!showResult ? (
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
                                    style={{ width: `${(step / 6) * 100}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-10 pt-4">
                                <span className="text-blue-400 font-black text-xs tracking-[0.2em] uppercase">
                                    {copy.stepTitle(step, 6)}
                                </span>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6].map(s => (
                                        <div key={s} className={`h-1.5 transition-all duration-300 rounded-full ${s === step ? 'w-8 bg-blue-500' : s < step ? 'w-4 bg-emerald-500/50' : 'w-2 bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="min-h-[380px] flex flex-col justify-center">
                                {step === 1 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                                                    <span className="text-blue-400 text-sm">01</span>
                                                </div>
                                                {copy.vat}
                                            </h4>
                                            <p className="text-slate-400 mb-6 font-medium">{isArabic ? 'هل المنشأة مسجلة في ضريبة القيمة المضافة؟' : 'Is your business registered for VAT?'}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Yes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, vatRegistered: opt }))}
                                                        className={`py-5 rounded-[1.5rem] font-bold text-lg transition-all border-2 ${formData.vatRegistered === opt ? 'bg-blue-600 border-blue-400 text-white shadow-2xl shadow-blue-500/40 transform -translate-y-1' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                    </button>
                                                ))}
                                            </div>
                                            {formData.vatRegistered === 'Yes' && (
                                                <div className="mt-8 pt-8 border-t border-white/5">
                                                    <label className="text-sm text-slate-400 block mb-4 font-bold uppercase tracking-wider">
                                                        {isArabic ? 'كم شهر منذ آخر إقرار ضريبي؟' : 'Months since last VAT return (0–36)'}
                                                    </label>
                                                    <div className="grid grid-cols-4 gap-3">
                                                        {[0, 3, 6, 12].map(m => (
                                                            <button
                                                                key={m}
                                                                onClick={() => setFormData(f => ({ ...f, vatMonths: m }))}
                                                                className={`py-3 rounded-xl text-xs font-black border-2 transition-all ${formData.vatMonths === m ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                                            >
                                                                {m === 12 ? '12+' : m}+
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/20">
                                                    <span className="text-purple-400 text-sm">02</span>
                                                </div>
                                                {copy.zakat}
                                            </h4>
                                            <p className="text-slate-400 mb-6 font-medium">{isArabic ? 'هل تقدم إقرارات الزكاة/الضريبة سنوياً؟' : 'Do you file Zakat/Tax annually?'}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Yes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, zakatAnnual: opt }))}
                                                        className={`py-5 rounded-[1.5rem] font-bold text-lg transition-all border-2 ${formData.zakatAnnual === opt ? 'bg-purple-600 border-purple-400 text-white shadow-2xl shadow-purple-500/40 transform -translate-y-1' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                    </button>
                                                ))}
                                            </div>
                                            {formData.zakatAnnual === 'Yes' && (
                                                <div className="mt-8 pt-8 border-t border-white/5">
                                                    <label className="text-sm text-slate-400 block mb-4 font-bold uppercase tracking-wider">
                                                        {isArabic ? 'آخر سنة تم تقديم الإقرار عنها؟' : 'Last filing year (YYYY or "Never")'}
                                                    </label>
                                                    <div className="grid grid-cols-4 gap-3">
                                                        {['2024', '2023', '2022', 'Never'].map(y => (
                                                            <button
                                                                key={y}
                                                                onClick={() => setFormData(f => ({ ...f, zakatLastYear: y }))}
                                                                className={`py-3 rounded-xl text-xs font-black border-2 transition-all ${formData.zakatLastYear === y ? 'bg-purple-500/20 border-purple-400 text-purple-400' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                                            >
                                                                {y === 'Never' ? (isArabic ? 'أبداً' : 'Never') : y}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                                                    <span className="text-emerald-400 text-sm">03</span>
                                                </div>
                                                {copy.einvoice}
                                            </h4>
                                            <p className="text-slate-400 mb-6 font-medium">{isArabic ? 'هل منشأتك مرتبطة مع الفاتورة الإلكترونية (ZATCA Phase 2)؟' : 'Are you integrated with e-invoicing Phase 2?'}</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Yes', 'No', 'Not sure'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, einvoiceIntegrated: opt }))}
                                                        className={`py-5 rounded-[1.5rem] font-bold text-sm transition-all border-2 ${formData.einvoiceIntegrated === opt ? 'bg-emerald-600 border-emerald-400 text-white shadow-2xl shadow-emerald-500/40 transform -translate-y-1' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : opt === 'No' ? (isArabic ? 'لا' : 'No') : (isArabic ? 'غير متأكد' : 'Not sure')}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="mt-8 pt-8 border-t border-white/5">
                                                <p className="text-slate-400 mb-6 font-medium">{isArabic ? 'هل تصدر جميع فواتيرك إلكترونياً؟' : 'Do you issue all invoices electronically?'}</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {['Yes', 'No'].map(opt => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => setFormData(f => ({ ...f, einvoiceElectronic: opt }))}
                                                            className={`py-4 rounded-2xl font-bold transition-all border-2 ${formData.einvoiceElectronic === opt ? 'bg-emerald-600/20 border-emerald-400 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                                        >
                                                            {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
                                                    <span className="text-indigo-400 text-sm">04</span>
                                                </div>
                                                {copy.qawaem}
                                            </h4>
                                            <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                                                {isArabic ? 'هل تقوم برفع وتحميل القوائم المالية السنوية في منصة قوائم (MOC/النوك)؟' : 'Do you submit annual Qawaem to MOC/banks?'}
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Yes', 'No'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, qawaemSubmit: opt }))}
                                                        className={`py-6 rounded-[2rem] font-black text-xl transition-all border-2 ${formData.qawaemSubmit === opt ? 'bg-indigo-600 border-indigo-400 text-white shadow-2xl shadow-indigo-500/40 transform -translate-y-1' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/20">
                                                    <span className="text-amber-400 text-sm">05</span>
                                                </div>
                                                {copy.notices}
                                            </h4>
                                            <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                                                {isArabic ? 'هل استلمت أي إشعارات أو تنبيهات من هيئة الزكاة والضريبة خلال الـ 12 شهراً الماضية؟' : 'Have you received any tax/ZATCA notice in last 12 months?'}
                                            </p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Yes', 'No', 'Not sure'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, noticeReceived: opt }))}
                                                        className={`py-5 rounded-[1.5rem] font-bold text-sm transition-all border-2 ${formData.noticeReceived === opt ? 'bg-amber-600 border-amber-400 text-white shadow-2xl shadow-amber-500/40 transform -translate-y-1' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                                    >
                                                        {opt === 'Yes' ? (isArabic ? 'نعم' : 'Yes') : opt === 'No' ? (isArabic ? 'لا' : 'No') : (isArabic ? 'غير متأكد' : 'Not sure')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 6 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/20">
                                                    <span className="text-rose-400 text-sm">06</span>
                                                </div>
                                                {copy.revenue}
                                            </h4>
                                            <p className="text-slate-400 mb-8 font-medium">{isArabic ? 'ما هو نطاق الإيرادات السنوية التقريبي؟' : 'Approximate annual revenue band:'}</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['< 375k', '375k-3m', '3m-40m', '> 40m'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(f => ({ ...f, revenue: opt }))}
                                                        className={`py-4 rounded-2xl font-black text-sm transition-all border-2 ${formData.revenue === opt ? 'bg-rose-600 border-rose-400 text-white shadow-2xl shadow-rose-500/40 transform -translate-y-1' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
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
                                        className="flex-1 py-5 px-6 rounded-2xl font-black bg-white/5 text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/10 group"
                                    >
                                        <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isArabic ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                                        {copy.back}
                                    </button>
                                )}
                                {step < 6 ? (
                                    <button
                                        onClick={handleNext}
                                        className="flex-[2] py-5 px-6 rounded-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-3 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-2xl shadow-blue-500/20 group"
                                    >
                                        {copy.next}
                                        <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-[2] py-5 px-6 rounded-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl shadow-purple-500/20 text-xl tracking-tight"
                                    >
                                        {copy.calculate}
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in zoom-in-95 duration-700">
                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
                                {/* Status Orb */}
                                <div className={`absolute -top-32 -right-32 w-80 h-80 ${result.color} opacity-20 blur-[120px] rounded-full`} />

                                <div className="text-center mb-12">
                                    <div className={`w-24 h-24 rounded-[2rem] ${result.color} border-4 border-white/20 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-current`}>
                                        <result.icon className="w-12 h-12 text-white" />
                                    </div>

                                    <span className={`inline-block px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl ${result.color} mb-8`}>
                                        {result.status === 'GREEN' ? copy.green.title : result.status === 'YELLOW' ? copy.yellow.title : copy.red.title}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-8 leading-relaxed">
                                        {result.status === 'GREEN' ? copy.green.message : result.status === 'YELLOW' ? copy.yellow.message : copy.red.message}
                                    </h3>

                                    <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 mb-12 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">{isArabic ? 'قيمة الغرامات المتوقعة' : 'Estimated Penalty Exposure'}</p>
                                        <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">{result.band}</p>
                                        <p className="text-slate-400 text-sm mt-6 font-medium leading-relaxed max-w-md mx-auto italic">
                                            {result.status === 'GREEN' ? copy.green.exposure : result.status === 'YELLOW' ? copy.yellow.exposure : copy.red.exposure}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                                        <Shield className="w-64 h-64" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                                            {result.status === 'GREEN' ? copy.green.cta : result.status === 'YELLOW' ? copy.yellow.cta : copy.red.cta}
                                        </h4>
                                        <p className="text-blue-100/80 mb-10 max-w-lg leading-relaxed font-bold text-lg">
                                            {result.status === 'GREEN' ? copy.green.body : result.status === 'YELLOW' ? copy.yellow.body : copy.red.body}
                                        </p>
                                        <button
                                            onClick={handleCTAClick}
                                            className="w-full md:w-auto py-5 px-14 bg-white text-blue-900 rounded-[1.2rem] font-black flex items-center justify-center gap-3 hover:bg-blue-50 transition-all shadow-2xl text-lg uppercase tracking-wider transform hover:scale-105 active:scale-95"
                                        >
                                            {isArabic ? 'ابدأ الآن' : 'Get Started Now'}
                                            <ArrowRight className={`w-5 h-5 transition-transform ${isArabic ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowResult(false);
                                        setStep(1);
                                    }}
                                    className="mt-12 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto px-6 py-3 rounded-xl hover:bg-white/5"
                                >
                                    <RefreshCcw className="w-3 h-3" />
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
