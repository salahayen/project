
import React, { useState, useMemo } from 'react';
import { Shield, AlertTriangle, AlertCircle, Check, ArrowRight, ArrowLeft, Info, RefreshCcw, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface RiskCalculatorProps {
    config: any;
}

const RiskCalculator: React.FC<RiskCalculatorProps> = ({ config }) => {
    const { language } = useAppContext();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [showResults, setShowResults] = useState(false);

    const questions = useMemo(() => [...config.questions].sort((a, b) => a.order - b.order), [config.questions]);
    const totalSteps = questions.length;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            calculateResult();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const calculateResult = () => {
        // Tracking event
        console.log('risk_calculated', { calculator_id: config.calculator_id, answers });
        setShowResults(true);
    };

    const totalRiskScore = useMemo(() => {
        let score = 0;
        questions.forEach(q => {
            const answer = answers[q.id];
            if (answer === undefined) return;

            if (q.type === 'number') {
                const val = Number(answer);
                const bucket = q.score_buckets?.find((b: any) => val >= b.min && val <= b.max);
                if (bucket) score += bucket.points;
            } else if (q.type === 'single_choice') {
                const option = q.options?.find((o: any) => o.value === answer);
                if (option) {
                    option.score_delta_rules?.forEach((rule: any) => {
                        if (rule.condition.always) score += rule.points;
                    });
                }
            }
        });
        return score;
    }, [answers, questions]);

    const resultData = useMemo(() => {
        const { result_thresholds } = config;
        let band: 'green' | 'yellow' | 'red' = 'green';

        if (totalRiskScore <= result_thresholds.green.max_score) {
            band = 'green';
        } else if (totalRiskScore <= result_thresholds.yellow.max_score) {
            band = 'yellow';
        } else {
            band = 'red';
        }

        return {
            band,
            ...result_thresholds[band],
            ui: result_thresholds[band].ui[language as 'en' | 'ar']
        };
    }, [totalRiskScore, language, config]);

    const resetCalculator = () => {
        setAnswers({});
        setCurrentStep(0);
        setShowResults(false);
    };

    const handleCTA = () => {
        console.log('risk_cta_clicked', { calculator_id: config.calculator_id, band: resultData.band, score: totalRiskScore });
        navigate('/pricing');
    };

    if (showResults) {
        const { ui, band } = resultData;
        const isGreen = band === 'green';
        const isYellow = band === 'yellow';
        const isRed = band === 'red';

        return (
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-5">
                <div className={`absolute top-0 inset-x-0 h-2 ${isGreen ? 'bg-green-500' : isYellow ? 'bg-amber-500' : 'bg-red-500'}`} />

                <div className="flex flex-col items-center text-center">
                    <div className={`p-6 rounded-2xl mb-8 ${isGreen ? 'bg-green-100 text-green-600' : isYellow ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                        {isGreen ? <Shield size={64} className="animate-pulse" /> : isYellow ? <AlertTriangle size={64} className="animate-bounce" /> : <AlertCircle size={64} className="animate-bounce" />}
                    </div>

                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 mb-4 ${isGreen ? 'bg-green-50/50 border-green-200 text-green-700' :
                            isYellow ? 'bg-amber-50/50 border-amber-200 text-amber-700' :
                                'bg-red-50/50 border-red-200 text-red-700'
                        }`}>
                        {ui.status_label}
                    </div>

                    <h3 className="text-3xl font-extrabold text-gray-900 mb-6">{ui.headline}</h3>

                    <div className="space-y-4 mb-10 text-gray-600 text-lg max-w-2xl">
                        {ui.message_lines.map((line: string, idx: number) => (
                            <p key={idx} className="leading-relaxed">{line}</p>
                        ))}
                    </div>

                    <div className="w-full max-w-lg bg-gray-50/50 border border-gray-100 rounded-2xl p-8 mb-10">
                        <h4 className="font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                            <Info size={20} className="text-primary-500" />
                            {language === 'ar' ? 'الباقات الموصى بها لك' : 'Recommended Plans for You'}
                        </h4>
                        <div className="space-y-3">
                            <button
                                onClick={handleCTA}
                                className={`w-full py-5 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${isGreen ? 'bg-green-600 hover:bg-green-700 shadow-green-200' :
                                        isYellow ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' :
                                            'bg-red-600 hover:bg-red-700 shadow-red-200'
                                    }`}
                            >
                                {ui.primary_cta_label}
                                <ArrowRight size={22} className={language === 'ar' ? 'rotate-180' : ''} />
                            </button>
                            <p className="text-sm text-gray-500 italic mt-4">{ui.primary_cta_subtext}</p>
                        </div>
                    </div>

                    <button
                        onClick={resetCalculator}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold transition-colors py-3 px-6 rounded-lg hover:bg-primary-50"
                    >
                        <RefreshCcw size={20} />
                        {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gray-100">
                <div
                    className="h-full bg-primary-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between items-center mb-10">
                <span className="text-sm font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-lg">
                    {currentQuestion.category}
                </span>
                <span className="text-sm font-bold text-gray-400">
                    {language === 'ar' ? `الخطوة ${currentStep + 1} من ${totalSteps}` : `Step ${currentStep + 1} of ${totalSteps}`}
                </span>
            </div>

            <div key={currentQuestion.id} className="animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="mb-10">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
                        {currentQuestion.label[language as 'en' | 'ar']}
                    </h3>
                    {currentQuestion.help_text && (
                        <div className="flex items-start gap-2 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                            <HelpCircle size={16} className="mt-0.5 shrink-0" />
                            <p>{currentQuestion.help_text[language as 'en' | 'ar']}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4 mb-12">
                    {currentQuestion.type === 'single_choice' && currentQuestion.options?.map((opt: any) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                setAnswers({ ...answers, [currentQuestion.id]: opt.value });
                                setTimeout(handleNext, 300);
                            }}
                            className={`w-full group p-6 text-left rounded-2xl border-2 transition-all flex items-center justify-between ${answers[currentQuestion.id] === opt.value
                                    ? 'border-primary-600 bg-primary-50/50 ring-4 ring-primary-100'
                                    : 'border-gray-100 hover:border-gray-300 bg-white hover:bg-gray-50'
                                } ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                        >
                            <span className={`text-lg transition-colors ${answers[currentQuestion.id] === opt.value ? 'font-bold text-primary-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                {opt.label[language as 'en' | 'ar']}
                            </span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[currentQuestion.id] === opt.value ? 'bg-primary-600 border-primary-600' : 'border-gray-200 group-hover:border-gray-400'
                                }`}>
                                {answers[currentQuestion.id] === opt.value && <Check size={14} className="text-white" />}
                            </div>
                        </button>
                    ))}

                    {currentQuestion.type === 'number' && (
                        <div className="space-y-4">
                            <input
                                type="number"
                                min={currentQuestion.validation?.min}
                                max={currentQuestion.validation?.max}
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                                placeholder={currentQuestion.placeholder?.[language as 'en' | 'ar']}
                                className="w-full p-8 text-2xl font-bold bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-primary-600 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all text-center"
                            />
                            <p className="text-sm text-gray-500 text-center">
                                {language === 'ar' ? `القيمة المقبولة بين ${currentQuestion.validation?.min} و ${currentQuestion.validation?.max}` : `Value between ${currentQuestion.validation?.min} and ${currentQuestion.validation?.max}`}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`flex-1 p-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${currentStep === 0
                                ? 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400'
                                : 'bg-white border-2 border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                    >
                        <ArrowLeft size={20} className={language === 'ar' ? 'rotate-180' : ''} />
                        {language === 'ar' ? 'السابق' : 'Back'}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === ''}
                        className={`flex-[2] p-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === ''
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-200'
                            }`}
                    >
                        {currentStep === totalSteps - 1
                            ? (language === 'ar' ? 'احسب المخاطر الآن' : 'Calculate Risk Now')
                            : (language === 'ar' ? 'التالي' : 'Next')}
                        <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RiskCalculator;
