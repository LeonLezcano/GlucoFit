#!/usr/bin/env node
/**
 * GlucoFit MCP Server (Model Context Protocol)
 * Servidor MCP nativo sobre stdio (JSON-RPC 2.0) sin dependencias externas.
 * Permite a agentes de IA (Antigravity, Claude Desktop, Cursor) consultar rutinas,
 * previsualizar cargas con sobrecarga progresiva y evaluar balances musculares.
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Importar motores de GlucoFit
import { EXERCISES, searchExercises, getExerciseById } from '../src/data/exercises.js';
import { ROUTINES, getRoutineById } from '../src/data/routines.js';
import { estimate1RM } from '../src/engines/onerm.js';
import { calculatePlates } from '../src/engines/plates.js';
import { calculateNextPrescription } from '../src/engines/progression.js';

const STORAGE_FILE = path.join(rootDir, 'mcp_state.json');

function loadState() {
  if (fs.existsSync(STORAGE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
    } catch {
      return { sessions: [] };
    }
  }
  return { sessions: [] };
}

function saveState(state) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving MCP state:', err);
  }
}

// Catálogo de Herramientas MCP
const TOOLS = [
  {
    name: 'preview_session',
    description: 'Calcula la sesión de entrenamiento sugerida para hoy aplicando sobrecarga progresiva matemática a partir del historial.',
    inputSchema: {
      type: 'object',
      properties: {
        routineId: { type: 'string', description: 'ID de la rutina (ej. "dia-a", "dia-b", "dia-c"). Por defecto día actual.' }
      }
    }
  },
  {
    name: 'estimate_1rm',
    description: 'Calcula el 1RM (Una Repetición Máxima) mediante ensamble ponderado de 7 fórmulas sub-máximas y escala RIR.',
    inputSchema: {
      type: 'object',
      properties: {
        weight: { type: 'number', description: 'Peso levantado en kg' },
        reps: { type: 'number', description: 'Repeticiones completadas' },
        rir: { type: 'number', description: 'Repeticiones en reserva (RIR, opcional)' }
      },
      required: ['weight', 'reps']
    }
  },
  {
    name: 'calculate_plates',
    description: 'Calcula qué discos colocar a cada lado de la barra para alcanzar el peso objetivo.',
    inputSchema: {
      type: 'object',
      properties: {
        targetWeight: { type: 'number', description: 'Peso total deseado en kg' },
        barWeight: { type: 'number', description: 'Peso de la barra (por defecto 20 kg)' }
      },
      required: ['targetWeight']
    }
  },
  {
    name: 'search_exercises',
    description: 'Busca entre los +6.550 ejercicios del catálogo maestro de GlucoFit por nombre, músculo o equipamiento.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Término de búsqueda (ej. "prensa", "pecho", "mancuerna")' },
        onlyClinical: { type: 'boolean', description: 'Filtrar solo los 23 ejercicios clínicos GLUT4' }
      },
      required: ['query']
    }
  },
  {
    name: 'list_routines',
    description: 'Devuelve las rutinas clínicas oficiales de GlucoFit diseñadas para translocación de GLUT4.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'log_workout',
    description: 'Registra un entrenamiento completado en el historial persistente de GlucoFit.',
    inputSchema: {
      type: 'object',
      properties: {
        routineName: { type: 'string', description: 'Nombre de la rutina completada' },
        preGlucose: { type: 'number', description: 'Glucemia previa en mg/dL' },
        postGlucose: { type: 'number', description: 'Glucemia post-entrenamiento en mg/dL' },
        exercises: {
          type: 'array',
          description: 'Lista de ejercicios completados',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              sets: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    weight: { type: 'number' },
                    reps: { type: 'number' },
                    rir: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      },
      required: ['routineName', 'exercises']
    }
  }
];

function handleToolCall(name, args = {}) {
  const state = loadState();

  switch (name) {
    case 'preview_session': {
      const routineId = args.routineId || 'dia-a';
      const routine = getRoutineById(routineId) || ROUTINES[0];

      const prescriptionExercises = routine.exercises.map(exItem => {
        const fullEx = getExerciseById(exItem.exerciseId) || exItem;
        
        // Buscar historial de este ejercicio
        const exHistory = [];
        for (const sess of state.sessions) {
          const found = (sess.completedExercises || sess.exercises || []).find(e => e.exerciseId === exItem.exerciseId || e.name === fullEx.name);
          if (found) exHistory.push(found);
        }

        const prescription = calculateNextPrescription({
          policy: 'double',
          exerciseHistory: exHistory,
          targetRange: { minReps: 8, maxReps: 12, targetSets: exItem.targetSets || 3 },
          category: fullEx.category || 'piernas'
        });

        const plateLoading = calculatePlates(prescription.suggestedWeight, 20);

        return {
          id: fullEx.id,
          name: fullEx.name,
          category: fullEx.category,
          targetMuscle: fullEx.targetMuscle,
          prescribedWeight: prescription.suggestedWeight,
          prescribedReps: prescription.suggestedReps,
          prescribedSets: prescription.suggestedSets,
          progressionReason: prescription.reason,
          plateSetup: plateLoading.platesPerSide
        };
      });

      return {
        routineName: routine.name,
        targetDay: routine.dayName,
        totalExercises: prescriptionExercises.length,
        exercises: prescriptionExercises
      };
    }

    case 'estimate_1rm': {
      const e1rm = estimate1RM(args.weight, args.reps, args.rir || 0, 'weighted');
      return {
        inputWeight: args.weight,
        inputReps: args.reps,
        inputRir: args.rir || 0,
        estimated1RM: e1rm,
        unit: 'kg',
        formula: 'Weighted Ensemble (7 fórmulas + RTS Scale)'
      };
    }

    case 'calculate_plates': {
      const plates = calculatePlates(args.targetWeight, args.barWeight || 20);
      return plates;
    }

    case 'search_exercises': {
      const results = searchExercises(args.query, { onlyClinical: args.onlyClinical });
      return {
        count: results.length,
        results: results.slice(0, 10).map(e => ({
          id: e.id,
          name: e.name,
          category: e.category,
          targetMuscle: e.targetMuscle,
          equipment: e.equipment,
          glut4Score: e.glut4Score,
          isClinical: e.isClinical
        }))
      };
    }

    case 'list_routines': {
      return ROUTINES.map(r => ({
        id: r.id,
        name: r.name,
        day: r.dayName,
        exerciseCount: r.exercises.length,
        focus: r.focus
      }));
    }

    case 'log_workout': {
      const newSession = {
        id: `sess_mcp_${Date.now()}`,
        routineName: args.routineName,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        preGlucose: args.preGlucose || null,
        postGlucose: args.postGlucose || null,
        glucoseDelta: (args.preGlucose && args.postGlucose) ? (args.preGlucose - args.postGlucose) : null,
        completedExercises: args.exercises,
        source: 'mcp'
      };

      state.sessions.push(newSession);
      saveState(state);

      return {
        success: true,
        sessionId: newSession.id,
        message: `Entrenamiento "${args.routineName}" registrado con éxito en GlucoFit.`
      };
    }

    default:
      throw new Error(`Herramienta desconocida: ${name}`);
  }
}

// Bucle de comunicación stdio JSON-RPC 2.0
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', line => {
  if (!line || !line.trim()) return;
  try {
    const msg = JSON.parse(line.trim());
    if (msg.method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id: msg.id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'glucofit-mcp', version: '1.1.00' },
          capabilities: { tools: {} }
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (msg.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id: msg.id,
        result: { tools: TOOLS }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (msg.method === 'tools/call') {
      const toolName = msg.params?.name;
      const toolArgs = msg.params?.arguments || {};
      try {
        const result = handleToolCall(toolName, toolArgs);
        const response = {
          jsonrpc: '2.0',
          id: msg.id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
          }
        };
        process.stdout.write(JSON.stringify(response) + '\n');
      } catch (err) {
        const errorResponse = {
          jsonrpc: '2.0',
          id: msg.id,
          error: { code: -32603, message: err.message }
        };
        process.stdout.write(JSON.stringify(errorResponse) + '\n');
      }
    } else {
      // Ignorar notificaciones o responder método no encontrado
      if (msg.id !== undefined) {
        process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: {} }) + '\n');
      }
    }
  } catch (err) {
    console.error('Error procesando mensaje MCP:', err);
  }
});
