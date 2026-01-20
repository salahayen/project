export const liteComplianceQuizConfig = {
    "calculator_id": "finume_lite_compliance_quiz_v1",
    "version": "1.0.0",
    "language_support": ["en", "ar"],

    "meta": {
        "seo": {
            "en": {
                "page_title": "Lite Compliance Risk Quiz for Saudi SMEs | 6 Quick Questions",
                "meta_description": "Answer 6 simple questions to see your compliance risk level with ZATCA, VAT, Zakat and e-invoicing in Saudi Arabia. No financial data required.",
                "h1": "Lite Compliance Risk Quiz (No Numbers, Just Reality)",
                "hero_subtitle": "A 60-second quiz for Saudi SME owners who hate forms but want to avoid surprise penalties.",
                "keywords": [
                    "Saudi SME compliance quiz",
                    "quick ZATCA VAT risk check",
                    "simple Zakat compliance test",
                    "Saudi e-invoicing risk quiz",
                    "no data compliance calculator"
                ]
            },
            "ar": {
                "page_title": "اختبار خفيف لمخاطر الالتزام للمنشآت السعودية | ٦ أسئلة سريعة",
                "meta_description": "جاوب على ٦ أسئلة بسيطة لتعرف مستوى مخاطر الغرامات مع هيئة الزكاة والضريبة والفوترة الإلكترونية في السعودية. بدون أرقام أو بيانات حساسة.",
                "h1": "اختبار خفيف لمخاطر الالتزام (بدون أرقام أو تعقيد)",
                "hero_subtitle": "اختبار ٦٠ ثانية لأصحاب المنشآت الذين لا يحبّون النماذج الطويلة لكن يريدون تجنّب الغرامات المفاجئة.",
                "keywords": [
                    "اختبار التزام سريع",
                    "فحص مخاطر هيئة الزكاة والضريبة",
                    "اختبار بسيط للفوترة الإلكترونية",
                    "التزام ضريبة القيمة المضافة",
                    "أداة تقييم مخاطر المنشآت الصغيرة"
                ]
            }
        }
    },

    "result_thresholds": {
        "green": {
            "min_score": 0,
            "max_score": 4,
            "penalty_band": { "min": 0, "max": 5000 },
            "ui": {
                "en": {
                    "status_label": "Status: Low Visible Risk (Green)",
                    "headline": "Your answers show low visible compliance risk.",
                    "message_lines": [
                        "Right now your setup looks more organized than many Saudi SMEs, but regulations and ZATCA checks keep evolving.",
                        "Estimated exposure based on your current habits: between SAR 0 and SAR 5,000 in normal cases."
                    ],
                    "primary_cta_label": "Keep It Green with a Finume Protection Plan",
                    "primary_cta_subtext": "Lock in your low-risk status with a Finume accountant who tracks ZATCA, VAT, Zakat and Qawaem deadlines for you."
                },
                "ar": {
                    "status_label": "الحالة: مخاطر ظاهرة منخفضة (أخضر)",
                    "headline": "إجاباتك توضح أن مخاطر الالتزام الظاهرة منخفضة حاليًا.",
                    "message_lines": [
                        "وضعك الحالي يبدو أكثر تنظيمًا من كثير من المنشآت السعودية، لكن الأنظمة وفحوصات هيئة الزكاة والضريبة تتطور باستمرار.",
                        "قيمة التعرض التقريبي بناءً على سلوكك الحالي: بين ٠ و٥٬٠٠٠ ريال سعودي في الحالات العادية."
                    ],
                    "primary_cta_label": "حافظ على اللون الأخضر مع باقة حماية فينوم",
                    "primary_cta_subtext": "ثبّت وضعك المنخفض المخاطر مع محاسب من فينوم يتابع عنك مواعيد الزكاة والضريبة والفوترة الإلكترونية والقوائم."
                }
            }
        },
        "yellow": {
            "min_score": 5,
            "max_score": 12,
            "penalty_band": { "min": 5000, "max": 75000 },
            "ui": {
                "en": {
                    "status_label": "Status: Medium Risk Zone (Yellow)",
                    "headline": "Your answers put you in the “surprise penalty” zone.",
                    "message_lines": [
                        "Many Saudi SMEs with similar patterns end up paying unexpected ZATCA or Zakat penalties when rules change or deadlines are missed.",
                        "Estimated exposure based on your current habits: between SAR 5,000 and SAR 75,000 if nothing changes."
                    ],
                    "primary_cta_label": "Talk to a Finume Expert Before the Next Deadline",
                    "primary_cta_subtext": "Book a free 10‑minute call to see how a Finume Fine Protection plan can move you from Yellow to Green."
                },
                "ar": {
                    "status_label": "الحالة: منطقة خطر متوسطة (أصفر)",
                    "headline": "إجاباتك تضعك في منطقة “الغرامات المفاجئة”.",
                    "message_lines": [
                        "كثير من المنشآت السعودية التي لديها نفس النمط تتعرض لغرامات غير متوقعة من هيئة الزكاة والضريبة أو الزكاة عند تغيّر الأنظمة أو نسيان المواعيد.",
                        "قيمة التعرض التقريبي بناءً على السلوك الحالي: بين ٥٬٠٠٠ و٧٥٬٠٠٠ ريال سعودي إذا لم يتغيّر شيء."
                    ],
                    "primary_cta_label": "تحدث مع خبير من فينوم قبل الموعد القادم",
                    "primary_cta_subtext": "احجز مكالمة مجانية ١٠ دقائق لمعرفة كيف تنقلك باقة حماية الغرامات من فينوم من الأصفر إلى الأخضر."
                }
            }
        },
        "red": {
            "min_score": 13,
            "max_score": 24,
            "penalty_band": { "min": 75000, "max": 500000 },
            "ui": {
                "en": {
                    "status_label": "Status: High Risk Zone (Red)",
                    "headline": "Your answers signal a high risk of serious penalties.",
                    "message_lines": [
                        "Your current way of handling tax, ZATCA and banking is similar to businesses that face Tasattur issues, frozen CRs or large e‑invoicing penalties in Saudi Arabia.",
                        "Estimated exposure based on your current habits: between SAR 75,000 and SAR 500,000+ in severe cases."
                    ],
                    "primary_cta_label": "Install Your Finume Fine Protection Shield Now",
                    "primary_cta_subtext": "Start a Finume plan to clean up your setup, centralize your banking and filings, and reduce your risk before any audit or system flag."
                },
                "ar": {
                    "status_label": "الحالة: منطقة خطر مرتفع (أحمر)",
                    "headline": "إجاباتك تشير إلى مستوى مرتفع من مخاطر الغرامات.",
                    "message_lines": [
                        "طريقة تعاملك الحالية مع الزكاة والضريبة والحسابات البنكية قريبة من نمط منشآت واجهت مشاكل تستر أو تجميد سجل تجاري أو غرامات فوترة إلكترونية كبيرة في السعودية.",
                        "قيمة التعرض التقريبي بناءً على السلوك الحالي: بين ٧٥٬٠٠٠ و٥٠٠٬٠٠٠+ ريال سعودي في الحالات الشديدة."
                    ],
                    "primary_cta_label": "ركّب درع حماية الغرامات من فينوم الآن",
                    "primary_cta_subtext": "ابدأ مع فينوم لتنظيف وضعك الحالي، وتوحيد الحسابات والتقارير، وتقليل المخاطر قبل أي تدقيق أو إشارة من الأنظمة."
                }
            }
        }
    },

    "questions": [
        {
            "id": "handler_of_compliance",
            "type": "single_choice",
            "order": 1,
            "required": true,
            "category": "RESPONSIBILITY",
            "label": {
                "en": "Who handles Zakat, tax and e‑invoicing for your business?",
                "ar": "من يتولى موضوع الزكاة والضريبة والفوترة الإلكترونية في منشأتك؟"
            },
            "options": [
                {
                    "value": "external_firm_or_certified",
                    "label": {
                        "en": "A fixed external accounting firm or certified accountant",
                        "ar": "مكتب محاسبة ثابت أو محاسب معتمد"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "one_internal_employee",
                    "label": {
                        "en": "One internal employee",
                        "ar": "موظف داخلي واحد"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "owner_or_non_specialist",
                    "label": {
                        "en": "The owner / a non‑specialist person",
                        "ar": "صاحب المنشأة / شخص غير متخصص"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },

        {
            "id": "invoicing_method",
            "type": "single_choice",
            "order": 2,
            "required": true,
            "category": "INVOICING",
            "label": {
                "en": "How do you issue most of your sales invoices today?",
                "ar": "كيف تصدر أغلب فواتير المبيعات اليوم؟"
            },
            "options": [
                {
                    "value": "zATCA_compliant_system",
                    "label": {
                        "en": "Through a ZATCA‑compliant e‑invoicing system",
                        "ar": "عبر نظام إلكتروني متوافق مع هيئة الزكاة والضريبة (الفوترة الإلكترونية)"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "normal_software_or_excel",
                    "label": {
                        "en": "Using a normal software/Excel/PDF (not sure if compliant)",
                        "ar": "باستخدام برنامج عادي أو إكسل / PDF (ولست متأكدًا من التوافق)"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "paper_or_whatsapp",
                    "label": {
                        "en": "Mostly paper/WhatsApp/manual invoices without a clear system",
                        "ar": "فواتير ورقية أو واتساب / يدويًا بدون نظام واضح"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },

        {
            "id": "deadline_management",
            "type": "single_choice",
            "order": 3,
            "required": true,
            "category": "DEADLINES",
            "label": {
                "en": "How do you manage Zakat and tax filing deadlines?",
                "ar": "كيف تتعامل مع مواعيد تقديم إقرارات الزكاة والضريبة؟"
            },
            "options": [
                {
                    "value": "clear_calendar",
                    "label": {
                        "en": "We have a clear calendar and consistent follow‑up",
                        "ar": "لدينا تقويم واضح ومتابعة ثابتة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "sometimes_late_but_manage",
                    "label": {
                        "en": "Sometimes we remember late but still manage to file",
                        "ar": "أحيانًا نتذكر متأخر لكن نلحق قبل آخر لحظة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "act_after_sms",
                    "label": {
                        "en": "We usually act only after an SMS or late reminder",
                        "ar": "غالبًا نتحرك فقط بعد رسالة SMS أو إشعار تأخير"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },

        {
            "id": "bank_account_usage",
            "type": "single_choice",
            "order": 4,
            "required": true,
            "category": "BANKING",
            "label": {
                "en": "Do all business income and expenses go through a bank account under the CR?",
                "ar": "هل جميع إيرادات ومصروفات المنشأة تمر عبر حساب بنكي باسم السجل التجاري؟"
            },
            "options": [
                {
                    "value": "mostly_business_account",
                    "label": {
                        "en": "Yes, almost everything goes through the business account",
                        "ar": "نعم، تقريبًا كل شيء عبر حساب المنشأة البنكي"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "mixed_accounts",
                    "label": {
                        "en": "Mix of business and personal accounts",
                        "ar": "خليط بين حساب المنشأة والحسابات الشخصية"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "mostly_personal_accounts",
                    "label": {
                        "en": "Mostly personal accounts used for business",
                        "ar": "أغلب العمليات تتم عبر حسابات شخصية"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },

        {
            "id": "financial_statements",
            "type": "single_choice",
            "order": 5,
            "required": true,
            "category": "STATEMENTS",
            "label": {
                "en": "Do you have up‑to‑date financial statements for the last 12 months?",
                "ar": "هل لديك قوائم مالية (ميزانية وقائمة دخل) محدثة لآخر ١٢ شهرًا؟"
            },
            "options": [
                {
                    "value": "proper_reports",
                    "label": {
                        "en": "Yes, proper reports are ready and updated",
                        "ar": "نعم، تقارير جاهزة ومحدثة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "partial_or_simple",
                    "label": {
                        "en": "We have partial numbers / a simple report from software",
                        "ar": "لدينا أرقام متفرقة / تقرير بسيط من برنامج"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "no_clear_statements",
                    "label": {
                        "en": "No clear statements, we mainly look at bank balance and intuition",
                        "ar": "لا يوجد قوائم واضحة، نعتمد على الرصيد البنكي والشعور العام"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },

        {
            "id": "penalties_last_3_years",
            "type": "single_choice",
            "order": 6,
            "required": true,
            "category": "HISTORY",
            "label": {
                "en": "In the last 3 years, have you had any Zakat, tax or e‑invoicing penalties?",
                "ar": "خلال آخر ٣ سنوات، هل تم فرض أي غرامات زكاة أو ضريبة أو مخالفات فوترة إلكترونية على منشأتك؟"
            },
            "options": [
                {
                    "value": "no_penalties",
                    "label": {
                        "en": "No, never",
                        "ar": "لا، لم نتعرض لأي غرامة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "once_or_twice",
                    "label": {
                        "en": "Yes, once or twice and resolved",
                        "ar": "نعم، مرة أو مرتين وتم حلها"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "multiple_or_unknown",
                    "label": {
                        "en": "Yes, multiple times / I don’t remember how many",
                        "ar": "نعم، أكثر من مرة أو لا أتذكر عددها"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        }
    ]
};
