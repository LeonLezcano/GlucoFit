/**
 * Storage.js — Persistencia Local Resiliente Offline-First (schemaVersion: 1)
 * Estándar AiAppFactory para preservación de datos sin pérdida ni rescrituras destructivas.
 */

const STORAGE_KEY_SESSIONS = 'glucofit_workout_sessions_v1';
const STORAGE_KEY_SETTINGS = 'glucofit_user_settings_v1';
const SCHEMA_VERSION = 1;

// Memoria volátil de respaldo ante bloqueos de cookies / navegación privada
let memoryStorage = {
  sessions: [],
  settings: {
    userName: 'Atleta',
    targetDaysPerWeek: 3,
    lastSelectedRoutine: 'dia-a',
    restTimerSeconds: 75,
    hapticFeedback: true,
    audioBeep: true,
    schemaVersion: SCHEMA_VERSION
  }
};

export const StorageService = {
  /**
   * Verifica si localStorage está disponible
   * @returns {boolean}
   */
  isAvailable() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__glucofit_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Obtiene la configuración del usuario
   * @returns {object}
   */
  getSettings() {
    if (!this.isAvailable()) return { ...memoryStorage.settings };
    try {
      const data = window.localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!data) return { ...memoryStorage.settings };
      const parsed = JSON.parse(data);
      return { ...memoryStorage.settings, ...parsed };
    } catch (e) {
      console.warn('[StorageService] Error al leer settings, usando fallback', e);
      return { ...memoryStorage.settings };
    }
  },

  /**
   * Guarda la configuración del usuario
   * @param {object} newSettings 
   * @returns {boolean}
   */
  saveSettings(newSettings) {
    const merged = { ...this.getSettings(), ...newSettings, schemaVersion: SCHEMA_VERSION };
    memoryStorage.settings = merged;
    if (!this.isAvailable()) return true;
    try {
      window.localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(merged));
      return true;
    } catch (e) {
      console.error('[StorageService] No se pudo guardar settings en localStorage', e);
      return false;
    }
  },

  /**
   * Obtiene todas las sesiones completadas
   * @returns {Array}
   */
  getSessions() {
    if (!this.isAvailable()) return [...memoryStorage.sessions];
    try {
      const data = window.localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('[StorageService] Error al leer sesiones', e);
      return [];
    }
  },

  /**
   * Registra una nueva sesión completada
   * @param {object} sessionData 
   * @returns {object} Sesión guardada con ID único y timestamp
   */
  saveSession(sessionData) {
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const sessionRecord = {
      id,
      schemaVersion: SCHEMA_VERSION,
      createdAt: new Date().toISOString(),
      ...sessionData
    };

    const currentSessions = this.getSessions();
    const updated = [sessionRecord, ...currentSessions];
    memoryStorage.sessions = updated;

    if (this.isAvailable()) {
      try {
        window.localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('[StorageService] Error al persistir sesión', e);
      }
    }

    return sessionRecord;
  },

  /**
   * Obtiene la última carga registrada para un ejercicio específico
   * @param {string} exerciseId 
   * @returns {object|null} { weightKg, reps, date }
   */
  getLastPerformance(exerciseId) {
    const sessions = this.getSessions();
    for (const sess of sessions) {
      if (Array.isArray(sess.completedExercises)) {
        const found = sess.completedExercises.find(ex => ex.exerciseId === exerciseId);
        if (found && Array.isArray(found.sets) && found.sets.length > 0) {
          // Última serie registrada
          const lastSet = found.sets[found.sets.length - 1];
          return {
            weightKg: lastSet.weightKg || 0,
            reps: lastSet.reps || 0,
            date: sess.createdAt
          };
        }
      }
    }
    return null;
  },

  /**
   * Exporta todo el historial en un archivo JSON descargable
   */
  exportDataJSON() {
    const payload = {
      app: 'GlucoFit',
      version: '1.0.00',
      exportedAt: new Date().toISOString(),
      settings: this.getSettings(),
      sessions: this.getSessions()
    };
    const blob = new Blob(['\uFEFF' + JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glucofit_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Limpia el almacenamiento local para pruebas
   */
  clearAll() {
    memoryStorage.sessions = [];
    if (this.isAvailable()) {
      window.localStorage.removeItem(STORAGE_KEY_SESSIONS);
      window.localStorage.removeItem(STORAGE_KEY_SETTINGS);
    }
  }
};
