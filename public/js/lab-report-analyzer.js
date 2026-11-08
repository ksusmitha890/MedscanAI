/**
 * MedScan AI - Medical Lab Report Analyzer & Disease Diagnostic Engine
 * Analyzes lab test parameters (CBC, Diabetes, Lipid, Thyroid, LFT, KFT)
 * - Highlights out-of-range biomarkers (High, Low, Normal) with color-coded badges
 * - Identifies specific health problems caused by the highlighted values
 * - Provides Report Expiry & Recommended Re-Test Dates
 * - Recommends targeted medications with How, When, Why & Expiry details
 */

const LAB_SAMPLE_PRESETS = [
  {
    id: "sample-diabetes-report",
    title: "Diabetic Profile Report",
    testType: "Metabolic / Glucose",
    subtitle: "Fasting Glucose 178 mg/dL, HbA1c 8.4%",
    tag: "sample:diabetes_report",
    reportDate: "12/05/2026",
    retestExpiryDate: "12/08/2026",
    expiryStatus: "ACTIVE_AND_VALID",
    validityWindow: "90 Days Validity Window",
    data: {
      patientName: "Alex Sharma",
      date: "12/05/2026",
      labName: "Apex Clinical Pathology Laboratories",
      doctorName: "Dr. K. Verma, MD (Endocrinology)",
      parameters: [
        { name: "Fasting Blood Glucose (FBS)", value: 178, unit: "mg/dL", normalMin: 70, normalMax: 100, status: "HIGH", highlightColor: "red" },
        { name: "Postprandial Glucose (PPBS)", value: 245, unit: "mg/dL", normalMin: 90, normalMax: 140, status: "HIGH", highlightColor: "red" },
        { name: "Glycated Hemoglobin (HbA1c)", value: 8.4, unit: "%", normalMin: 4.0, normalMax: 5.6, status: "HIGH", highlightColor: "red" },
        { name: "Estimated Average Glucose (eAG)", value: 194, unit: "mg/dL", normalMin: 70, normalMax: 126, status: "HIGH", highlightColor: "red" },
        { name: "Serum Creatinine", value: 0.9, unit: "mg/dL", normalMin: 0.7, normalMax: 1.3, status: "NORMAL", highlightColor: "green" }
      ]
    },
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <filter id="labShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#0e1726"/>
        <g transform="translate(80, 30)" filter="url(#labShadow)">
          <rect width="640" height="540" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          
          <!-- Lab Header -->
          <rect x="0" y="0" width="640" height="90" rx="10" fill="#0891b2"/>
          <text x="35" y="38" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">APEX CLINICAL PATHOLOGY LAB</text>
          <text x="35" y="58" font-family="Arial, sans-serif" font-size="11" fill="#cffafe">NABL ACCREDITED DIAGNOSTIC CENTER • ISO 15189:2022</text>
          <text x="35" y="75" font-family="Arial, sans-serif" font-size="11" fill="#a5f3fc">Report ID: DIA-2026-9938 • Comprehensive Diabetic Profile</text>
          <text x="450" y="75" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff">VALID TILL: 12/08/2026</text>
          
          <!-- Patient Banner -->
          <rect x="25" y="105" width="590" height="45" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
          <text x="40" y="127" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">Patient: Alex Sharma</text>
          <text x="230" y="127" font-family="Arial, sans-serif" font-size="12" fill="#475569">Age: 34 Y / Male</text>
          <text x="370" y="127" font-family="Arial, sans-serif" font-size="12" fill="#475569">Ref: Dr. K. Verma, MD</text>
          <text x="40" y="142" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Report Tested: 12/05/2026 • Status: Certified Valid</text>

          <!-- Table Header -->
          <rect x="25" y="165" width="590" height="30" fill="#0f172a"/>
          <text x="40" y="185" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">TEST / PARAMETER</text>
          <text x="270" y="185" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">OBSERVED VALUE</text>
          <text x="430" y="185" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">REFERENCE RANGE</text>
          <text x="550" y="185" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">STATUS</text>

          <!-- Row 1: Fasting Glucose -->
          <g transform="translate(25, 205)">
            <rect width="590" height="35" fill="#fef2f2"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Fasting Blood Glucose (FBS)</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#dc2626">178 mg/dL</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">70 - 100 mg/dL</text>
            <rect x="540" y="8" width="45" height="20" rx="4" fill="#fee2e2" stroke="#dc2626"/>
            <text x="548" y="22" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#dc2626">HIGH ▲</text>
          </g>

          <!-- Row 2: Postprandial Glucose -->
          <g transform="translate(25, 245)">
            <rect width="590" height="35" fill="#fef2f2"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Postprandial Blood Glucose (PPBS)</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#dc2626">245 mg/dL</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">90 - 140 mg/dL</text>
            <rect x="540" y="8" width="45" height="20" rx="4" fill="#fee2e2" stroke="#dc2626"/>
            <text x="548" y="22" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#dc2626">HIGH ▲</text>
          </g>

          <!-- Row 3: HbA1c -->
          <g transform="translate(25, 285)">
            <rect width="590" height="35" fill="#fee2e2"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Glycated Hemoglobin (HbA1c)</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#b91c1c">8.4 %</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">&lt; 5.7 % Normal</text>
            <rect x="535" y="8" width="50" height="20" rx="4" fill="#fca5a5" stroke="#b91c1c"/>
            <text x="540" y="22" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#7f1d1d">DIABETIC</text>
          </g>

          <!-- Row 4: Serum Creatinine -->
          <g transform="translate(25, 325)">
            <rect width="590" height="35" fill="#f0fdf4"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Serum Creatinine (Renal function)</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#166534">0.9 mg/dL</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">0.7 - 1.3 mg/dL</text>
            <rect x="540" y="8" width="45" height="20" rx="4" fill="#dcfce7" stroke="#166534"/>
            <text x="545" y="22" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#166534">NORMAL</text>
          </g>

          <!-- Diagnostic Impression Box -->
          <rect x="25" y="380" width="590" height="85" rx="8" fill="#fff7ed" stroke="#fdba74"/>
          <text x="40" y="405" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#c2410c">PATHOLOGIST CLINICAL FINDINGS &amp; SPECIFIC PROBLEMS:</text>
          <text x="40" y="425" font-family="Arial, sans-serif" font-size="11" fill="#7c2d12">• Highlighted High FBS (178) &amp; HbA1c (8.4%): Indicates Uncontrolled Type 2 Diabetes Mellitus.</text>
          <text x="40" y="443" font-family="Arial, sans-serif" font-size="11" fill="#9a3412">• High Risk of Chronic Glycemic Complications. Recommend immediate antidiabetic medication.</text>

          <g transform="translate(420, 480)">
            <text x="30" y="15" font-family="'Brush Script MT', cursive, sans-serif" font-size="20" fill="#0891b2">Dr. V. Rao MD</text>
            <line x1="0" y1="20" x2="180" y2="20" stroke="#94a3b8" stroke-width="1"/>
            <text x="15" y="35" font-family="Arial, sans-serif" font-size="10" fill="#64748b">Senior Consultant Pathologist</text>
          </g>
        </g>
      </svg>
    `
  },
  {
    id: "sample-lipid-report",
    title: "Cardiovascular Lipid Profile",
    testType: "Cardiovascular / Cholesterol",
    subtitle: "Total Cholesterol 268 mg/dL, LDL 182 mg/dL",
    tag: "sample:lipid_report",
    reportDate: "12/04/2026",
    retestExpiryDate: "12/07/2026",
    expiryStatus: "ACTIVE_AND_VALID",
    validityWindow: "90 Days Validity Window",
    data: {
      patientName: "Alex Sharma",
      date: "12/04/2026",
      labName: "Metro Heart & Vascular Diagnostics",
      doctorName: "Dr. S. Mehta, DM (Cardiology)",
      parameters: [
        { name: "Total Cholesterol", value: 268, unit: "mg/dL", normalMin: 125, normalMax: 200, status: "HIGH", highlightColor: "red" },
        { name: "Low Density Lipoprotein (LDL - Bad)", value: 182, unit: "mg/dL", normalMin: 50, normalMax: 100, status: "HIGH", highlightColor: "red" },
        { name: "Serum Triglycerides", value: 240, unit: "mg/dL", normalMin: 50, normalMax: 150, status: "HIGH", highlightColor: "red" },
        { name: "High Density Lipoprotein (HDL - Good)", value: 38, unit: "mg/dL", normalMin: 40, normalMax: 60, status: "LOW", highlightColor: "amber" },
        { name: "Cholesterol / HDL Ratio", value: 7.0, unit: "ratio", normalMin: 3.0, normalMax: 4.5, status: "HIGH", highlightColor: "red" }
      ]
    },
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <rect width="100%" height="100%" fill="#0b0f19"/>
        <g transform="translate(80, 30)">
          <rect width="640" height="540" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <rect x="0" y="0" width="640" height="90" rx="10" fill="#4f46e5"/>
          <text x="35" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">METRO HEART &amp; VASCULAR INSTITUTE</text>
          <text x="35" y="58" font-family="Arial, sans-serif" font-size="11" fill="#e0e7ff">LIPID METABOLISM &amp; ATHEROSCLEROTIC RISK PROFILE</text>
          <text x="450" y="75" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff">VALID TILL: 12/07/2026</text>

          <rect x="25" y="160" width="590" height="30" fill="#1e1b4b"/>
          <text x="40" y="180" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">LIPID FRACTION</text>
          <text x="270" y="180" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">RESULT</text>
          <text x="430" y="180" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">DESIRABLE</text>
          <text x="550" y="180" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">RISK</text>

          <g transform="translate(25, 200)">
            <rect width="590" height="35" fill="#fef2f2"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Total Serum Cholesterol</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">268 mg/dL</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">&lt; 200 mg/dL</text>
            <text x="545" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">HIGH ▲</text>
          </g>

          <g transform="translate(25, 240)">
            <rect width="590" height="35" fill="#fee2e2"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">LDL Cholesterol (Atherogenic Bad)</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#b91c1c">182 mg/dL</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">&lt; 100 mg/dL</text>
            <text x="545" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#b91c1c">SEVERE ▲</text>
          </g>

          <g transform="translate(25, 280)">
            <rect width="590" height="35" fill="#fef2f2"/>
            <text x="15" y="22" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Serum Triglycerides</text>
            <text x="250" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">240 mg/dL</text>
            <text x="410" y="22" font-family="Arial, sans-serif" font-size="12" fill="#475569">&lt; 150 mg/dL</text>
            <text x="545" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">HIGH ▲</text>
          </g>

          <rect x="25" y="380" width="590" height="85" rx="8" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="40" y="405" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e40af">CARDIOVASCULAR FINDINGS &amp; SPECIFIC PROBLEMS:</text>
          <text x="40" y="425" font-family="Arial, sans-serif" font-size="11" fill="#1e3a8a">• Highlighted Severe LDL (182) &amp; Total Cholesterol (268): Severe Mixed Dyslipidemia.</text>
          <text x="40" y="443" font-family="Arial, sans-serif" font-size="11" fill="#1e40af">• High Risk of Coronary Artery Plaque Deposition &amp; Cardiovascular Events. Statin therapy advised.</text>
        </g>
      </svg>
    `
  },
  {
    id: "sample-cbc-report",
    title: "Complete Blood Count (CBC)",
    testType: "Hematology / Anemia",
    subtitle: "Hemoglobin 8.8 g/dL (Severe Anemia)",
    tag: "sample:cbc_report",
    reportDate: "10/05/2026",
    retestExpiryDate: "10/08/2026",
    expiryStatus: "ACTIVE_AND_VALID",
    validityWindow: "90 Days Validity Window",
    data: {
      patientName: "Alex Sharma",
      date: "10/05/2026",
      labName: "Central Hematology Diagnostic Institute",
      doctorName: "Dr. P. Deshmukh, MD",
      parameters: [
        { name: "Hemoglobin (Hb)", value: 8.8, unit: "g/dL", normalMin: 12.0, normalMax: 16.0, status: "LOW", highlightColor: "amber" },
        { name: "Total Red Blood Cell Count (RBC)", value: 3.2, unit: "mil/uL", normalMin: 4.2, normalMax: 5.8, status: "LOW", highlightColor: "amber" },
        { name: "Packed Cell Volume (Hematocrit)", value: 27.5, unit: "%", normalMin: 36.0, normalMax: 48.0, status: "LOW", highlightColor: "amber" },
        { name: "Total Leukocyte Count (WBC)", value: 6800, unit: "/cumm", normalMin: 4000, normalMax: 11000, status: "NORMAL", highlightColor: "green" },
        { name: "Platelet Count", value: 240000, unit: "/cumm", normalMin: 150000, normalMax: 450000, status: "NORMAL", highlightColor: "green" }
      ]
    },
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <rect width="100%" height="100%" fill="#0f172a"/>
        <g transform="translate(80, 30)">
          <rect width="640" height="540" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <rect x="0" y="0" width="640" height="90" rx="10" fill="#e11d48"/>
          <text x="35" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">CENTRAL HEMATOLOGY INSTITUTE</text>
          <text x="35" y="58" font-family="Arial, sans-serif" font-size="11" fill="#ffe4e6">COMPLETE BLOOD COUNT (CBC) &amp; RED CELL INDICES</text>
          <text x="450" y="75" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff">VALID TILL: 10/08/2026</text>

          <g transform="translate(25, 180)">
            <rect width="590" height="40" fill="#fee2e2"/>
            <text x="15" y="25" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Hemoglobin (Hb)</text>
            <text x="250" y="25" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#be123c">8.8 g/dL</text>
            <text x="410" y="25" font-family="Arial, sans-serif" font-size="12" fill="#475569">12.0 - 16.0 g/dL</text>
            <text x="545" y="25" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#be123c">LOW ▼</text>
          </g>
          
          <rect x="25" y="380" width="590" height="85" rx="8" fill="#fff1f2" stroke="#fecdd3"/>
          <text x="40" y="405" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#9f1239">HEMATOLOGIC FINDINGS &amp; SPECIFIC PROBLEMS:</text>
          <text x="40" y="425" font-family="Arial, sans-serif" font-size="11" fill="#881337">• Highlighted Low Hemoglobin (8.8 g/dL): Severe Microcytic Hypochromic Anemia.</text>
          <text x="40" y="443" font-family="Arial, sans-serif" font-size="11" fill="#9f1239">• Impaired Cellular Oxygen Delivery. Requires oral elemental iron supplementation.</text>
        </g>
      </svg>
    `
  },
  {
    id: "sample-thyroid-report",
    title: "Thyroid Function Test (TFT)",
    testType: "Endocrine / Thyroid",
    subtitle: "TSH 9.4 mIU/L (Primary Hypothyroidism)",
    tag: "sample:thyroid_report",
    reportDate: "05/05/2026",
    retestExpiryDate: "05/08/2026",
    expiryStatus: "ACTIVE_AND_VALID",
    validityWindow: "90 Days Validity Window",
    data: {
      patientName: "Alex Sharma",
      date: "05/05/2026",
      labName: "Apex Endocrine Diagnostics",
      doctorName: "Dr. K. Verma, MD",
      parameters: [
        { name: "Thyroid Stimulating Hormone (TSH)", value: 9.4, unit: "mIU/L", normalMin: 0.4, normalMax: 4.5, status: "HIGH", highlightColor: "red" },
        { name: "Free Thyroxine (FT4)", value: 0.68, unit: "ng/dL", normalMin: 0.8, normalMax: 1.8, status: "LOW", highlightColor: "amber" },
        { name: "Free Triiodothyronine (FT3)", value: 2.1, unit: "pg/mL", normalMin: 2.3, normalMax: 4.2, status: "LOW", highlightColor: "amber" }
      ]
    },
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <rect width="100%" height="100%" fill="#0a0f1d"/>
        <g transform="translate(80, 30)">
          <rect width="640" height="540" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <rect x="0" y="0" width="640" height="90" rx="10" fill="#7c3aed"/>
          <text x="35" y="38" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">ENDOCRINE SPECIALTY LAB</text>
          <text x="35" y="58" font-family="Arial, sans-serif" font-size="11" fill="#ede9fe">SERUM THYROID HORMONE PROFILE</text>
          <text x="450" y="75" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff">VALID TILL: 05/08/2026</text>

          <g transform="translate(25, 180)">
            <rect width="590" height="40" fill="#f5f3ff"/>
            <text x="15" y="25" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">TSH (Ultrasensitive)</text>
            <text x="250" y="25" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#6d28d9">9.4 mIU/L</text>
            <text x="410" y="25" font-family="Arial, sans-serif" font-size="12" fill="#475569">0.4 - 4.5 mIU/L</text>
            <text x="545" y="25" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#6d28d9">HIGH ▲</text>
          </g>

          <rect x="25" y="380" width="590" height="85" rx="8" fill="#faf5ff" stroke="#d8b4fe"/>
          <text x="40" y="405" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#6b21a8">ENDOCRINE FINDINGS &amp; SPECIFIC PROBLEMS:</text>
          <text x="40" y="425" font-family="Arial, sans-serif" font-size="11" fill="#581c87">• Highlighted High TSH (9.4 mIU/L) &amp; Low FT4 (0.68): Primary Clinical Hypothyroidism.</text>
          <text x="40" y="443" font-family="Arial, sans-serif" font-size="11" fill="#6b21a8">• Sluggish Metabolism, Fatigue &amp; Weight Gain. Synthetic Levothyroxine replacement required.</text>
        </g>
      </svg>
    `
  }
];

