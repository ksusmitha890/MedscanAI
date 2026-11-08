/**
 * MedScan AI - Health Diary & Vitals Calculator
 * Supports:
 * - Blood Pressure Calculation & AHA Classification
 * - Weight & Height -> BMI, Category, Ideal Weight & Calorie Targets
 * - Blood Sugar Level Calculation & Glycemic Classification (Fasting, Post-Prandial, HbA1c)
 * - Persistent User Log Storage & History Management
 */

class HealthDiaryManager {
  constructor() {
    this.storageKey = 'medscan_health_diary_entries';
    this.init();
  }

  init() {
    const existing = this.getAllEntries();
    if (!existing || existing.length === 0) {
      // Seed with initial realistic health diary logs for Alex Sharma
      const sampleLogs = [
        {
          id: 'log-1',
          userId: 'usr-demo-1',
          type: 'BP',
          title: 'Blood Pressure',
          valueDisplay: '128 / 82 mmHg',
          secondaryDisplay: 'Pulse: 74 bpm',
          status: 'Elevated BP (Prehypertension)',
          severity: 'warning',
          notes: 'Morning reading after 10 mins rest',
          date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
          time: '08:15 AM'
        },
        {
          id: 'log-2',
          userId: 'usr-demo-1',
          type: 'SUGAR',
          title: 'Blood Sugar (Fasting)',
          valueDisplay: '134 mg/dL',
          secondaryDisplay: 'Fasting 10 hrs',
          status: 'High (Diabetic Range)',
          severity: 'danger',
          notes: 'Fasting glucose before breakfast and morning Metformin',
          date: new Date(Date.now() - 86400000).toLocaleDateString(),
          time: '07:45 AM'
        },
        {
          id: 'log-3',
          userId: 'usr-demo-1',
          type: 'WEIGHT',
          title: 'Weight & BMI',
          valueDisplay: '76.5 kg',
          secondaryDisplay: 'BMI: 25.8 kg/m² (Overweight)',
          status: 'Mildly Overweight',
          severity: 'warning',
          notes: 'Weekly weigh-in on empty stomach',
          date: new Date(Date.now() - 86400000 * 3).toLocaleDateString(),
          time: '08:00 AM'
        }
      ];
      this.saveAllEntries(sampleLogs);
    }
  }

  getAllEntries() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveAllEntries(entries) {
    localStorage.setItem(this.storageKey, JSON.stringify(entries));
  }

  getUserEntries(userId) {
    const all = this.getAllEntries();
    if (!userId) return all;
    return all.filter(e => e.userId === userId || !e.userId);
  }

