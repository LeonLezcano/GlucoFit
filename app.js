/**
 * app.js — Controlador Principal de la PWA GlucoFit (v1.1.00)
 * Enrutamiento Hash SPA, Coach de Sesión Activa, Centinela Metabólico,
 * Mapa Muscular SVG Reactivo, Motores Matemáticos de Fuerza y Coach de IA.
 */

import { EXERCISES, CLINICAL_EXERCISES, getExerciseById, getExercisesByCategory, searchExercises } from './src/data/exercises.js';
import { ROUTINES, getRoutineById } from './src/data/routines.js';
import { MetabolicGuard, GLUCOSE_ZONES } from './src/services/metabolic-guard.js';
import { StorageService } from './src/services/storage.js';
import { SessionCoach } from './src/services/session-coach.js';
import { Sanitizer } from './src/utils/sanitizer.js';

// Motores matemáticos y servicios de openGym
import { calculateNextPrescription } from './src/engines/progression.js';
import { estimate1RM } from './src/engines/onerm.js';
import { calculatePlates, formatPlateString, STANDARD_BARS } from './src/engines/plates.js';
import { renderMuscleSvg, calculateMuscleVolume, calculateMuscleRecovery } from './src/services/muscle-map.js';
import { importWorkoutCSV } from './src/services/importer.js';
import { AICoachService } from './src/services/ai-coach.js';

class GlucoFitApp {
  constructor() {
    this.sessionCoach = new SessionCoach();
    this.selectedRoutineId = 'dia-a';
    this.lastEvaluatedPreGlucose = null;
    this.completedSessionSummary = null;
    this.currentCatalogCategory = 'todos';
    
    // Estado del Mapa Muscular SVG
    this.mapSide = 'front'; // 'front' | 'back'
    this.mapMode = 'volume'; // 'volume' | 'recovery'
    this.catalogSearchQuery = '';

    this.initElements();
    this.bindEvents();
    this.registerServiceWorker();
    this.renderDashboard();
    this.handleRoute();
  }