class LabReportAnalyzer {
  constructor() {}

  /**
   * Diagnostic Inference Engine:
   * Maps out-of-range biomarkers to specific problems, recommended medications, and clinical advice
   */
  diagnoseFromParameters(parameters, testType = "General") {
    let diagnosedDisease = null;
    let severity = "MODERATE";
    let explanation = "";
    let specificProblems = [];
    let recommendedMedications = [];
    let specialist = "General Physician";
    let lifestyleTips = [];
    const reportDate = new Date().toLocaleDateString();
    
    // Calculate 90 days validity expiry date
    const retestDateObj = new Date(Date.now() + 90 * 86400000);
    const retestExpiryDate = retestDateObj.toLocaleDateString();

    // Check Diabetes
    const fbs = parameters.find(p => p.name.includes("Fasting") || p.name.includes("FBS"));
    const hba1c = parameters.find(p => p.name.includes("HbA1c") || p.name.includes("Glycated"));

    if ((fbs && fbs.value > 126) || (hba1c && hba1c.value >= 6.5)) {
      diagnosedDisease = "Type 2 Diabetes Mellitus (Uncontrolled Hyperglycemia)";
      severity = (hba1c && hba1c.value > 8.0) ? "HIGH / SEVERE" : "MODERATE";
      specialist = "Endocrinologist / Diabetologist";
      explanation = `Your lab report exhibits elevated Fasting Glucose (${fbs ? fbs.value + ' mg/dL' : ''}) and Glycated Hemoglobin HbA1c (${hba1c ? hba1c.value + '%' : ''}). This indicates persistent high blood glucose levels over the last 3 months, reflecting insulin resistance and diminished cellular glucose uptake.`;
      
      specificProblems = [
        {
          title: "Severe Hyperglycemia",
          detail: `Fasting blood sugar of ${fbs ? fbs.value : 'high'} mg/dL exceeds normal limit (70-100 mg/dL), indicating impaired baseline hepatic regulation.`
        },
        {
          title: "Elevated Glycated Hemoglobin (HbA1c)",
          detail: `HbA1c reading of ${hba1c ? hba1c.value : 'high'}% reflects chronic 90-day glucose saturation on red blood cells, multiplying risk of microvascular diabetic damage.`
        },
        {
          title: "Risk of Diabetic Retinopathy & Neuropathy",
          detail: "Sustained high blood glucose damages peripheral capillaries, nerves in feet, and retinal vasculature."
        }
      ];

      recommendedMedications = [
        {
          name: "Metformin Hydrochloride ER",
          strength: "500 mg (Extended Release)",
          category: "Antidiabetic / Biguanide",
          expiryDate: "12/2028",
          expiryStatus: "SAFE",
          howToUse: "Swallow whole with a full glass of water. Strictly take WITH or immediately AFTER your heaviest meal.",
          whenToTake: "Twice daily with breakfast and dinner.",
          whyToTake: "Suppresses excess glucose production in the liver, increases muscular insulin sensitivity, and helps bring HbA1c down to safe target levels without causing hypoglycemia.",
          precaution: "Avoid heavy alcohol bingeing; periodic kidney function (eGFR) monitoring advised."
        },
        {
          name: "Empagliflozin",
          strength: "10 mg / 25 mg",
          category: "SGLT-2 Inhibitor",
          expiryDate: "10/2028",
          expiryStatus: "SAFE",
          howToUse: "Take once daily in the morning with plenty of water.",
          whenToTake: "Morning with or without breakfast.",
          whyToTake: "Assists kidneys in eliminating excess blood glucose directly through urine while providing cardiovascular and renal protection.",
          precaution: "Maintain adequate hydration throughout the day."
        }
      ];

      lifestyleTips = [
        "Adopt a Low Glycemic Index (GI) diet: cut refined white sugar, sodas, and white bread.",
        "Engage in 30 minutes of brisk aerobic walking 5 days a week.",
        "Check fasting and postprandial glucose levels with a home glucometer weekly."
      ];
    }
    // Check Lipid / Cholesterol
    else if (parameters.some(p => p.name.includes("Cholesterol") && p.value > 200) || parameters.some(p => p.name.includes("LDL") && p.value > 130)) {
      const ldl = parameters.find(p => p.name.includes("LDL"));
      const tc = parameters.find(p => p.name.includes("Total Cholesterol"));
      const tg = parameters.find(p => p.name.includes("Triglycerides"));

      diagnosedDisease = "Hyperlipidemia & Atherosclerotic Cardiovascular Risk";
      severity = (ldl && ldl.value > 160) ? "HIGH RISK" : "MODERATE";
      specialist = "Cardiologist / Lipid Specialist";
      explanation = `Elevated Low-Density Lipoprotein (${ldl ? ldl.value + ' mg/dL' : ''}) and Total Cholesterol (${tc ? tc.value + ' mg/dL' : ''}) indicate high levels of circulating atherogenic lipoproteins that can deposit plaque in coronary and carotid arteries.`;

      specificProblems = [
        {
          title: "Elevated Atherogenic LDL ('Bad') Cholesterol",
          detail: `LDL level of ${ldl ? ldl.value : 'high'} mg/dL significantly exceeds safe threshold (< 100 mg/dL), driving fatty plaque accumulation in blood vessels.`
        },
        {
          title: "Hypertriglyceridemia",
          detail: `Triglycerides at ${tg ? tg.value : 'high'} mg/dL add metabolic stress and promote arterial thickening.`
        },
        {
          title: "Cardiovascular Event Risk",
          detail: "Significantly higher risk of coronary artery disease, hypertension, and myocardial infarction if untreated."
        }
      ];

      recommendedMedications = [
        {
          name: "Atorvastatin Calcium",
          strength: "20 mg",
          category: "Lipid Lowering / Statin",
          expiryDate: "11/2028",
          expiryStatus: "SAFE",
          howToUse: "Take once daily with a glass of water. Swallow whole without crushing.",
          whenToTake: "Once daily at bedtime (cholesterol biosynthesis peaks during nighttime).",
          whyToTake: "Potently inhibits hepatic HMG-CoA reductase, clearing LDL cholesterol particles from the bloodstream and stabilizing arterial plaque to prevent heart attacks.",
          precaution: "Avoid large amounts of grapefruit juice. Report any unexplained severe muscle aches."
        }
      ];

      lifestyleTips = [
        "Reduce saturated fats, butter, and deep-fried foods; replace with heart-healthy olive oil and nuts.",
        "Increase soluble dietary fiber (oats, beans, psyllium husk).",
        "Monitor blood pressure and lipid profile every 3-6 months."
      ];
    }
    // Check Anemia
    else if (parameters.some(p => p.name.includes("Hemoglobin") && p.value < 11.5)) {
      const hb = parameters.find(p => p.name.includes("Hemoglobin"));

      diagnosedDisease = "Microcytic Hypochromic Anemia (Iron Deficiency)";
      severity = (hb && hb.value < 9.0) ? "HIGH / SEVERE" : "MODERATE";
      specialist = "Hematologist / General Physician";
      explanation = `Significantly reduced Hemoglobin level (${hb ? hb.value + ' g/dL' : ''}) impairs the blood's capacity to transport oxygen to vital organs, leading to fatigue, dizziness, pallor, and reduced stamina.`;

      specificProblems = [
        {
          title: "Severe Hemoglobin Deficiency",
          detail: `Hemoglobin reading of ${hb ? hb.value : 'low'} g/dL is well below normal minimum (12.0 g/dL), causing chronic tissue hypoxia.`
        },
        {
          title: "Diminished Red Blood Cell Oxygen Transport",
          detail: "Decreased oxygen delivery causes fatigue, chronic headache, brain fog, and shortness of breath upon mild exertion."
        },
        {
          title: "Bone Marrow Iron Depletion",
          detail: "Insufficient iron substrate prevents red blood cell maturation in the bone marrow."
        }
      ];

      recommendedMedications = [
        {
          name: "Ferrous Ascorbate + Folic Acid",
          strength: "100 mg Elemental Iron + 1.5 mg Folic Acid",
          category: "Hematinic & Mineral Supplement",
          expiryDate: "03/2029",
          expiryStatus: "SAFE",
          howToUse: "Take orally with a glass of water or citrus juice (Vitamin C dramatically boosts iron absorption).",
          whenToTake: "Once daily, 1 hour before lunch on an empty stomach (or after food if mild nausea occurs).",
          whyToTake: "Replenishes depleted bone marrow iron stores, revitalizing red blood cell hemoglobin synthesis.",
          precaution: "Do not take with tea, coffee, milk, or antacids, as calcium and tannins inhibit iron uptake."
        }
      ];

      lifestyleTips = [
        "Incorporate iron-rich foods: spinach, beetroots, pomegranates, lentils, and lean proteins.",
        "Avoid drinking tea or coffee within 1 hour of meals.",
        "Recheck CBC after 30 to 45 days of oral therapy."
      ];
    }
    // Check Thyroid
    else if (parameters.some(p => p.name.includes("TSH") && p.value > 5.0)) {
      const tsh = parameters.find(p => p.name.includes("TSH"));

      diagnosedDisease = "Primary Hypothyroidism (Underactive Thyroid)";
      severity = (tsh && tsh.value > 8.0) ? "MODERATE TO HIGH" : "MILD";
      specialist = "Endocrinologist";
      explanation = `Elevated Serum TSH (${tsh ? tsh.value + ' mIU/L' : ''}) indicates that the pituitary gland is sending excessive hormonal signals to compensate for an underactive thyroid gland producing insufficient thyroxine.`;

      specificProblems = [
        {
          title: "Pituitary TSH Hypersecretion",
          detail: `TSH level of ${tsh ? tsh.value : 'high'} mIU/L reflects biological feedback striving to stimulate a failing thyroid gland.`
        },
        {
          title: "Basal Metabolic Rate Deceleration",
          detail: "Insufficient free thyroid hormones cause unexplained weight gain, chronic fatigue, cold intolerance, and constipation."
        },
        {
          title: "Cardiovascular & Lipid Secondary Effects",
          detail: "Untreated hypothyroidism can cause secondary elevation of serum LDL cholesterol and bradycardia (slow heart rate)."
        }
      ];

      recommendedMedications = [
        {
          name: "Levothyroxine Sodium",
          strength: "50 mcg / 75 mcg",
          category: "Thyroid Hormone Replacement",
          expiryDate: "01/2029",
          expiryStatus: "SAFE",
          howToUse: "Take strictly on an EMPTY stomach with a full glass of plain water at least 30-45 minutes before tea, coffee, or breakfast.",
          whenToTake: "Early morning upon waking up.",
          whyToTake: "Restores normal physiologic circulating thyroxine (T4) levels, revitalizing metabolic rate, energy, and cardiovascular function.",
          precaution: "Strict adherence to morning empty-stomach timing is crucial for absorption."
        }
      ];

      lifestyleTips = [
        "Maintain adequate iodine and selenium in diet.",
        "Do not discontinue medication suddenly; repeat TSH level in 6-8 weeks for dose calibration."
      ];
    }
    else {
      diagnosedDisease = "Mild Metabolic Variation / Generalized Evaluation";
      severity = "MILD";
      specialist = "General Practitioner";
      explanation = "Biomarkers show mild variations from reference ranges. Clinical correlation with physical symptoms is recommended.";
      
      specificProblems = [
        {
          title: "Biomarker Boundary Fluctuation",
          detail: "Slight deviations from reference boundaries observed. Likely transient or diet-related."
        }
      ];

      recommendedMedications = [
        {
          name: "Multivitamin & Mineral Complex",
          strength: "Daily Formula",
          category: "Nutritional Supplement",
          expiryDate: "06/2028",
          expiryStatus: "SAFE",
          howToUse: "Take 1 tablet daily with food.",
          whenToTake: "Morning after breakfast.",
          whyToTake: "Supports cellular energy metabolism and immune homeostasis.",
          precaution: "Stay well hydrated."
        }
      ];
      lifestyleTips = ["Maintain balanced hydration and nutrient-dense whole foods diet.", "Ensure 7-8 hours of sleep."];
    }

    return {
      diagnosedDisease,
      severity,
      explanation,
      specificProblems,
      specialist,
      parameters,
      recommendedMedications,
      lifestyleTips,
      reportDate,
      retestExpiryDate,
      expiryStatus: "ACTIVE_AND_VALID",
      validityWindow: "Valid for 90 Days (Re-test before expiration)",
      analyzedAt: new Date().toISOString()
    };
  }

  getSampleReportData(presetId) {
    const preset = LAB_SAMPLE_PRESETS.find(p => p.id === presetId) || LAB_SAMPLE_PRESETS[0];
    return {
      preset,
      diagnosis: this.diagnoseFromParameters(preset.data.parameters, preset.testType)
    };
  }
}

window.LAB_SAMPLE_PRESETS = LAB_SAMPLE_PRESETS;
window.labReportAnalyzer = new LabReportAnalyzer();
