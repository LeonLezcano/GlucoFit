/**
 * Servicio de Coach de IA Inteligente para GlucoFit
 * Integración nativa con Gemini API (BYOK - Bring Your Own Key) sin dependencias externas.
 * Especializado en prescripción de fuerza, translocación de GLUT4 y prevención de hipoglucemias.
 */

import { StorageService } from './storage.js';
import { GLUCOSE_ZONES } from './metabolic-guard.js';
import { Sanitizer } from '../utils/sanitizer.js';

const STORAGE_KEY_GEMINI = 'glucofit_gemini_api_key';
const STORAGE_KEY_MODEL = 'glucofit_gemini_model';
const DEFAULT_MODEL = 'gemini-2.5-flash';

export class AICoachService {
  /**
   * Guarda o actualiza la API Key de Gemini del usuario
   * @param {string} key 
   */
  static saveApiKey(key) {
    if (!key) {
      localStorage.removeItem(STORAGE_KEY_GEMINI);
    } else {
      localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
    }
  }

  /**
   * Obtiene la API Key configurada
   * @returns {string|null}
   */
  static getApiKey() {
    return localStorage.getItem(STORAGE_KEY_GEMINI) || null;
  }

  /**
   * Indica si la IA está configurada y lista
   * @returns {boolean}
   */
  static isConfigured() {
    const key = this.getApiKey();
    return typeof key === 'string' && key.startsWith('AIza') && key.length > 20;
  }

  /**
   * Construye el prompt de sistema con el contexto médico y de entrenamiento del usuario
   * @param {object} context 
   * @returns {string}
   */
  static buildSystemInstruction(context = {}) {
    const lastSession = context.lastSession || null;
    const currentGlucose = context.currentGlucose || null;
    const settings = StorageService.getSettings();

    return `Eres GlucoCoach, un fisiólogo del ejercicio clínico y entrenador de fuerza de élite para personas con Diabetes Tipo 2.
Tu misión es guiar al usuario para optimizar la translocación de GLUT4 independiente de insulina a través del entrenamiento de fuerza, previniendo lesiones y episodios de hipoglucemia.

DIRECTIVAS FISIOLÓGICAS ESTRICTAS:
1. SEMÁFORO GLUCÉMICO (Normas ADA / EASD):
   - Glucosa < 70 mg/dL: BLOQUEO TOTAL. Aplicar la Regla de los 15 (15g carbohidratos simples, 15 min de reposo).
   - Glucosa 70-99 mg/dL: Colación ligera previa obligatoria (15-20g carbohidratos de absorción media).
   - Glucosa 100-180 mg/dL: Rango Óptimo / Zona Verde. Máxima eficiencia para absorción de glucosa muscular.
   - Glucosa 181-250 mg/dL: Permitido con hidratación continua y pausas completas.
   - Glucosa > 250 mg/dL: Prohibido sobrecarga pesada (riesgo de pico hiperglucémico por catecolaminas). Orientar a caminata suave.
2. PREVENCIÓN DE MANIOBRA DE VALSALVA:
   - Prohibido aguantar el aire durante la fuerza (riesgo de retinopatía y pico de presión arterial). Exhalar siempre en el esfuerzo (fase concéntrica).
3. TONO Y ESTILO:
   - Empático, conciso, motivador y científicamente riguroso. Sin rodeos innecesarios.

DATOS ACTUALES DEL USUARIO:
- Glucemia actual declarada: ${currentGlucose ? `${currentGlucose} mg/dL` : 'No registrada en este momento'}
- Última sesión registrada: ${lastSession ? `${lastSession.routineName} (${lastSession.date || 'reciente'}) - Delta glucosa: ${lastSession.glucoseDelta || 'N/A'} mg/dL` : 'Sin sesiones previas'}`;
  }

  /**
   * Envía un mensaje al Coach de IA y obtiene la respuesta
   * @param {string} userMessage 
   * @param {object} [context={}] 
   * @returns {Promise<string>}
   */
  static async askCoach(userMessage, context = {}) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API Key de Gemini no configurada. Por favor ingrésala en Ajustes.');
    }

    const cleanInput = Sanitizer.escapeHTML(userMessage || '').trim();
    if (!cleanInput) {
      throw new Error('El mensaje no puede estar vacío.');
    }

    const model = localStorage.getItem(STORAGE_KEY_MODEL) || DEFAULT_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt = this.buildSystemInstruction(context);

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nPregunta del usuario: ${cleanInput}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData?.error?.message || `Error del servidor (${response.status})`;
      throw new Error(`Gemini API: ${msg}`);
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) {
      throw new Error('Respuesta vacía recibida del Coach de IA.');
    }

    return candidate.trim();
  }
}