  addEntry({ userId, type, title, valueDisplay, secondaryDisplay, status, severity, notes }) {
    const all = this.getAllEntries();
    const newEntry = {
      id: 'log-' + Date.now(),
      userId: userId || 'guest',
      type,
      title,
      valueDisplay,
      secondaryDisplay: secondaryDisplay || '',
      status,
      severity,
      notes: notes || 'Logged in Health Diary',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    all.unshift(newEntry);
    this.saveAllEntries(all);
    return newEntry;
  }

  deleteEntry(id) {
    let all = this.getAllEntries();
    all = all.filter(e => e.id !== id);
    this.saveAllEntries(all);
  }

  // ==========================================
  // CALCULATOR: BLOOD PRESSURE
  // ==========================================
  calculateBloodPressure(systolic, diastolic, pulse = 72) {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    const hr = parseInt(pulse) || 72;

    if (isNaN(sys) || isNaN(dia) || sys < 50 || dia < 30) {
      throw new Error('Please enter valid Systolic and Diastolic numbers.');
    }

    // Mean Arterial Pressure (MAP) = DBP + 1/3(SBP - DBP)
    const map = Math.round(dia + (sys - dia) / 3);
    const pulsePressure = sys - dia;

    let category = '';
    let severity = 'normal'; // 'normal' | 'warning' | 'danger'
    let recommendation = '';
    let colorClass = '';

    if (sys > 180 || dia > 120) {
      category = 'Hypertensive Crisis (Emergency)';
      severity = 'danger';
      colorClass = 'text-red-400 bg-red-950/80 border-red-800';
      recommendation = 'CRITICAL: Your blood pressure is dangerously high! If you have chest pain, shortness of breath, back pain, or vision changes, contact an emergency doctor immediately.';
    } else if (sys >= 140 || dia >= 90) {
      category = 'Hypertension Stage 2';
      severity = 'danger';
      colorClass = 'text-rose-400 bg-rose-950/80 border-rose-800';
      recommendation = 'Blood pressure is significantly elevated. Medical therapy and lifestyle intervention (low sodium diet, regular exercise, stress reduction) are strongly advised by a physician.';
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      category = 'Hypertension Stage 1';
      severity = 'warning';
      colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
      recommendation = 'Mild hypertension detected. Adopt the DASH diet, reduce table salt, avoid excess alcohol, and monitor your BP weekly.';
    } else if (sys >= 120 && sys <= 129 && dia < 80) {
      category = 'Elevated Blood Pressure';
      severity = 'warning';
      colorClass = 'text-yellow-400 bg-yellow-950/80 border-yellow-800';
      recommendation = 'Blood pressure is slightly elevated. Lifestyle modifications can help prevent full clinical hypertension.';
    } else if (sys < 90 || dia < 60) {
      category = 'Hypotension (Low Blood Pressure)';
      severity = 'warning';
      colorClass = 'text-sky-400 bg-sky-950/80 border-sky-800';
      recommendation = 'Blood pressure is below standard range. Ensure adequate hydration and electrolytes. Consult a physician if experiencing dizziness or fainting.';
    } else {
      category = 'Normal Blood Pressure';
      severity = 'normal';
      colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
      recommendation = 'Excellent! Your blood pressure is in the healthy range (< 120/80 mmHg). Continue maintaining healthy habits and balanced nutrition.';
    }

    return {
      systolic: sys,
      diastolic: dia,
      pulse: hr,
      map,
      pulsePressure,
      category,
      severity,
      recommendation,
      colorClass,
      displayString: `${sys} / ${dia} mmHg`,
      secondaryString: `Pulse: ${hr} bpm | MAP: ${map} mmHg`
    };
  }

  // ==========================================
  // CALCULATOR: WEIGHT & BMI
  // ==========================================
  calculateBMI(weightKg, heightCm) {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      throw new Error('Please enter valid positive numbers for Weight (kg) and Height (cm).');
    }

    const heightM = h / 100;
    const bmi = parseFloat((w / (heightM * heightM)).toFixed(1));

    // Ideal weight range for BMI 18.5 - 24.9
    const minIdealWeight = parseFloat((18.5 * heightM * heightM).toFixed(1));
    const maxIdealWeight = parseFloat((24.9 * heightM * heightM).toFixed(1));

    let category = '';
    let severity = 'normal';
    let colorClass = '';
    let recommendation = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      severity = 'warning';
      colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
      recommendation = 'Your BMI is below normal. Focus on nutrient-rich caloric foods, healthy fats (nuts, seeds, avocados), lean proteins, and resistance training to build healthy mass.';
    } else if (bmi <= 24.9) {
      category = 'Normal & Healthy Weight';
      severity = 'normal';
      colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
      recommendation = 'Great job! Your weight is in the ideal healthy range for your height. Maintain 150 minutes of moderate exercise weekly and a balanced diet.';
    } else if (bmi <= 29.9) {
      category = 'Overweight (Pre-obesity)';
      severity = 'warning';
      colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
      recommendation = 'Slightly above recommended weight. Incorporate daily 30-minute brisk walks, portion control, and limit refined carbohydrates and sugary beverages.';
    } else if (bmi <= 34.9) {
      category = 'Obesity Class I';
      severity = 'danger';
      colorClass = 'text-rose-400 bg-rose-950/80 border-rose-800';
      recommendation = 'Increased risk of metabolic syndrome, diabetes, and hypertension. Consult a dietitian or doctor for a structured caloric deficit and exercise plan.';
    } else {
      category = 'Obesity Class II/III';
      severity = 'danger';
      colorClass = 'text-red-400 bg-red-950/80 border-red-800';
      recommendation = 'High cardiovascular and metabolic risk. Professional medical evaluation, metabolic screening, and clinical weight management are recommended.';
    }

    // Hydration calculation: 35ml per kg
    const dailyWaterLiters = (w * 0.035).toFixed(1);

