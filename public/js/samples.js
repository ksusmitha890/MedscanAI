/**
 * Realistic Sample Medicine Images & Prescription Generator (SVG Data URLs)
 * Enables instant one-click testing without requiring physical camera or medicine strips.
 */

const SAMPLE_PRESETS = [
  {
    id: "amoxicillin-500",
    title: "Amoxicillin 500mg Strip",
    type: "medicine",
    category: "Antibiotic",
    subtitle: "Blister strip of 10 capsules",
    dataTag: "sample:amoxicillin",
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <defs>
          <linearGradient id="foil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e2e8f0" />
            <stop offset="35%" stop-color="#cbd5e1" />
            <stop offset="50%" stop-color="#f8fafc" />
            <stop offset="70%" stop-color="#94a3b8" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.25"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#0f172a"/>
        <g transform="translate(100, 60)" filter="url(#shadow)">
          <!-- Foil Pack Background -->
          <rect width="600" height="380" rx="16" fill="url(#foil)" stroke="#64748b" stroke-width="3"/>
          
          <!-- Blister pockets (10 capsules) -->
          ${[0, 1, 2, 3, 4].map(col => `
            <g transform="translate(${50 + col * 105}, 50)">
              <!-- Capsule 1 (top row) -->
              <rect width="80" height="42" rx="21" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
              <rect width="40" height="42" rx="0" fill="#ef4444"/>
              <text x="40" y="26" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">AMOX</text>
              <!-- Capsule 2 (bottom row) -->
              <g transform="translate(0, 240)">
                <rect width="80" height="42" rx="21" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
                <rect width="40" height="42" rx="0" fill="#ef4444"/>
                <text x="40" y="26" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">500mg</text>
              </g>
            </g>
          `).join('')}

          <!-- Medicine Label Details (Center Strip) -->
          <rect x="30" y="125" width="540" height="130" rx="8" fill="#ffffff" opacity="0.92" stroke="#cbd5e1"/>
          
          <text x="50" y="155" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">Rx Prescription Drug</text>
          <text x="50" y="185" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" fill="#0f172a">AMOXICILLIN CAPSULES IP</text>
          <text x="50" y="210" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1e293b">500 mg - Broad Spectrum Antibiotic</text>
          
          <text x="50" y="235" font-family="Arial, sans-serif" font-size="11" fill="#475569">Each hard gelatin capsule contains: Amoxicillin Trihydrate IP eq. to Anhydrous Amoxicillin 500mg</text>
          
          <text x="420" y="155" font-family="Courier, monospace" font-size="11" fill="#334155">B.No: AMX-2481</text>
          <text x="420" y="172" font-family="Courier, monospace" font-size="11" fill="#334155">MFD: 03/2026</text>
          <text x="420" y="189" font-family="Courier, monospace" font-size="11" font-weight="bold" fill="#b91c1c">EXP: 02/2029</text>
          <text x="420" y="215" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">MRP: $12.50 / 10 Caps</text>

          <!-- Warning strip -->
          <rect x="30" y="240" width="540" height="15" fill="#fecaca"/>
          <text x="45" y="251" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#991b1b">SCHEDULE H PRESCRIPTION: To be sold by retail on prescription of a Registered Medical Practitioner only.</text>
        </g>
      </svg>
    `
  },
  {
    id: "paracetamol-650",
    title: "Dolo 650mg / Paracetamol Strip",
    type: "medicine",
    category: "Pain & Fever",
    subtitle: "Blister pack of 15 tablets",
    dataTag: "sample:paracetamol",
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <defs>
          <linearGradient id="doloBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="50%" stop-color="#0369a1" />
            <stop offset="100%" stop-color="#075985" />
          </linearGradient>
          <filter id="shadowDolo" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#090d16"/>
        <g transform="translate(100, 60)" filter="url(#shadowDolo)">
          <rect width="600" height="380" rx="16" fill="url(#doloBg)" stroke="#38bdf8" stroke-width="2"/>
          
          <!-- Tablet outlines -->
          ${[0, 1, 2, 3, 4].map(col => `
            <g transform="translate(${45 + col * 108}, 40)">
              <rect width="84" height="44" rx="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
              <line x1="42" y1="5" x2="42" y2="39" stroke="#cbd5e1" stroke-width="2"/>
              <text x="42" y="26" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#0369a1" text-anchor="middle">DOLO</text>
              <g transform="translate(0, 255)">
                <rect width="84" height="44" rx="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
                <line x1="42" y1="5" x2="42" y2="39" stroke="#cbd5e1" stroke-width="2"/>
                <text x="42" y="26" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#0369a1" text-anchor="middle">650</text>
              </g>
            </g>
          `).join('')}

          <rect x="30" y="115" width="540" height="150" rx="8" fill="#ffffff"/>
          <text x="50" y="145" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0284c7">ANTIPYRETIC &amp; ANALGESIC TABLETS</text>
          <text x="50" y="185" font-family="'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="900" fill="#0f172a">DOLO 650</text>
          <text x="250" y="185" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#475569">Paracetamol Tablets IP 650 mg</text>
          <text x="50" y="215" font-family="Arial, sans-serif" font-size="12" fill="#334155">Composition: Each uncoated tablet contains Paracetamol IP 650 mg. Excipients q.s.</text>
          <text x="50" y="235" font-family="Arial, sans-serif" font-size="11" fill="#dc2626" font-weight="bold">WARNING: Taking more than daily dose of 4000mg may cause serious liver damage or allergic reactions.</text>

          <text x="420" y="145" font-family="Courier, monospace" font-size="11" fill="#0f172a">Batch: DL-88402</text>
          <text x="420" y="162" font-family="Courier, monospace" font-size="11" fill="#0f172a">Mfg: OCT 2026</text>
          <text x="420" y="179" font-family="Courier, monospace" font-size="11" font-weight="bold" fill="#b91c1c">Exp: SEP 2029</text>
        </g>
      </svg>
    `
  },
  {
    id: "sample-rx",
    title: "Doctor's Prescription Note",
    type: "prescription",
    category: "Prescription",
    subtitle: "Clinical Rx for Acute Bronchitis",
    dataTag: "sample:rx",
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <filter id="paperShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#0f172a"/>
        <g transform="translate(100, 30)" filter="url(#paperShadow)">
          <!-- Prescription Sheet Paper -->
          <rect width="600" height="540" rx="8" fill="#fffdfa" stroke="#e2e8f0" stroke-width="2"/>
          
          <!-- Clinic Header -->
          <rect x="0" y="0" width="600" height="95" rx="8" fill="#1e3a8a"/>
          <text x="40" y="42" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="#ffffff">ST. JUDE METROPOLITAN CLINIC</text>
          <text x="40" y="65" font-family="Arial, sans-serif" font-size="12" fill="#bfdbfe">Department of Internal Medicine &amp; Pulmonology</text>
          <text x="40" y="82" font-family="Arial, sans-serif" font-size="11" fill="#93c5fd">104 Health Boulevard, Metro City • Tel: (555) 019-2834</text>
          
          <text x="440" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Dr. Robert Vance, MD</text>
          <text x="440" y="60" font-family="Arial, sans-serif" font-size="11" fill="#bfdbfe">Reg No: MED-88392-A</text>
          <text x="440" y="78" font-family="Arial, sans-serif" font-size="11" fill="#bfdbfe">Board Certified Internist</text>

          <!-- Patient Information Bar -->
          <rect x="25" y="110" width="550" height="48" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="40" y="132" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">Patient: John Doe</text>
          <text x="210" y="132" font-family="Arial, sans-serif" font-size="12" fill="#475569">Age: 48 Y / Male</text>
          <text x="350" y="132" font-family="Arial, sans-serif" font-size="12" fill="#475569">Date: Today</text>
          <text x="40" y="148" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#b91c1c">Known Allergy: Penicillin (Caution!)</text>

          <!-- Clinical Diagnosis -->
          <text x="40" y="180" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#334155">Provisional Diagnosis: <tspan font-weight="normal">Acute Bronchitis, Productive Cough &amp; Pyrexia (101.4°F)</tspan></text>
          
          <!-- Rx Symbol -->
          <text x="40" y="225" font-family="'Times New Roman', serif" font-size="44" font-weight="bold" font-style="italic" fill="#1e3a8a">℞</text>

          <!-- Prescribed Medicines Table -->
          <g transform="translate(40, 240)">
            <!-- Line 1 -->
            <text x="30" y="20" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0f172a">1. Cap. Amoxicillin 500mg</text>
            <text x="50" y="38" font-family="Arial, sans-serif" font-size="13" fill="#1e40af">-- Signa: 1-0-1 (1 cap twice daily after meals) x 5 days</text>
            
            <!-- Line 2 -->
            <text x="30" y="75" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0f172a">2. Tab. Paracetamol 650mg</text>
            <text x="50" y="93" font-family="Arial, sans-serif" font-size="13" fill="#1e40af">-- Signa: SOS / PRN for fever &gt; 100°F (Max 3/day)</text>

            <!-- Line 3 -->
            <text x="30" y="130" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#0f172a">3. Tab. Pantoprazole 40mg</text>
            <text x="50" y="148" font-family="Arial, sans-serif" font-size="13" fill="#1e40af">-- Signa: 1-0-0 (Once daily before breakfast) x 5 days</text>
          </g>

          <!-- Doctor Instructions -->
          <rect x="35" y="420" width="530" height="50" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
          <text x="50" y="440" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1e40af">General Advice:</text>
          <text x="50" y="456" font-family="Arial, sans-serif" font-size="11" fill="#1e3a8a">• Steam inhalation twice daily. Drink warm water. Avoid cold drinks.</text>

          <!-- Doctor Signature Stamp -->
          <g transform="translate(390, 480)">
            <text x="40" y="15" font-family="'Brush Script MT', cursive, sans-serif" font-size="24" fill="#1e3a8a">R. Vance MD</text>
            <line x1="0" y1="20" x2="160" y2="20" stroke="#64748b" stroke-width="1"/>
            <text x="25" y="34" font-family="Arial, sans-serif" font-size="10" fill="#64748b">Registered Physician Signature</text>
          </g>
        </g>
      </svg>
    `
  },
  {
    id: "metformin-500",
    title: "Metformin 500mg ER Blister",
    type: "medicine",
    category: "Diabetes",
    subtitle: "Type-2 Diabetes Management",
    dataTag: "sample:metformin",
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <defs>
          <linearGradient id="metFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f1f5f9" />
            <stop offset="50%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>
          <filter id="shadowMet" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#0a0f1d"/>
        <g transform="translate(100, 60)" filter="url(#shadowMet)">
          <rect width="600" height="380" rx="16" fill="url(#metFoil)" stroke="#64748b" stroke-width="2"/>
          
          ${[0, 1, 2, 3, 4].map(col => `
            <g transform="translate(${50 + col * 105}, 45)">
              <circle cx="40" cy="25" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
              <text x="40" y="29" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">MET 500</text>
              <circle cx="40" cy="275" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
              <text x="40" y="279" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">ER</text>
            </g>
          `).join('')}

          <rect x="30" y="125" width="540" height="135" rx="8" fill="#ffffff"/>
          <text x="50" y="155" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#059669">ORAL HYPOGLYCEMIC AGENT</text>
          <text x="50" y="190" font-family="'Helvetica Neue', Arial, sans-serif" font-size="30" font-weight="900" fill="#0f172a">METFORMIN HCl ER TABLETS</text>
          <text x="50" y="215" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#334155">500 mg Extended Release</text>
          <text x="50" y="238" font-family="Arial, sans-serif" font-size="11" fill="#475569">Directions: Take strictly WITH meals. Swallow whole; do not chew or crush.</text>

          <text x="420" y="155" font-family="Courier, monospace" font-size="11" fill="#0f172a">Batch: MT-99120</text>
          <text x="420" y="172" font-family="Courier, monospace" font-size="11" fill="#0f172a">MFD: 01/2026</text>
          <text x="420" y="189" font-family="Courier, monospace" font-size="11" font-weight="bold" fill="#b91c1c">EXP: 12/2028</text>
        </g>
      </svg>
    `
  },
  {
    id: "amlodipine-5",
    title: "Amlodipine 5mg Strip",
    type: "medicine",
    category: "Cardiovascular",
    subtitle: "Blood Pressure & Angina Control",
    dataTag: "sample:amlodipine",
    getSvg: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <defs>
          <linearGradient id="amloBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf4ff" />
            <stop offset="50%" stop-color="#fae8ff" />
            <stop offset="100%" stop-color="#f5d0fe" />
          </linearGradient>
          <filter id="shadowAmlo" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#111827"/>
        <g transform="translate(100, 60)" filter="url(#shadowAmlo)">
          <rect width="600" height="380" rx="16" fill="url(#amloBg)" stroke="#d946ef" stroke-width="2"/>
          
          ${[0, 1, 2, 3, 4].map(col => `
            <g transform="translate(${55 + col * 105}, 45)">
              <polygon points="40,5 65,25 40,45 15,25" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
              <text x="40" y="28" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#7e22ce" text-anchor="middle">AML 5</text>
              <g transform="translate(0, 245)">
                <polygon points="40,5 65,25 40,45 15,25" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
                <text x="40" y="28" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#7e22ce" text-anchor="middle">5mg</text>
              </g>
            </g>
          `).join('')}

          <rect x="30" y="125" width="540" height="135" rx="8" fill="#ffffff"/>
          <text x="50" y="155" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#9333ea">CALCIUM CHANNEL BLOCKER</text>
          <text x="50" y="190" font-family="'Helvetica Neue', Arial, sans-serif" font-size="32" font-weight="900" fill="#0f172a">AMLODIPINE BESYLATE</text>
          <text x="50" y="215" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#334155">5 mg Tablets IP</text>
          <text x="50" y="238" font-family="Arial, sans-serif" font-size="11" fill="#475569">Directions: Take once daily at the same time every day. Do not discontinue suddenly.</text>

          <text x="420" y="155" font-family="Courier, monospace" font-size="11" fill="#0f172a">Batch: AM-4410</text>
          <text x="420" y="172" font-family="Courier, monospace" font-size="11" fill="#0f172a">MFD: 02/2026</text>
          <text x="420" y="189" font-family="Courier, monospace" font-size="11" font-weight="bold" fill="#b91c1c">EXP: 01/2029</text>
        </g>
      </svg>
    `
  }
];

function getSampleDataUrl(presetId) {
  const preset = SAMPLE_PRESETS.find(p => p.id === presetId) || SAMPLE_PRESETS[0];
  const svgString = preset.getSvg();
  const encodedSvg = encodeURIComponent(svgString);
  // Embed dataTag comment so vision engine can identify it
  return `data:image/svg+xml;utf8,<!--${preset.dataTag}-->${encodedSvg}`;
}

window.SAMPLE_PRESETS = SAMPLE_PRESETS;
window.getSampleDataUrl = getSampleDataUrl;
