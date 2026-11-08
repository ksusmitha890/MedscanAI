/**
 * Patient Profile & Stored Medicine Cabinet Manager
 * Handles:
 * - Patient profile storage & active switching
 * - Storing & adding prescribed/daily medicines with full details:
 *   Name, Purpose/Indication, Dosage, Schedule, Expiry Date, Remaining Count, Notes
 * - Daily pill checklist / compliance tracking
 */

class PatientManager {
  constructor() {
    this.storageKey = 'medscan_patients';
    this.activeKey = 'medscan_active_patient_id';
    this.cabinetKey = 'medscan_medicine_cabinet';
    this.init();
  }

  init() {
    let patients = this.getPatients();
    if (!patients || patients.length === 0) {
      patients = [
        {
          id: 'usr-demo-1',
          name: 'Alex Sharma',
          age: 34,
          gender: 'Male',
          bloodGroup: 'B+',
          allergies: ['Penicillin', 'Sulfa Drugs'],
          conditions: ['Hypertension', 'Type 2 Diabetes'],
          emergencyContact: '+91 98765 43210',
          notes: 'Monitors BP and blood sugar daily at home.'
        },
        {
          id: 'usr-demo-2',
          name: 'Dr. Priya Patel',
          age: 41,
          gender: 'Female',
          bloodGroup: 'O+',
          allergies: ['NSAIDs / Aspirin'],
          conditions: ['Mild Asthma'],
          emergencyContact: '+91 91234 56789',
          notes: 'Asthma inhaler available as needed.'
        }
      ];
      this.savePatients(patients);
      this.setActivePatientId('usr-demo-1');
    }

    // Seed realistic initial stored medicines in cabinet
    let cabinet = this.getCabinet();
    if (!cabinet || cabinet.length === 0) {
      cabinet = [
        {
          id: 'med-store-1',
          patientId: 'usr-demo-1',
          name: 'Paracetamol / Dolo 650',
          genericName: 'Acetaminophen 650mg',
          strength: '650 mg',
          purpose: 'High Fever & Headache Relief',
          category: 'Analgesics & Antipyretics',
          howToTake: 'Swallow whole with water every 4-6 hours as needed. Never exceed 4 tablets in 24 hours.',
          timing: 'Morning 🌅 & Night 🌙 (After Food)',
          frequency: 'As Needed (SOS)',
          expiryDate: '2028-11-30',
          expiryStatus: 'SAFE',
          stockQuantity: 15,
          notes: 'Keep on hand for sudden fever spikes or body pain.',
          dateAdded: new Date(Date.now() - 86400000 * 5).toISOString(),
          takenToday: false,
          lastTaken: null
        },
        {
          id: 'med-store-2',
          patientId: 'usr-demo-1',
          name: 'Metformin Hydrochloride ER',
          genericName: 'Metformin ER 500mg',
          strength: '500 mg',
          purpose: 'Blood Sugar Control / Type 2 Diabetes',
          category: 'Antidiabetic',
          howToTake: 'Take strictly WITH or immediately after breakfast with a full glass of water.',
          timing: 'Morning 🌅 (With Breakfast)',
          frequency: 'Daily (Every Morning)',
          expiryDate: '2028-08-15',
          expiryStatus: 'SAFE',
          stockQuantity: 28,
          notes: 'Daily prescribed dose for glycemic management.',
          dateAdded: new Date(Date.now() - 86400000 * 10).toISOString(),
          takenToday: true,
          lastTaken: '08:30 AM'
        },
        {
          id: 'med-store-3',
          patientId: 'usr-demo-1',
          name: 'Amlodipine Besylate',
          genericName: 'Amlodipine 5mg',
          strength: '5 mg',
          purpose: 'Blood Pressure Control / Hypertension',
          category: 'Antihypertensive',
          howToTake: 'Take once daily at 9:00 AM with water. Do not skip.',
          timing: 'Morning 🌅 (9:00 AM)',
          frequency: 'Daily (Once Daily)',
          expiryDate: '2027-05-20',
          expiryStatus: 'SAFE',
          stockQuantity: 22,
          notes: 'Keeps BP below 130/80 mmHg.',
          dateAdded: new Date(Date.now() - 86400000 * 12).toISOString(),
          takenToday: true,
          lastTaken: '09:05 AM'
        }
      ];
      this.saveCabinet(cabinet);
    }
  }

