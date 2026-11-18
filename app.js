/**
 * app.js — Controlador Principal de la PWA GlucoFit
 * Enrutamiento Hash SPA, Coach de Sesión Activa y Centinela Metabólico
 */

import { EXERCISES, getExerciseById, getExercisesByCategory, searchExercises } from './src/data/exercises.js';
import { ROUTINES, getRoutineById } from './src/data/routines.js';
import { MetabolicGuard, GLUCOSE_ZONES } from './src/services/metabolic-guard.js';
import { StorageService } from './src/services/storage.js';
import { SessionCoach } from './src/services/session-coach.js';
import { Sanitizer } from './src/utils/sanitizer.js';

class GlucoFitApp {
  constructor() {
    this.sessionCoach = new SessionCoach();
    this.selectedRoutineId = 'dia-a';
    this.lastEvaluatedPreGlucose = null;
    this.completedSessionSummary = null;
    this.currentCatalogCategory = 'todos';

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

    // Dashboard
    this.btnStartToday = document.getElementById('btnStartTodayRoutine');
    this.dashboardLastGlucose = document.getElementById('dashboardLastGlucoseBox');
    this.routineSelectorCards = document.getElementById('routineSelectorCards');
    this.sessionsHistoryList = document.getElementById('sessionsHistoryList');
    this.btnExportData = document.getElementById('btnExportData');

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
    this.activeExerciseChecklist = document.getElementById('activeExerciseChecklist');
    this.activeExerciseMistakes = document.getElementById('activeExerciseMistakes');
    this.activeExerciseBreathing = document.getElementById('activeExerciseBreathing');
    this.activeCurrentSetNumber = document.getElementById('activeCurrentSetNumber');
    this.activeTargetRepsHint = document.getElementById('activeTargetRepsHint');
    this.inputSetWeight = document.getElementById('inputSetWeight');
    this.inputSetReps = document.getElementById('inputSetReps');
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
    this.inputPostGlucose = document.getElementById('inputPostGlucose');
    this.btnCalculateDelta = document.getElementById('btnCalculateDelta');
    this.checkoutResultCard = document.getElementById('checkoutResultCard');
    this.checkoutBadge = document.getElementById('checkoutBadge');
    this.checkoutTitle = document.getElementById('checkoutTitle');
    this.checkoutSummary = document.getElementById('checkoutSummary');
    this.btnSaveAndCloseSession = document.getElementById('btnSaveAndCloseSession');

    // Catalog
    this.inputSearchExercises = document.getElementById('inputSearchExercises');
    this.catalogListWrap = document.getElementById('catalogListWrap');
    this.categoryChips = document.querySelectorAll('.category-chips .chip');
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

    // Checkin
    if (this.btnEvaluatePre) {
      this.btnEvaluatePre.addEventListener('click', () => this.handlePreGlucoseEvaluation());
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

    // Sesión Activa
    if (this.btnLogSet) {
      this.btnLogSet.addEventListener('click', () => this.handleLogSet());
    }

    if (this.btnAbandonSession) {
      this.btnAbandonSession.addEventListener('click', () => {
        if (confirm('¿Seguro que deseas abandonar la sesión en curso? El progreso no guardado se perderá.')) {
          this.sessionCoach.finishSession(null);
          window.location.hash = '#dashboard';
        }
      });
    }

    // Temporizador
    if (this.btnSkipRestTimer) {
      this.btnSkipRestTimer.addEventListener('click', () => {
        this.sessionCoach.stopRestTimer();
        this.restTimerModal.classList.add('hidden');
      });
    }

    if (this.btnAdd15Sec) {
      this.btnAdd15Sec.addEventListener('click', () => {
        this.sessionCoach.remainingRestSeconds += 15;
        this.timerDigits.textContent = String(this.sessionCoach.remainingRestSeconds);
      });
    }

    // Checkout
    if (this.btnCalculateDelta) {
      this.btnCalculateDelta.addEventListener('click', () => this.handleCheckoutDelta());
    }

    if (this.btnSaveAndCloseSession) {
      this.btnSaveAndCloseSession.addEventListener('click', () => {
        if (this.completedSessionSummary) {
          StorageService.saveSession(this.completedSessionSummary);
          alert('¡Sesión guardada con éxito en tu historial local!');
          this.completedSessionSummary = null;
          this.renderDashboard();
          window.location.hash = '#dashboard';
        }
      });
    }

    // Catálogo
    if (this.inputSearchExercises) {
      this.inputSearchExercises.addEventListener('input', (e) => {
        this.renderCatalog(e.target.value, this.currentCatalogCategory);
      });
    }

    if (this.categoryChips) {
      this.categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.categoryChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentCatalogCategory = chip.dataset.category || 'todos';
          this.renderCatalog(this.inputSearchExercises.value, this.currentCatalogCategory);
        });
      });
    }
  }

  handleRoute() {
    const rawHash = (window.location.hash.replace('#', '') || 'dashboard').trim();
    const camelHash = rawHash.replace(/-([a-z])/g, g => g[1].toUpperCase());

    // Ocultar todas las vistas
    Object.values(this.views).forEach(v => {
      if (v) v.classList.remove('active');
    });

    // Activar vista solicitada (soporta tanto 'active-session' como 'activeSession')
    const targetView = this.views[rawHash] || this.views[camelHash] || this.views.dashboard || this.views['dashboard'];
    if (targetView) {
      targetView.classList.add('active');
    }

    // Actualizar nav activo
    this.navLinks.forEach(link => {
      const target = link.getAttribute('data-view');
      if (target === rawHash || target === camelHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Acciones específicas de vista
    if (rawHash === 'dashboard') {
      this.renderDashboard();
    } else if (rawHash === 'routine') {
      this.renderRoutineView();
    } else if (rawHash === 'catalog') {
      this.renderCatalog();
    }
  }

  // ================= DASHBOARD =================
  renderDashboard() {
    const sessions = StorageService.getSessions();

    // Última glucemia
    if (sessions.length > 0) {
      const last = sessions[0];
      const dateStr = new Date(last.createdAt).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' });
      let glucoseHtml = `<div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 1.4rem; font-weight: 800; color: var(--emerald-400);">${last.preWorkoutGlucose ? last.preWorkoutGlucose + ' mg/dL' : 'N/A'}</span>
          <span style="font-size: 0.8rem; color: var(--text-dim);"> (Pre)</span>
          ${last.postWorkoutGlucose ? ` ➔ <span style="font-size: 1.4rem; font-weight: 800; color: var(--cyan-400);">${last.postWorkoutGlucose} mg/dL</span> <span style="font-size: 0.8rem; color: var(--text-dim);">(Post)</span>` : ''}
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${dateStr}</span>
      </div>`;
      Sanitizer.safeSetInnerHTML(this.dashboardLastGlucose, glucoseHtml);
    }

    // Selector de Rutinas
    let routinesHtml = '';
    ROUTINES.forEach(r => {
      const isSelected = r.id === this.selectedRoutineId;
      routinesHtml += `
        <div class="exercise-card" style="border: 2px solid ${isSelected ? 'var(--emerald-500)' : 'var(--border-subtle)'}; cursor: pointer;" data-routine-id="${r.id}">
          <div class="exercise-header">
            <div>
              <span class="glut4-pill" style="margin-bottom: 4px;">${r.recommendedDay}</span>
              <h3 style="font-size: 1.05rem; font-weight: 700;">${Sanitizer.escapeHTML(r.title)}</h3>
            </div>
            <span class="exercise-tag">${r.estimatedDurationMin} min</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${Sanitizer.escapeHTML(r.description)}</p>
          <div style="font-size: 0.75rem; color: var(--cyan-400); font-weight: 600;">
            ${Sanitizer.escapeHTML(r.focus)}
          </div>
        </div>
      `;
    });
    Sanitizer.safeSetInnerHTML(this.routineSelectorCards, routinesHtml);

    // Eventos al tocar tarjetas de rutina
    this.routineSelectorCards.querySelectorAll('.exercise-card').forEach(card => {
      card.addEventListener('click', () => {
        this.selectedRoutineId = card.getAttribute('data-routine-id');
        this.renderDashboard();
      });
    });

    // Historial de Sesiones
    if (sessions.length === 0) {
      this.sessionsHistoryList.innerHTML = '<div class="text-muted" style="padding: 10px 0; font-size: 0.85rem;">Aún no tienes sesiones registradas. ¡Comienza hoy tu primera sesión!</div>';
    } else {
      let listHtml = '';
      sessions.slice(0, 5).forEach(sess => {
        const d = new Date(sess.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        const delta = (sess.preWorkoutGlucose && sess.postWorkoutGlucose) ? (sess.preWorkoutGlucose - sess.postWorkoutGlucose) : null;
        listHtml += `
          <div style="padding: 12px; background-color: var(--bg-surface); border-radius: var(--radius-sm); margin-bottom: 8px; border-left: 3px solid var(--emerald-500);">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700;">
              <span>${Sanitizer.escapeHTML(sess.routineTitle)}</span>
              <span style="color: var(--text-dim); font-size: 0.75rem;">${d}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 4px; color: var(--text-muted);">
              <span>${sess.totalSets || 0} series • ${(sess.totalVolumeKg || 0).toLocaleString()} kg movidos</span>
              ${delta !== null ? `<span style="font-weight: 800; color: ${delta > 0 ? 'var(--emerald-400)' : 'var(--cyan-400)'};">${delta > 0 ? `-${delta} mg/dL (GLUT4)` : `${delta} mg/dL`}</span>` : ''}
            </div>
          </div>
        `;
      });
      Sanitizer.safeSetInnerHTML(this.sessionsHistoryList, listHtml);
    }
  }

  // ================= CHECK-IN GLUCÉMICO =================
  handlePreGlucoseEvaluation() {
    const rawVal = this.inputPreGlucose.value;
    const evalResult = MetabolicGuard.evaluatePreWorkout(rawVal);

    this.preGlucoseResultCard.className = `glucose-display-card ${evalResult.color}`;
    this.preGlucoseResultCard.classList.remove('hidden');

    this.preGlucoseBadge.className = `glucose-badge badge-${evalResult.color}`;
    this.preGlucoseBadge.textContent = evalResult.badge;

    this.preGlucoseNumber.textContent = evalResult.value ? evalResult.value : '--';
    this.preGlucoseTitle.textContent = evalResult.title;
    this.preGlucoseMessage.textContent = evalResult.message;

    if (evalResult.canTrain) {
      this.lastEvaluatedPreGlucose = evalResult.value;
      this.btnConfirmCheckin.classList.remove('hidden');
    } else {
      this.lastEvaluatedPreGlucose = null;
      this.btnConfirmCheckin.classList.add('hidden');
    }
  }

  // ================= RUTINA VIEW =================
  renderRoutineView() {
    const routine = getRoutineById(this.selectedRoutineId) || ROUTINES[0];

    this.routineBadgeDay.textContent = routine.recommendedDay;
    this.routineDuration.textContent = `${routine.estimatedDurationMin} min`;
    this.routineTitleHeader.textContent = routine.title;
    this.routineDescHeader.textContent = routine.description;

    let exercisesHtml = '';
    routine.exercises.forEach((item, index) => {
      const exercise = getExerciseById(item.exerciseId);
      if (!exercise) return;

      const lastPerf = StorageService.getLastPerformance(item.exerciseId);
      const suggestedWeight = lastPerf ? `${lastPerf.weightKg} kg (Última vez)` : `${item.initialWeightKg} kg (Sugerido)`;

      exercisesHtml += `
        <div class="exercise-card">
          <div class="exercise-header">
            <div>
              <div style="font-size: 0.75rem; color: var(--emerald-400); font-weight: 700; text-transform: uppercase;">Ejercicio ${index + 1} de ${routine.exercises.length}</div>
              <h4 style="font-size: 1.05rem; font-weight: 700; margin-top: 2px;">${Sanitizer.escapeHTML(exercise.name)}</h4>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${Sanitizer.escapeHTML(exercise.targetMuscle)} • ${Sanitizer.escapeHTML(exercise.equipment)}</div>
            </div>
            <span class="glut4-pill">GLUT4: ${exercise.glut4Score}/5</span>
          </div>

          <div style="display: flex; gap: 8px; font-size: 0.8rem; background-color: var(--bg-surface); padding: 8px 12px; border-radius: var(--radius-sm); margin-top: 4px;">
            <div><strong>Series:</strong> ${item.sets}</div>
            <div><strong>Repes:</strong> ${item.reps}</div>
            <div><strong>Descanso:</strong> ${item.restSeconds}s</div>
            <div style="margin-left: auto; color: var(--cyan-400); font-weight: 600;">${suggestedWeight}</div>
          </div>

          <p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 6px; font-style: italic;">
            💡 ${Sanitizer.escapeHTML(item.clinicalNote)}
          </p>
        </div>
      `;
    });

    Sanitizer.safeSetInnerHTML(this.routineExercisesList, exercisesHtml);
  }

  // ================= SESIÓN ACTIVA (COACH EN SALA) =================
  startActiveWorkout() {
    const routine = getRoutineById(this.selectedRoutineId) || ROUTINES[0];
    const preGlucose = this.lastEvaluatedPreGlucose || 120; // fallback seguro si saltó el checkin

    this.sessionCoach.startSession(routine, preGlucose);
    this.updateWakeLockUI(true);
    window.location.hash = '#active-session';
    this.loadCurrentActiveExercise();
  }

  updateWakeLockUI(active) {
    if (this.wakeLockStatus) {
      if (active) {
        this.wakeLockStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.25)';
        this.wakeLockText.textContent = 'Pantalla Activa ON';
      } else {
        this.wakeLockStatus.style.backgroundColor = 'rgba(100, 116, 139, 0.2)';
        this.wakeLockText.textContent = 'Pantalla Normal';
      }
    }
  }

  loadCurrentActiveExercise() {
    const session = this.sessionCoach.currentSession;
    if (!session) return;

    const currentExProgress = session.exercisesProgress[session.currentExerciseIndex];
    if (!currentExProgress) return;

    const exercise = getExerciseById(currentExProgress.exerciseId);
    if (!exercise) return;

    this.activeRoutineName.textContent = session.routineTitle;
    this.activeExerciseProgress.textContent = `Ejercicio ${session.currentExerciseIndex + 1} de ${session.exercisesProgress.length}`;
    this.activeExerciseTitle.textContent = exercise.name;
    this.activeExerciseSubtitle.textContent = `${exercise.targetMuscle} • ${exercise.equipment}`;
    this.activeExerciseGlut4.textContent = `GLUT4: ${exercise.glut4Score}/5`;

    // Checklist de Técnica
    let checklistHtml = '';
    exercise.postureChecklist.forEach(item => {
      checklistHtml += `<div class="checklist-item"><span>✓</span><span>${Sanitizer.escapeHTML(item)}</span></div>`;
    });
    Sanitizer.safeSetInnerHTML(this.activeExerciseChecklist, checklistHtml);

    // Errores a evitar
    let mistakesHtml = '';
    exercise.commonMistakes.forEach(item => {
      mistakesHtml += `<div class="checklist-item" style="color: var(--rose-400);"><span>✕</span><span>${Sanitizer.escapeHTML(item)}</span></div>`;
    });
    Sanitizer.safeSetInnerHTML(this.activeExerciseMistakes, mistakesHtml);

    // Respiración
    this.activeExerciseBreathing.textContent = exercise.breathingTip;

    // Estado de serie actual
    this.activeCurrentSetNumber.textContent = `Serie ${session.currentSetIndex} de ${currentExProgress.targetSets}`;
    this.activeTargetRepsHint.textContent = `Objetivo: ${currentExProgress.targetReps} repes`;

    // Sugerencia de peso
    const lastPerf = StorageService.getLastPerformance(exercise.id);
    this.inputSetWeight.value = lastPerf ? lastPerf.weightKg : currentExProgress.initialWeightKg;
    this.inputSetReps.value = 10;

    // Render de series completadas en este ejercicio
    this.renderCompletedSetsList(currentExProgress);
  }

  renderCompletedSetsList(currentExProgress) {
    if (currentExProgress.setsCompleted.length === 0) {
      this.activeCompletedSetsList.innerHTML = '<div class="text-muted" style="font-size: 0.85rem; padding: 4px 0;">Ninguna serie completada todavía en esta máquina.</div>';
    } else {
      let html = '';
      currentExProgress.setsCompleted.forEach(s => {
        html += `
          <div class="set-row completed">
            <span><strong>Serie ${s.setNumber}:</strong> ${s.reps} repes × ${s.weightKg} kg</span>
            <span class="text-emerald" style="font-weight: 700;">✓ Guardada</span>
          </div>
        `;
      });
      Sanitizer.safeSetInnerHTML(this.activeCompletedSetsList, html);
    }
  }

  handleLogSet() {
    const weight = Number(this.inputSetWeight.value) || 0;
    const reps = Number(this.inputSetReps.value) || 0;

    if (reps <= 0) {
      alert('Ingresa al menos 1 repetición realizada.');
      return;
    }

    const result = this.sessionCoach.recordSet(reps, weight, 7);
    if (!result) return;

    if (result.isSessionFinished) {
      // Sesión completada al 100%
      this.completedSessionSummary = this.sessionCoach.finishSession(null);
      this.updateWakeLockUI(false);
      this.prepareCheckoutView();
      window.location.hash = '#checkout';
    } else {
      // Abrir temporizador de descanso
      this.openRestTimer(result.restSeconds);
      this.loadCurrentActiveExercise();
    }
  }

  openRestTimer(seconds) {
    this.restTimerModal.classList.remove('hidden');
    this.timerDigits.textContent = String(seconds);

    this.sessionCoach.startRestTimer(
      seconds,
      (remaining) => {
        this.timerDigits.textContent = String(remaining);
      },
      () => {
        // Al terminar
        setTimeout(() => {
          this.restTimerModal.classList.add('hidden');
        }, 1200);
      }
    );
  }

  // ================= CHECK-OUT POST-ENTRENO =================
  prepareCheckoutView() {
    if (!this.completedSessionSummary) return;

    this.summaryDuration.textContent = `${this.completedSessionSummary.durationMinutes} min`;
    this.summaryTotalSets.textContent = `${this.completedSessionSummary.totalSets} series`;
    this.summaryTotalVolume.textContent = `${(this.completedSessionSummary.totalVolumeKg || 0).toLocaleString()} kg`;
  }

  handleCheckoutDelta() {
    const rawPost = this.inputPostGlucose.value;
    if (!rawPost) {
      alert('Por favor ingresa tu valor de glucemia post-entrenamiento.');
      return;
    }

    const preVal = this.completedSessionSummary ? this.completedSessionSummary.preWorkoutGlucose : this.lastEvaluatedPreGlucose;
    const evalDelta = MetabolicGuard.evaluatePostWorkout(preVal, rawPost);

    if (evalDelta.valid) {
      this.completedSessionSummary.postWorkoutGlucose = evalDelta.postValue;

      this.checkoutResultCard.className = `glucose-display-card ${evalDelta.color || 'emerald'}`;
      this.checkoutResultCard.classList.remove('hidden');

      this.checkoutBadge.textContent = evalDelta.status === 'DESCENT' ? `-${evalDelta.delta} mg/dL (GLUT4)` : 'Glucemia Registrada';
      this.checkoutBadge.className = `glucose-badge badge-${evalDelta.color || 'emerald'}`;

      this.checkoutTitle.textContent = evalDelta.title;
      this.checkoutSummary.textContent = evalDelta.summary;
    } else {
      alert('El valor ingresado no es válido (debe estar entre 20 y 600 mg/dL).');
    }
  }

  // ================= CATÁLOGO DE TÉCNICA =================
  renderCatalog(filterText = '', category = 'todos') {
    let exercises = EXERCISES;

    if (category && category !== 'todos') {
      exercises = getExercisesByCategory(category);
    }

    if (filterText) {
      const q = filterText.toLowerCase().trim();
      exercises = exercises.filter(ex => 
        ex.name.toLowerCase().includes(q) ||
        ex.targetMuscle.toLowerCase().includes(q) ||
        ex.equipment.toLowerCase().includes(q)
      );
    }

    if (exercises.length === 0) {
      this.catalogListWrap.innerHTML = '<div class="card text-muted" style="text-align: center;">No se encontraron ejercicios con ese criterio.</div>';
      return;
    }

    let html = '';
    exercises.forEach(ex => {
      html += `
        <div class="card" style="margin-bottom: 14px;">
          <div class="exercise-header">
            <div>
              <span class="glut4-pill" style="margin-bottom: 4px;">GLUT4: ${ex.glut4Score}/5</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; margin-top: 2px;">${Sanitizer.escapeHTML(ex.name)}</h3>
              <div style="font-size: 0.8rem; color: var(--cyan-400); font-weight: 600;">
                ${Sanitizer.escapeHTML(ex.targetMuscle)} • ${Sanitizer.escapeHTML(ex.equipment)}
              </div>
            </div>
            <span class="exercise-tag">${Sanitizer.escapeHTML(ex.category)}</span>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted); margin: 10px 0;">
            <strong>Ajuste de máquina:</strong> ${Sanitizer.escapeHTML(ex.setup)}
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
            <strong>Ejecución:</strong> ${Sanitizer.escapeHTML(ex.execution)}
          </div>

          <div class="technique-box" style="margin-bottom: 8px; padding: 10px 14px;">
            <div class="technique-title">✓ Checklist de Postura</div>
            ${ex.postureChecklist.map(p => `<div class="checklist-item"><span>•</span><span>${Sanitizer.escapeHTML(p)}</span></div>`).join('')}
          </div>

          <div class="mistake-box" style="margin-bottom: 8px; padding: 10px 14px;">
            <div class="mistake-title">⚠️ Errores Típicos</div>
            ${ex.commonMistakes.map(m => `<div class="checklist-item" style="color: var(--rose-400);"><span>•</span><span>${Sanitizer.escapeHTML(m)}</span></div>`).join('')}
          </div>

          <div style="font-size: 0.8rem; color: var(--cyan-400); font-style: italic;">
            🫁 <strong>Respiración:</strong> ${Sanitizer.escapeHTML(ex.breathingTip)}
          </div>
        </div>
      `;
    });

    Sanitizer.safeSetInnerHTML(this.catalogListWrap, html);
  }

  // ================= PWA SERVICE WORKER =================
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => {
            console.log('[PWA] Service Worker registrado con éxito:', reg.scope);
          })
          .catch(err => {
            console.warn('[PWA] Fallo de registro de Service Worker:', err);
          });
      });
    }
  }
}

// Inicialización al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  window.glucoFitApp = new GlucoFitApp();
});
