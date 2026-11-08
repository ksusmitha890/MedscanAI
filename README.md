# 🩺 MedScan AI — Intelligent Clinical Medicine, Lab Diagnostic & Health Diary Suite

> **A comprehensive healthcare web platform featuring: User Registration (Name, Pass, Age, Gender, Health Conditions), Login & Logout, Medicine Pharmacology & Safety (Fever & Uses, How to use, Adults/Children/Senior Citizens, Overdose limits, Problems, Contacting Doctor, Expiry dates), Voice Announcements, Lab Report Scanner with Highlighted Biomarkers & Specific Problem Diagnosis, Health Diary (Blood Pressure, Weight & BMI, Sugar Levels), and Stored Medicines Cabinet.**

---

## 🌟 Complete Feature Matrix

### 1. 🔐 User Registration, Login & Session Management
- **Registration**: Register with **Name**, **Password**, **Age**, **Gender**, and **Existing Health Conditions** (e.g. *Hypertension, Type 2 Diabetes, Asthma, Heart conditions*) plus known drug allergies.
- **Login**: Secure login using **Name** and **Password**.
- **Logout**: 1-click logout button that clears active session and returns to login screen.
- **Patient Safety Shield**: Automatically cross-references all scanned or viewed medicines against the logged-in user's health conditions and allergies.
- **Instant Demo Evaluation**: 1-click login buttons for *Alex Sharma* and *Dr. Priya Patel*.

---

### 2. 💊 Medicine Search & Visual Scanner (Paracetamol Example)
Scan a photo/strip or look up **Paracetamol / Acetaminophen (Dolo 650)**:
- 📅 **Expiry Date & Batch Status**: Detects and displays manufacturing date, expiry date, batch number, and safe validity countdown (e.g., *Exp: 02/2029 • Status: SAFE & VALID*).
- 🌡️ **Fever & Clinical Uses**: Clear explanation of antipyretic temperature control for viral/bacterial fevers, headaches, migraine, toothache, muscle aches, and post-vaccination soreness.
- 💧 **How to Use & When to Take**: Detailed oral administration guidelines, water consumption, empty stomach vs with food, and minimum 4-6 hour spacing between doses.
- 👥 **Suitability for Adults, Children & Senior Citizens**:
  - **Adults (18-64 Y)**: 500-650 mg every 4-6 hours. Maximum 4,000 mg in 24 hours. Highly safe.
  - **Children (Pediatric)**: Caution! Never give adult tablets. Safe ONLY with weight-based pediatric oral drops/syrups (10-15 mg/kg per dose, max 4 doses/day).
  - **Senior Citizens (65+ Y)**: Adjusted lower dosage (500mg every 6-8 hours, reduced max 2,000-3,000 mg/day). Liver and kidney function monitoring advised.
- ⚖️ **How Much Drug (Limits & Overdose Warning Meter)**:
  - Visual dosage scale: Safe range → Senior citizen limit → Absolute adult ceiling (4,000 mg/24h) → Toxic overdose danger.
  - Explicit warnings regarding acute hepatic failure (liver necrosis) from overdose.
- ⚠️ **If Any Problems (Side Effects & Risks)**:
  - Common: Mild nausea, mild dizziness.
  - Serious: Acute liver failure, allergic facial/tongue swelling (angioedema), Stevens-Johnson skin blistering syndrome. Strictly avoid alcohol.
- 🚨 **When to Contact a Doctor (Emergency Red Flags)**:
  - Fever > 102°F or lasting more than 3 consecutive days.
  - Signs of severe allergy: breathing difficulty, wheezing, swelling of face/lips.
  - Signs of liver distress: jaundice (yellow skin/eyes), dark tea-colored urine, upper stomach pain.
  - Suspected accidental overdose or intake over 4,000 mg.
  - Emergency Doctor Helpline action button.
- 🔄 **Similar Medicines & Generic Alternatives**: Lists 75% cheaper generic Paracetamol, Crocin, Calpol, Ibuprofen, and Meftal.

---

### 3. 🔊 Tablet Voice Announcement (Text-to-Speech)
- **Natural Audio Guide**: Reads aloud medicine name, dosage, fever and pain relief uses, how to take, adult/child/senior guidance, overdose warnings, and doctor alerts.
- **Audio Controls**: Play, Pause, Resume, Stop buttons.
- **Playback Speed**: 0.8x (Slow), 1.0x (Normal), 1.2x (Fast).
- **Animated Audio Wave Equalizer**: Dynamic pulsing sound wave visualizer active while speaking.

---

### 4. 🧪 Medical Lab Report Scanner & Disease Diagnoser
- **Upload or Test 1-Click Reports**: Diabetic Profile, Cardiovascular Lipid Profile, CBC Anemia, Thyroid Function (TFT).
- 📑 **Report Validity & Expiry Date**: Displays test date, validity window (90 days), and recommended re-test expiry date.
- 🎯 **Highlighted Biomarkers Table**:
  - Parameter, Observed Value, Standard Reference Range, and High-Contrast Highlight Status (🔴 HIGH ▲, 🟡 LOW ▼, 🟢 NORMAL ✓).