    return {
      weight: w,
      height: h,
      bmi,
      category,
      severity,
      colorClass,
      recommendation,
      minIdealWeight,
      maxIdealWeight,
      dailyWaterLiters,
      displayString: `${w} kg (BMI: ${bmi})`,
      secondaryString: `Height: ${h} cm | Target: ${minIdealWeight} - ${maxIdealWeight} kg`
    };
  }

  // ==========================================
  // CALCULATOR: BLOOD SUGAR (GLUCOSE)
  // ==========================================
  calculateBloodSugar(value, testType = 'fasting') {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) {
      throw new Error('Please enter a valid blood sugar reading.');
    }

    let category = '';
    let severity = 'normal';
    let colorClass = '';
    let recommendation = '';
    const unit = testType === 'hba1c' ? '%' : 'mg/dL';

    if (testType === 'fasting') {
      if (val < 70) {
        category = 'Hypoglycemia (Low Blood Sugar)';
        severity = 'danger';
        colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
        recommendation = 'Low blood sugar detected. Consume 15g fast-acting carbs (e.g. 1/2 cup fruit juice or 3 glucose candies) and retest in 15 minutes.';
      } else if (val <= 99) {
        category = 'Normal Fasting Blood Sugar';
        severity = 'normal';
        colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
        recommendation = 'Healthy fasting glycemic control. Keep up healthy dietary habits and regular physical activity.';
      } else if (val <= 125) {
        category = 'Impaired Fasting Glucose (Prediabetes)';
        severity = 'warning';
        colorClass = 'text-yellow-400 bg-yellow-950/80 border-yellow-800';
        recommendation = 'Elevated fasting glucose indicates early insulin resistance. Reduce refined carbohydrates, sugars, and white bread. Increase dietary fiber.';
      } else {
        category = 'Hyperglycemia (Diabetic Range)';
        severity = 'danger';
        colorClass = 'text-rose-400 bg-rose-950/80 border-rose-800';
        recommendation = 'Fasting glucose >= 126 mg/dL is in the clinical diabetic range. Consult an endocrinologist or physician for formal evaluation, HbA1c testing, and medical management.';
      }
    } else if (testType === 'postprandial') {
      if (val < 140) {
        category = 'Normal Post-Meal Glucose';
        severity = 'normal';
        colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
        recommendation = 'Blood sugar 2 hours after a meal is within healthy normal limits (< 140 mg/dL).';
      } else if (val <= 199) {
        category = 'Impaired Glucose Tolerance (Prediabetes)';
        severity = 'warning';
        colorClass = 'text-yellow-400 bg-yellow-950/80 border-yellow-800';
        recommendation = 'Post-meal spikes detected. Take a 15-minute walk after meals and avoid simple sugars.';
      } else {
        category = 'High Post-Meal Glucose (Diabetic Range)';
        severity = 'danger';
        colorClass = 'text-rose-400 bg-rose-950/80 border-rose-800';
        recommendation = 'Postprandial glucose >= 200 mg/dL indicates insufficient insulin response. Medical consultation for glycemic management is advised.';
      }
    } else if (testType === 'hba1c') {
      if (val < 5.7) {
        category = 'Normal Glycated Hemoglobin';
        severity = 'normal';
        colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
        recommendation = 'Average 3-month blood sugar is in the healthy non-diabetic range.';
      } else if (val <= 6.4) {
        category = 'Prediabetes (Elevated HbA1c)';
        severity = 'warning';
        colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
        recommendation = 'HbA1c between 5.7% and 6.4% indicates increased risk of progressing to full Type 2 Diabetes. Lifestyle intervention is effective at this stage.';
      } else {
        category = 'Diabetes (High HbA1c)';
        severity = 'danger';
        colorClass = 'text-red-400 bg-red-950/80 border-red-800';
        recommendation = 'HbA1c >= 6.5% confirms diabetes. Clinical monitoring, diet therapy, and potential antidiabetic pharmacotherapy are required.';
      }
    } else {
      // Random
      if (val < 140) {
        category = 'Normal Random Glucose';
        severity = 'normal';
        colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
        recommendation = 'Random blood sugar is within the normal non-fasting window.';
      } else if (val <= 199) {
        category = 'Elevated Random Glucose';
        severity = 'warning';
        colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
        recommendation = 'Slightly high random glucose. Fasting blood sugar or HbA1c test is recommended.';
      } else {
        category = 'High Random Glucose (Diabetic Range)';
        severity = 'danger';
        colorClass = 'text-red-400 bg-red-950/80 border-red-800';
        recommendation = 'Random glucose >= 200 mg/dL accompanied by symptoms (thirst, frequent urination) suggests diabetes.';
      }
    }

    const typeNames = {
      fasting: 'Fasting Blood Sugar',
      postprandial: 'Post-Meal (PPBS)',
      random: 'Random Blood Sugar',
      hba1c: 'HbA1c (3-Month Average)'
    };

    return {
      value: val,
      unit,
      testType,
      testTypeName: typeNames[testType] || 'Blood Glucose',
      category,
      severity,
      colorClass,
      recommendation,
      displayString: `${val} ${unit}`,
      secondaryString: `Test Type: ${typeNames[testType] || testType}`
    };
  }
}

window.healthDiaryManager = new HealthDiaryManager();