  initElements() {
    // Vistas
    this.views = {
      'dashboard': document.getElementById('view-dashboard'),
      'checkin': document.getElementById('view-checkin'),
      'routine': document.getElementById('view-routine'),
      'active-session': document.getElementById('view-active-session'),
      'checkout': document.getElementById('view-checkout'),
      'catalog': document.getElementById('view-catalog')
    };

    this.navLinks = document.querySelectorAll('.bottom-nav .nav-item');
    this.wakeLockStatus = document.getElementById('wakeLockStatus');
    this.wakeLockText = document.getElementById('wakeLockText');

    // Botones Header
    this.btnOpenAICoach = document.getElementById('btnOpenAICoach');
    this.btnOpenSettings = document.getElementById('btnOpenSettings');

    // Dashboard
    this.btnStartToday = document.getElementById('btnStartTodayRoutine');
    this.dashboardLastGlucose = document.getElementById('dashboardLastGlucoseBox');
    this.routineSelectorCards = document.getElementById('routineSelectorCards');
    this.sessionsHistoryList = document.getElementById('sessionsHistoryList');
    this.btnExportData = document.getElementById('btnExportData');
    this.btnExportCSV = document.getElementById('btnExportCSV');

    // Mapa Muscular Dashboard
    this.dashboardBodyMapContainer = document.getElementById('dashboardBodyMapContainer');
    this.btnMapSide = document.getElementById('btnMapSide');
    this.btnMapMode = document.getElementById('btnMapMode');

    // Checkin
    this.inputPreGlucose = document.getElementById('inputPreGlucose');
    this.btnEvaluatePre = document.getElementById('btnEvaluatePreGlucose');
    this.preGlucoseResultCard = document.getElementById('preGlucoseResultCard');
    this.preGlucoseBadge = document.getElementById('preGlucoseBadge');
    this.preGlucoseNumber = document.getElementById('preGlucoseNumber');
    this.preGlucoseTitle = document.getElementById('preGlucoseTitle');
    this.preGlucoseMessage = document.getElementById('preGlucoseMessage');
    this.btnConfirmCheckin = document.getElementById('btnConfirmCheckin');

    // Routine view
    this.routineBadgeDay = document.getElementById('routineBadgeDay');
    this.routineDuration = document.getElementById('routineDuration');
    this.routineTitleHeader = document.getElementById('routineTitleHeader');
    this.routineDescHeader = document.getElementById('routineDescHeader');
    this.routineExercisesList = document.getElementById('routineExercisesList');
    this.btnStartActiveSession = document.getElementById('btnStartActiveSession');

    // Active session
    this.activeRoutineName = document.getElementById('activeSessionRoutineName');
    this.activeExerciseProgress = document.getElementById('activeExerciseProgress');
    this.activeExerciseTitle = document.getElementById('activeExerciseTitle');
    this.activeExerciseSubtitle = document.getElementById('activeExerciseSubtitle');
    this.activeExerciseGlut4 = document.getElementById('activeExerciseGlut4');
    this.active1RMHint = document.getElementById('active1RMHint');
    this.activeProgressionReason = document.getElementById('activeProgressionReason');
    this.btnShowPlates = document.getElementById('btnShowPlates');

    this.activeStageBox = document.getElementById('activeStageBox');
    this.activeExerciseImg = document.getElementById('activeExerciseImg');
    this.activePhasePill = document.getElementById('activePhasePill');
    this.activeMuscleImg = document.getElementById('activeMuscleImg');
    this.activeMuscleLabel = document.getElementById('activeMuscleLabel');
    this.biomechTimer = null;
    this.biomechIsPeak = false;

    this.activeExerciseChecklist = document.getElementById('activeExerciseChecklist');
    this.activeExerciseMistakes = document.getElementById('activeExerciseMistakes');
    this.activeExerciseBreathing = document.getElementById('activeExerciseBreathing');
    this.activeCurrentSetNumber = document.getElementById('activeCurrentSetNumber');
    this.activeTargetRepsHint = document.getElementById('activeTargetRepsHint');
    this.inputSetWeight = document.getElementById('inputSetWeight');
    this.inputSetReps = document.getElementById('inputSetReps');
    this.btnWeightMinus = document.getElementById('btnWeightMinus');
    this.btnWeightPlus = document.getElementById('btnWeightPlus');
    this.btnRepsMinus = document.getElementById('btnRepsMinus');
    this.btnRepsPlus = document.getElementById('btnRepsPlus');
    this.btnLogSet = document.getElementById('btnLogSet');
    this.activeCompletedSetsList = document.getElementById('activeCompletedSetsList');
    this.btnAbandonSession = document.getElementById('btnAbandonSession');

    // Rest timer modal
    this.restTimerModal = document.getElementById('restTimerModal');
    this.timerDigits = document.getElementById('timerDigits');
    this.btnAdd15Sec = document.getElementById('btnAdd15Sec');
    this.btnSkipRestTimer = document.getElementById('btnSkipRestTimer');

    // Checkout
    this.summaryDuration = document.getElementById('summaryDuration');
    this.summaryTotalSets = document.getElementById('summaryTotalSets');
    this.summaryTotalVolume = document.getElementById('summaryTotalVolume');
    this.checkoutBodyMapContainer = document.getElementById('checkoutBodyMapContainer');
    this.inputPostGlucose = document.getElementById('inputPostGlucose');
    this.btnCalculateDelta = document.getElementById('btnCalculateDelta');
    this.checkoutResultCard = document.getElementById('checkoutResultCard');
    this.checkoutBadge = document.getElementById('checkoutBadge');
    this.checkoutTitle = document.getElementById('checkoutTitle');
    this.checkoutSummary = document.getElementById('checkoutSummary');
    this.btnSaveAndCloseSession = document.getElementById('btnSaveAndCloseSession');

    // Catálogo
    this.inputSearchExercises = document.getElementById('inputSearchExercises');
    this.catalogListWrap = document.getElementById('catalogListWrap');
    this.categoryChips = document.querySelectorAll('.category-chips .chip');

    // Modales Nuevos
    this.platesModal = document.getElementById('platesModal');
    this.platesModalBody = document.getElementById('platesModalBody');
    this.btnClosePlatesModal = document.getElementById('btnClosePlatesModal');

    this.aiCoachModal = document.getElementById('aiCoachModal');
    this.aiCoachMessages = document.getElementById('aiCoachMessages');
    this.inputAICoachPrompt = document.getElementById('inputAICoachPrompt');
    this.btnSendAICoach = document.getElementById('btnSendAICoach');
    this.btnCloseAICoachModal = document.getElementById('btnCloseAICoachModal');

    this.settingsModal = document.getElementById('settingsModal');
    this.selectProgressionPolicy = document.getElementById('selectProgressionPolicy');
    this.selectDefaultBar = document.getElementById('selectDefaultBar');
    this.selectBodyGender = document.getElementById('selectBodyGender');
    this.inputGeminiKey = document.getElementById('inputGeminiKey');
    this.inputImportCSV = document.getElementById('inputImportCSV');
    this.importStatusText = document.getElementById('importStatusText');
    this.btnSaveSettings = document.getElementById('btnSaveSettings');
    this.btnCloseSettingsModal = document.getElementById('btnCloseSettingsModal');
  }