- 🔬 **Specific Problems Identified by Highlight Values**:
  - Explains the exact pathological problem detected by the highlighted abnormal biomarkers (e.g. *High Fasting Glucose 178 + High HbA1c 8.4% indicates Uncontrolled Type 2 Diabetes Mellitus with microvascular risk*).
- 💊 **Recommended Medications**:
  - Tailored medications with How to use, When to take, Why to take, Expiry date, and a **"+ Add All to My Cabinet"** button.
- 👨‍⚕️ **Specialist Consultation & Lifestyle Guidance**: Specialist referral and practical dietary tips.

---

### 5. 📊 Health Diary & Vitals Calculator
A dedicated interactive vitals tracker and calculator:
1. **Blood Pressure (BP) Calculator**:
   - Inputs: Systolic (mmHg), Diastolic (mmHg), Pulse (bpm).
   - AHA Classification: Normal (<120/80), Elevated, Stage 1 Hypertension, Stage 2 Hypertension, Hypertensive Crisis.
   - Calculates Mean Arterial Pressure (MAP) and Pulse Pressure with doctor recommendations.
2. **Weight & BMI Calculator**:
   - Inputs: Weight (kg), Height (cm).
   - WHO Classification: Underweight, Normal, Overweight, Obese.
   - Calculates ideal target weight range and daily water hydration targets.
3. **Blood Sugar (Glucose) Calculator**:
   - Fasting, Post-Meal (2 hrs), Random, or HbA1c.
   - ADA Classification: Normal, Prediabetes, Diabetes, or Hypoglycemia.
4. **Health Diary History Log**:
   - Chronological table storing date, time, vital type, measured value, status badge, context notes, and delete action.
   - Persisted per user profile.

---

### 6. 📦 Stored Medicines Cabinet
- **Add New Medicine Form**:
  - Medicine Name, Purpose/Reason, Dosage/Strength, Schedule Timing (Morning, Afternoon, Night; Before/After Food), Expiry Date, Remaining Count, Special Instructions.
- **Interactive Medicine Cards**:
  - Active medications grid with schedule pills.
  - Expiry status pill (🟢 Safe, 🟡 Expiring Soon, 🔴 Expired).
  - Daily compliance checkbox: **"Mark as Taken Today"** (tracks intake time and decrements stock).
  - Low stock warning alert (<= 5 pills remaining).
  - 🔊 **"Listen Voice Announcement"** for any stored medicine.
  - 🗑️ Remove / Delete medicine.
- **Quick Cabinet Modal Drawer**: Accessible anytime from the top navigation bar with a live count badge.

---

## 🚀 How to Run the Web Application

1. Open PowerShell or Command Prompt:
```powershell
cd "C:\Users\Lenovo\.gemini\antigravity\scratch\mediscan-ai"
node server.js
```

2. Open your web browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

3. **Quick Evaluation Tour**:
   - Click **"1-Click Sign In as Alex Sharma"** or register a new user with Name, Password, Age, Gender, and Health Conditions.
   - Under **Medicine Visual Scanner**, click **"Instant Check: Paracetamol / Dolo 650"** or click the demo preset to review fever uses, adults/children/citizens dosage, overdose meter, problems, contacting doctor, and click **"Listen Aloud"** for the voice announcement.
   - Switch to **Lab Report Scanner** and click **Diabetic Profile** to see highlighted values, specific problems diagnosed, and report expiry validity.
   - Switch to **Health Diary** to calculate your Blood Pressure, Weight/BMI, or Blood Sugar and save records.
   - Switch to **Stored Medicines** to view stored medications, add a new medicine, track daily intake, and check expiry countdowns.

---

## 📂 Project Architecture

```
mediscan-ai/
├── server.js                      # Node.js HTTP server (zero external dependencies)
├── package.json                   # Project metadata
├── README.md                      # Comprehensive documentation
└── public/
    ├── index.html                 # Complete 4-tab web application UI
    ├── css/
    │   └── styles.css             # Laser scan line, bio-tech glowing cards & typography
    └── js/
        ├── auth-manager.js        # User registration (Name/Pass/Age/Gender/Conditions), Login & Logout
        ├── medicine-db.js         # Pharmacology DB: Paracetamol, Amoxicillin, Metformin, etc.
        ├── samples.js             # SVG demo presets with realistic packaging & expiry dates
        ├── lab-report-analyzer.js # Diagnostic engine with biomarker highlights & specific problems
        ├── health-diary.js        # Calculators for BP, Weight/BMI, Blood Sugar & persistent logs
        ├── speech-helper.js       # Web Speech API voice announcements & audio visualizer
        ├── patient-manager.js     # Stored medicine cabinet CRUD & daily compliance tracking
        ├── vision-engine.js       # Optical recognition heuristic engine & Gemini API support
        └── app.js                 # Central controller coordinating all views and user actions
```
