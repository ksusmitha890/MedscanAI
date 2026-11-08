/**
 * Comprehensive Clinical Medicine Knowledge Base
 * Detailed pharmacology:
 * - How to Use, When to Take, Why to Take
 * - Uses (e.g. Fever, Pain Relief)
 * - Suitability for: Adults, Children, Senior Citizens
 * - How Much Drug (Max Limits, Overdose Threshold)
 * - If Any Problems (Common & Serious Side Effects)
 * - When to Contact Doctor (Emergency Red Flags)
 * - Expiry Date & Batch Details
 * - Voice Announcement Script
 * - Similar Medicines & Generic Alternatives
 */

const MEDICINE_DATABASE = [
  {
    id: "paracetamol-650",
    name: "Paracetamol / Acetaminophen",
    brandNames: ["Dolo 650", "Crocin 650", "Calpol 650", "Tylenol", "Panadol"],
    genericName: "Acetaminophen / Paracetamol",
    category: "Analgesics & Antipyretics (Fever & Pain)",
    strength: "650 mg",
    dosageForm: "Oral Tablet",
    therapeuticClass: "Non-opioid Central Analgesic and Antipyretic",
    
    // Manufacturing & Expiry
    batchNo: "B.No: DLO-650-8824",
    mfgDate: "03/2026",
    expiryDate: "02/2029",
    expiryStatus: "SAFE_AND_VALID",
    monthsRemaining: 27,

    // Core Pillars:
    howToUse: "Swallow the tablet whole with a full glass of water (approx. 200 ml). It can be taken on an empty stomach or with/after meals (taking after meals is gentler if you have acid sensitivity). Maintain a strict gap of at least 4 to 6 hours between doses. Do NOT crush, split, or chew extended-action tablets. Never take two tablets at once to make up for a missed dose.",
    whenToTake: "Take as needed (SOS / PRN) when body temperature exceeds 100°F (37.8°C) or upon onset of headache, migraine, body ache, or muscle soreness. Allow at least 4-6 hours before considering another dose.",
    whyToTake: "Prescribed to reduce high fever (antipyretic action) by resetting the hypothalamic heat-regulating center in the brain, and to relieve mild to moderate pain (analgesic action) by inhibiting prostaglandin synthesis in the central nervous system.",

    // Specific Uses / Indications:
    indications: [
      "High body temperature and fever in viral infections (influenza, dengue, common cold, Covid-19)",
      "Headache, tension migraine, toothache, and post-vaccination fever",
      "Backache, osteoarthritis stiffness, and muscular pain/sprains",
      "Mild to moderate postoperative or menstrual pain"
    ],

    // Suitability for Adults, Children, Senior Citizens (Explicit User Requirement):
    suitability: {
      adults: {
        status: "SAFE & FIRST-LINE",
        badge: "Highly Safe",
        dosage: "650 mg per dose every 4 to 6 hours as needed.",
        maxDaily: "Maximum 4,000 mg (4 grams or 6 tablets of 650mg) in 24 hours.",
        notes: "Well-tolerated by healthy adults with normal liver and kidney function. Never combine with other cold/cough syrups containing paracetamol."
      },
      children: {
        status: "SAFE WITH PEDIATRIC SYRUP / DROPS ONLY",
        badge: "Caution / Weight-Based",
        dosage: "10 to 15 mg per kg body weight per dose, every 4 to 6 hours. Maximum 4 doses per day.",
        maxDaily: "Maximum 60 mg/kg in 24 hours. Never give adult 650mg tablets to children below 12 years.",
        notes: "Strictly use calibrated pediatric measuring spoons or syringes with pediatrician-prescribed oral suspension (e.g. Calpol 120mg/5ml or 250mg/5ml)."
      },
      citizens: {
        status: "SAFE WITH LOWERED / ADJUSTED DOSAGE",
        badge: "Adjusted Dosage",
        dosage: "500 mg every 6 to 8 hours as needed.",
        maxDaily: "Reduced daily ceiling of 2,000 mg to 3,000 mg per 24 hours.",
        notes: "Senior citizens often exhibit reduced hepatic blood flow and diminished renal clearance. Frequent high doses increase hepatotoxicity risk. Monitor liver enzymes if taken long-term."
      }
    },

    // How Much Drug (Limits & Overdose Threshold):
    howMuchDrug: {
      singleDose: "650 mg (1 tablet)",
      minInterval: "4 to 6 hours between doses",
      maxDailyAdult: "4,000 mg (4 grams in 24 hours)",
      maxDailyElderly: "2,000 mg - 3,000 mg in 24 hours",
      overdoseWarning: "CRITICAL: Consuming more than 4,000 mg in 24 hours can deplete hepatic glutathione and cause acute liver failure (hepatic necrosis). Seek emergency care immediately if overdose occurs.",
      dangerThresholdMg: 4000
    },

    // Problems (Side Effects & Adverse Reactions):
    problems: {
      common: [
        "Mild nausea or stomach discomfort (rare if taken with water/food)",
        "Mild drowsiness or slight headache",
        "Generally very well-tolerated at therapeutic dosages"
      ],
      serious: [
        "Acute liver toxicity / hepatotoxicity (especially if overdosed or combined with alcohol)",
        "Severe allergic reaction / Angioedema (swelling of lips, tongue, throat, face)",
        "Stevens-Johnson syndrome (SJS) / Toxic Epidermal Necrolysis (rare life-threatening skin blistering and peeling)",
        "Bronchospasm in aspirin-sensitive asthma patients"
      ]
    },

    // When to Contact Doctor (Emergency Red Flags):
    whenToContactDoctor: [
      "Fever remains above 102°F (38.9°C) or lasts more than 3 consecutive days without improvement",
      "Severe allergic reaction: difficulty breathing, wheezing, swelling of face, lips, tongue, or throat",
      "Signs of liver distress: yellowing of skin or whites of eyes (jaundice), severe upper right abdominal pain, tea-colored dark urine, extreme persistent nausea",
      "Suspected accidental double-dose or consumption beyond 4,000 mg in a single 24-hour period",
      "Development of an unexplained red skin rash, blistering, or peeling skin"
    ],

    // Similar Medicines / Generic Alternatives:
    similarMedicines: [
      { name: "Generic Paracetamol 650mg", type: "Identical Generic Molecule", approxPrice: "75% Cheaper", maker: "Generic Formulations" },
      { name: "Crocin 650 / Calpol 650", type: "Popular Brand Equivalent", approxPrice: "Equal", maker: "GSK" },
      { name: "Ibuprofen 400mg", type: "Anti-Inflammatory Alternative", approxPrice: "Comparable (Take with food)", maker: "Abbott" },
      { name: "Mefenamic Acid (Meftal)", type: "Alternative for Spasmodic / Period Pain", approxPrice: "Similar", maker: "Blue Cross" }
    ],

    sideEffects: {
      common: ["Mild nausea", "Mild drowsiness"],
      serious: ["Acute liver damage in overdose", "Severe allergic skin blisters (rare)"]
    },
    contraindications: [
      "Severe active liver disease or acute hepatic failure",
      "Known hypersensitivity/allergy to paracetamol"
    ],
    foodInteractions: [
      "STRICT WARNING: Do NOT drink alcohol while taking Paracetamol as it multiplies liver toxicity risk."
    ],
    drugInteractions: [
      { drug: "Alcohol", severity: "High", risk: "Compounded acute liver damage and toxic metabolite accumulation." },
      { drug: "Other Paracetamol Products (Cough/Cold Syrups)", severity: "Severe", risk: "Accidental double-dosing leading to toxic overdose." },
      { drug: "Warfarin", severity: "Moderate", risk: "Prolonged high-dose use may enhance anticoagulant effect and bleeding risk." }
    ],
    allergyWarningFamily: "Acetaminophen",
    pregnancyCategory: "Category B (Safest first-line fever & pain reliever during pregnancy under medical guidance)",
    storage: "Store below 25°C away from excessive moisture, heat, and direct sunlight. Keep out of reach of children.",

    // Text for Voice Announcement:
    voiceAnnouncement: "Medication Voice Advisory for Paracetamol 650 milligrams. Primary uses: High fever reduction and relief of mild to moderate pain, headaches, toothaches, and body soreness. How to use: Swallow whole with water every 4 to 6 hours as needed. Suitability: Safe for adults up to 4,000 milligrams daily. For children, use pediatric syrup only based on body weight. For senior citizens, limit to 2,000 to 3,000 milligrams daily with liver monitoring. Warning: Never exceed 4,000 milligrams in 24 hours, and strictly avoid alcohol to prevent liver damage. Contact a doctor immediately if fever lasts more than 3 days, or if swelling and breathing difficulty occur."
  },
  {
    id: "amoxicillin-500",
    name: "Amoxicillin",
    brandNames: ["Amoxil", "Mox 500", "Novamox", "Amoclav"],
    genericName: "Amoxicillin Trihydrate",
    category: "Antibiotics / Penicillins",
    strength: "500 mg",
    dosageForm: "Oral Capsule",
    therapeuticClass: "Beta-lactam Broad Spectrum Antibiotic",

    batchNo: "B.No: AMX-2481-9",
    mfgDate: "03/2026",
    expiryDate: "02/2029",
    expiryStatus: "SAFE_AND_VALID",
    monthsRemaining: 27,

    howToUse: "Swallow the capsule whole with a full glass of water. Do not open, crush, or chew. Can be taken with or without meals (taking with food helps prevent stomach upset). Drink plenty of water throughout the day. Finish the ENTIRE prescribed 5-to-7-day course even if you feel completely healthy.",
    whenToTake: "Take every 8 hours (or twice daily every 12 hours as prescribed), spaced evenly throughout the 24-hour cycle.",
    whyToTake: "Prescribed to eradicate bacterial infections of the respiratory tract, throat, ear, urinary tract, and skin by breaking down bacterial cell wall synthesis.",

    indications: [
      "Bacterial infections of the ear, nose, and throat (ENT / Tonsillitis / Sinusitis)",
      "Lower respiratory tract infections (Bronchitis, Bacterial Pneumonia)",
      "Urinary tract infections (UTIs) and dental abscesses",
      "Skin and soft tissue bacterial infections"
    ],

    suitability: {
      adults: {
        status: "STANDARD PRESCRIPTION COURSE",
        badge: "Standard Adult",
        dosage: "500 mg every 8 hours, or 875 mg every 12 hours depending on infection severity.",
        maxDaily: "Maximum 3,000 mg in 24 hours under clinical supervision.",
        notes: "Strictly complete full antibacterial course to prevent antimicrobial resistance."
      },
      children: {
        status: "PEDIATRIC SUSPENSION ONLY",
        badge: "Weight-Based Dosing",
        dosage: "25 to 45 mg/kg/day divided into 2 or 3 doses. Consult pediatrician.",
        maxDaily: "Weight-calculated ceiling.",
        notes: "Shake suspension bottle thoroughly before each dose. Refrigerate if indicated."
      },
      citizens: {
        status: "SAFE WITH RENAL FUNCTION MONITORING",
        badge: "Renal Check Needed",
        dosage: "500 mg every 12 hours if kidney clearance (eGFR) is moderately reduced.",
        maxDaily: "1,500 mg - 2,000 mg per 24 hours.",
        notes: "Kidney elimination slows with age; dosage interval may need lengthening."
      }
    },

    howMuchDrug: {
      singleDose: "500 mg (1 capsule)",
      minInterval: "8 hours between doses",
      maxDailyAdult: "3,000 mg in 24 hours",
      maxDailyElderly: "1,500 mg - 2,000 mg in 24 hours",
      overdoseWarning: "Overdose causes gastrointestinal distress, vomiting, diarrhea, and potential crystalluria / kidney irritation.",
      dangerThresholdMg: 3000
    },

    problems: {
      common: [
        "Mild diarrhea, soft stools, or stomach cramps",
        "Nausea or mild vomiting",
        "Mild skin rash or candidiasis (oral thrush)"
      ],
      serious: [
        "Severe anaphylaxis (wheezing, throat closure, facial swelling) in penicillin-allergic patients",
        "Clostridioides difficile severe watery diarrhea and colitis",
        "Dark urine or jaundice (cholestatic hepatitis)"
      ]
    },

    whenToContactDoctor: [
      "Signs of allergic reaction: hives, difficulty breathing, throat tightness, or swelling of lips/tongue",
      "Severe persistent watery diarrhea with abdominal cramping and high fever",
      "Infection symptoms do not improve after 48 to 72 hours of treatment",
      "Yellowing of skin or eyes, or sudden severe joint pain"
    ],

    similarMedicines: [
      { name: "Generic Amoxicillin 500mg", type: "Identical Generic Salt", approxPrice: "70% Cheaper", maker: "Generic Pharma" },
      { name: "Mox 500 / Novamox", type: "Branded Equivalent", approxPrice: "Comparable", maker: "Sun / Cipla" },
      { name: "Augmentin (Amoxicillin + Clavulanic Acid)", type: "Potentiated Alternative", approxPrice: "Enhanced Resistance Coverage", maker: "GSK" },
      { name: "Azithromycin 500mg", type: "Non-Penicillin Alternative (for allergic patients)", approxPrice: "Similar", maker: "Macrolide Class" }
    ],

    sideEffects: {
      common: ["Mild nausea", "Diarrhea", "Vomiting", "Stomach upset"],
      serious: ["Anaphylaxis (swelling of face/tongue)", "C. difficile severe diarrhea", "Jaundice"]
    },
    contraindications: [
      "Known allergy or hypersensitivity to Penicillins or Cephalosporins",
      "History of amoxicillin-associated cholestatic jaundice",
      "Infectious mononucleosis (high risk of erythematous rash)"
    ],
    foodInteractions: [
      "Can be taken with meals if stomach upset occurs. Drink plenty of water."
    ],
    drugInteractions: [
      { drug: "Methotrexate", severity: "High", risk: "Decreases methotrexate renal clearance, increasing toxicity." },
      { drug: "Warfarin", severity: "Moderate", risk: "May prolong prothrombin time and increase bleeding." }
    ],
    allergyWarningFamily: "Penicillin",
    pregnancyCategory: "Category B",
    storage: "Store below 25°C away from moisture, heat, and direct sunlight.",

    voiceAnnouncement: "Medication Voice Advisory for Amoxicillin 500 milligrams. Primary uses: Broad-spectrum antibiotic for bacterial ear, nose, throat, chest, and urinary tract infections. How to use: Take every 8 hours with water and finish the complete prescribed course. Suitability: Standard adult dosage is 500 milligrams every 8 hours. Children require weight-based pediatric syrup. Elderly patients need renal function checks. Warning: Do NOT take if you are allergic to penicillin. Contact doctor immediately if you develop breathing difficulty, facial swelling, or severe diarrhea."
  },
  {
    id: "metformin-500",
    name: "Metformin Hydrochloride",
    brandNames: ["Glucophage", "Glycomet-SR 500", "Fortamet", "Obimet"],
    genericName: "Metformin Hydrochloride",
    category: "Antidiabetic / Biguanides",
    strength: "500 mg (Extended Release)",
    dosageForm: "Oral Tablet",
    therapeuticClass: "Biguanide Hypoglycemic Agent",

    batchNo: "B.No: MET-500-4412",
    mfgDate: "01/2026",
    expiryDate: "12/2028",
    expiryStatus: "SAFE_AND_VALID",
    monthsRemaining: 25,

    howToUse: "Swallow the tablet whole with a glass of water. Strictly take WITH meals or immediately after eating to prevent stomach discomfort and nausea. Do NOT crush, split, or chew extended-release (ER) tablets.",
    whenToTake: "Take once or twice daily with breakfast and/or dinner at the same time every day.",
    whyToTake: "Prescribed to control blood sugar in Type 2 Diabetes by reducing liver glucose production, reducing intestinal glucose absorption, and increasing insulin sensitivity.",

    indications: [
      "Type 2 Diabetes Mellitus glycemic management and blood sugar control",
      "Prediabetes progression prevention in high-risk patients",
      "Polycystic Ovary Syndrome (PCOS) insulin resistance management"
    ],

    suitability: {
      adults: {
        status: "FIRST-LINE ANTIDIABETIC",
        badge: "Gold Standard",
        dosage: "Starting dose 500 mg once or twice daily with meals. May be titrated up to 2,000 mg/day by doctor.",
        maxDaily: "Maximum 2,550 mg/day in divided doses.",
        notes: "Does not cause hypoglycemia when used alone."
      },
      children: {
        status: "FOR ADOLESCENTS 10+ YEARS",
        badge: "Specialist Prescribed",
        dosage: "500 mg once daily with food under pediatric endocrinologist guidance.",
        maxDaily: "Maximum 2,000 mg/day.",
        notes: "Approved for pediatric type 2 diabetes aged 10 years and above."
      },
      citizens: {
        status: "CAUTION WITH KIDNEY FILTRATION (eGFR)",
        badge: "eGFR Monitoring Required",
        dosage: "Starting 500 mg daily; contraindicated if eGFR is below 30 mL/min.",
        maxDaily: "Limit to 1,000 mg/day if eGFR is 30-44 mL/min.",
        notes: "Elevated risk of lactic acidosis in elderly with impaired renal clearance."
      }
    },

    howMuchDrug: {
      singleDose: "500 mg - 1,000 mg",
      minInterval: "With morning/evening meals",
      maxDailyAdult: "2,000 mg - 2,550 mg in 24 hours",
      maxDailyElderly: "1,000 mg in 24 hours (based on eGFR)",
      overdoseWarning: "Severe hypoglycemia (if combined with sulfonylureas) and life-threatening Lactic Acidosis.",
      dangerThresholdMg: 2550
    },

    problems: {
      common: [
        "Diarrhea, loose stools, gas, and abdominal bloating",
        "Nausea, vomiting, and loss of appetite",
        "Metallic taste in mouth"
      ],
      serious: [
        "Lactic Acidosis (extreme emergency: deep rapid breathing, severe muscle cramps, extreme tiredness, slow heartbeat)",
        "Vitamin B12 deficiency on long-term treatment"
      ]
    },

    whenToContactDoctor: [
      "Symptoms of Lactic Acidosis: unusual muscle pain, severe trouble breathing, extreme weakness, dizziness, or vomiting",
      "Frequent or severe low blood sugar symptoms (shakiness, cold sweat, rapid heartbeat, confusion)",
      "Planned surgery or diagnostic CT scan with iodinated contrast dye (must pause metformin 48 hours prior)",
      "Severe persistent diarrhea or inability to keep fluids down"
    ],

    similarMedicines: [
      { name: "Generic Metformin 500mg ER", type: "Identical Generic Salt", approxPrice: "80% Cheaper", maker: "Generic Labs" },
      { name: "Glycomet-SR 500", type: "Brand Equivalent", approxPrice: "Standard", maker: "USV" },
      { name: "Empagliflozin (Jardiance)", type: "Alternative SGLT-2 Class", approxPrice: "Higher (Cardioprotective)", maker: "Boehringer" },
      { name: "Sitagliptin (Januvia)", type: "Alternative DPP-4 Class", approxPrice: "Higher (Weight-neutral)", maker: "MSD" }
    ],

    sideEffects: {
      common: ["Diarrhea", "Stomach cramps", "Metallic taste", "Nausea"],
      serious: ["Lactic Acidosis", "Vitamin B12 deficiency"]
    },
    contraindications: [
      "Severe renal impairment (eGFR < 30 mL/min)",
      "Diabetic ketoacidosis or metabolic acidosis",
      "Severe congestive heart failure or acute liver disease"
    ],
    foodInteractions: [
      "Strictly take with meals. Avoid heavy alcohol bingeing to prevent lactic acidosis."
    ],
    drugInteractions: [
      { drug: "Iodinated Radiocontrast Dye", severity: "Severe", risk: "Must pause 48h prior to avoid acute renal failure." }
    ],
    allergyWarningFamily: "Biguanide",
    pregnancyCategory: "Category B",
    storage: "Store at 20°C to 25°C away from moisture.",

    voiceAnnouncement: "Medication Voice Advisory for Metformin 500 milligrams extended release. Primary uses: Lowering blood glucose in Type 2 Diabetes and improving insulin sensitivity. How to use: Take with your morning or evening meal and swallow whole without chewing. Suitability: Adult starting dose is 500 milligrams once or twice daily. Adolescents aged 10 and above under doctor guidance. Senior citizens require kidney filtration tests before taking. Warning: Seek immediate emergency care if you experience deep rapid breathing, severe muscle cramps, or extreme dizziness, which could signal lactic acidosis."
  },
  {
    id: "amlodipine-5",
    name: "Amlodipine Besylate",
    brandNames: ["Norvasc", "Amlopres 5", "Amlovas", "Istin"],
    genericName: "Amlodipine Besylate",
    category: "Cardiovascular / Antihypertensive",
    strength: "5 mg",
    dosageForm: "Oral Tablet",
    therapeuticClass: "Calcium Channel Blocker (CCB)",

    batchNo: "B.No: AML-05-9128",
    mfgDate: "02/2026",
    expiryDate: "01/2029",
    expiryStatus: "SAFE_AND_VALID",
    monthsRemaining: 26,

    howToUse: "Take once daily with a full glass of water, with or without food. Try to take it at the exact same hour every day (e.g. 8:00 AM). Do NOT stop taking this medicine abruptly even if your blood pressure readings become normal.",
    whenToTake: "Take once daily in the morning or before bedtime as recommended by your physician.",
    whyToTake: "Prescribed to treat high blood pressure (hypertension) and chest pain (angina) by relaxing and widening the peripheral blood vessels, reducing vascular resistance and heart workload.",

    indications: [
      "Essential Hypertension (High Blood Pressure) management",
      "Chronic Stable Angina & Vasospastic Angina (Prinzmetal's angina)",
      "Reduction of cardiovascular stroke and heart attack risk"
    ],

    suitability: {
      adults: {
        status: "FIRST-LINE ANTIHYPERTENSIVE",
        badge: "Cardiovascular First-Line",
        dosage: "Starting 5 mg once daily; can be titrated up to 10 mg once daily by physician.",
        maxDaily: "Maximum 10 mg once daily.",
        notes: "Long half-life of 30-50 hours provides smooth 24-hour blood pressure control."
      },
      children: {
        status: "PEDIATRIC CARDIOLOGIST USE (6+ YRS)",
        badge: "Specialist Only",
        dosage: "2.5 mg to 5 mg once daily for children 6 to 17 years old.",
        maxDaily: "Maximum 5 mg/day in children.",
        notes: "Not recommended for children under 6 years."
      },
      citizens: {
        status: "HIGHLY EFFECTIVE IN ISOLATED SYSTOLIC HYPERTENSION",
        badge: "Lower Start Dose",
        dosage: "Starting dose 2.5 mg once daily recommended for elderly patients.",
        maxDaily: "5 mg - 10 mg daily under clinical observation.",
        notes: "Watch for ankle swelling (peripheral edema) and postural dizziness upon standing."
      }
    },

    howMuchDrug: {
      singleDose: "5 mg (or 2.5 mg initial in elderly)",
      minInterval: "Once daily (24 hour interval)",
      maxDailyAdult: "10 mg once daily",
      maxDailyElderly: "5 mg - 10 mg once daily",
      overdoseWarning: "Excessive peripheral vasodilation with marked and prolonged hypotension and reflex tachycardia.",
      dangerThresholdMg: 10
    },

    problems: {
      common: [
        "Swelling of ankles, feet, or lower legs (peripheral edema)",
        "Facial flushing (feeling hot/red in face and neck)",
        "Dizziness or lightheadedness when standing up quickly",
        "Headache or fatigue"
      ],
      serious: [
        "Severe hypotension (systolic BP < 90 mmHg)",
        "Worsening chest pain or heart palpitations upon initiating therapy"
      ]
    },

    whenToContactDoctor: [
      "Blood pressure drops dangerously low with severe dizziness or fainting spells",
      "Significant ankle or lower leg swelling that causes difficulty walking",
      "New or worsening chest pain or irregular rapid heartbeats",
      "Severe rash or swelling of the face, tongue, or lips"
    ],

    similarMedicines: [
      { name: "Generic Amlodipine 5mg", type: "Identical Generic Salt", approxPrice: "75% Cheaper", maker: "Generic Brands" },
      { name: "Amlopres 5 / Stamlo 5", type: "Brand Equivalent", approxPrice: "Standard", maker: "Cipla / Dr. Reddy's" },
      { name: "Telmisartan 40mg", type: "Alternative ARB Class (less ankle swelling)", approxPrice: "Comparable", maker: "Glenmark" },
      { name: "Atenolol 50mg", type: "Beta-blocker Alternative", approxPrice: "Comparable", maker: "AstraZeneca" }
    ],

    sideEffects: {
      common: ["Ankle swelling", "Flushing", "Dizziness", "Headache"],
      serious: ["Severe low blood pressure", "Irregular heartbeats"]
    },
    contraindications: [
      "Severe aortic valve stenosis",
      "Severe hypotension (systolic BP < 90 mmHg)",
      "Cardiogenic shock"
    ],
    foodInteractions: [
      "Avoid large amounts of grapefruit or grapefruit juice which can excessively increase blood amlodipine levels."
    ],
    drugInteractions: [
      { drug: "Simvastatin", severity: "High", risk: "Amlodipine increases simvastatin exposure; limit simvastatin to 20mg max." }
    ],
    allergyWarningFamily: "Dihydropyridine",
    pregnancyCategory: "Category C",
    storage: "Store below 30°C in a dry place protected from light.",

    voiceAnnouncement: "Medication Voice Advisory for Amlodipine Besylate 5 milligrams. Primary uses: High blood pressure management and prevention of chest pain. How to use: Take once daily at the same time with water. Do not stop abruptly. Suitability: Adult starting dose is 5 milligrams once daily. For senior citizens, a lower start of 2.5 milligrams is recommended to prevent dizziness. Warning: Monitor blood pressure regularly. Avoid grapefruit juice. Contact your physician if you experience severe ankle swelling, fainting, or chest tightness."
  },
  {
    id: "pantoprazole-40",
    name: "Pantoprazole Sodium",
    brandNames: ["Protonix", "Pantocid 40", "Pan 40", "Protium"],
    genericName: "Pantoprazole Sodium Sesquihydrate",
    category: "Gastrointestinal / Antacid & Anti-ulcer",
    strength: "40 mg",
    dosageForm: "Enteric Coated Tablet",
    therapeuticClass: "Proton Pump Inhibitor (PPI)",

    batchNo: "B.No: PAN-40-7731",
    mfgDate: "04/2026",
    expiryDate: "03/2029",
    expiryStatus: "SAFE_AND_VALID",
    monthsRemaining: 28,

    howToUse: "Swallow the tablet whole with a glass of water. Strictly take 30 to 60 minutes BEFORE breakfast on an empty stomach. Do NOT crush, chew, split, or break the enteric coating, as stomach acid destroys the active drug.",
    whenToTake: "Take once daily in the morning, 30-60 minutes before your first meal, coffee, or tea.",
    whyToTake: "Prescribed to treat acid reflux (GERD), heartburn, stomach and duodenal ulcers, and to protect the stomach lining from damage caused by NSAID painkiller medications.",

    indications: [
      "Gastroesophageal Reflux Disease (GERD) & Acid Indigestion",
      "Stomach and Duodenal Ulcers healing and maintenance",
      "Gastritis, Erosive Esophagitis, and Acid Regurgitation",
      "Prophylaxis with heavy NSAID painkiller therapy"
    ],

    suitability: {
      adults: {
        status: "FIRST-LINE PPI",
        badge: "Acid Suppression First-Line",
        dosage: "40 mg once daily before breakfast for 4 to 8 weeks.",
        maxDaily: "Maximum 80 mg/day in severe Zollinger-Ellison syndrome.",
        notes: "Take strictly on empty stomach."
      },
      children: {
        status: "FOR ADOLESCENTS 12+ YEARS",
        badge: "12+ Years Only",
        dosage: "40 mg once daily before morning meal for adolescents >= 12 years.",
        maxDaily: "40 mg/day.",
        notes: "Safety not established in young pediatric patients without pediatric gastroenterologist prescription."
      },
      citizens: {
        status: "SAFE BUT MONITOR LONG-TERM BONE HEALTH",
        badge: "Bone Health Monitoring",
        dosage: "40 mg once daily before breakfast.",
        maxDaily: "40 mg/day.",
        notes: "Long-term PPI use (>1 year) in elderly may slightly increase osteoporosis fracture risk and B12 deficiency."
      }
    },

    howMuchDrug: {
      singleDose: "40 mg",
      minInterval: "Once daily before breakfast",
      maxDailyAdult: "40 mg - 80 mg in 24 hours",
      maxDailyElderly: "40 mg in 24 hours",
      overdoseWarning: "Well-tolerated with low acute toxicity, but excessive dosing can cause severe headache and dizziness.",
      dangerThresholdMg: 80
    },

    problems: {
      common: [
        "Headache",
        "Mild diarrhea or constipation",
        "Abdominal pain, gas, and bloating",
        "Nausea"
      ],
      serious: [
        "Clostridioides difficile-associated diarrhea on prolonged use",
        "Hypomagnesemia (low magnesium levels) and bone fractures with long-term high dose therapy",
        "Vitamin B12 deficiency after multi-year use"
      ]
    },

    whenToContactDoctor: [
      "Severe persistent watery diarrhea with abdominal cramping and fever",
      "Difficulty swallowing or severe chest pain accompanied by pain radiating to arm/jaw",
      "Symptoms of low magnesium: muscle spasms, tremors, irregular heartbeat",
      "Symptoms do not improve after 14 days of daily treatment"
    ],

    similarMedicines: [
      { name: "Generic Pantoprazole 40mg", type: "Identical Generic Molecule", approxPrice: "70% Cheaper", maker: "Generic Laboratories" },
      { name: "Pan 40 / Pantocid 40", type: "Brand Equivalent", approxPrice: "Standard", maker: "Alkem / Sun" },
      { name: "Omeprazole 20mg (Omez)", type: "Alternative First-Gen PPI", approxPrice: "Very Cheap", maker: "Dr. Reddy's" },
      { name: "Rabeprazole 20mg", type: "Faster-Acting Alternative PPI", approxPrice: "Comparable", maker: "Cipla" }
    ],

    sideEffects: {
      common: ["Headache", "Mild diarrhea", "Abdominal discomfort"],
      serious: ["Low magnesium levels", "C. difficile diarrhea", "Bone fracture risk on long-term use"]
    },
    contraindications: [
      "Hypersensitivity to substituted benzimidazoles (PPIs)"
    ],
    foodInteractions: [
      "Strictly take 30-60 min before meals. Avoid spicy and deep-fried acidic foods."
    ],
    drugInteractions: [
      { drug: "Methotrexate", severity: "High", risk: "May prolong and elevate blood methotrexate levels." }
    ],
    allergyWarningFamily: "Proton Pump Inhibitors",
    pregnancyCategory: "Category B",
    storage: "Store below 25°C away from humidity.",

    voiceAnnouncement: "Medication Voice Advisory for Pantoprazole 40 milligrams enteric coated tablet. Primary uses: Treating acid reflux, GERD, and healing stomach ulcers. How to use: Take strictly on an empty stomach 30 to 60 minutes before breakfast. Swallow whole without crushing. Suitability: Adult dosage is 40 milligrams once daily. Safe for senior citizens with calcium monitoring. Warning: Contact your doctor if you experience persistent severe diarrhea or difficulty swallowing."
  },
  {
    id: "cetirizine-10",
    name: "Cetirizine Hydrochloride",
    brandNames: ["Zyrtec", "Cetzine 10", "Alerid", "Reactine"],
    genericName: "Cetirizine HCl",
    category: "Antihistamine / Allergy Relief",
    strength: "10 mg",
    dosageForm: "Oral Tablet",
    therapeuticClass: "Second-Generation H1 Antihistamine",

    batchNo: "B.No: CET-10-3301",
    mfgDate: "02/2026",
    expiryDate: "01/2029",
    expiryStatus: "SAFE_AND_VALID",
    monthsRemaining: 26,

    howToUse: "Take 1 tablet with water, with or without food. Avoid alcohol as it can multiply drowsiness. Take preferably at bedtime if you feel sleepy.",
    whenToTake: "Take once daily, preferably in the evening / before bedtime.",
    whyToTake: "Prescribed to relieve allergy symptoms such as sneezing, runny nose, itchy watery eyes, hives, skin rashes, and allergic rhinitis by blocking histamine H1 receptors in the body.",

    indications: [
      "Allergic Rhinitis (Hay Fever, sneezing, runny nose, nasal congestion)",
      "Chronic Idiopathic Urticaria (Itchy Hives and red skin welts)",
      "Dust mite, pet dander, and seasonal pollen allergies",
      "Allergic conjunctivitis and itchy watery eyes"
    ],

    suitability: {
      adults: {
        status: "FIRST-LINE ANTIHISTAMINE",
        badge: "Non-Sedating First-Line",
        dosage: "10 mg once daily, preferably in evening.",
        maxDaily: "Maximum 10 mg/day.",
        notes: "Less drowsy than first-generation antihistamines, but caution when driving."
      },
      children: {
        status: "PEDIATRIC SYRUP APPROVED (2+ YRS)",
        badge: "Age-Adjusted",
        dosage: "Children 6-12 years: 5 mg twice daily or 10 mg once daily. Children 2-5 years: 2.5 mg to 5 mg syrup.",
        maxDaily: "5 mg - 10 mg/day depending on age.",
        notes: "Consult pediatrician for syrup dosage."
      },
      citizens: {
        status: "SAFE WITH LOWER STARTING DOSE",
        badge: "Sedation Caution",
        dosage: "Starting 5 mg once daily recommended for elderly patients.",
        maxDaily: "5 mg - 10 mg/day.",
        notes: "Increased sensitivity to anticholinergic effects (dry mouth, drowsiness, urinary retention)."
      }
    },

    howMuchDrug: {
      singleDose: "10 mg (or 5 mg in elderly)",
      minInterval: "Once daily (24 hour interval)",
      maxDailyAdult: "10 mg once daily",
      maxDailyElderly: "5 mg - 10 mg once daily",
      overdoseWarning: "Overdose causes somnolence, confusion, tachycardia, urinary retention, and agitation in children.",
      dangerThresholdMg: 10
    },

    problems: {
      common: [
        "Mild drowsiness or tiredness",
        "Dry mouth and throat",
        "Headache",
        "Dizziness"
      ],
      serious: [
        "Urinary retention (difficulty passing urine in elderly men)",
        "Severe allergic angioedema or bronchospasm (rare)"
      ]
    },

    whenToContactDoctor: [
      "Signs of severe allergic reaction: swelling of face, lips, tongue, or sudden difficulty breathing",
      "Inability to urinate or severe urinary retention",
      "Extreme confusion, agitation, or irregular heartbeat"
    ],

    similarMedicines: [
      { name: "Generic Cetirizine 10mg", type: "Identical Generic Salt", approxPrice: "80% Cheaper", maker: "Generic Brands" },
      { name: "Levocetirizine 5mg (Xyzal)", type: "Refined Active Enantiomer (Less drowsy)", approxPrice: "Slightly higher", maker: "Sanofi" },
      { name: "Fexofenadine 120mg (Allegra)", type: "100% Non-Sedating Alternative", approxPrice: "Premium", maker: "Sanofi" },
      { name: "Loratadine 10mg (Claritin)", type: "Alternative Non-Drowsy Antihistamine", approxPrice: "Comparable", maker: "Bayer" }
    ],

    sideEffects: {
      common: ["Mild drowsiness", "Dry mouth", "Fatigue", "Headache"],
      serious: ["Urinary retention", "Severe allergic angioedema (rare)"]
    },
    contraindications: [
      "End-stage renal disease (dialysis patients)",
      "Hypersensitivity to cetirizine or hydroxyzine"
    ],
    foodInteractions: [
      "Avoid alcohol while taking antihistamines."
    ],
    drugInteractions: [
      { drug: "Sleeping pills / Sedatives", severity: "Moderate", risk: "Additive CNS depression and heavy drowsiness." }
    ],
    allergyWarningFamily: "Piperazines",
    pregnancyCategory: "Category B",
    storage: "Store at 20°C to 25°C in a dry place.",

    voiceAnnouncement: "Medication Voice Advisory for Cetirizine Hydrochloride 10 milligrams. Primary uses: Fast relief from allergy symptoms, sneezing, runny nose, and itchy hives. How to use: Take once daily with water, preferably at bedtime. Suitability: Adult dosage is 10 milligrams once daily. For senior citizens, 5 milligrams is recommended to minimize drowsiness. Warning: Avoid alcohol and exercise caution when driving. Consult a doctor if you experience urinary retention or breathing difficulty."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MEDICINE_DATABASE };
}