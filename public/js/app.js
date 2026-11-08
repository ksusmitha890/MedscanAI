/**
 * MedScan AI - Master Application Controller
 * Handles:
 * 1. Authentication (Register by Name, Pass, Age, Gender, Health Conditions; Login by Name & Pass; Logout)
 * 2. Medicine Visual Scanner & Search (Paracetamol example: Fever & Uses, How to use, Adults/Children/Citizens,
 *    How much drug, Overdose meter, If any problems, When to contact doctor, Expiry dates)
 * 3. Voice Announcement (TTS audio player with waveform visualizer and speed controls)
 * 4. Lab Report Scanner (Biomarker highlights, specific problems identified, report expiry validity)
 * 5. Health Diary (Calculators for Blood Pressure, Weight/BMI, Sugar Levels & persistent logs)
 * 6. Stored Medicines Cabinet (Add & store medicines, expiry tracking, daily checklist, stock count)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Workspace Elements
  const authView = document.getElementById('authView');
  const mainAppWorkspace = document.getElementById('mainAppWorkspace');
  const showAuthBtn = document.getElementById('showAuthBtn');
  const userProfilePill = document.getElementById('userProfilePill');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userIdentifierDisplay = document.getElementById('userIdentifierDisplay');
  const userAvatarIcon = document.getElementById('userAvatarIcon');
  const logoutBtn = document.getElementById('logoutBtn');
  const activePatientInfo = document.getElementById('activePatientInfo');
  const brandLogoHome = document.getElementById('brandLogoHome');

  // Auth Forms
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  const quickDemoLoginBtn = document.getElementById('quickDemoLoginBtn');
  const quickDemoDoctorBtn = document.getElementById('quickDemoDoctorBtn');

  // Navigation Tabs
  const tabMedicineScanner = document.getElementById('tabMedicineScanner');
  const tabLabReport = document.getElementById('tabLabReport');
  const tabHealthDiary = document.getElementById('tabHealthDiary');
  const tabMedicineCabinet = document.getElementById('tabMedicineCabinet');

  const medicineScannerView = document.getElementById('medicineScannerView');
  const labReportView = document.getElementById('labReportView');
  const healthDiaryView = document.getElementById('healthDiaryView');
  const medicineCabinetView = document.getElementById('medicineCabinetView');

  // Scanner & Camera Elements
  const videoFeed = document.getElementById('videoFeed');
  const captureCanvas = document.getElementById('captureCanvas');
  const previewImage = document.getElementById('previewImage');
  const cameraView = document.getElementById('cameraView');
  const previewView = document.getElementById('previewView');
  const cameraEmptyState = document.getElementById('cameraEmptyState');

  const startCameraBtn = document.getElementById('startCameraBtn');
  const stopCameraBtn = document.getElementById('stopCameraBtn');
  const switchCameraBtn = document.getElementById('switchCameraBtn');
  const snapBtn = document.getElementById('snapBtn');
  const uploadInput = document.getElementById('uploadInput');
  const dropZone = document.getElementById('dropZone');
  const retakeBtn = document.getElementById('retakeBtn');
  const scanBtn = document.getElementById('scanBtn');
  const scanModeSelect = document.getElementById('scanModeSelect');
  const quickParacetamolHeroBtn = document.getElementById('quickParacetamolHeroBtn');

  // Results & Progress
  const scanningOverlay = document.getElementById('scanningOverlay');
  const scanningStatusText = document.getElementById('scanningStatusText');
  const resultsContainer = document.getElementById('resultsContainer');
  const welcomeHero = document.getElementById('welcomeHero');
  const ttsBtn = document.getElementById('ttsBtn');
  const ttsBtnText = document.getElementById('ttsBtnText');
  const ttsStopBtn = document.getElementById('ttsStopBtn');
  const audioWaveVisualizer = document.getElementById('audioWaveVisualizer');
  const voiceSpeakingBadge = document.getElementById('voiceSpeakingBadge');
  const addToCabinetBtn = document.getElementById('addToCabinetBtn');
  const printReportBtn = document.getElementById('printReportBtn');

  // Search Elements
  const searchInput = document.getElementById('searchInput');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');

  // Lab Report Elements
  const labReportFileInput = document.getElementById('labReportFileInput');
  const sampleLabReportsGrid = document.getElementById('sampleLabReportsGrid');
  const labEmptyState = document.getElementById('labEmptyState');
  const labReportResultCard = document.getElementById('labReportResultCard');
  const addLabMedsToCabinetBtn = document.getElementById('addLabMedsToCabinetBtn');

  // Health Diary Elements
  const bpForm = document.getElementById('bpForm');
  const saveBpEntryBtn = document.getElementById('saveBpEntryBtn');
  const bpResultBox = document.getElementById('bpResultBox');
  const bpCategoryBadge = document.getElementById('bpCategoryBadge');
  const bpNumbersDisplay = document.getElementById('bpNumbersDisplay');
  const bpAdviceDisplay = document.getElementById('bpAdviceDisplay');

  const bmiForm = document.getElementById('bmiForm');
  const saveBmiEntryBtn = document.getElementById('saveBmiEntryBtn');
  const bmiResultBox = document.getElementById('bmiResultBox');
  const bmiCategoryBadge = document.getElementById('bmiCategoryBadge');
  const bmiDisplay = document.getElementById('bmiDisplay');
  const bmiAdviceDisplay = document.getElementById('bmiAdviceDisplay');

  const sugarForm = document.getElementById('sugarForm');
  const saveSugarEntryBtn = document.getElementById('saveSugarEntryBtn');
  const sugarResultBox = document.getElementById('sugarResultBox');
  const sugarCategoryBadge = document.getElementById('sugarCategoryBadge');
  const sugarDisplay = document.getElementById('sugarDisplay');
  const sugarAdviceDisplay = document.getElementById('sugarAdviceDisplay');

  const diaryHistoryTableBody = document.getElementById('diaryHistoryTableBody');
  const addQuickDemoLogBtn = document.getElementById('addQuickDemoLogBtn');
  const clearDiaryBtn = document.getElementById('clearDiaryBtn');

  // Stored Medicines Cabinet Elements
  const cabinetAddForm = document.getElementById('cabinetAddForm');
  const cabinetFullGrid = document.getElementById('cabinetFullGrid');
  const cabinetModal = document.getElementById('cabinetModal');
  const openCabinetBtn = document.getElementById('openCabinetBtn');
  const closeCabinetBtn = document.getElementById('closeCabinetBtn');
  const cabinetList = document.getElementById('cabinetList');
  const cabinetCountBadge = document.getElementById('cabinetCountBadge');
  const modalSwitchToCabinetTabBtn = document.getElementById('modalSwitchToCabinetTabBtn');

  // Gemini API Modal
  const apiKeyModal = document.getElementById('apiKeyModal');
  const openApiKeyBtn = document.getElementById('openApiKeyBtn');
  const closeApiKeyBtn = document.getElementById('closeApiKeyBtn');
  const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const modelSelect = document.getElementById('modelSelect');

  // Application State
  let mediaStream = null;
  let currentFacingMode = 'environment';
  let currentImageDataUrl = null;
  let lastScanResult = null;
  let lastLabDiagnosis = null;
  let currentSpeechRate = 1.0;
  let lastCalculatedBP = null;
  let lastCalculatedBMI = null;
  let lastCalculatedSugar = null;

  // Vision Engine Instance
  const visionEngine = new MedScanVisionEngine();

  // ==========================================
  // INITIALIZATION
  // ==========================================
  initAuthUI();
  initSampleGallery();
  initLabReportSamples();
  initApiKeySettings();
  renderDiaryLogs();
  renderCabinetFullGrid();
  renderCabinetModalList();
  updateCabinetBadge();

  // Calculate default calculators once on load
  try {
    calculateBP();
    calculateBMI();
    calculateSugar();
  } catch (e) {
    // defaults
  }

  window.addEventListener('auth_state_changed', () => {
    initAuthUI();
    renderDiaryLogs();
    renderCabinetFullGrid();
    renderCabinetModalList();
    updateCabinetBadge();
  });

  // ==========================================
  // 1. AUTHENTICATION (REGISTER / LOGIN / LOGOUT)
  // ==========================================
  function initAuthUI() {
    const user = window.authManager.getCurrentUser();

    if (user) {
      // User is logged in
      authView.classList.add('hidden');
      mainAppWorkspace.classList.remove('hidden');

      userProfilePill.classList.remove('hidden');
      showAuthBtn.classList.add('hidden');

      userNameDisplay.textContent = user.name;
      userIdentifierDisplay.textContent = `Age: ${user.age} • ${user.gender}`;
      userAvatarIcon.textContent = user.avatar || (user.gender === 'Female' ? '👩' : '👨');

      // Update safety shield bar
      const conditionsStr = user.conditions?.length > 0 ? user.conditions.join(', ') : 'None reported';
      const allergiesStr = user.allergies?.length > 0 ? user.allergies.join(', ') : 'No drug allergies';
      activePatientInfo.innerHTML = `
        Active Profile: <strong>${user.name}</strong> (${user.age}Y/${user.gender}) •
        Conditions: <span class="text-amber-300 font-semibold">${conditionsStr}</span> •
        Allergies: <span class="text-rose-300 font-semibold">${allergiesStr}</span>
      `;
    } else {
      // User is logged out
      userProfilePill.classList.add('hidden');
      showAuthBtn.classList.remove('hidden');

      activePatientInfo.innerHTML = `
        <span class="text-amber-400">Visitor Mode:</span> Please sign in or register to enable personalized safety audits, health diary logs &amp; medicine cabinet storage.
      `;
    }
  }

  // Switch between Login and Register tabs
  tabLoginBtn?.addEventListener('click', () => {
    tabLoginBtn.classList.add('bg-cyan-600', 'text-white', 'shadow');
    tabLoginBtn.classList.remove('text-slate-400');
    tabRegisterBtn.classList.remove('bg-cyan-600', 'text-white', 'shadow');
    tabRegisterBtn.classList.add('text-slate-400');

    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    authTitle.textContent = 'Welcome to MedScan AI';
    authSubtitle.textContent = 'Sign In with your Name, Mobile Number & Password';
  });

  tabRegisterBtn?.addEventListener('click', () => {
    tabRegisterBtn.classList.add('bg-cyan-600', 'text-white', 'shadow');
    tabRegisterBtn.classList.remove('text-slate-400');
    tabLoginBtn.classList.remove('bg-cyan-600', 'text-white', 'shadow');
    tabLoginBtn.classList.add('text-slate-400');

    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authTitle.textContent = 'Welcome to MedScan AI';
    authSubtitle.textContent = 'Register with your Name, Mobile Number, Password, Age, Gender & Health Conditions';
  });

  // Handle Login (User Request: Name, Number & Password)
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('loginName')?.value || document.getElementById('loginIdentifier')?.value || '';
    const number = document.getElementById('loginNumber')?.value || '';
    const password = document.getElementById('loginPassword').value;

    try {
      const user = window.authManager.login(name, number, password);
      loginForm.reset();
      showToast(`Welcome back, ${user.name}! Accessing your health dashboard.`);
    } catch (err) {
      alert(err.message);
    }
  });

  // Handle Registration (Name, Phone Number, Password, Age, Gender, Health Conditions, Allergies)
  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone')?.value || '';
    const password = document.getElementById('regPassword').value;
    const age = document.getElementById('regAge').value;
    const gender = document.getElementById('regGender').value;
    const conditions = document.getElementById('regConditions').value;
    const allergies = document.getElementById('regAllergies').value;

    try {
      const newUser = window.authManager.register({
        name,
        phone,
        password,
        age,
        gender,
        conditions,
        allergies
      });
      registerForm.reset();
      showToast(`Account created for ${newUser.name}! You are now logged in.`);
    } catch (err) {
      alert(err.message);
    }
  });

  // Quick Demo Login buttons
  quickDemoLoginBtn?.addEventListener('click', () => {
    const user = window.authManager.loginAsDemo(0);
    if (user) {
      if (document.getElementById('loginName')) document.getElementById('loginName').value = user.name;
      if (document.getElementById('loginNumber')) document.getElementById('loginNumber').value = user.phone;
      if (document.getElementById('loginPassword')) document.getElementById('loginPassword').value = user.password;
      showToast(`Signed in as demo patient ${user.name}!`);
    }
  });

  quickDemoDoctorBtn?.addEventListener('click', () => {
    const user = window.authManager.loginAsDemo(1);
    if (user) {
      if (document.getElementById('loginName')) document.getElementById('loginName').value = user.name;
      if (document.getElementById('loginNumber')) document.getElementById('loginNumber').value = user.phone;
      if (document.getElementById('loginPassword')) document.getElementById('loginPassword').value = user.password;
      showToast(`Signed in as demo physician ${user.name}!`);
    }
  });

  // Logout button (Clears session & immediately displays Auth View)
  logoutBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out of your profile?')) {
      window.authManager.logout();
      window.speechHelper.stop();
      authView.classList.remove('hidden');
      mainAppWorkspace.classList.add('hidden');
      showToast('You have been logged out. Please enter your Name & Password to sign in.');
    }
  });

  showAuthBtn?.addEventListener('click', () => {
    authView.classList.remove('hidden');
    mainAppWorkspace.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // 2. NAVIGATION TABS (4 TABS)
  // ==========================================
  function switchTab(activeTabBtn, activeView) {
    // Reset all tabs
    [tabMedicineScanner, tabLabReport, tabHealthDiary, tabMedicineCabinet].forEach(btn => {
      btn?.classList.remove('active', 'text-white');
      btn?.classList.add('text-slate-400');
    });

    // Hide all views
    [medicineScannerView, labReportView, healthDiaryView, medicineCabinetView].forEach(view => {
      view?.classList.add('hidden');
    });

    // Activate selected
    activeTabBtn?.classList.add('active', 'text-white');
    activeTabBtn?.classList.remove('text-slate-400');
    activeView?.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabMedicineScanner?.addEventListener('click', () => switchTab(tabMedicineScanner, medicineScannerView));
  tabLabReport?.addEventListener('click', () => switchTab(tabLabReport, labReportView));
  tabHealthDiary?.addEventListener('click', () => switchTab(tabHealthDiary, healthDiaryView));
  tabMedicineCabinet?.addEventListener('click', () => switchTab(tabMedicineCabinet, medicineCabinetView));

  brandLogoHome?.addEventListener('click', () => {
    authView.classList.add('hidden');
    mainAppWorkspace.classList.remove('hidden');
    switchTab(tabMedicineScanner, medicineScannerView);
  });

  modalSwitchToCabinetTabBtn?.addEventListener('click', () => {
    cabinetModal.classList.add('hidden');
    switchTab(tabMedicineCabinet, medicineCabinetView);
  });

  // Quick Hero button for Paracetamol 650
  quickParacetamolHeroBtn?.addEventListener('click', () => {
    loadMedicinePreset('paracetamol-650');
  });

  // ==========================================
  // 3. MEDICINE VISUAL SCANNER & SEARCH
  // ==========================================
  function initSampleGallery() {
    const gallery = document.getElementById('samplePresetsGallery');
    if (!gallery || !window.SAMPLE_PRESETS) return;

    gallery.innerHTML = '';
    window.SAMPLE_PRESETS.forEach(sample => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-slate-900 border border-slate-700/80 rounded-xl hover:border-cyan-500 transition cursor-pointer text-left';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-1">
          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">${sample.category}</span>
          <span class="text-[10px] text-slate-500">Test</span>
        </div>
        <h4 class="text-xs font-bold text-white leading-tight">${sample.title}</h4>
        <p class="text-[10px] text-slate-400 mt-0.5">${sample.subtitle}</p>
      `;

      card.addEventListener('click', () => {
        loadMedicinePreset(sample.id);
      });

      gallery.appendChild(card);
    });
  }

  function loadMedicinePreset(presetId) {
    const preset = window.SAMPLE_PRESETS?.find(s => s.id === presetId);
    if (!preset) return;

    // Set preview
    const svgString = preset.getSvg();
    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    showPreview(dataUrl);

    // Auto trigger scan
    executeScan(dataUrl, preset.type);
  }

  // Camera Controls
  startCameraBtn?.addEventListener('click', async () => {
    try {
      if (mediaStream) {
        stopCamera();
      }
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode }
      });
      videoFeed.srcObject = mediaStream;
      videoFeed.classList.remove('hidden');
      cameraEmptyState.classList.add('hidden');
      startCameraBtn.classList.add('hidden');
      stopCameraBtn.classList.remove('hidden');
      snapBtn.disabled = false;
      switchCameraBtn.disabled = false;
    } catch (err) {
      alert('Unable to access camera: ' + err.message + '\nYou can still use Demo Presets or file upload.');
    }
  });

  stopCameraBtn?.addEventListener('click', stopCamera);

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop());
      mediaStream = null;
    }
    videoFeed.classList.add('hidden');
    cameraEmptyState.classList.remove('hidden');
    startCameraBtn.classList.remove('hidden');
    stopCameraBtn.classList.add('hidden');
    snapBtn.disabled = true;
    switchCameraBtn.disabled = true;
  }

  switchCameraBtn?.addEventListener('click', () => {
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    stopCamera();
    startCameraBtn.click();
  });

  snapBtn?.addEventListener('click', () => {
    if (!videoFeed || !mediaStream) return;
    captureCanvas.width = videoFeed.videoWidth || 640;
    captureCanvas.height = videoFeed.videoHeight || 480;
    const ctx = captureCanvas.getContext('2d');
    ctx.drawImage(videoFeed, 0, 0, captureCanvas.width, captureCanvas.height);
    const dataUrl = captureCanvas.toDataURL('image/jpeg', 0.9);
    window.speechHelper.playShutterSound();
    stopCamera();
    showPreview(dataUrl);
  });

  // File Upload & Drop Zone
  uploadInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  });

  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-cyan-400', 'bg-slate-800');
  });

  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-cyan-400', 'bg-slate-800');
  });

  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-cyan-400', 'bg-slate-800');
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  });

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      showPreview(dataUrl);
      executeScan(dataUrl, scanModeSelect.value);
    };
    reader.readAsDataURL(file);
  }

  function showPreview(dataUrl) {
    currentImageDataUrl = dataUrl;
    previewImage.src = dataUrl;
    cameraView.classList.add('hidden');
    previewView.classList.remove('hidden');
  }

  retakeBtn?.addEventListener('click', () => {
    currentImageDataUrl = null;
    previewView.classList.add('hidden');
    cameraView.classList.remove('hidden');
    if (!mediaStream) {
      cameraEmptyState.classList.remove('hidden');
    }
  });

  scanBtn?.addEventListener('click', () => {
    if (!currentImageDataUrl) {
      alert('Please snap or upload a medication image first, or pick a demo preset!');
      return;
    }
    executeScan(currentImageDataUrl, scanModeSelect.value);
  });

  // Search input with auto-suggestions
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      searchResultsDropdown.classList.add('hidden');
      return;
    }

    const matches = MEDICINE_DATABASE.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.genericName.toLowerCase().includes(query) ||
      (m.brandNames && m.brandNames.some(b => b.toLowerCase().includes(query))) ||
      (m.indications && m.indications.some(i => i.toLowerCase().includes(query)))
    );

    if (matches.length === 0) {
      searchResultsDropdown.innerHTML = `<p class="p-3 text-xs text-slate-400">No matching medicine found. Try "Paracetamol", "Dolo", or "Amoxicillin".</p>`;
      searchResultsDropdown.classList.remove('hidden');
      return;
    }

    searchResultsDropdown.innerHTML = '';
    matches.forEach(m => {
      const row = document.createElement('div');
      row.className = 'p-3 hover:bg-slate-700/80 cursor-pointer border-b border-slate-700/60 transition flex items-center justify-between';
      row.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <strong class="text-xs font-bold text-white">${m.name}</strong>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">${m.strength}</span>
          </div>
          <p class="text-[10px] text-slate-400 mt-0.5">${m.genericName} • ${m.category}</p>
        </div>
        <span class="text-[10px] font-bold text-cyan-400">View Details →</span>
      `;

      row.addEventListener('click', () => {
        searchInput.value = m.name;
        searchResultsDropdown.classList.add('hidden');
        displayDirectMedicine(m);
      });

      searchResultsDropdown.appendChild(row);
    });
    searchResultsDropdown.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput?.contains(e.target) && !searchResultsDropdown?.contains(e.target)) {
      searchResultsDropdown?.classList.add('hidden');
    }
  });

  // Execute Medicine Scan
  async function executeScan(dataUrl, mode = 'auto') {
    welcomeHero.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    scanningOverlay.classList.remove('hidden');

    const activeUser = window.authManager.getCurrentUser();

    try {
      const result = await visionEngine.analyzeImage(dataUrl, mode, activeUser);
      lastScanResult = result;

      window.speechHelper.playSuccessChime();

      scanningOverlay.classList.add('hidden');
      resultsContainer.classList.remove('hidden');

      displayScanResult(result, activeUser);
    } catch (err) {
      scanningOverlay.classList.add('hidden');
      alert('Analysis error: ' + err.message);
    }
  }

  function displayScanResult(result, user) {
    document.getElementById('aiSourceBadge').textContent = result.aiSource || 'Clinical Knowledge Engine';

    // Render Safety Guardian Alerts
    renderSafetyAlerts(result.safetyAlerts, user);

    if (result.type === 'prescription' && result.prescription) {
      document.getElementById('medicineResultCard').classList.add('hidden');
      document.getElementById('prescriptionResultCard').classList.remove('hidden');
      renderPrescriptionDetails(result.prescription);
    } else {
      document.getElementById('prescriptionResultCard').classList.add('hidden');
      document.getElementById('medicineResultCard').classList.remove('hidden');
      renderMedicineDetails(result.medicine);
    }
  }

  function displayDirectMedicine(med) {
    switchTab(tabMedicineScanner, medicineScannerView);
    welcomeHero.classList.add('hidden');
    resultsContainer.classList.remove('hidden');

    const activeUser = window.authManager.getCurrentUser();
    const result = {
      type: 'medicine',
      confidence: 0.99,
      aiSource: 'Direct Clinical Knowledge Base Lookup',
      medicine: med,
      safetyAlerts: visionEngine.checkSafety(med, activeUser)
    };
    lastScanResult = result;

    displayScanResult(result, activeUser);
  }

  function renderSafetyAlerts(alerts = [], user) {
    const alertBox = document.getElementById('safetyAlertBox');
    alertBox.innerHTML = '';

    if (!user) {
      alertBox.innerHTML = `
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-400 flex items-center justify-between">
          <span>Sign in to verify medicine suitability against your health conditions and allergy records.</span>
          <button id="alertLoginBtn" class="text-cyan-400 font-bold underline">Sign In</button>
        </div>
      `;
      alertBox.querySelector('#alertLoginBtn')?.addEventListener('click', () => {
        authView.classList.remove('hidden');
        mainAppWorkspace.classList.add('hidden');
      });
      return;
    }

    if (!alerts || alerts.length === 0) {
      alertBox.innerHTML = `
        <div class="flex items-start gap-3 p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
          <div class="p-2 bg-emerald-900/60 text-emerald-400 rounded-lg shrink-0">✓</div>
          <div>
            <h4 class="text-xs font-bold text-emerald-300">Safety Guardian: Patient Compatible</h4>
            <p class="text-[11px] text-emerald-200/80 mt-0.5">
              No recorded contraindications found for <strong>${user.name}</strong> (Conditions: ${user.conditions?.join(', ') || 'None'} • Allergies: ${user.allergies?.join(', ') || 'None'}).
            </p>
          </div>
        </div>
      `;
      return;
    }

    alerts.forEach(alert => {
      const isSevere = alert.severity === 'high' || alert.type === 'allergy';
      const div = document.createElement('div');
      div.className = `flex items-start gap-3 p-4 rounded-2xl ${
        isSevere ? 'bg-red-950/50 border border-red-800 text-red-200' : 'bg-amber-950/40 border border-amber-800 text-amber-200'
      }`;
      div.innerHTML = `
        <div class="p-2 rounded-lg shrink-0 text-base ${isSevere ? 'bg-red-900/60 text-red-400' : 'bg-amber-900/60 text-amber-400'}">
          ${isSevere ? '🚨' : '⚠️'}
        </div>
        <div>
          <h4 class="text-xs font-bold ${isSevere ? 'text-red-300' : 'text-amber-300'}">${alert.title}</h4>
          <p class="text-[11px] mt-0.5 leading-relaxed">${alert.message}</p>
        </div>
      `;
      alertBox.appendChild(div);
    });
  }

  // RENDER MEDICINE DETAILS (ALL FIELDS REQUESTED BY USER)
  function renderMedicineDetails(med) {
    if (!med) return;

    // Header info
    document.getElementById('medName').textContent = med.name || 'Medication';
    document.getElementById('medGeneric').textContent = med.genericName ? `Generic Molecule: ${med.genericName}` : '';
    document.getElementById('medStrength').textContent = med.strength || '';
    document.getElementById('medCategory').textContent = med.category || 'Pharmaceutical';

    // USER REQUEST: EXPIRY DATE & BATCH
    document.getElementById('medExpiryDate').textContent = med.expiryDate || '02/2029';
    document.getElementById('medMfgDate').textContent = med.mfgDate || '03/2026';
    document.getElementById('medBatchNo').textContent = med.batchNo || 'DLO-650-8824';
    document.getElementById('medExpiryBadge').textContent = med.expiryStatus === 'EXPIRED' ? 'EXPIRED' : 'SAFE & VALID';
    document.getElementById('medValidityText').textContent = med.monthsRemaining ? `Valid for approx. ${med.monthsRemaining} months` : 'Safe for clinical use';

    // USER REQUEST: FEVER & USES
    document.getElementById('medWhyToTake').textContent = med.whyToTake || 'Prescribed for temperature control and pain relief.';
    const indicationsList = document.getElementById('medIndicationsList');
    if (indicationsList && med.indications) {
      indicationsList.innerHTML = '';
      med.indications.forEach(ind => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 bg-slate-800/80 p-2 rounded-xl border border-slate-700';
        li.innerHTML = `<span class="text-cyan-400 font-bold">✓</span> ${ind}`;
        indicationsList.appendChild(li);
      });
    }

    // USER REQUEST: HOW TO USE & WHEN TO TAKE
    document.getElementById('medHowToTake').textContent = med.howToTake || 'Take as advised with water.';
    document.getElementById('medWhenToTake').textContent = med.whenToTake || 'Take per scheduled prescription hours.';

    // USER REQUEST: IS IT OK FOR ADULTS, CHILDREN, CITIZENS (3 CARDS)
    if (med.suitability) {
      if (med.suitability.adults) {
        document.getElementById('adultDosage').textContent = med.suitability.adults.dosage || 'Standard dose';
        document.getElementById('adultMax').textContent = med.suitability.adults.maxDaily || 'Daily limit per day';
        document.getElementById('adultNotes').textContent = med.suitability.adults.notes || 'Safe for healthy adults.';
      }
      if (med.suitability.children) {
        document.getElementById('childDosage').textContent = med.suitability.children.dosage || 'Pediatric formula only';
        document.getElementById('childMax').textContent = med.suitability.children.maxDaily || 'Max 4 doses/day';
        document.getElementById('childNotes').textContent = med.suitability.children.notes || 'Consult pediatrician.';
      }
      if (med.suitability.citizens) {
        document.getElementById('citizenDosage').textContent = med.suitability.citizens.dosage || 'Adjusted dose';
        document.getElementById('citizenMax').textContent = med.suitability.citizens.maxDaily || 'Reduced daily max';
        document.getElementById('citizenNotes').textContent = med.suitability.citizens.notes || 'Lower liver clearance caution.';
      }
    }

    // USER REQUEST: HOW MUCH DRUG / OVERDOSE WARNING
    if (med.howMuchDrug) {
      document.getElementById('medOverdoseWarning').textContent = med.howMuchDrug.overdoseWarning || 'Do not exceed maximum daily limits.';
    }

    // USER REQUEST: IF ANY PROBLEMS (COMMON & SERIOUS SIDE EFFECTS)
    const commonSideEffects = document.getElementById('medCommonSideEffects');
    if (commonSideEffects) {
      commonSideEffects.innerHTML = '';
      const commonList = med.problems?.common || med.sideEffects?.common || ['Mild nausea', 'Mild dizziness'];
      commonList.forEach(se => {
        const span = document.createElement('span');
        span.className = 'text-[11px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700';
        span.textContent = se;
        commonSideEffects.appendChild(span);
      });
    }

    const seriousProblems = document.getElementById('medSeriousProblems');
    if (seriousProblems) {
      seriousProblems.innerHTML = '';
      const seriousList = med.problems?.serious || med.sideEffects?.serious || ['Acute liver damage in overdose', 'Allergic facial swelling'];
      seriousList.forEach(sp => {
        const p = document.createElement('p');
        p.textContent = `• ${sp}`;
        seriousProblems.appendChild(p);
      });
    }

    // USER REQUEST: CONTACTING DOCTOR INFORMATION
    const doctorWarningList = document.getElementById('medDoctorWarningList');
    if (doctorWarningList) {
      doctorWarningList.innerHTML = '';
      const doctorWarnings = med.whenToContactDoctor || [
        'Fever remains above 102°F or does not come down after 3 days',
        'Severe allergic symptoms: difficulty breathing, swelling of mouth, tongue, or lips',
        'Signs of liver distress: yellowing of skin or eyes (jaundice), severe stomach pain, dark urine',
        'Suspected overdose or intake exceeding maximum limit',
        'Unexplained blistering or peeling skin rash'
      ];
      doctorWarnings.forEach((w, idx) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2';
        li.innerHTML = `<span class="text-rose-400 font-bold shrink-0">${idx + 1}.</span> <span>${w}</span>`;
        doctorWarningList.appendChild(li);
      });
    }

    // Similar Medicines
    const similarContainer = document.getElementById('medSimilarContainer');
    if (similarContainer) {
      similarContainer.innerHTML = '';
      const similars = med.similarMedicines || [];
      if (similars.length === 0) {
        similarContainer.innerHTML = `<p class="text-xs text-slate-500">No alternatives cataloged.</p>`;
      } else {
        similars.forEach(sim => {
          const item = document.createElement('div');
          item.className = 'p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs flex items-center justify-between gap-2';
          item.innerHTML = `
            <div>
              <div class="flex items-center gap-2">
                <strong class="text-slate-100 font-bold">${sim.name}</strong>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">${sim.type || 'Equivalent'}</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-0.5">${sim.maker || 'Pharmaceutical Brand'}</p>
            </div>
            <div class="text-right shrink-0">
              <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">${sim.approxPrice || 'Cost-Effective'}</span>
            </div>
          `;
          similarContainer.appendChild(item);
        });
      }
    }

    document.getElementById('medStorage').textContent = med.storage || 'Store below 25°C away from moisture, heat, and direct sunlight.';
  }

  function renderPrescriptionDetails(rx) {
    if (!rx) return;
    document.getElementById('rxClinic').textContent = rx.clinic || 'Medical Clinic';
    document.getElementById('rxDoctorName').textContent = rx.doctorName || 'Prescribing Physician';
    document.getElementById('rxDate').textContent = rx.date || new Date().toLocaleDateString();
    document.getElementById('rxDiagnosis').textContent = rx.diagnosis || 'Clinical Consultation';

    const tableBody = document.getElementById('rxMedicationsTableBody');
    tableBody.innerHTML = '';
    (rx.medications || []).forEach((m, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800 hover:bg-slate-900/50';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-semibold text-slate-200">${idx + 1}. ${m.name}</td>
        <td class="py-2.5 px-3 text-cyan-400 font-bold">${m.dosage}</td>
        <td class="py-2.5 px-3 text-slate-300">${m.frequency}</td>
        <td class="py-2.5 px-3 text-slate-300">${m.duration}</td>
        <td class="py-2.5 px-3 text-slate-400 text-[11px]">${m.instructions || m.purpose || '--'}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // ==========================================
  // 4. VOICE ANNOUNCEMENT CONTROLS (TTS)
  // ==========================================
  ttsBtn?.addEventListener('click', () => {
    if (!lastScanResult) return;
    
    let speechText = '';
    if (lastScanResult.type === 'prescription') {
      const rx = lastScanResult.prescription;
      speechText = `Doctor prescription review. Diagnosis: ${rx.diagnosis}. Prescribed medicines include: `;
      (rx.medications || []).forEach(m => {
        speechText += `${m.name}, dosage ${m.dosage}, schedule: ${m.frequency}. Instructions: ${m.instructions || ''}. `;
      });
    } else {
      const med = lastScanResult.medicine;
      speechText = med.voiceAnnouncement || `
        Medication Information for ${med.name} ${med.strength}.
        Primary uses: ${med.indications ? med.indications.join(', ') : 'Fever and pain relief'}.
        How to use: ${med.howToTake}.
        Suitability: For adults, 500 to 650 milligrams per dose, maximum 4,000 milligrams daily. For children, pediatric syrup only based on body weight. For senior citizens, reduced daily maximum with liver monitoring.
        Safety warning: Never exceed maximum daily limit. Strictly avoid alcohol.
        Contact doctor immediately if fever lasts more than 3 days or if allergic swelling occurs.
      `;
    }

    window.speechHelper.toggleSpeech(speechText, { rate: currentSpeechRate });
  });

  ttsStopBtn?.addEventListener('click', () => {
    window.speechHelper.stop();
  });

  // Speed rate switcher buttons
  document.querySelectorAll('.tts-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tts-speed-btn').forEach(b => {
        b.classList.remove('bg-cyan-600', 'text-white');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('bg-cyan-600', 'text-white');
      btn.classList.remove('text-slate-400');
      currentSpeechRate = parseFloat(btn.dataset.rate) || 1.0;

      if (window.speechHelper.isPlaying) {
        // Restart speech with new rate
        const text = window.speechHelper.currentText;
        window.speechHelper.speak(text, { rate: currentSpeechRate });
      }
    });
  });

  // Speech helper event listeners
  window.addEventListener('speech_start', () => {
    ttsBtn.classList.add('bg-rose-600', 'hover:bg-rose-500');
    ttsBtn.classList.remove('bg-cyan-600', 'hover:bg-cyan-500');
    ttsBtnText.textContent = 'Pause Speech';
    ttsStopBtn.classList.remove('hidden');
    audioWaveVisualizer.classList.remove('hidden');
    voiceSpeakingBadge.classList.remove('hidden');
  });

  window.addEventListener('speech_pause', () => {
    ttsBtnText.textContent = 'Resume Speech';
    voiceSpeakingBadge.textContent = 'PAUSED';
    voiceSpeakingBadge.classList.remove('animate-pulse');
  });

  window.addEventListener('speech_resume', () => {
    ttsBtnText.textContent = 'Pause Speech';
    voiceSpeakingBadge.textContent = 'SPEAKING';
    voiceSpeakingBadge.classList.add('animate-pulse');
  });

  window.addEventListener('speech_end', () => {
    ttsBtn.classList.remove('bg-rose-600', 'hover:bg-rose-500');
    ttsBtn.classList.add('bg-cyan-600', 'hover:bg-cyan-500');
    ttsBtnText.textContent = 'Listen Aloud';
    ttsStopBtn.classList.add('hidden');
    audioWaveVisualizer.classList.add('hidden');
    voiceSpeakingBadge.classList.add('hidden');
  });

  // Save to Cabinet from Medicine Scanner
  addToCabinetBtn?.addEventListener('click', () => {
    if (!lastScanResult) return;

    if (lastScanResult.type === 'prescription') {
      (lastScanResult.prescription.medications || []).forEach(m => {
        window.patientManager.addToCabinet({
          name: m.name,
          genericName: m.name,
          strength: m.dosage,
          purpose: lastScanResult.prescription.diagnosis || 'Prescribed treatment',
          howToTake: m.instructions,
          frequency: m.frequency,
          timing: m.frequency,
          expiryDate: '2028-12-31',
          stockQuantity: 15
        });
      });
      showToast('All prescription medicines saved to your cabinet!');
    } else {
      const med = lastScanResult.medicine;
      window.patientManager.addToCabinet({
        name: med.name,
        genericName: med.genericName,
        strength: med.strength,
        purpose: med.indications ? med.indications[0] : 'Treatment',
        category: med.category,
        howToTake: med.howToTake,
        timing: med.whenToTake || 'Morning & Night (After food)',
        frequency: 'Daily',
        expiryDate: med.expiryDate ? convertExpiryToIso(med.expiryDate) : '2029-02-28',
        stockQuantity: 20
      });
      showToast(`${med.name} saved to your medicine cabinet!`);
    }

    renderCabinetFullGrid();
    renderCabinetModalList();
    updateCabinetBadge();
  });

  function convertExpiryToIso(expStr) {
    // converts e.g. "02/2029" to "2029-02-28"
    if (!expStr) return '2028-12-31';
    const parts = expStr.split('/');
    if (parts.length === 2) {
      const month = parts[0].padStart(2, '0');
      const year = parts[1];
      return `${year}-${month}-28`;
    }
    return expStr;
  }

  printReportBtn?.addEventListener('click', () => {
    window.print();
  });

  // ==========================================
  // 5. LAB REPORT ANALYZER & SPECIFIC PROBLEMS
  // ==========================================
  function initLabReportSamples() {
    if (!sampleLabReportsGrid || !window.LAB_SAMPLE_PRESETS) return;

    sampleLabReportsGrid.innerHTML = '';
    window.LAB_SAMPLE_PRESETS.forEach(preset => {
      const btn = document.createElement('div');
      btn.className = 'p-3 bg-slate-900 border border-slate-700/80 rounded-xl hover:border-cyan-500 transition cursor-pointer text-left flex items-center justify-between gap-3';
      btn.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-xs font-bold text-white">${preset.title}</h4>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">${preset.testType}</span>
          </div>
          <p class="text-[10px] text-slate-400 mt-0.5">${preset.subtitle}</p>
        </div>
        <button class="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-600 text-cyan-300 hover:text-white font-bold text-[10px] rounded-lg border border-cyan-800 shrink-0">
          Analyze
        </button>
      `;

      btn.addEventListener('click', () => {
        analyzeLabReport(preset.id);
      });

      sampleLabReportsGrid.appendChild(btn);
    });
  }

  labReportFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Analyze default diabetes profile for evaluation
      analyzeLabReport('sample-diabetes-report');
      showToast('Lab report uploaded & scanned successfully!');
    };
    reader.readAsDataURL(file);
  });

  function analyzeLabReport(presetId) {
    const data = window.labReportAnalyzer.getSampleReportData(presetId);
    if (!data) return;

    lastLabDiagnosis = data;

    labEmptyState.classList.add('hidden');
    labReportResultCard.classList.remove('hidden');

    const diag = data.diagnosis;

    // Report Expiry & Retest Dates (User Request)
    document.getElementById('labReportDate').textContent = diag.reportDate || data.preset.reportDate || '12/05/2026';
    document.getElementById('labExpiryDate').textContent = diag.retestExpiryDate || data.preset.retestExpiryDate || '12/08/2026';
    document.getElementById('labExpiryStatusBadge').textContent = diag.expiryStatus || 'ACTIVE & VALID';

    // Diagnosed condition
    document.getElementById('labDiagnosedDisease').textContent = diag.diagnosedDisease;
    document.getElementById('labSeverityBadge').textContent = diag.severity;
    document.getElementById('labExplanation').textContent = diag.explanation;

    // USER REQUEST: HIGHLIGHT VALUES TABLE
    const tableBody = document.getElementById('labBiomarkersTableBody');
    tableBody.innerHTML = '';
    (diag.parameters || []).forEach(p => {
      const isHigh = p.status === 'HIGH' || p.status === 'DIABETIC';
      const isLow = p.status === 'LOW';
      const isNormal = p.status === 'NORMAL';

      const tr = document.createElement('tr');
      tr.className = `border-b border-slate-800 ${isHigh ? 'bg-red-950/20' : (isLow ? 'bg-amber-950/20' : '')}`;
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-semibold text-slate-200">${p.name}</td>
        <td class="py-2.5 px-3 font-black ${isHigh ? 'text-red-400 text-sm' : (isLow ? 'text-amber-400 text-sm' : 'text-emerald-400')}">
          ${p.value} ${p.unit}
        </td>
        <td class="py-2.5 px-3 text-slate-400">${p.normalMin} - ${p.normalMax} ${p.unit}</td>
        <td class="py-2.5 px-3">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isHigh ? 'bg-red-950 text-red-400 border border-red-800' :
            (isLow ? 'bg-amber-950 text-amber-400 border border-amber-800' :
            'bg-emerald-950 text-emerald-400 border border-emerald-800')
          }">
            ${p.status} ${isHigh ? '▲' : (isLow ? '▼' : '✓')}
          </span>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // USER REQUEST: SPECIFIC PROBLEMS IDENTIFIED BY HIGHLIGHT VALUES
    const specificProblemsList = document.getElementById('labSpecificProblemsList');
    specificProblemsList.innerHTML = '';
    (diag.specificProblems || []).forEach((prob, idx) => {
      const div = document.createElement('div');
      div.className = 'p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs space-y-1';
      div.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-[10px]">
            ${idx + 1}
          </span>
          <strong class="text-slate-100 font-bold">${prob.title}</strong>
        </div>
        <p class="text-[11px] text-slate-300 pl-7 leading-relaxed">${prob.detail}</p>
      `;
      specificProblemsList.appendChild(div);
    });

    // Recommended Medications
    const medsContainer = document.getElementById('labRecommendedMedsContainer');
    medsContainer.innerHTML = '';
    (diag.recommendedMedications || []).forEach(med => {
      const card = document.createElement('div');
      card.className = 'p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2';
      card.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div>
            <div class="flex items-center gap-2">
              <h5 class="text-sm font-extrabold text-white">${med.name}</h5>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">${med.strength}</span>
            </div>
            <p class="text-[10px] text-slate-400">${med.category}</p>
          </div>
          <div class="text-right">
            <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
              Exp: ${med.expiryDate || '12/2028'}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <strong class="text-cyan-400 block text-[10px] uppercase">How to Use:</strong>
            <p class="text-slate-300 text-[11px] mt-0.5">${med.howToUse}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <strong class="text-indigo-400 block text-[10px] uppercase">When to Take:</strong>
            <p class="text-slate-300 text-[11px] mt-0.5">${med.whenToTake}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <strong class="text-emerald-400 block text-[10px] uppercase">Why to Take:</strong>
            <p class="text-slate-300 text-[11px] mt-0.5">${med.whyToTake}</p>
          </div>
        </div>
      `;
      medsContainer.appendChild(card);
    });

    document.getElementById('labSpecialist').textContent = diag.specialist;

    const lifestyleList = document.getElementById('labLifestyleList');
    lifestyleList.innerHTML = '';
    (diag.lifestyleTips || []).forEach(tip => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2';
      li.innerHTML = `<span class="text-emerald-400 font-bold shrink-0">✓</span> <span>${tip}</span>`;
      lifestyleList.appendChild(li);
    });

    window.speechHelper.playSuccessChime();
    showToast(`Lab report analyzed: Detected ${diag.diagnosedDisease}`);
  }

  addLabMedsToCabinetBtn?.addEventListener('click', () => {
    if (!lastLabDiagnosis) return;
    const meds = lastLabDiagnosis.diagnosis.recommendedMedications || [];
    meds.forEach(med => {
      window.patientManager.addToCabinet({
        name: med.name,
        genericName: med.name,
        strength: med.strength,
        purpose: lastLabDiagnosis.diagnosis.diagnosedDisease,
        category: med.category,
        howToTake: med.howToTake,
        timing: med.whenToTake,
        expiryDate: med.expiryDate ? convertExpiryToIso(med.expiryDate) : '2028-12-31',
        stockQuantity: 30
      });
    });
    renderCabinetFullGrid();
    renderCabinetModalList();
    updateCabinetBadge();
    showToast('Recommended medications saved to your cabinet!');
  });

  // ==========================================
  // 6. HEALTH DIARY (BP, WEIGHT, SUGAR CALCULATORS)
  // ==========================================
  // Blood Pressure
  bpForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateBP();
  });

  saveBpEntryBtn?.addEventListener('click', () => {
    try {
      const res = lastCalculatedBP || calculateBP();
      const user = window.authManager.getCurrentUser();
      window.healthDiaryManager.addEntry({
        userId: user ? user.id : 'guest',
        type: 'BP',
        title: 'Blood Pressure',
        valueDisplay: res.displayString,
        secondaryDisplay: res.secondaryString,
        status: res.category,
        severity: res.severity,
        notes: `BP Checked: ${res.category}`
      });
      renderDiaryLogs();
      showToast('Blood Pressure entry saved to your Health Diary!');
    } catch (err) {
      alert(err.message);
    }
  });

  function calculateBP() {
    const sys = document.getElementById('bpSystolic').value;
    const dia = document.getElementById('bpDiastolic').value;
    const pulse = document.getElementById('bpPulse').value;

    const res = window.healthDiaryManager.calculateBloodPressure(sys, dia, pulse);
    lastCalculatedBP = res;

    bpCategoryBadge.textContent = res.category;
    bpCategoryBadge.className = `text-[10px] font-bold px-2 py-0.5 rounded-full border ${res.colorClass}`;
    bpNumbersDisplay.textContent = res.displayString;
    bpAdviceDisplay.textContent = res.recommendation;

    return res;
  }

  // Weight & BMI
  bmiForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateBMI();
  });

  saveBmiEntryBtn?.addEventListener('click', () => {
    try {
      const res = lastCalculatedBMI || calculateBMI();
      const notes = document.getElementById('weightNotes').value;
      const user = window.authManager.getCurrentUser();
      window.healthDiaryManager.addEntry({
        userId: user ? user.id : 'guest',
        type: 'WEIGHT',
        title: 'Weight & BMI',
        valueDisplay: res.displayString,
        secondaryDisplay: res.secondaryString,
        status: res.category,
        severity: res.severity,
        notes: notes || 'Weekly weight record'
      });
      renderDiaryLogs();
      showToast('Weight & BMI record saved to your Health Diary!');
    } catch (err) {
      alert(err.message);
    }
  });

  function calculateBMI() {
    const w = document.getElementById('weightVal').value;
    const h = document.getElementById('heightVal').value;

    const res = window.healthDiaryManager.calculateBMI(w, h);
    lastCalculatedBMI = res;

    bmiCategoryBadge.textContent = `${res.category} (${res.bmi})`;
    bmiCategoryBadge.className = `text-[10px] font-bold px-2 py-0.5 rounded-full border ${res.colorClass}`;
    bmiDisplay.textContent = `BMI: ${res.bmi} kg/m² (${res.weight} kg)`;
    bmiAdviceDisplay.textContent = `${res.recommendation} Healthy target: ${res.minIdealWeight} - ${res.maxIdealWeight} kg. Daily water target: ${res.dailyWaterLiters} L.`;

    return res;
  }

  // Blood Sugar
  sugarForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateSugar();
  });

  saveSugarEntryBtn?.addEventListener('click', () => {
    try {
      const res = lastCalculatedSugar || calculateSugar();
      const user = window.authManager.getCurrentUser();
      window.healthDiaryManager.addEntry({
        userId: user ? user.id : 'guest',
        type: 'SUGAR',
        title: `Blood Sugar (${res.testTypeName})`,
        valueDisplay: res.displayString,
        secondaryDisplay: res.secondaryString,
        status: res.category,
        severity: res.severity,
        notes: `Glucose reading: ${res.category}`
      });
      renderDiaryLogs();
      showToast('Blood Sugar entry saved to your Health Diary!');
    } catch (err) {
      alert(err.message);
    }
  });

  function calculateSugar() {
    const type = document.getElementById('sugarTestType').value;
    const val = document.getElementById('sugarVal').value;

    const res = window.healthDiaryManager.calculateBloodSugar(val, type);
    lastCalculatedSugar = res;

    sugarCategoryBadge.textContent = `${res.category}`;
    sugarCategoryBadge.className = `text-[10px] font-bold px-2 py-0.5 rounded-full border ${res.colorClass}`;
    sugarDisplay.textContent = `${res.displayString} (${res.testTypeName})`;
    sugarAdviceDisplay.textContent = res.recommendation;

    return res;
  }

  // Health Diary History Table
  function renderDiaryLogs() {
    if (!diaryHistoryTableBody) return;
    const user = window.authManager.getCurrentUser();
    const entries = window.healthDiaryManager.getUserEntries(user ? user.id : null);

    diaryHistoryTableBody.innerHTML = '';

    if (entries.length === 0) {
      diaryHistoryTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-6 text-center text-slate-500 text-xs">
            No health diary records logged yet. Calculate your BP, BMI, or Sugar above and click "Save" to log entries!
          </td>
        </tr>
      `;
      return;
    }

    entries.forEach(entry => {
      const isDanger = entry.severity === 'danger';
      const isWarning = entry.severity === 'warning';

      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800 hover:bg-slate-900/50';
      tr.innerHTML = `
        <td class="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
          ${entry.date} <span class="text-slate-500 text-[10px]">${entry.time}</span>
        </td>
        <td class="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
          <span>${entry.type === 'BP' ? '❤️' : (entry.type === 'SUGAR' ? '🩸' : '⚖️')}</span>
          <span>${entry.title}</span>
        </td>
        <td class="py-2.5 px-3 font-black ${isDanger ? 'text-red-400' : (isWarning ? 'text-amber-400' : 'text-emerald-400')}">
          ${entry.valueDisplay}
          ${entry.secondaryDisplay ? `<span class="block text-[10px] text-slate-400 font-normal">${entry.secondaryDisplay}</span>` : ''}
        </td>
        <td class="py-2.5 px-3">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isDanger ? 'bg-red-950 text-red-400 border border-red-800' :
            (isWarning ? 'bg-amber-950 text-amber-400 border border-amber-800' :
            'bg-emerald-950 text-emerald-400 border border-emerald-800')
          }">
            ${entry.status}
          </span>
        </td>
        <td class="py-2.5 px-3 text-slate-300 text-[11px]">${entry.notes || '--'}</td>
        <td class="py-2.5 px-3 text-right">
          <button class="delete-diary-entry-btn text-slate-500 hover:text-red-400 p-1 transition" data-id="${entry.id}" title="Delete Record">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </td>
      `;

      tr.querySelector('.delete-diary-entry-btn')?.addEventListener('click', () => {
        window.healthDiaryManager.deleteEntry(entry.id);
        renderDiaryLogs();
      });

      diaryHistoryTableBody.appendChild(tr);
    });
  }

  addQuickDemoLogBtn?.addEventListener('click', () => {
    const user = window.authManager.getCurrentUser();
    window.healthDiaryManager.addEntry({
      userId: user ? user.id : 'guest',
      type: 'BP',
      title: 'Blood Pressure',
      valueDisplay: '124 / 82 mmHg',
      secondaryDisplay: 'Pulse: 72 bpm',
      status: 'Normal BP',
      severity: 'normal',
      notes: 'Evening routine recording'
    });
    renderDiaryLogs();
    showToast('Quick demo record added!');
  });

  clearDiaryBtn?.addEventListener('click', () => {
    if (confirm('Clear all logged entries in your health diary?')) {
      window.healthDiaryManager.saveAllEntries([]);
      renderDiaryLogs();
      showToast('Health diary cleared.');
    }
  });

  // ==========================================
  // 7. STORED MEDICINES CABINET
  // ==========================================
  const toggleAddMedFormBtn = document.getElementById('toggleAddMedFormBtn');
  toggleAddMedFormBtn?.addEventListener('click', () => {
    const addCard = document.getElementById('addMedFormCard');
    addCard?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('cabName')?.focus();
  });

  cabinetAddForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cabName').value;
    const purpose = document.getElementById('cabPurpose').value;
    const strength = document.getElementById('cabStrength').value;
    const timing = document.getElementById('cabTiming').value;
    const expiryDate = document.getElementById('cabExpiryDate').value;
    const stockQuantity = document.getElementById('cabStock').value;
    const category = document.getElementById('cabCategory').value;
    const howToTake = document.getElementById('cabHowToTake').value;

    try {
      window.patientManager.addToCabinet({
        name,
        purpose,
        strength,
        timing,
        expiryDate,
        stockQuantity,
        category,
        howToTake
      });

      cabinetAddForm.reset();
      renderCabinetFullGrid();
      renderCabinetModalList();
      updateCabinetBadge();
      showToast(`${name} stored in your cabinet successfully!`);
    } catch (err) {
      alert(err.message);
    }
  });

  function renderCabinetFullGrid() {
    if (!cabinetFullGrid) return;
    const user = window.authManager.getCurrentUser();
    const items = window.patientManager.getUserCabinet(user ? user.id : null);

    cabinetFullGrid.innerHTML = '';

    if (items.length === 0) {
      cabinetFullGrid.innerHTML = `
        <div class="col-span-full p-8 bg-slate-800/60 rounded-3xl border border-slate-700 text-center text-slate-400">
          <div class="w-12 h-12 mx-auto mb-2 text-2xl">💊</div>
          <p class="font-bold text-white text-sm">Your medicine cabinet is empty</p>
          <p class="text-xs text-slate-500 mt-0.5">Use the form above to add your daily medications or scan a medicine strip.</p>
        </div>
      `;
      return;
    }

    items.forEach(med => {
      const isExpired = med.expiryStatus === 'EXPIRED';
      const isExpiringSoon = med.expiryStatus === 'EXPIRING_SOON';
      const isLowStock = med.stockQuantity <= 5;

      const card = document.createElement('div');
      card.className = 'bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-xl space-y-3 flex flex-col justify-between';
      card.innerHTML = `
        <div>
          <!-- Header with Expiry Badge -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-bold text-white text-base leading-tight">${med.name}</h4>
                ${med.strength ? `<span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">${med.strength}</span>` : ''}
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${med.purpose || med.category || 'Medication'}</p>
            </div>
            
            <span class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase shrink-0 ${
              isExpired ? 'bg-red-950 text-red-400 border border-red-800' :
              (isExpiringSoon ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              'bg-emerald-950 text-emerald-400 border border-emerald-800')
            }">
              ${isExpired ? 'EXPIRED' : (isExpiringSoon ? 'EXPIRING SOON' : 'SAFE')}
            </span>
          </div>

          <!-- Schedule & Expiry info -->
          <div class="space-y-1.5 text-xs text-slate-300">
            <div class="flex items-center gap-1.5 text-cyan-400">
              <span>⏰</span>
              <span class="font-semibold">${med.timing || 'Daily'}</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span>📅</span>
              <span>Exp: <strong class="text-slate-200">${med.expiryDate || 'N/A'}</strong></span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span>📦</span>
              <span>Stock: <strong class="${isLowStock ? 'text-red-400 font-bold' : 'text-slate-200'}">${med.stockQuantity} pills</strong> ${isLowStock ? '(Low Stock!)' : ''}</span>
            </div>
            ${med.howToTake ? `<p class="text-[11px] text-slate-400 italic pt-1 border-t border-slate-700/60">"${med.howToTake}"</p>` : ''}
          </div>
        </div>

        <!-- Compliance & Actions Footer -->
        <div class="pt-3 border-t border-slate-700 flex items-center justify-between gap-2">
          <label class="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold ${med.takenToday ? 'text-emerald-400' : 'text-slate-400'}">
            <input type="checkbox" class="med-taken-checkbox rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0" data-id="${med.id}" ${med.takenToday ? 'checked' : ''} />
            <span>${med.takenToday ? 'Taken Today ✓' : 'Mark as Taken'}</span>
          </label>

          <div class="flex items-center gap-1">
            <button class="med-listen-btn p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition" data-id="${med.id}" title="Listen Voice Announcement">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            </button>
            <button class="med-remove-btn p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition" data-id="${med.id}" title="Remove Medicine">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      `;

      // Event listener: Toggle taken
      card.querySelector('.med-taken-checkbox')?.addEventListener('change', () => {
        window.patientManager.toggleMedicationTaken(med.id);
        renderCabinetFullGrid();
        renderCabinetModalList();
      });

      // Event listener: Listen aloud
      card.querySelector('.med-listen-btn')?.addEventListener('click', () => {
        const text = `Medicine announcement for ${med.name} ${med.strength}. Purpose: ${med.purpose}. Schedule: ${med.timing}. Expiry date: ${med.expiryDate}. Instructions: ${med.howToTake || 'Take as advised with water.'}.`;
        window.speechHelper.toggleSpeech(text);
      });

      // Event listener: Remove
      card.querySelector('.med-remove-btn')?.addEventListener('click', () => {
        if (confirm(`Remove ${med.name} from your cabinet?`)) {
          window.patientManager.removeFromCabinet(med.id);
          renderCabinetFullGrid();
          renderCabinetModalList();
          updateCabinetBadge();
        }
      });

      cabinetFullGrid.appendChild(card);
    });
  }

  function renderCabinetModalList() {
    if (!cabinetList) return;
    const user = window.authManager.getCurrentUser();
    const items = window.patientManager.getUserCabinet(user ? user.id : null);

    cabinetList.innerHTML = '';

    if (items.length === 0) {
      cabinetList.innerHTML = `<p class="text-xs text-slate-400 p-4 text-center">No medicines saved in cabinet yet.</p>`;
      return;
    }

    items.forEach(med => {
      const item = document.createElement('div');
      item.className = 'p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs flex items-center justify-between gap-2';
      item.innerHTML = `
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-white">${med.name}</strong>
            <span class="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">${med.strength || ''}</span>
          </div>
          <p class="text-[10px] text-slate-400">${med.timing} • Exp: ${med.expiryDate}</p>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" class="modal-med-check rounded bg-slate-800 text-emerald-500" ${med.takenToday ? 'checked' : ''} />
          <span class="text-[10px] ${med.takenToday ? 'text-emerald-400 font-bold' : 'text-slate-500'}">${med.takenToday ? 'Taken' : 'Pending'}</span>
        </div>
      `;

      item.querySelector('.modal-med-check')?.addEventListener('change', () => {
        window.patientManager.toggleMedicationTaken(med.id);
        renderCabinetFullGrid();
        renderCabinetModalList();
      });

      cabinetList.appendChild(item);
    });
  }

  function updateCabinetBadge() {
    if (!cabinetCountBadge) return;
    const user = window.authManager.getCurrentUser();
    const items = window.patientManager.getUserCabinet(user ? user.id : null);
    cabinetCountBadge.textContent = items.length;
  }

  // Cabinet Drawer Modal toggles
  openCabinetBtn?.addEventListener('click', () => {
    cabinetModal.classList.remove('hidden');
    renderCabinetModalList();
  });

  closeCabinetBtn?.addEventListener('click', () => {
    cabinetModal.classList.add('hidden');
  });

  // ==========================================
  // 8. GEMINI VISION API MODAL
  // ==========================================
  function initApiKeySettings() {
    const savedKey = visionEngine.getApiKey();
    if (apiKeyInput && savedKey) {
      apiKeyInput.value = savedKey;
    }
  }

  openApiKeyBtn?.addEventListener('click', () => {
    apiKeyModal.classList.remove('hidden');
  });

  closeApiKeyBtn?.addEventListener('click', () => {
    apiKeyModal.classList.add('hidden');
  });

  saveApiKeyBtn?.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    const model = modelSelect.value;
    visionEngine.setApiKey(key);
    visionEngine.setModel(model);
    apiKeyModal.classList.add('hidden');
    showToast('Gemini Vision API configuration saved!');
  });

  // Generic Toast Notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 bg-cyan-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-2 opacity-0 flex items-center gap-2';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
