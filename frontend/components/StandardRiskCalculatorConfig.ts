export const standardRiskCalculatorConfig = {
    "calculator_id": "standard_compliance_audit_v1",
    "version": "1.0.0",
    "language_support": ["en", "ar"],

    "meta": {
        "seo": {
            "en": {
                "page_title": "Standard Compliance Risk Audit | Saudi SME Assessment",
                "meta_description": "A comprehensive 8-question audit to evaluate your business compliance with ZATCA, Withholding Tax, and operational regulations in Saudi Arabia.",
                "h1": "Compliance Risk Assessment (Standard)",
                "hero_subtitle": "Evaluate your business standing across 8 critical compliance markers updated for 2024 regulations.",
                "keywords": ["Saudi compliance audit", "ZATCA risk assessment", "withholding tax audit", "SME business risk"]
            },
            "ar": {
                "page_title": "تدقيق مخاطر الالتزام القياسي | تقييم المنشآت السعودية",
                "meta_description": "تدقيق شامل من ٨ أسئلة لتقييم التزام منشأتك مع هيئة الزكاة والضريبة، ضريبة الاستقطاع، واللوائح التشغيلية في السعودية.",
                "h1": "تقييم مخاطر الالتزام (القياسي)",
                "hero_subtitle": "قيم وضع منشأتك عبر ٨ مؤشرات التزام أساسية محدثة وفقًا لأنظمة عام ٢٠٢٤.",
                "keywords": ["تدقيق الالتزام السعودي", "تقييم مخاطر الزكاة", "تدقيق ضريبة الاستقطاع", "مخاطر المنشآت"]
            }
        }
    },

    "result_thresholds": {
        "green": {
            "min_score": 0,
            "max_score": 6,
            "penalty_band": { "min": 0, "max": 10000 },
            "ui": {
                "en": {
                    "status_label": "Status: Healthy Compliance (Green)",
                    "headline": "Your business shows strong alignment with Saudi regulations.",
                    "message_lines": [
                        "You are doing better than most, but maintaining this level requires constant vigilance as ZATCA updates portal requirements.",
                        "Potential exposure for minor clerical errors: SAR 0 - 10,000."
                    ],
                    "primary_cta_label": "Maintain Your Shield with Finume",
                    "primary_cta_subtext": "Let our experts handle the monthly monitoring so you stay in the Green zone permanently."
                },
                "ar": {
                    "status_label": "الحالة: التزام صحي (أخضر)",
                    "headline": "منشأتك تظهر توافقًا قويًا مع الأنظمة السعودية.",
                    "message_lines": [
                        "أنت تقوم بعمل أفضل من الأغلبية، لكن الحفاظ على هذا المستوى يتطلب يقظة مستمرة مع تحديثات متطلبات هيئة الزكاة والضريبة.",
                        "التعرض المحتمل للأخطاء المكتبية البسيطة: ٠ - ١٠٬٠٠٠ ريال سعودي."
                    ],
                    "primary_cta_label": "حافظ على درعك مع فينوم",
                    "primary_cta_subtext": "دع خبراءنا يتولون المراقبة الشهرية لتبقى في المنطقة الخضراء دائمًا."
                }
            }
        },
        "yellow": {
            "min_score": 7,
            "max_score": 18,
            "penalty_band": { "min": 10000, "max": 150000 },
            "ui": {
                "en": {
                    "status_label": "Status: Attention Required (Yellow)",
                    "headline": "Moderate gaps detected in your compliance setup.",
                    "message_lines": [
                        "Your exposure to withholding tax issues or premises registration could lead to unexpected audit flags.",
                        "Estimated risk exposure: SAR 10,000 - 150,000 depending on volume."
                    ],
                    "primary_cta_label": "Fix Gaps Before the Next Audit",
                    "primary_cta_subtext": "Get a detailed breakdown and correction plan with a Finume specialist."
                },
                "ar": {
                    "status_label": "الحالة: انتباه مطلوب (أصفر)",
                    "headline": "تم اكتشاف ثغرات متوسطة في نظام الالتزام الخاص بك.",
                    "message_lines": [
                        "تعرضك لمشاكل ضريبة الاستقطاع أو تسجيل العنوان الوطني قد يؤدي إلى إشارات تدقيق غير متوقعة.",
                        "تقدير التعرض للمخاطر: ١٠٬٠٠٠ - ١٥٠٬٠٠٠ ريال سعودي حسب حجم العمل."
                    ],
                    "primary_cta_label": "عالج الثغرات قبل التدقيق القادم",
                    "primary_cta_subtext": "احصل على تحليل مفصل وخطة تصحيح مع أخصائي من فينوم."
                }
            }
        },
        "red": {
            "min_score": 19,
            "max_score": 32,
            "penalty_band": { "min": 150000, "max": 1000000 },
            "ui": {
                "en": {
                    "status_label": "Status: Critical Risk Zone (Red)",
                    "headline": "High probability of severe regulatory penalties.",
                    "message_lines": [
                        "Your international payment habits and premises setup significantly increase risk of withholding tax violations and system flags.",
                        "Estimated risk exposure: SAR 150,000 - 1,000,000+ in severe cases."
                    ],
                    "primary_cta_label": "Activate Emergency Compliance Shield",
                    "primary_cta_subtext": "Immediate action is needed to restructure your filings and banking before notification."
                },
                "ar": {
                    "status_label": "الحالة: منطقة خطر حرج (أحمر)",
                    "headline": "احتمالية عالية لغرامات تنظيمية شديدة.",
                    "message_lines": [
                        "نمط مدفوعاتك الدولية ووضعية المقر تزيد بشكل كبير من مخاطر مخالفات ضريبة الاستقطاع وإشارات النظام.",
                        "تقدير التعرض للمخاطر: ١٥٠٬٠٠٠ - ١٬٠٠٠٬٠٠٠+ ريال سعودي في الحالات الشديدة."
                    ],
                    "primary_cta_label": "فعّل درع الطوارئ للالتزام",
                    "primary_cta_subtext": "مطلوب اتخاذ إجراء فوري لإعادة هيكلة إقراراتك وحساباتك قبل وصول الإشعار."
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
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "one_internal_employee",
                    "label": {
                        "en": "One internal employee",
                        "ar": "موظف داخلي واحد"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "owner_or_non_specialist",
                    "label": {
                        "en": "The owner / a non‑specialist person",
                        "ar": "صاحب المنشأة / شخص غير متخصص"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
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
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "normal_software_or_excel",
                    "label": {
                        "en": "Using a normal software/Excel/PDF (not sure if compliant)",
                        "ar": "باستخدام برنامج عادي أو إكسل / PDF (ولست متأكدًا من التوافق)"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "paper_or_whatsapp",
                    "label": {
                        "en": "Mostly paper/WhatsApp/manual invoices without a clear system",
                        "ar": "فواتير ورقية أو واتساب / يدويًا بدون نظام واضح"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
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
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "sometimes_late_but_manage",
                    "label": {
                        "en": "Sometimes we remember late but still manage to file",
                        "ar": "أحيانًا نتذكر متأخر لكن نلحق قبل آخر لحظة"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "act_after_sms",
                    "label": {
                        "en": "We usually act only after an SMS or late reminder",
                        "ar": "غالبًا نتحرك فقط بعد رسالة SMS أو إشعار تأخير"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
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
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "mixed_accounts",
                    "label": {
                        "en": "Mix of business and personal accounts",
                        "ar": "خليط بين حساب المنشأة والحسابات الشخصية"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "mostly_personal_accounts",
                    "label": {
                        "en": "Mostly personal accounts used for business",
                        "ar": "أغلب العمليات تتم عبر حسابات شخصية"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
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
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "partial_or_simple",
                    "label": {
                        "en": "We have partial numbers / a simple report from software",
                        "ar": "لدينا أرقام متفرقة / تقرير بسيط من برنامج"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "no_clear_statements",
                    "label": {
                        "en": "No clear statements, we mainly look at bank balance and intuition",
                        "ar": "لا يوجد قوائم واضحة، نعتمد على الرصيد البنكي والشعور العام"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
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
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "once_or_twice",
                    "label": {
                        "en": "Yes, once or twice and resolved",
                        "ar": "نعم، مرة أو مرتين وتم حلها"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "multiple_or_unknown",
                    "label": {
                        "en": "Yes, multiple times / I don’t remember how many",
                        "ar": "نعم، أكثر من مرة أو لا أتذكر عددها"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
                }
            ]
        },
        {
            "id": "physical_premises",
            "type": "single_choice",
            "order": 7,
            "required": true,
            "category": "PREMISES",
            "label": {
                "en": "Which option best describes your current business location?",
                "ar": "أي خيار يصف وضع موقع منشأتك الحالي بشكل أفضل؟"
            },
            "options": [
                {
                    "value": "official_premises_with_address",
                    "label": {
                        "en": "We have an official business premises with a registered national address",
                        "ar": "لدينا مقر رسمي للمنشأة ومسجل عليه عنوان وطني"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "shared_or_flexible_space",
                    "label": {
                        "en": "We operate from a shared/flexible space and sometimes use a different address for paperwork",
                        "ar": "نعمل من مساحة مشتركة / مرنة وأحيانًا نستخدم عنوانًا مختلفًا في الأوراق"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "home_or_unregistered_location",
                    "label": {
                        "en": "We mainly operate from home or an informal location not clearly registered",
                        "ar": "نحن نعمل بشكل أساسي من المنزل أو موقع غير موثق بوضوح"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
                }
            ]
        },
        {
            "id": "international_transactions",
            "type": "single_choice",
            "order": 8,
            "required": true,
            "category": "WITHHOLDING_TAX",
            "label": {
                "en": "Which statement best matches your international payments to suppliers/freelancers outside Saudi Arabia?",
                "ar": "أي من التالي يصف تعاملاتك المالية مع موردين أو مستقلين خارج السعودية؟"
            },
            "options": [
                {
                    "value": "no_international_payments",
                    "label": {
                        "en": "We do not make any regular payments to suppliers or freelancers outside Saudi Arabia",
                        "ar": "لا نقوم بأي مدفوعات منتظمة لموردين أو مستقلين خارج السعودية"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 0 }]
                },
                {
                    "value": "some_online_services",
                    "label": {
                        "en": "We pay for some online tools/services (e.g. software subscriptions) outside Saudi Arabia",
                        "ar": "ندفع لبعض الخدمات والأدوات عبر الإنترنت (مثل اشتراكات برامج) خارج السعودية"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 2 }]
                },
                {
                    "value": "regular_foreign_suppliers_or_freelancers",
                    "label": {
                        "en": "We regularly pay foreign suppliers or freelancers by bank transfer or card",
                        "ar": "ندفع بانتظام لموردين أو مستقلين أجانب عن طريق التحويل البنكي أو البطاقات"
                    },
                    "score_delta_rules": [{ "condition": { "always": true }, "points": 4 }]
                }
            ]
        }
    ]
};
