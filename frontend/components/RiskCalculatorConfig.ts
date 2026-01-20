export const riskCalculatorConfig = {
    "calculator_id": "finume_penalty_risk_calculator_v1",
    "version": "1.0.0",
    "language_support": ["en", "ar"],
    "result_thresholds": {
        "green": {
            "min_score": 0,
            "max_score": 3,
            "penalty_band": { "min": 0, "max": 2000 },
            "ui": {
                "en": {
                    "status_label": "Status: Fully Compliant (Green Shield)",
                    "headline": "Your business appears broadly compliant.",
                    "message_lines": [
                        "Your current answers indicate that your business is broadly compliant with ZATCA, VAT, Zakat and Qawaem requirements.",
                        "Estimated penalty exposure today: between SAR 0 and SAR 2,000 only, mostly routine adjustments."
                    ],
                    "primary_cta_label": "Lock in your Green Status with Finume",
                    "primary_cta_subtext": "Stay ahead of new ZATCA waves and Qawaem deadlines with an always-on compliance team from SAR 500/month."
                },
                "ar": {
                    "status_label": "الحالة: ملتزم بالكامل (درع أخضر)",
                    "headline": "منشأتك تبدو ملتزمة بشكل عام.",
                    "message_lines": [
                        "إجاباتك تشير إلى أن منشأتك ملتزمة بشكل عام مع متطلبات الزكاة، الضريبة، الفوترة الإلكترونية والقوائم.",
                        "قيمة الغرامات المتوقعة حاليًا: بين ٠ و٢٬٠٠٠ ريال سعودي فقط، في حدود التعديلات الروتينية."
                    ],
                    "primary_cta_label": "ثبّت وضعك الأخضر مع فينوم",
                    "primary_cta_subtext": "ابقَ متقدمًا على موجات هيئة الزكاة والضريبة ومواعيد القوائم مع فريق التزام يعمل لصالحك ابتداءً من ٥٠٠ ريال شهريًا."
                }
            }
        },
        "yellow": {
            "min_score": 4,
            "max_score": 9,
            "penalty_band": { "min": 2000, "max": 50000 },
            "ui": {
                "en": {
                    "status_label": "Status: At Risk of Non-Compliance (Yellow Alert)",
                    "headline": "Your business is at risk of future penalties.",
                    "message_lines": [
                        "Your answers show gaps in your VAT, Zakat, e-invoicing or Qawaem processes that could trigger penalties.",
                        "Estimated penalty exposure today: between SAR 2,000 and SAR 50,000 depending on future checks and filings."
                    ],
                    "primary_cta_label": "Fix Your Risk Before ZATCA Does",
                    "primary_cta_subtext": "Connect with a Finume accountant today and convert your status from Yellow to Green with a flat monthly protection plan."
                },
                "ar": {
                    "status_label": "الحالة: في منطقة خطر عدم الالتزام (تنبيه أصفر)",
                    "headline": "منشأتك في منطقة خطر غرامات مستقبلية.",
                    "message_lines": [
                        "إجاباتك توضح وجود ثغرات في ضريبة القيمة المضافة أو الزكاة أو الفوترة الإلكترونية أو القوائم قد تؤدي إلى غرامات.",
                        "قيمة الغرامات المتوقعة حاليًا: بين ٢٬٠٠٠ و٥٠٬٠٠٠ ريال سعودي حسب الفحص والمتابعة القادمة."
                    ],
                    "primary_cta_label": "عالِج الخطر قبل ما تعالجه الهيئة",
                    "primary_cta_subtext": "اربط منشأتك اليوم مع محاسب معتمد عبر فينوم وحوّل حالتك من أصفر إلى أخضر باشتراك شهري ثابت للحماية من الغرامات."
                }
            }
        },
        "red": {
            "min_score": 10,
            "max_score": 999,
            "penalty_band": { "min": 50000, "max": 500000 },
            "ui": {
                "en": {
                    "status_label": "Status: High Risk – Not Compliant (Red Alert)",
                    "headline": "Your business is in a high-risk zone.",
                    "message_lines": [
                        "Your current answers indicate a high probability of non-compliance across VAT, Zakat, e-invoicing or Qawaem requirements.",
                        "Estimated penalty exposure today: between SAR 50,000 and SAR 500,000+ if issues are not corrected before audits or automated checks."
                    ],
                    "primary_cta_label": "Get Protected Before Your CR Is at Risk",
                    "primary_cta_subtext": "Start a Finume \"Fine Protection\" plan now and let our experts clean up your history and manage all future filings for a predictable monthly fee."
                },
                "ar": {
                    "status_label": "الحالة: خطر مرتفع – غير ملتزم (إنذار أحمر)",
                    "headline": "منشأتك في منطقة خطر مرتفع.",
                    "message_lines": [
                        "إجاباتك الحالية تشير إلى احتمال كبير لعدم الالتزام في ضريبة القيمة المضافة أو الزكاة أو الفوترة الإلكترونية أو القوائم.",
                        "قيمة الغرامات المتوقعة حاليًا: بين ٥٠٬٠٠٠ و٥٠٠٬٠٠٠+ ريال سعودي إذا لم تُصحّح الأوضاع قبل الفحص أو التدقيق الآلي."
                    ],
                    "primary_cta_label": "احمِ سجلك التجاري قبل ما يصبح مهددًا",
                    "primary_cta_subtext": "اشترك الآن في باقة \"حماية الغرامات\" من فينوم، ودع فريق الخبراء يتولى تصحيح الماضي وإدارة جميع الالتزامات المستقبلية برسوم شهرية ثابتة."
                }
            }
        }
    },
    "questions": [
        {
            "id": "vat_registered",
            "type": "single_choice",
            "order": 1,
            "required": true,
            "category": "VAT",
            "label": {
                "en": "Is your business currently registered for VAT with ZATCA?",
                "ar": "هل منشأتك مسجلة حاليًا في ضريبة القيمة المضافة لدى هيئة الزكاة والضريبة؟"
            },
            "options": [
                {
                    "value": "yes",
                    "label": { "en": "Yes, we are registered", "ar": "نعم، نحن مسجلون" },
                    "score_delta_rules": [
                        {
                            "condition": { "always": true },
                            "points": 0
                        }
                    ]
                },
                {
                    "value": "no_below_threshold",
                    "label": {
                        "en": "No, and our annual revenue is below the VAT threshold",
                        "ar": "لا، وإيراداتنا السنوية أقل من حد التسجيل في القيمة المضافة"
                    },
                    "score_delta_rules": [
                        {
                            "condition": { "always": true },
                            "points": 0
                        }
                    ]
                },
                {
                    "value": "no_above_threshold",
                    "label": {
                        "en": "No, but our annual revenue is at or above the VAT threshold",
                        "ar": "لا، وإيراداتنا السنوية عند أو فوق حد التسجيل في القيمة المضافة"
                    },
                    "score_delta_rules": [
                        {
                            "condition": { "always": true },
                            "points": 5
                        }
                    ]
                }
            ]
        },
        {
            "id": "months_since_last_vat_return",
            "type": "number",
            "order": 2,
            "required": true,
            "category": "VAT",
            "label": {
                "en": "How many months ago did you file your last VAT return?",
                "ar": "منذ كم شهر قمت بتقديم آخر إقرار لضريبة القيمة المضافة؟"
            },
            "placeholder": { "en": "e.g. 0–36", "ar": "مثال: من ٠ إلى ٣٦ شهرًا" },
            "validation": { "min": 0, "max": 60 },
            "score_buckets": [
                {
                    "min": 0,
                    "max": 3,
                    "points": 0
                },
                {
                    "min": 4,
                    "max": 6,
                    "points": 3
                },
                {
                    "min": 7,
                    "max": 60,
                    "points": 6
                }
            ]
        },
        {
            "id": "zakat_filing_status",
            "type": "single_choice",
            "order": 3,
            "required": true,
            "category": "ZAKAT",
            "label": {
                "en": "Do you file Zakat / income tax returns annually?",
                "ar": "هل تقوم بتقديم إقرارات الزكاة / ضريبة الدخل سنويًا؟"
            },
            "options": [
                {
                    "value": "yes_on_time",
                    "label": { "en": "Yes, on time every year", "ar": "نعم، وفي الوقت المحدد كل سنة" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "yes_but_late",
                    "label": { "en": "Yes, but sometimes late", "ar": "نعم، ولكن أحيانًا بتأخير" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                },
                {
                    "value": "no_or_never",
                    "label": { "en": "No / have not filed for several years", "ar": "لا / لم أقدم إقرارات منذ عدة سنوات" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 7 }
                    ]
                }
            ]
        },
        {
            "id": "e_invoicing_integration",
            "type": "single_choice",
            "order": 4,
            "required": true,
            "category": "E_INVOICING",
            "label": {
                "en": "Are you integrated with ZATCA e-invoicing (Phase 2, real-time)?",
                "ar": "هل أنت متكامل مع نظام الفوترة الإلكترونية (المرحلة الثانية – التكامل الفوري) لدى هيئة الزكاة والضريبة؟"
            },
            "options": [
                {
                    "value": "yes",
                    "label": { "en": "Yes, fully integrated", "ar": "نعم، متكامل بالكامل" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "no",
                    "label": { "en": "No, not yet integrated", "ar": "لا، غير متكامل حتى الآن" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 6 }
                    ]
                },
                {
                    "value": "not_sure",
                    "label": { "en": "Not sure / I don’t know", "ar": "لست متأكدًا / لا أعلم" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },
        {
            "id": "all_invoices_electronic",
            "type": "single_choice",
            "order": 5,
            "required": true,
            "category": "E_INVOICING",
            "label": {
                "en": "Do you issue all tax invoices electronically through a compliant system?",
                "ar": "هل تصدر جميع فواتيرك الضريبية إلكترونيًا عبر نظام متوافق؟"
            },
            "options": [
                {
                    "value": "yes",
                    "label": { "en": "Yes, all invoices are electronic", "ar": "نعم، جميع الفواتير إلكترونية" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "mostly",
                    "label": { "en": "Mostly yes, but some manual invoices", "ar": "في الغالب نعم، مع بعض الفواتير اليدوية" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "no",
                    "label": { "en": "No, we still use manual invoices", "ar": "لا، ما زلنا نستخدم فواتير يدوية" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 5 }
                    ]
                }
            ]
        },
        {
            "id": "qawaem_submission",
            "type": "single_choice",
            "order": 6,
            "required": true,
            "category": "QAWAEM",
            "label": {
                "en": "Do you submit annual financial statements (Qawaem) for your CR?",
                "ar": "هل تقوم بتقديم القوائم المالية السنوية (القوائم) للسجل التجاري الخاص بك؟"
            },
            "options": [
                {
                    "value": "yes_regularly",
                    "label": { "en": "Yes, submitted every year", "ar": "نعم، تُقدّم كل سنة" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "yes_but_not_every_year",
                    "label": { "en": "Yes, but not every year", "ar": "نعم، ولكن ليس في كل سنة" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 3 }
                    ]
                },
                {
                    "value": "no",
                    "label": { "en": "No, we do not submit Qawaem", "ar": "لا، لا نقوم بتقديم القوائم" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 5 }
                    ]
                }
            ]
        },
        {
            "id": "notices_last_12_months",
            "type": "single_choice",
            "order": 7,
            "required": true,
            "category": "NOTICES",
            "label": {
                "en": "In the last 12 months, did you receive any tax / ZATCA / compliance notifications?",
                "ar": "خلال آخر ١٢ شهرًا، هل استلمت أي إشعارات من هيئة الزكاة والضريبة أو جهات رقابية أخرى؟"
            },
            "options": [
                {
                    "value": "no",
                    "label": { "en": "No, no notifications received", "ar": "لا، لم أستلم أي إشعارات" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "yes_understood_resolved",
                    "label": {
                        "en": "Yes, and they were understood and resolved",
                        "ar": "نعم، وتم فهمها وحلّها"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "yes_and_not_clear",
                    "label": {
                        "en": "Yes, and some are still unclear or pending",
                        "ar": "نعم، وبعضها ما زال غير واضح أو تحت المتابعة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },
        {
            "id": "annual_revenue_band",
            "type": "single_choice",
            "order": 8,
            "required": true,
            "category": "REVENUE",
            "label": {
                "en": "What is your approximate annual revenue?",
                "ar": "ما هو تقريبًا حجم الإيرادات السنوية لمنشأتك؟"
            },
            "options": [
                {
                    "value": "below_375k",
                    "label": { "en": "Below SAR 375,000", "ar": "أقل من ٣٧٥٬٠٠٠ ريال" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "375k_to_3m",
                    "label": { "en": "SAR 375,000 – 3,000,000", "ar": "من ٣٧٥٬٠٠٠ إلى ٣٬٠٠٠٬٠٠٠ ريال" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 1 }
                    ]
                },
                {
                    "value": "3m_to_40m",
                    "label": { "en": "SAR 3,000,000 – 40,000,000", "ar": "من ٣٬٠٠٠٬٠٠٠ إلى ٤٠٬٠٠٠٬٠٠٠ ريال" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "above_40m",
                    "label": { "en": "Above SAR 40,000,000", "ar": "أعلى من ٤٠٬٠٠٠٬٠٠٠ ريال" },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 3 }
                    ]
                }
            ]
        }
    ]
};
