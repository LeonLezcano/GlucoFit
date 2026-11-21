/**
 * Storage.js — Persistencia Local Resiliente Offline-First (schemaVersion: 1)
 * Estándar AiAppFactory para preservación de datos sin pérdida ni rescrituras destructivas.
 */

import { exportToExcelCSV } from './importer.js';

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
    progressionPolicy: 'double',
    defaultBar: 'olympic_men',
    bodyGender: 'male',
    bodyMapMode: 'volume',
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
   * Importa y fusiona sesiones externas evitando duplicados por ID
   * @param {Array<object>} importedSessions 
   * @returns {number} Cantidad de nuevas sesiones agregadas
   */
  importSessions(importedSessions = []) {
    if (!Array.isArray(importedSessions) || importedSessions.length === 0) return 0;
    const existing = this.getSessions();
    const map = new Map();

    for (const s of existing) {
      if (s.id) map.set(s.id, s);
    }

    let addedCount = 0;
    for (const s of importedSessions) {
      if (!s.id || !map.has(s.id)) {
        const id = s.id || ('sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6));
        map.set(id, { ...s, id });
        addedCount++;
      }
    }

    const merged = Array.from(map.values()).sort((a, b) => {
      const ta = new Date(a.createdAt || a.timestamp || 0).getTime();
      const tb = new Date(b.createdAt || b.timestamp || 0).getTime();
      return tb - ta;
    });

    memoryStorage.sessions = merged;
    if (this.isAvailable()) {
      try {
        window.localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(merged));
      } catch (e) {
        console.error('[StorageService] Error al persistir sesiones importadas', e);
      }
    }

    return addedCount;
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
        const found = sess.completedExercises.find(ex => ex.exerciseId === exerciseId || ex.name === exerciseId);
        if (found && Array.isArray(found.sets) && found.sets.length > 0) {
          const lastSet = found.sets[found.sets.length - 1];
          return {
            weightKg: lastSet.weightKg || lastSet.weight || 0,
            reps: lastSet.reps || 0,
            date: sess.createdAt || sess.timestamp
          };
        }
      }
    }
    return null;
  },

  /**
   * Obtiene el historial de series de un ejercicio específico en orden cronológico
   * @param {string} exerciseId 
   * @returns {Array<object>}
   */
  getExerciseHistory(exerciseId) {
    const sessions = [...this.getSessions()].reverse(); // Orden cronológico antiguo -> nuevo
    const history = [];

    for (const sess of sessions) {
      const list = sess.completedExercises || sess.exercises || [];
      const found = list.find(ex => ex.exerciseId === exerciseId || ex.name === exerciseId);
      if (found && Array.isArray(found.sets) && found.sets.length > 0) {
        history.push({
          date: sess.date || (sess.createdAt ? sess.createdAt.split('T')[0] : ''),
          timestamp: sess.createdAt || sess.timestamp,
          restSeconds: sess.restSeconds || 75,
          sets: found.sets.map(s => ({
            weight: s.weightKg || s.weight || 0,
            reps: s.reps || 0,
            targetReps: s.targetReps || 10,
            rir: s.rir || 0
          }))
        });
      }
    }

    return history;
  },

  /**
   * Exporta todo el historial en un archivo JSON descargable
   */
  exportDataJSON() {
    const payload = {
      app: 'GlucoFit',
      version: '1.1.00',
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
   * Exporta todo el historial en formato CSV compatible con Microsoft Excel (BOM UTF-8)
   */
  exportDataCSV() {
    const sessions = this.getSessions();
    const csvContent = exportToExcelCSV(sessions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glucofit_historial_${new Date().toISOString().split('T')[0]}.csv`;
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