  bindEvents() {
    window.addEventListener('hashchange', () => this.handleRoute());

    // Dashboard
    if (this.btnStartToday) {
      this.btnStartToday.addEventListener('click', () => {
        window.location.hash = '#checkin';
      });
    }

    if (this.btnExportData) {
      this.btnExportData.addEventListener('click', () => StorageService.exportDataJSON());
    }

    if (this.btnExportCSV) {
      this.btnExportCSV.addEventListener('click', () => StorageService.exportDataCSV());
    }

    // Mapa Muscular Controls
    if (this.btnMapSide) {
      this.btnMapSide.addEventListener('click', () => {
        this.mapSide = this.mapSide === 'front' ? 'back' : 'front';
        this.btnMapSide.textContent = this.mapSide === 'front' ? 'Frente' : 'Dorso';
        this.renderDashboardBodyMap();
      });
    }

    if (this.btnMapMode) {
      this.btnMapMode.addEventListener('click', () => {
        this.mapMode = this.mapMode === 'volume' ? 'recovery' : 'volume';
        this.btnMapMode.textContent = this.mapMode === 'volume' ? 'Volumen' : 'Recuperación';
        this.renderDashboardBodyMap();
      });
    }

    // Check-in
    if (this.btnEvaluatePre) {
      this.btnEvaluatePre.addEventListener('click', () => this.evaluatePreWorkoutGlucose());
    }

    if (this.btnConfirmCheckin) {
      this.btnConfirmCheckin.addEventListener('click', () => {
        window.location.hash = '#routine';
      });
    }

    // Rutina
    if (this.btnStartActiveSession) {
      this.btnStartActiveSession.addEventListener('click', () => this.startActiveWorkout());
    }

    // Sesión activa
    if (this.btnLogSet) {
      this.btnLogSet.addEventListener('click', () => this.logCurrentSet());
    }

    if (this.btnAbandonSession) {
      this.btnAbandonSession.addEventListener('click', () => {
        if (confirm('¿Deseas finalizar anticipadamente el entrenamiento?')) {
          this.sessionCoach.finishSession(null);
          window.location.hash = '#dashboard';
        }
      });
    }

    // Steppers de peso y repes
    if (this.btnWeightMinus) {
      this.btnWeightMinus.addEventListener('click', () => {
        const val = Math.max(0, (parseFloat(this.inputSetWeight.value) || 0) - 2.5);
        this.inputSetWeight.value = val;
      });
    }
    if (this.btnWeightPlus) {
      this.btnWeightPlus.addEventListener('click', () => {
        const val = (parseFloat(this.inputSetWeight.value) || 0) + 2.5;
        this.inputSetWeight.value = val;
      });
    }
    if (this.btnRepsMinus) {
      this.btnRepsMinus.addEventListener('click', () => {
        const val = Math.max(1, (parseInt(this.inputSetReps.value, 10) || 1) - 1);
        this.inputSetReps.value = val;
      });
    }
    if (this.btnRepsPlus) {
      this.btnRepsPlus.addEventListener('click', () => {
        const val = (parseInt(this.inputSetReps.value, 10) || 0) + 1;
        this.inputSetReps.value = val;
      });
    }

    // Modal Calculadora de Discos
    if (this.btnShowPlates) {
      this.btnShowPlates.addEventListener('click', () => this.openPlatesModal());
    }
    if (this.btnClosePlatesModal) {
      this.btnClosePlatesModal.addEventListener('click', () => {
        this.platesModal.classList.add('hidden');
      });
    }

    // Modal Coach IA
    if (this.btnOpenAICoach) {
      this.btnOpenAICoach.addEventListener('click', () => this.openAICoachModal());
    }
    if (this.btnCloseAICoachModal) {
      this.btnCloseAICoachModal.addEventListener('click', () => {
        this.aiCoachModal.classList.add('hidden');
      });
    }
    if (this.btnSendAICoach) {
      this.btnSendAICoach.addEventListener('click', () => this.sendAICoachMessage());
    }
    if (this.inputAICoachPrompt) {
      this.inputAICoachPrompt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendAICoachMessage();
      });
    }

    // Modal Ajustes
    if (this.btnOpenSettings) {
      this.btnOpenSettings.addEventListener('click', () => this.openSettingsModal());
    }
    if (this.btnCloseSettingsModal) {
      this.btnCloseSettingsModal.addEventListener('click', () => {
        this.settingsModal.classList.add('hidden');
      });
    }
    if (this.btnSaveSettings) {
      this.btnSaveSettings.addEventListener('click', () => this.saveSettingsFromModal());
    }
    if (this.inputImportCSV) {
      this.inputImportCSV.addEventListener('change', (e) => this.handleCSVImport(e));
    }

    // Visor biomecánico interactivo
    if (this.activeStageBox) {
      this.activeStageBox.addEventListener('click', () => this.toggleBiomechPhase());
    }

    // Temporizador de descanso
    if (this.btnAdd15Sec) {
      this.btnAdd15Sec.addEventListener('click', () => {
        this.sessionCoach.remainingRestSeconds += 15;
        this.timerDigits.textContent = this.sessionCoach.remainingRestSeconds;
      });
    }
    if (this.btnSkipRestTimer) {
      this.btnSkipRestTimer.addEventListener('click', () => {
        this.sessionCoach.stopRestTimer();
        this.restTimerModal.classList.add('hidden');
      });
    }

    // Check-out post-entreno
    if (this.btnCalculateDelta) {
      this.btnCalculateDelta.addEventListener('click', () => this.calculatePostWorkoutDelta());
    }
    if (this.btnSaveAndCloseSession) {
      this.btnSaveAndCloseSession.addEventListener('click', () => this.saveCompletedSession());
    }

    // Catálogo
    if (this.inputSearchExercises) {
      this.inputSearchExercises.addEventListener('input', (e) => {
        this.catalogSearchQuery = e.target.value;
        this.renderCatalog();
      });
    }

    this.categoryChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        this.categoryChips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCatalogCategory = e.currentTarget.dataset.category || 'todos';
        this.renderCatalog();
      });
    });
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    const targetView = this.views[hash] ? hash : 'dashboard';

    Object.keys(this.views).forEach(key => {
      if (this.views[key]) {
        if (key === targetView) {
          this.views[key].classList.add('active');
        } else {
          this.views[key].classList.remove('active');
        }
      }
    });

    this.navLinks.forEach(link => {
      const view = link.getAttribute('data-view');
      if (view === targetView) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo(0, 0);

    if (targetView === 'dashboard') {
      this.renderDashboard();
    } else if (targetView === 'routine') {
      this.renderRoutineView();
    } else if (targetView === 'catalog') {
      this.renderCatalog();
    }
  }

  // =========================================================================
  // DASHBOARD & MAPA MUSCULAR SVG
  // =========================================================================

  renderDashboard() {
    const today = new Date().getDay(); // 0 = Domingo, 1 = Lunes, etc.
    let todayRoutine = ROUTINES[0];
    if (today === 3) todayRoutine = ROUTINES[1]; // Miércoles -> Día B
    if (today === 5) todayRoutine = ROUTINES[2]; // Viernes -> Día C

    if (this.btnStartToday) {
      const dayLabel = todayRoutine.recommendedDay || todayRoutine.title.split('—')[0].trim();
      Sanitizer.safeSetInnerHTML(this.btnStartToday, `<span>Iniciar Entrenamiento de Hoy (${Sanitizer.escapeHTML(dayLabel)})</span>`);
    }

    // Última glucemia
    const sessions = StorageService.getSessions();
    if (sessions.length > 0) {
      const last = sessions[0];
      const deltaText = last.glucoseDelta !== null
        ? `<strong style="color: var(--emerald-400);">${last.glucoseDelta > 0 ? '-' + last.glucoseDelta : '+' + Math.abs(last.glucoseDelta)} mg/dL</strong>`
        : 'Sin medición post';
      Sanitizer.safeSetInnerHTML(this.dashboardLastGlucose, `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700; color: var(--text-main);">${Sanitizer.escapeHTML(last.routineTitle || 'Entrenamiento')}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${new Date(last.createdAt || last.timestamp).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
          </div>
          <div style="text-align: right;">
            <div>Pre: <strong>${last.preWorkoutGlucose || last.preGlucose || '--'}</strong> | Post: <strong>${last.postWorkoutGlucose || last.postGlucose || '--'}</strong></div>
            <div style="font-size: 0.75rem;">Delta GLUT4: ${deltaText}</div>
          </div>
        </div>
      `);
    } else {
      this.dashboardLastGlucose.textContent = 'Sin mediciones registradas hoy. Realiza el check-in antes de la primera serie.';
    }

    // Render del Mapa Muscular SVG en el Dashboard
    this.renderDashboardBodyMap();

    // Selector de rutinas
    this.renderRoutineSelectorCards();

    // Historial
    this.renderSessionsHistory();
  }

  renderDashboardBodyMap() {
    if (!this.dashboardBodyMapContainer) return;
    const sessions = StorageService.getSessions();
    const settings = StorageService.getSettings();

    const volumeData = calculateMuscleVolume(sessions, 7);
    const recoveryData = calculateMuscleRecovery(sessions);

    const svgMarkup = renderMuscleSvg({
      gender: settings.bodyGender || 'male',
      side: this.mapSide,
      mode: this.mapMode,
      volumeData,
      recoveryData
    });

    Sanitizer.safeSetInnerHTML(this.dashboardBodyMapContainer, svgMarkup);
  }

  renderRoutineSelectorCards() {
    if (!this.routineSelectorCards) return;
    this.routineSelectorCards.replaceChildren();

    ROUTINES.forEach(routine => {
      const card = document.createElement('div');
      card.className = `routine-card ${routine.id === this.selectedRoutineId ? 'active' : ''}`;
      Sanitizer.safeSetInnerHTML(card, `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="glut4-pill">${Sanitizer.escapeHTML(routine.dayName)}</span>
          <span class="text-muted" style="font-size: 0.75rem; font-weight: 600;">${routine.exercises.length} Estaciones</span>
        </div>
        <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 2px;">${Sanitizer.escapeHTML(routine.title)}</h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${Sanitizer.escapeHTML(routine.focus)}</p>
      `);

      card.addEventListener('click', () => {
        this.selectedRoutineId = routine.id;
        StorageService.saveSettings({ lastSelectedRoutine: routine.id });
        this.renderRoutineSelectorCards();
        window.location.hash = '#routine';
      });

      this.routineSelectorCards.appendChild(card);
    });
  }

  renderSessionsHistory() {
    if (!this.sessionsHistoryList) return;
    const sessions = StorageService.getSessions();

    if (sessions.length === 0) {
      this.sessionsHistoryList.textContent = 'No hay sesiones previas registradas en este dispositivo.';
      return;
    }

    this.sessionsHistoryList.replaceChildren();
    sessions.slice(0, 5).forEach(sess => {
      const item = document.createElement('div');
      item.style.padding = '10px 0';
      item.style.borderBottom = '1px solid var(--border-subtle)';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';

      const deltaBadge = sess.glucoseDelta !== null
        ? `<span class="glut4-pill" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald-400);">${sess.glucoseDelta > 0 ? '-' + sess.glucoseDelta : '+' + Math.abs(sess.glucoseDelta)} mg/dL</span>`
        : '';

      Sanitizer.safeSetInnerHTML(item, `
        <div>
          <div style="font-weight: 700; font-size: 0.88rem;">${Sanitizer.escapeHTML(sess.routineTitle || sess.routineName || 'Sesión')}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            ${new Date(sess.createdAt || sess.timestamp).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} • ${sess.totalVolumeKg || sess.totalVolume || 0} kg
          </div>
        </div>
        <div>${deltaBadge}</div>
      `);
      this.sessionsHistoryList.appendChild(item);
    });
  }

  // =========================================================================
  // CHECK-IN GLUCÉMICO
  // =========================================================================

  evaluatePreWorkoutGlucose() {
    const val = this.inputPreGlucose.value;
    const evaluated = MetabolicGuard.evaluatePreWorkout(val);
    if (!evaluated) {
      alert('Ingresa un valor de glucemia válido entre 20 y 600 mg/dL.');
      return;
    }

    this.lastEvaluatedPreGlucose = evaluated.value;
    this.preGlucoseResultCard.classList.remove('hidden');

    this.preGlucoseNumber.textContent = evaluated.value;
    this.preGlucoseTitle.textContent = evaluated.title;
    this.preGlucoseMessage.textContent = evaluated.message;

    this.preGlucoseResultCard.style.borderColor = evaluated.color;
    this.preGlucoseBadge.style.backgroundColor = evaluated.color;
    this.preGlucoseBadge.textContent = evaluated.zone.toUpperCase();

    if (evaluated.canTrain) {
      this.btnConfirmCheckin.classList.remove('hidden');
    } else {
      this.btnConfirmCheckin.classList.add('hidden');
    }
  }

  // =========================================================================
  // VISTA DE RUTINA
  // =========================================================================

  renderRoutineView() {
    const routine = getRoutineById(this.selectedRoutineId) || ROUTINES[0];

    this.routineBadgeDay.textContent = routine.dayName;
    this.routineDuration.textContent = routine.estimatedMinutes + ' min';
    this.routineTitleHeader.textContent = routine.title;
    this.routineDescHeader.textContent = routine.description;

    this.routineExercisesList.replaceChildren();
    routine.exercises.forEach((item, index) => {
      const ex = getExerciseById(item.exerciseId);
      if (!ex) return;

      const lastPerf = StorageService.getLastPerformance(ex.id);
      const perfText = lastPerf ? `Última: ${lastPerf.weightKg} kg × ${lastPerf.reps} reps` : 'Sin registros previos';

      const card = document.createElement('div');
      card.className = 'card';
      card.style.marginBottom = '10px';
      card.style.padding = '14px';

      Sanitizer.safeSetInnerHTML(card, `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="font-size: 0.75rem; color: var(--emerald-400); font-weight: 700;">ESTACIÓN ${index + 1}</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; margin: 2px 0;">${Sanitizer.escapeHTML(ex.name)}</h4>
            <div style="font-size: 0.75rem; color: var(--cyan-400); font-weight: 600;">${Sanitizer.escapeHTML(ex.targetMuscle)} • ${Sanitizer.escapeHTML(ex.equipment)}</div>
          </div>
          <span class="glut4-pill">GLUT4: ${ex.glut4Score}/5</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 0.8rem; background: var(--bg-surface); padding: 8px 12px; border-radius: var(--radius-sm);">
          <span>${item.sets} series × ${item.reps} reps (${item.restSeconds}s pausa)</span>
          <span style="color: var(--text-muted); font-size: 0.75rem;">${perfText}</span>
        </div>
      `);
      this.routineExercisesList.appendChild(card);
    });
  }

  // =========================================================================
  // MODO SESIÓN ACTIVA (EN SALA DE PESAS) CON SOBRECARGA PROGRESIVA
  // =========================================================================

  startActiveWorkout() {
    const routine = getRoutineById(this.selectedRoutineId) || ROUTINES[0];
    const preGlucose = this.lastEvaluatedPreGlucose || 120; // Fallback seguro

    this.sessionCoach.startSession(routine, preGlucose);
    window.location.hash = '#active-session';
    this.renderActiveExercise();
  }

  renderActiveExercise() {
    if (!this.sessionCoach.currentSession) return;
    const progress = this.sessionCoach.currentSession.exercisesProgress[this.sessionCoach.currentSession.currentExerciseIndex];
    if (!progress) return;

    const ex = getExerciseById(progress.exerciseId);
    if (!ex) return;

    this.activeRoutineName.textContent = this.sessionCoach.currentSession.routineTitle;
    this.activeExerciseProgress.textContent = `Ejercicio ${this.sessionCoach.currentSession.currentExerciseIndex + 1} de ${this.sessionCoach.currentSession.exercisesProgress.length}`;

    this.activeExerciseTitle.textContent = ex.name;
    this.activeExerciseSubtitle.textContent = `${ex.targetMuscle} • ${ex.equipment}`;
    this.activeExerciseGlut4.textContent = `GLUT4: ${ex.glut4Score}/5`;

    // Biomecánica
    this.activeExerciseImg.src = ex.startImage || 'assets/exercises/leg-press-start.webp';
    this.activeMuscleImg.src = ex.muscleImage || 'assets/muscles/quadriceps.webp';
    this.activeMuscleLabel.textContent = ex.targetMuscle;
    this.biomechIsPeak = false;
    this.activePhasePill.textContent = '● Fase: Inicio';
    this.activePhasePill.classList.remove('peak');

    // Checklist técnica y errores
    this.activeExerciseChecklist.replaceChildren();
    (ex.postureChecklist || []).forEach(pt => {
      const p = document.createElement('p');
      p.className = 'technique-point';
      p.textContent = pt;
      this.activeExerciseChecklist.appendChild(p);
    });

    this.activeExerciseMistakes.replaceChildren();
    (ex.commonMistakes || []).forEach(m => {
      const p = document.createElement('p');
      p.className = 'mistake-point';
      p.textContent = m;
      this.activeExerciseMistakes.appendChild(p);
    });

    this.activeExerciseBreathing.textContent = ex.breathingTip || 'Exhala en el esfuerzo; no aguantes el aire.';

    // Estado de la serie actual y cálculo de Sobrecarga Progresiva
    this.activeCurrentSetNumber.textContent = `Serie ${this.sessionCoach.currentSession.currentSetIndex} de ${progress.targetSets}`;
    this.activeTargetRepsHint.textContent = `Objetivo: ${progress.targetReps} repes`;

    // Consultar historial del ejercicio para aplicar la política de progresión
    const settings = StorageService.getSettings();
    const exHistory = StorageService.getExerciseHistory(ex.id);

    const prescription = calculateNextPrescription({
      policy: settings.progressionPolicy || 'double',
      exerciseHistory: exHistory,
      targetRange: { minReps: 8, maxReps: 12, targetSets: progress.targetSets },
      category: ex.category || 'piernas'
    });

    this.currentActivePrescription = prescription;
    this.activeProgressionReason.textContent = prescription.reason;

    // Sugerencia de peso según última sesión o prescripción
    const lastPerf = StorageService.getLastPerformance(ex.id);
    const suggestedW = prescription.suggestedWeight || (lastPerf ? lastPerf.weightKg : (progress.initialWeightKg || 20));
    this.inputSetWeight.value = suggestedW;
    this.inputSetReps.value = prescription.suggestedReps || 10;

    // Calcular 1RM estimado si hay historial
    if (lastPerf && lastPerf.weightKg > 0) {
      const e1rm = estimate1RM(lastPerf.weightKg, lastPerf.reps, 0, 'weighted');
      this.active1RMHint.textContent = `1RM est.: ${e1rm} kg`;
    } else {
      this.active1RMHint.textContent = '1RM est.: -- kg';
    }

    // Listado de series completadas en esta estación
    this.renderActiveCompletedSets(progress.setsCompleted);
  }

  renderActiveCompletedSets(setsCompleted) {
    this.activeCompletedSetsList.replaceChildren();
    if (!setsCompleted || setsCompleted.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'text-muted';
      emptyDiv.style.fontSize = '0.85rem';
      emptyDiv.style.padding = '4px 0';
      emptyDiv.textContent = 'Ninguna serie completada todavía en esta máquina.';
      this.activeCompletedSetsList.appendChild(emptyDiv);
      return;
    }

    setsCompleted.forEach(s => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.padding = '6px 0';
      row.style.borderBottom = '1px solid var(--border-subtle)';
      row.style.fontSize = '0.85rem';

      Sanitizer.safeSetInnerHTML(row, `
        <span style="font-weight: 700; color: var(--emerald-400);">Serie ${s.setNumber}</span>
        <span><strong>${s.weightKg} kg</strong> × <strong>${s.reps} reps</strong></span>
      `);
      this.activeCompletedSetsList.appendChild(row);
    });
  }

  toggleBiomechPhase() {
    if (!this.sessionCoach.currentSession) return;
    const progress = this.sessionCoach.currentSession.exercisesProgress[this.sessionCoach.currentSession.currentExerciseIndex];
    const ex = getExerciseById(progress.exerciseId);
    if (!ex) return;

    this.biomechIsPeak = !this.biomechIsPeak;
    if (this.biomechIsPeak) {
      this.activeExerciseImg.src = ex.peakImage || ex.startImage;
      this.activePhasePill.textContent = '● Fase: Contracción';
      this.activePhasePill.classList.add('peak');
    } else {
      this.activeExerciseImg.src = ex.startImage;
      this.activePhasePill.textContent = '● Fase: Inicio';
      this.activePhasePill.classList.remove('peak');
    }
  }

  logCurrentSet() {
    const weight = parseFloat(this.inputSetWeight.value) || 0;
    const reps = parseInt(this.inputSetReps.value, 10) || 0;

    if (reps <= 0) {
      alert('Ingresa una cantidad de repeticiones válida.');
      return;
    }

    const result = this.sessionCoach.recordSet(reps, weight);
    if (!result) return;

    if (result.isSessionFinished) {
      window.location.hash = '#checkout';
      this.renderCheckout();
    } else {
      // Iniciar modal de temporizador de descanso
      this.restTimerModal.classList.remove('hidden');
      this.timerDigits.textContent = result.restSeconds;

      this.sessionCoach.startRestTimer(
        result.restSeconds,
        (remaining) => {
          this.timerDigits.textContent = remaining;
        },
        () => {
          this.restTimerModal.classList.add('hidden');
        }
      );

      this.renderActiveExercise();
    }
  }

  // =========================================================================
  // CALCULADORA DE DISCOS (MODAL)
  // =========================================================================

  openPlatesModal() {
    const targetWeight = parseFloat(this.inputSetWeight.value) || 20;
    const settings = StorageService.getSettings();
    const barConfig = STANDARD_BARS[settings.defaultBar] || STANDARD_BARS.olympic_men;
    const barWeight = barConfig.kg;

    const result = calculatePlates(targetWeight, barWeight, 'kg');

    let discsMarkup = '';
    if (result.platesPerSide.length === 0) {
      discsMarkup = '<div style="color: var(--text-muted); padding: 8px 0;">Solo la barra vacía (sin discos adicionales).</div>';
    } else {
      discsMarkup = result.platesPerSide.map(p => `
        <div class="plate-row">
          <span class="plate-disc-badge plate-disc-${String(p.size).replace('.', '-')}">${p.size} kg</span>
          <span>× <strong>${p.count}</strong> por cada lado</span>
        </div>
      `).join('');
    }

    Sanitizer.safeSetInnerHTML(this.platesModalBody, `
      <div style="margin-bottom: 12px; background: var(--bg-surface); padding: 10px; border-radius: var(--radius-sm);">
        <div style="font-size: 0.78rem; color: var(--text-muted);">Objetivo: <strong style="color: var(--text-main);">${targetWeight} kg</strong></div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">Barra: <strong style="color: var(--text-main);">${barConfig.name}</strong></div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">Carga por lado: <strong style="color: var(--emerald-400);">${result.weightPerSide} kg</strong></div>
      </div>
      <div>${discsMarkup}</div>
      <div style="margin-top: 12px; font-size: 0.75rem; color: var(--text-muted);">
        Total montado: <strong>${result.totalLoaded} kg</strong> ${!result.exact ? `(diferencia: ${result.difference} kg)` : '(Carga exacta)'}
      </div>
    `);

    this.platesModal.classList.remove('hidden');
  }

  // =========================================================================
  // RESUMEN POST-ENTRENO Y DELTA GLUT4
  // =========================================================================

  renderCheckout() {
    if (!this.sessionCoach.currentSession) return;
    const session = this.sessionCoach.currentSession;

    const totalVolume = this.sessionCoach.calculateTotalVolumeKg();
    const totalSets = session.exercisesProgress.reduce((sum, e) => sum + e.setsCompleted.length, 0);

    this.summaryDuration.textContent = '40 min';
    this.summaryTotalSets.textContent = totalSets + ' series';
    this.summaryTotalVolume.textContent = totalVolume.toLocaleString('es-ES') + ' kg';

    // Render del Mapa Muscular con los músculos activos iluminados en Esmeralda (GLUT4)
    if (this.checkoutBodyMapContainer) {
      const activeMuscles = session.exercisesProgress.map(e => {
        const ex = getExerciseById(e.exerciseId);
        return ex ? (ex.targetMuscle || ex.muscle) : '';
      }).filter(Boolean);

      const svgMarkup = renderMuscleSvg({
        gender: StorageService.getSettings().bodyGender || 'male',
        side: 'front',
        mode: 'session',
        activeSessionMuscles: activeMuscles
      });

      Sanitizer.safeSetInnerHTML(this.checkoutBodyMapContainer, svgMarkup);
    }
  }

  calculatePostWorkoutDelta() {
    const postVal = this.inputPostGlucose.value;
    const preVal = this.sessionCoach.currentSession ? this.sessionCoach.currentSession.preWorkoutGlucose : 120;

    const evaluated = MetabolicGuard.evaluateDelta(preVal, postVal);
    if (!evaluated) {
      alert('Ingresa una glucemia post-entrenamiento válida (20 - 600 mg/dL).');
      return;
    }

    this.checkoutResultCard.classList.remove('hidden');
    this.checkoutTitle.textContent = evaluated.title;
    this.checkoutSummary.textContent = evaluated.summary;
    this.checkoutBadge.textContent = evaluated.type.toUpperCase();

    if (evaluated.type === 'descenso') {
      this.checkoutBadge.style.backgroundColor = 'var(--emerald-500)';
    } else {
      this.checkoutBadge.style.backgroundColor = 'var(--cyan-500)';
    }

    this.completedSessionSummary = {
      postGlucose: evaluated.post,
      delta: evaluated.delta,
      dropPercentage: evaluated.dropPercentage
    };
  }

  saveCompletedSession() {
    const postGlucose = this.completedSessionSummary ? this.completedSessionSummary.postGlucose : null;
    const sessionRecord = this.sessionCoach.finishSession(postGlucose);
    if (!sessionRecord) return;

    if (this.completedSessionSummary) {
      sessionRecord.glucoseDelta = this.completedSessionSummary.delta;
      sessionRecord.dropPercentage = this.completedSessionSummary.dropPercentage;
    }

    StorageService.saveSession(sessionRecord);
    alert('¡Entrenamiento registrado con éxito! Felicitaciones por estimular tu masa muscular y salud metabólica.');
    window.location.hash = '#dashboard';
  }

  // =========================================================================
  // COACH DE IA (GEMINI)
  // =========================================================================

  openAICoachModal() {
    this.aiCoachModal.classList.remove('hidden');
    if (this.inputAICoachPrompt) this.inputAICoachPrompt.focus();
  }

  async sendAICoachMessage() {
    const text = this.inputAICoachPrompt.value.trim();
    if (!text) return;

    this.inputAICoachPrompt.value = '';

    // Burbuja del usuario
    const userBubble = document.createElement('div');
    userBubble.className = 'coach-bubble-user';
    userBubble.textContent = text;
    this.aiCoachMessages.appendChild(userBubble);

    // Burbuja temporal de carga
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'coach-bubble-ai';
    loadingBubble.textContent = 'Analizando tu estado y directivas GLUT4...';
    this.aiCoachMessages.appendChild(loadingBubble);
    this.aiCoachMessages.scrollTop = this.aiCoachMessages.scrollHeight;

    try {
      const sessions = StorageService.getSessions();
      const lastSession = sessions.length > 0 ? sessions[0] : null;

      const reply = await AICoachService.askCoach(text, {
        currentGlucose: this.lastEvaluatedPreGlucose,
        lastSession
      });

      loadingBubble.textContent = reply;
    } catch (err) {
      loadingBubble.replaceChildren();
      const errSpan = document.createElement('span');
      errSpan.style.color = 'var(--rose-400)';
      errSpan.textContent = `Error: ${err.message}`;
      loadingBubble.appendChild(errSpan);
    }

    this.aiCoachMessages.scrollTop = this.aiCoachMessages.scrollHeight;
  }

  // =========================================================================
  // AJUSTES & IMPORTACIÓN DE CSV
  // =========================================================================

  openSettingsModal() {
    const settings = StorageService.getSettings();
    if (this.selectProgressionPolicy) this.selectProgressionPolicy.value = settings.progressionPolicy || 'double';
    if (this.selectDefaultBar) this.selectDefaultBar.value = settings.defaultBar || 'olympic_men';
    if (this.selectBodyGender) this.selectBodyGender.value = settings.bodyGender || 'male';
    if (this.inputGeminiKey) this.inputGeminiKey.value = AICoachService.getApiKey() || '';

    this.settingsModal.classList.remove('hidden');
  }

  saveSettingsFromModal() {
    const newSettings = {
      progressionPolicy: this.selectProgressionPolicy.value,
      defaultBar: this.selectDefaultBar.value,
      bodyGender: this.selectBodyGender.value
    };

    StorageService.saveSettings(newSettings);

    const apiKey = this.inputGeminiKey.value.trim();
    AICoachService.saveApiKey(apiKey);

    this.settingsModal.classList.add('hidden');
    this.renderDashboard();
    alert('Ajustes guardados correctamente.');
  }

  handleCSVImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const result = importWorkoutCSV(text);

      if (result.success) {
        const added = StorageService.importSessions(result.sessions);
        this.importStatusText.textContent = `¡Importación exitosa! (${result.format.toUpperCase()}): ${added} sesiones agregadas.`;
        this.renderDashboard();
      } else {
        this.importStatusText.textContent = `Error en importación: ${result.error || 'Formato no reconocido'}`;
      }
    };
    reader.readAsText(file);
  }

  // =========================================================================
  // CATÁLOGO DE EJERCICIOS
  // =========================================================================

  renderCatalog() {
    if (!this.catalogListWrap) return;
    this.catalogListWrap.replaceChildren();

    let list = [];
    if (this.currentCatalogCategory === 'clinical') {
      list = CLINICAL_EXERCISES;
    } else {
      list = getExercisesByCategory(this.currentCatalogCategory);
    }

    if (this.catalogSearchQuery) {
      const q = this.catalogSearchQuery.toLowerCase().trim();
      list = list.filter(ex => 
        ex.name.toLowerCase().includes(q) ||
        (ex.englishName && ex.englishName.toLowerCase().includes(q)) ||
        (ex.targetMuscle && ex.targetMuscle.toLowerCase().includes(q)) ||
        (ex.equipment && ex.equipment.toLowerCase().includes(q))
      );
    }

    // Renderizar los primeros 40 ejercicios para rendimiento instantáneo
    const displayList = list.slice(0, 40);

    const countHeader = document.createElement('div');
    countHeader.style.fontSize = '0.75rem';
    countHeader.style.color = 'var(--text-muted)';
    countHeader.style.marginBottom = '10px';
    countHeader.textContent = `Mostrando ${displayList.length} de ${list.length} ejercicios`;
    this.catalogListWrap.appendChild(countHeader);

    displayList.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.marginBottom = '12px';
      card.style.padding = '14px';

      const clinicalBadge = ex.isClinical 
        ? '<span class="badge-clinical">⭐ Clínico / GLUT4</span>' 
        : (ex.glut4Score === 5 ? '<span class="glut4-pill" style="font-size: 0.65rem;">Sobrecarga GLUT4</span>' : '');

      Sanitizer.safeSetInnerHTML(card, `
        <div style="display: flex; gap: 12px; align-items: center;">
          <img src="${ex.startImage || 'assets/exercises/leg-press-start.webp'}" alt="${Sanitizer.escapeHTML(ex.name)}" style="width: 58px; height: 58px; object-fit: contain; background: #0f172a; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 0.98rem; font-weight: 800; line-height: 1.2;">${Sanitizer.escapeHTML(ex.name)}</h4>
              ${clinicalBadge}
            </div>
            <div style="font-size: 0.75rem; color: var(--cyan-400); font-weight: 600; margin-top: 2px;">
              ${Sanitizer.escapeHTML(ex.targetMuscle)} • ${Sanitizer.escapeHTML(ex.equipment)}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px; line-height: 1.35;">
              ${Sanitizer.escapeHTML(ex.setup ? ex.setup.slice(0, 100) + '...' : '')}
            </div>
          </div>
        </div>
      `);
      this.catalogListWrap.appendChild(card);
    });
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
          console.warn('[SW] Error al registrar service worker:', err);
        });
      });
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new GlucoFitApp();
  });
}
