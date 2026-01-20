export const behaviorRiskCalculatorConfig = {
    "calculator_id": "finume_compliance_behavior_risk_calculator_v1",
    "version": "1.0.0",
    "language_support": ["en", "ar"],
    "meta": {
        "seo": {
            "en": {
                "page_title": "Saudi SME Compliance Risk Checker | ZATCA, VAT, Zakat & Qawaem",
                "meta_description": "Simple compliance risk checker for Saudi SMEs. In 60 seconds, see if your business is compliant with ZATCA, VAT, Zakat, e-invoicing and Qawaem without technical jargon.",
                "h1": "Simple Compliance Risk Check for Saudi SMEs",
                "hero_subtitle": "Answer a few plain-language questions about how you sell, bank and file – and get an instant view of your potential fine exposure.",
                "keywords": [
                    "Saudi SME compliance",
                    "ZATCA VAT e-invoicing checker",
                    "Zakat Qawaem compliance tool",
                    "Tasattur risk for small business",
                    "Saudi Arabia tax compliance calculator"
                ]
            },
            "ar": {
                "page_title": "فحص مخاطر الالتزام للمنشآت السعودية | الزكاة والضريبة والفاتورة الإلكترونية والقوائم",
                "meta_description": "أداة سهلة لأصحاب المنشآت الصغيرة والمتوسطة في السعودية لفحص مخاطر الغرامات مع هيئة الزكاة والضريبة والقوائم خلال ٦٠ ثانية، بدون مصطلحات محاسبية معقدة.",
                "h1": "فحص بسيط لمخاطر الالتزام على منشأتك",
                "hero_subtitle": "جاوب على أسئلة سهلة عن طريقة البيع، والحساب البنكي، وتقديم الإقرارات – واحصل على نظرة فورية عن مستوى خطر الغرامات.",
                "keywords": [
                    "التزام المنشآت الصغيرة والمتوسطة",
                    "حاسبة غرامات هيئة الزكاة والضريبة",
                    "فحص التزام الفاتورة الإلكترونية",
                    "أداة القوائم المالية",
                    "مخاطر التستر التجاري للمنشآت الصغيرة"
                ]
            }
        }
    },
    "result_thresholds": {
        "green": {
            "min_score": 0,
            "max_score": 5,
            "penalty_band": { "min": 0, "max": 5000 },
            "ui": {
                "en": {
                    "status_label": "Status: Low Compliance Risk (Green)",
                    "headline": "Your behavior looks mostly compliant.",
                    "message_lines": [
                        "Your answers suggest that your daily behavior around sales, bank accounts and filings is broadly aligned with Saudi compliance expectations.",
                        "Estimated penalty exposure from behavior-related issues: between SAR 0 and SAR 5,000 in normal cases."
                    ],
                    "primary_cta_label": "Keep Your Green Status with Finume",
                    "primary_cta_subtext": "Protect your ZATCA, Zakat and Qawaem status with a dedicated Finume accountant starting from SAR 500/month."
                },
                "ar": {
                    "status_label": "الحالة: مخاطر التزام منخفضة (أخضر)",
                    "headline": "سلوك منشأتك يبدو في الغالب متوافقًا.",
                    "message_lines": [
                        "إجاباتك توضح أن سلوكك اليومي في المبيعات والحسابات البنكية وتقديم الإقرارات قريب من متطلبات الالتزام في السعودية.",
                        "قيمة الغرامات المتوقعة من سلوكيات التشغيل فقط: بين ٠ و٥٬٠٠٠ ريال سعودي في الحالات العادية."
                    ],
                    "primary_cta_label": "حافظ على وضعك الأخضر مع فينوم",
                    "primary_cta_subtext": "احمِ وضعك لدى هيئة الزكاة والضريبة والقوائم مع محاسب مخصص من فينوم ابتداءً من ٥٠٠ ريال شهريًا."
                }
            }
        },
        "yellow": {
            "min_score": 6,
            "max_score": 14,
            "penalty_band": { "min": 5000, "max": 75000 },
            "ui": {
                "en": {
                    "status_label": "Status: Medium Compliance Risk (Yellow)",
                    "headline": "Your current behavior puts you at risk.",
                    "message_lines": [
                        "Your answers show behavior patterns that often lead to ZATCA, Zakat or Qawaem queries and surprise assessments for Saudi SMEs.",
                        "Estimated penalty exposure from behavior-related issues: between SAR 5,000 and SAR 75,000 if not corrected."
                    ],
                    "primary_cta_label": "Fix Your Risky Habits with Finume",
                    "primary_cta_subtext": "Let a Finume expert redesign your VAT, Zakat and banking workflows so your business moves from Yellow to Green safely."
                },
                "ar": {
                    "status_label": "الحالة: مخاطر التزام متوسطة (أصفر)",
                    "headline": "بعض سلوكيات منشأتك قد تضعك في منطقة الخطر.",
                    "message_lines": [
                        "إجاباتك توضح وجود أنماط تشغيل وسداد غالبًا ما تؤدي إلى استفسارات وغرامات من هيئة الزكاة والضريبة أو القوائم للمنشآت السعودية.",
                        "قيمة الغرامات المتوقعة من هذه السلوكيات: بين ٥٬٠٠٠ و٧٥٬٠٠٠ ريال سعودي إذا لم يتم تعديلها."
                    ],
                    "primary_cta_label": "عدّل سلوك المخاطر مع فينوم",
                    "primary_cta_subtext": "دع خبيرًا من فينوم يعيد تصميم تدفق ضريبة القيمة المضافة والزكاة والحسابات البنكية لينتقل نشاطك من أصفر إلى أخضر بأمان."
                }
            }
        },
        "red": {
            "min_score": 15,
            "max_score": 999,
            "penalty_band": { "min": 75000, "max": 500000 },
            "ui": {
                "en": {
                    "status_label": "Status: High Compliance Risk (Red)",
                    "headline": "Your current behavior signals high risk.",
                    "message_lines": [
                        "Your answers indicate behavior patterns that are commonly associated with Tasattur risk, hidden cash sales or weak documentation for Saudi SMEs.",
                        "Estimated penalty exposure from behavior-related issues: between SAR 75,000 and SAR 500,000+ in severe cases."
                    ],
                    "primary_cta_label": "Get a Compliance Shield with Finume",
                    "primary_cta_subtext": "Start a Finume \"Fine Protection\" plan to clean up your behavior, fix documentation gaps and reduce your exposure before any audit."
                },
                "ar": {
                    "status_label": "الحالة: مخاطر التزام مرتفعة (أحمر)",
                    "headline": "سلوك منشأتك الحالي يشير إلى مستوى خطر مرتفع.",
                    "message_lines": [
                        "إجاباتك تشير إلى أنماط تشغيل ترتبط غالبًا بمخاطر تستر، مبيعات نقدية غير موثقة أو ضعف في المستندات للمنشآت السعودية.",
                        "قيمة الغرامات المتوقعة من هذه السلوكيات: بين ٧٥٬٠٠٠ و٥٠٠٬٠٠٠+ ريال سعودي في الحالات الشديدة."
                    ],
                    "primary_cta_label": "ركّب درع التزام مع فينوم",
                    "primary_cta_subtext": "ابدأ باقة \"حماية الغرامات\" من فينوم لتصحيح السلوكيات، وسد فجوات المستندات، وتقليل تعرضك قبل أي فحص أو تدقيق."
                }
            }
        }
    },
    "questions": [
        {
            "id": "sales_collection_method",
            "type": "single_choice",
            "order": 1,
            "required": true,
            "category": "BEHAVIOR_SALES",
            "label": {
                "en": "How do you receive most of your sales payments?",
                "ar": "كيف تستلم أغلب مبيعات منشأتك؟"
            },
            "help_text": {
                "en": "This helps us understand your mix of cash vs electronic sales, which is important for ZATCA and Tasattur risk.",
                "ar": "هذا السؤال يساعدنا نفهم نسبة المبيعات الكاش مقابل الإلكترونية، وهو عامل مهم في تقييم مخاطر الزكاة والضريبة والتستر."
            },
            "options": [
                {
                    "value": "mostly_electronic",
                    "label": {
                        "en": "Almost all via Mada / cards / bank transfers",
                        "ar": "تقريبًا كل المبيعات عبر مدى / البطاقات / التحويلات البنكية"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "mixed",
                    "label": {
                        "en": "Mix of cash and bank transfers",
                        "ar": "خليط بين كاش وتحويلات بنكية"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "mostly_cash",
                    "label": {
                        "en": "Mostly cash, not regularly deposited into the business bank account",
                        "ar": "أغلب المبيعات كاش ولا يتم إيداعها بشكل منتظم في حساب المنشأة البنكي"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 5 }
                    ]
                }
            ]
        },
        {
            "id": "business_bank_account_usage",
            "type": "single_choice",
            "order": 2,
            "required": true,
            "category": "BEHAVIOR_BANK",
            "label": {
                "en": "Do you use a business bank account (under your CR) for all income and expenses?",
                "ar": "هل تستخدم حسابًا بنكيًا باسم المنشأة (السجل التجاري) لكل الإيرادات والمصروفات؟"
            },
            "help_text": {
                "en": "Using personal accounts for business can increase Tasattur and financing risks.",
                "ar": "استخدام الحسابات الشخصية في نشاط المنشأة يزيد من مخاطر التستر ورفض التمويل."
            },
            "options": [
                {
                    "value": "only_business_account",
                    "label": {
                        "en": "Yes, we only use the business bank account",
                        "ar": "نعم، نستخدم فقط حساب المنشأة البنكي"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "sometimes_personal",
                    "label": {
                        "en": "We sometimes use a personal account",
                        "ar": "أحيانًا نستخدم حسابًا شخصيًا"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 3 }
                    ]
                },
                {
                    "value": "mostly_personal",
                    "label": {
                        "en": "Mostly personal accounts for business activity",
                        "ar": "أغلب التعاملات تتم عبر حسابات شخصية"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 6 }
                    ]
                }
            ]
        },
        {
            "id": "ownership_matches_cr",
            "type": "single_choice",
            "order": 3,
            "required": true,
            "category": "CORPORATE",
            "label": {
                "en": "Is the real ownership of the business exactly the same as in the CR and Articles of Association?",
                "ar": "هل ملكية الشركاء في الواقع مطابقة لما هو مكتوب في السجل التجاري وعقد التأسيس؟"
            },
            "help_text": {
                "en": "Hidden partners or outdated contracts can create Tasattur and compliance issues.",
                "ar": "الشركاء غير المعلنين أو العقود غير المحدثة قد تخلق مخاطر تستر ومشاكل التزام."
            },
            "options": [
                {
                    "value": "fully_matched",
                    "label": {
                        "en": "Yes, everything is updated and matched",
                        "ar": "نعم، كل شيء محدث ومطابق"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "changes_not_updated",
                    "label": {
                        "en": "Some ownership changes happened and are not fully updated",
                        "ar": "حدثت تغييرات في الشركاء ولم يتم تحديث كل شيء"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                },
                {
                    "value": "not_sure",
                    "label": {
                        "en": "Not sure / external office handles this",
                        "ar": "لست متأكدًا / مكتب خارجي يتولى الموضوع"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 3 }
                    ]
                }
            ]
        },
        {
            "id": "decision_documentation",
            "type": "single_choice",
            "order": 4,
            "required": true,
            "category": "CORPORATE",
            "label": {
                "en": "Do you document important business decisions (dividends, loans, big assets) in any formal way?",
                "ar": "هل توثّق أي قرارات مهمة للمنشأة (توزيعات، قروض، شراء أصول كبيرة) بأي طريقة رسمية؟"
            },
            "help_text": {
                "en": "Simple documentation helps with auditors, banks and partner disputes.",
                "ar": "توثيق بسيط للقرارات يساعد مع المدققين والبنوك وحل خلافات الشركاء."
            },
            "options": [
                {
                    "value": "mostly_documented",
                    "label": {
                        "en": "Yes, always or most of the time (minutes, email, etc.)",
                        "ar": "نعم، دائمًا أو في الغالب (محضر، إيميل، إلخ)"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "sometimes",
                    "label": {
                        "en": "Sometimes documented, sometimes verbal only",
                        "ar": "أحيانًا نوثّق وأحيانًا يكون كل شيء شفهيًا"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "rarely_documented",
                    "label": {
                        "en": "No, most decisions are only verbal",
                        "ar": "لا، أغلب القرارات تتم شفهيًا فقط"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },
        {
            "id": "zakat_calc_method",
            "type": "single_choice",
            "order": 5,
            "required": true,
            "category": "ZAKAT_METHOD",
            "label": {
                "en": "How are Zakat and tax currently calculated for your business?",
                "ar": "كيف تُحسب الزكاة والضريبة لمنشأتك حاليًا؟"
            },
            "help_text": {
                "en": "This separates businesses using full accounting from those relying on rough estimates.",
                "ar": "هذا السؤال يميز بين المنشآت التي تعتمد على بيانات محاسبية كاملة وتلك التي تعتمد على تقديرات تقريبية."
            },
            "options": [
                {
                    "value": "full_records",
                    "label": {
                        "en": "Based on full accounting records (balance sheet and income statement)",
                        "ar": "بناءً على بيانات محاسبية كاملة (ميزانية وقائمة دخل)"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "mix_real_estimates",
                    "label": {
                        "en": "Mix of real numbers and rough estimates",
                        "ar": "خليط بين أرقام فعلية وتقديرات تقريبية"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                },
                {
                    "value": "mostly_estimates",
                    "label": {
                        "en": "Mostly estimates without regular accounting records",
                        "ar": "تعتمد بالأساس على تقديرات بدون سجلات محاسبية منتظمة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 7 }
                    ]
                }
            ]
        },
        {
            "id": "who_handles_filings",
            "type": "single_choice",
            "order": 6,
            "required": true,
            "category": "RESPONSIBILITY",
            "label": {
                "en": "Who is currently handling your tax and financial filings?",
                "ar": "من يتولى إعداد الإقرارات والتقارير المالية حاليًا؟"
            },
            "help_text": {
                "en": "Single-person or owner-only setups usually carry higher error and fine risk.",
                "ar": "الاعتماد على شخص واحد أو صاحب المنشأة فقط غالبًا يزيد خطر الأخطاء والغرامات."
            },
            "options": [
                {
                    "value": "external_firm",
                    "label": {
                        "en": "External accountant or firm with a formal agreement",
                        "ar": "مكتب أو محاسب خارجي بعقد رسمي"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "one_internal_employee",
                    "label": {
                        "en": "One internal employee only",
                        "ar": "موظف داخلي واحد فقط"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "owner_or_friend",
                    "label": {
                        "en": "Owner alone / friend helping occasionally",
                        "ar": "صاحب المنشأة لوحده / صديق يساعد أحيانًا"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },
        {
            "id": "gov_visits_last_2_years",
            "type": "single_choice",
            "order": 7,
            "required": true,
            "category": "GOV_INTERACTION",
            "label": {
                "en": "In the last 2 years, has any authority (ZATCA, MOC, GOSI) visited or contacted you about your data?",
                "ar": "خلال آخر سنتين، هل زارت منشأتك أي جهة رقابية (هيئة الزكاة والضريبة، وزارة التجارة، التأمينات) أو تواصلت معك بخصوص بياناتك؟"
            },
            "options": [
                {
                    "value": "no",
                    "label": {
                        "en": "No, never",
                        "ar": "لا، لم يحدث"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "yes_resolved",
                    "label": {
                        "en": "Yes, and it was resolved without major issues",
                        "ar": "نعم، وتم إنهاء الموضوع بدون ملاحظات كبيرة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "yes_pending_or_unclear",
                    "label": {
                        "en": "Yes, and some requests are still unclear or pending",
                        "ar": "نعم، وما زالت بعض الطلبات أو الاستفسارات غير واضحة أو تحت المتابعة"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 4 }
                    ]
                }
            ]
        },
        {
            "id": "past_penalties",
            "type": "single_choice",
            "order": 8,
            "required": true,
            "category": "HISTORY",
            "label": {
                "en": "Have you previously had any tax/Zakat penalties that you paid or settled?",
                "ar": "هل سبق وتم فرض غرامات زكوية أو ضريبية على منشأتك قمت بدفعها أو تسويتها؟"
            },
            "options": [
                {
                    "value": "never",
                    "label": {
                        "en": "No, never had any penalties",
                        "ar": "لا، لم أتعرض لأي غرامات حتى الآن"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 0 }
                    ]
                },
                {
                    "value": "once_resolved",
                    "label": {
                        "en": "Yes, once and it was resolved",
                        "ar": "نعم، مرة واحدة وتم إغلاق الموضوع"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 2 }
                    ]
                },
                {
                    "value": "multiple_or_unclear",
                    "label": {
                        "en": "Yes, multiple times / I don’t clearly remember the details",
                        "ar": "نعم، أكثر من مرة / لا أتذكر التفاصيل بالضبط"
                    },
                    "score_delta_rules": [
                        { "condition": { "always": true }, "points": 5 }
                    ]
                }
            ]
        }
    ]
};
