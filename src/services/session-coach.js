/**
 * SessionCoach.js — Gestor y Cronometrador de la Sesión Activa de Entrenamiento
 * Manejo de Screen Wake Lock API, descansos interactivos con Web Audio y vibración háptica.
 */

export class SessionCoach {
  constructor() {
    this.currentSession = null;
    this.wakeLockSentinel = null;
    this.restTimerInterval = null;
    this.remainingRestSeconds = 0;
    this.audioContext = null;

    // Vincular listener de visibilidad para re-enganchar el Wake Lock si el usuario abre otra app
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  /**
   * Inicia una nueva sesión de entrenamiento guiado
   * @param {object} routine 
   * @param {number} preGlucose 
   * @returns {object}
   */
  startSession(routine, preGlucose) {
    this.currentSession = {
      routineId: routine.id,
      routineTitle: routine.title,
      preWorkoutGlucose: preGlucose,
      startedAt: new Date().toISOString(),
      currentExerciseIndex: 0,
      currentSetIndex: 1, // Serie 1
      exercisesProgress: routine.exercises.map(item => ({
        exerciseId: item.exerciseId,
        targetSets: item.sets,
        targetReps: item.reps,
        restSeconds: item.restSeconds,
        initialWeightKg: item.initialWeightKg,
        setsCompleted: []
      })),
      isFinished: false
    };

    this.requestWakeLock();
    return this.currentSession;
  }

  /**
   * Solicita el bloqueo de pantalla para evitar que se apague en el soporte del gimnasio
   */
  async requestWakeLock() {
    try {
      if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
        this.wakeLockSentinel = await navigator.wakeLock.request('screen');
        this.wakeLockSentinel.addEventListener('release', () => {
          this.wakeLockSentinel = null;
        });
      }
    } catch (err) {
      console.warn('[SessionCoach] Wake Lock no disponible o denegado por el navegador:', err.message);
    }
  }

  /**
   * Libera el bloqueo de pantalla al finalizar o pausar
   */
  releaseWakeLock() {
    if (this.wakeLockSentinel) {
      try {
        this.wakeLockSentinel.release();
      } catch (e) {
        // Ignorar
      }
      this.wakeLockSentinel = null;
    }
  }

  /**
   * Auto re-enganche al regresar a la aplicación tras cambiar de pestaña
   */
  async handleVisibilityChange() {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible' && this.currentSession && !this.currentSession.isFinished) {
      await this.requestWakeLock();
    }
  }

  /**
   * Registra una serie completada y avanza
   * @param {number} reps Realizadas
   * @param {number} weightKg Peso levantado
   * @param {number} rpe Esfuerzo percibido
   * @returns {object} { isLastSetOfExercise, isSessionFinished }
   */
  recordSet(reps, weightKg, rpe = 7) {
    if (!this.currentSession) return null;

    const currentEx = this.currentSession.exercisesProgress[this.currentSession.currentExerciseIndex];
    if (!currentEx) return null;

    const setRecord = {
      setNumber: this.currentSession.currentSetIndex,
      reps: Number(reps) || 0,
      weightKg: Number(weightKg) || 0,
      rpe: Number(rpe) || 7,
      completedAt: new Date().toISOString()
    };

    currentEx.setsCompleted.push(setRecord);

    const isLastSetOfExercise = currentEx.setsCompleted.length >= currentEx.targetSets;
    const isLastExercise = this.currentSession.currentExerciseIndex >= this.currentSession.exercisesProgress.length - 1;
    const isSessionFinished = isLastSetOfExercise && isLastExercise;

    if (!isLastSetOfExercise) {
      this.currentSession.currentSetIndex++;
    } else if (!isLastExercise) {
      this.currentSession.currentExerciseIndex++;
      this.currentSession.currentSetIndex = 1;
    } else {
      this.currentSession.isFinished = true;
      this.releaseWakeLock();
    }

    return {
      recordedSet: setRecord,
      isLastSetOfExercise,
      isSessionFinished,
      restSeconds: currentEx.restSeconds || 75
    };
  }

  /**
   * Inicia el temporizador regresivo de descanso
   * @param {number} seconds 
   * @param {function} onTick (remainingSeconds)
   * @param {function} onComplete ()
   */
  startRestTimer(seconds, onTick, onComplete) {
    this.stopRestTimer();
    this.remainingRestSeconds = Math.max(5, seconds || 60);

    if (typeof onTick === 'function') onTick(this.remainingRestSeconds);

    this.restTimerInterval = setInterval(() => {
      this.remainingRestSeconds--;
      if (typeof onTick === 'function') onTick(this.remainingRestSeconds);

      // Aviso acústico suave en los últimos 3 segundos (3, 2, 1)
      if (this.remainingRestSeconds > 0 && this.remainingRestSeconds <= 3) {
        this.playBeep(440, 0.1);
      }

      if (this.remainingRestSeconds <= 0) {
        this.stopRestTimer();
        this.triggerRestFinishedAlert();
        if (typeof onComplete === 'function') onComplete();
      }
    }, 1000);
  }

  /**
   * Detiene el cronómetro de descanso
   */
  stopRestTimer() {
    if (this.restTimerInterval) {
      clearInterval(this.restTimerInterval);
      this.restTimerInterval = null;
    }
  }

  /**
   * Reproduce tono de aviso sintético sin dependencias externas
   * @param {number} freq Frecuencia en Hz
   * @param {number} duration Duración en segundos
   */
  playBeep(freq = 880, duration = 0.25) {
    try {
      if (typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!this.audioContext) {
          this.audioContext = new AudioContextClass();
        }
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
      }
    } catch (e) {
      // Ignorar si el usuario aún no interactuó con el DOM
    }
  }

  /**
   * Dispara alerta de fin de descanso (tono doble + vibración háptica)
   */
  triggerRestFinishedAlert() {
    this.playBeep(880, 0.2);
    setTimeout(() => this.playBeep(1174, 0.35), 220);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 150]);
      } catch (e) {
        // Dispositivo sin motor háptico
      }
    }
  }

  /**
   * Calcula el volumen total de carga movido (Tonnage)
   * @returns {number} Kg totales acumulados
   */
  calculateTotalVolumeKg() {
    if (!this.currentSession) return 0;
    let totalKg = 0;
    for (const ex of this.currentSession.exercisesProgress) {
      for (const set of ex.setsCompleted) {
        totalKg += (set.reps * set.weightKg);
      }
    }
    return totalKg;
  }

  /**
   * Finaliza la sesión actual y compila el resumen
   * @param {number} postWorkoutGlucose 
   * @returns {object}
   */
  finishSession(postWorkoutGlucose) {
    if (!this.currentSession) return null;
    this.stopRestTimer();
    this.releaseWakeLock();

    const endedAt = new Date().toISOString();
    const durationMinutes = Math.max(1, Math.round((new Date(endedAt) - new Date(this.currentSession.startedAt)) / 60000));
    const totalVolumeKg = this.calculateTotalVolumeKg();

    const totalSets = this.currentSession.exercisesProgress.reduce((sum, e) => sum + e.setsCompleted.length, 0);

    const completedRecord = {
      routineId: this.currentSession.routineId,
      routineTitle: this.currentSession.routineTitle,
      startedAt: this.currentSession.startedAt,
      endedAt,
      durationMinutes,
      preWorkoutGlucose: this.currentSession.preWorkoutGlucose,
      postWorkoutGlucose: postWorkoutGlucose || null,
      totalVolumeKg,
      totalSets,
      completedExercises: this.currentSession.exercisesProgress
    };

    this.currentSession = null;
    return completedRecord;
  }
}