  getPatients() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  savePatients(patients) {
    localStorage.setItem(this.storageKey, JSON.stringify(patients));
  }

  getActivePatient() {
    const patients = this.getPatients();
    const activeId = localStorage.getItem(this.activeKey);
    return patients.find(p => p.id === activeId) || patients[0] || null;
  }

  setActivePatientId(id) {
    localStorage.setItem(this.activeKey, id);
  }

  addPatient(patient) {
    const patients = this.getPatients();
    const existingIndex = patients.findIndex(p => p.id === patient.id || p.name.toLowerCase() === patient.name.toLowerCase());
    
    if (existingIndex !== -1) {
      patients[existingIndex] = { ...patients[existingIndex], ...patient };
      this.savePatients(patients);
      this.setActivePatientId(patients[existingIndex].id);
      return patients[existingIndex];
    }

    const newPatient = {
      ...patient,
      id: patient.id || ('p-' + Date.now())
    };
    patients.push(newPatient);
    this.savePatients(patients);
    this.setActivePatientId(newPatient.id);
    return newPatient;
  }

  // Medication Cabinet Methods
  getCabinet() {
    try {
      const data = localStorage.getItem(this.cabinetKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveCabinet(items) {
    localStorage.setItem(this.cabinetKey, JSON.stringify(items));
  }

  getUserCabinet(patientId) {
    const cabinet = this.getCabinet();
    if (!patientId) return cabinet;
    return cabinet.filter(m => m.patientId === patientId || !m.patientId);
  }

  addToCabinet({ name, genericName, strength, purpose, category, howToTake, timing, frequency, expiryDate, stockQuantity, notes }) {
    if (!name || name.trim() === '') {
      throw new Error('Please enter a medicine name.');
    }

    const cabinet = this.getCabinet();
    const activePatient = this.getActivePatient();

    // Check expiry status
    let expiryStatus = 'SAFE';
    if (expiryDate) {
      const exp = new Date(expiryDate);
      const now = new Date();
      const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) {
        expiryStatus = 'EXPIRED';
      } else if (diffDays <= 60) {
        expiryStatus = 'EXPIRING_SOON';
      } else {
        expiryStatus = 'SAFE';
      }
    }

    const entry = {
      id: 'med-' + Date.now(),
      patientId: activePatient ? activePatient.id : 'default',
      patientName: activePatient ? activePatient.name : 'Patient',
      name: name.trim(),
      genericName: genericName ? genericName.trim() : name.trim(),
      strength: strength ? strength.trim() : '',
      purpose: purpose ? purpose.trim() : 'Prescribed Treatment',
      category: category || 'General Medicine',
      howToTake: howToTake ? howToTake.trim() : 'Take as directed by doctor with water.',
      timing: timing || 'Morning 🌅 (After Food)',
      frequency: frequency || 'Daily',
      expiryDate: expiryDate || '2028-12-31',
      expiryStatus,
      stockQuantity: parseInt(stockQuantity) || 20,
      notes: notes ? notes.trim() : '',
      dateAdded: new Date().toISOString(),
      takenToday: false,
      lastTaken: null
    };

    cabinet.unshift(entry);
    this.saveCabinet(cabinet);
    return entry;
  }

  toggleMedicationTaken(medId) {
    const cabinet = this.getCabinet();
    const item = cabinet.find(m => m.id === medId);
    if (item) {
      item.takenToday = !item.takenToday;
      item.lastTaken = item.takenToday ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
      if (item.takenToday && item.stockQuantity > 0) {
        item.stockQuantity -= 1;
      }
      this.saveCabinet(cabinet);
      return item;
    }
    return null;
  }

  removeFromCabinet(medId) {
    let cabinet = this.getCabinet();
    cabinet = cabinet.filter(m => m.id !== medId);
    this.saveCabinet(cabinet);
  }
}

window.patientManager = new PatientManager();
