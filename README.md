# ⚡ GlucoFit — Coach de Fuerza & Guía Biomecánica para Diabetes Tipo 2

> **Versión:** `v1.0.00`  
> **Arquetipo:** Medical-Sports Progressive Web App (PWA) Mobile-First  
> **Estándar:** AiAppFactory Invariants, Zero-Sink DOM Security, 5-Layer Testing Harness (75 Tests PASS)

---

## 🎯 Propósito y Visión Fisiológica

**GlucoFit** es una aplicación Web Progresiva concebida para personas con **Diabetes Tipo 2** que inician entrenamiento de sobrecarga en un gimnasio comercial para mejorar su calidad de vida y descender sus niveles de glucosa en sangre.

### Mecanismo Fisiológico Clave: La Translocación de GLUT4
El músculo esquelético es el mayor reservorio y sumidero de glucosa del cuerpo humano (~80% de la glucosa postprandial). En personas con resistencia a la insulina, la vía mediada por el receptor de insulina está amortiguada. Sin embargo, la **contracción muscular mecánica repetida activa la quinasa AMPK y el calcio intracelular**, provocando la **translocación de transportadores GLUT4 a la membrana celular de forma totalmente independiente a la insulina**.

GlucoFit estructura una rutina **Full Body de 3 días por semana (Lunes, Miércoles y Viernes)** para estimular grandes grupos musculares (cuádriceps, glúteos, dorsales y pectorales), garantizando un vaciado glucémico eficiente con 48 horas de recuperación articular entre sesiones.

---

## 🛡️ Pilares Tecnológicos & Clínicos

### 1. 🩸 Centinela y Semáforo Glucémico Preventivo (Pautas ADA/EASD)
- **Zona Hipoglucemia (< 70 mg/dL):** Bloqueo estricto del entrenamiento. Se instruye la aplicación de la *Regla de los 15* (15g de carbohidratos simples, 15 min de reposo y re-medición).
- **Zona Precaución (70 – 99 mg/dL):** Sugerencia de colación rápida (15-20g carbohidratos, ej. fruta o galletas) antes de comenzar series pesadas.
- **Zona Óptima Verde (100 – 180 mg/dL):** Rango ideal para estimulación de GLUT4 y gasto de glucógeno sin estrés metabólico.
- **Zona Elevada (181 – 250 mg/dL):** Entrenamiento permitido a intensidad moderada (RPE 6-7), con pausas completas e hidratación obligatoria en cada descanso.
- **Zona Roja (> 250 mg/dL):** Alerta médica de riesgo de elevación paradójica por catecolaminas; se desaconseja sobrecarga pesada y se orienta hacia caminata suave.
- **Cálculo de Delta Glucémico:** Comparativa pre vs. post-entrenamiento que demuestra el descenso en mg/dL obtenido gracias a la sesión.

### 2. 🏋️ Modo Sesión Activa (Coach de Sala de Pesas)
- **Screen Wake Lock API:** Mantiene la pantalla del celular siempre encendida durante el entrenamiento en el soporte de la máquina, con auto re-enganche al regresar de otras aplicaciones.
- **Checklist Postural & 3 Errores Críticos:** Cada máquina presenta 3 puntos obligatorios de postura y los 3 errores biomecánicos más peligrosos para prevenir lesiones discales o articulares.
- **Pauta Respiratoria Anti-Valsalva:** Instrucción precisa de respiración en cada ejercicio para prevenir picos bruscos de presión arterial o presión intraocular (crucial ante retinopatía).
- **Sobrecarga Progresiva:** La app recuerda la última carga y repeticiones logradas en cada máquina para sugerir el peso del día.

### 3. ⏱️ Temporizador de Descanso Interactivo
- Cuenta regresiva visual (60s a 90s según la demanda metabólica del ejercicio).
- Avisos acústicos sintetizados con **Web Audio API** nativo (sin archivos de audio externos).
- Vibración háptica (`navigator.vibrate`) en smartphones.

### 4. 📶 100% Offline-First
- Todo el catálogo de ejercicios, la rutina y la lógica clínica residen en el cliente (`localStorage` + Service Worker).
- Funciona sin interrupciones en subsuelos y galpones de gimnasios sin señal 4G o WiFi.
- Opción de exportación de historial en formato JSON con BOM UTF-8 para respaldo personal.

---

## 📐 Estructura de Rutinas Clínicas (Full Body 3 Días)

| Día | Nombre | Enfoque Muscular | Estaciones Principales |
| :--- | :--- | :--- | :--- |
| **Lunes (Día A)** | Fuerza Base & Vaciado Glucémico | Cuádriceps + Espalda Media + Pectoral + Core | Prensa de Piernas 45°, Remo en Polea Baja, Press de Pecho Sentado, Elevaciones Laterales, Plancha Abdominal |
| **Miércoles (Día B)** | Cadena Posterior & Tracción Metabólica | Isquiosurales + Dorsales + Deltoides + Brazos | Curl Femoral Sentado, Jalón al Pecho en Polea Alta, Press de Hombros en Máquina, Extensión de Cuádriceps, Tríceps Polea, Bíceps Mancuernas |
| **Viernes (Día C)** | Densidad Muscular & Estabilidad | Glúteos + Isquios + Pectoral + Espalda + Core | Sentadilla Goblet, Peso Muerto Rumano con Mancuernas, Remo con Apoyo al Pecho, Press Plano, Paseo del Granjero Funcional |

---

## 🧪 Arnés de Pruebas Multi-Capa (5 Capas — 75 Tests PASS)

```bash
# Ejecutar la suite completa de pruebas:
pnpm test
```

1. **Capa 1 (Unitarias & Fuzzing):** Parseo de glucemia, límites fisiológicos (20-600 mg/dL), semáforo ADA, cálculo de delta glucémico y fuzzing caótico con valores extremos.
2. **Capa 2 (Integración & Memoria):** Persistencia en `StorageService`, ciclo de sesión activa con `SessionCoach`, cálculo de volumen acumulado (tonnage) y prueba de 100 ciclos sin fugas de memoria.
3. **Capa 3 (Componentes):** Integridad del catálogo de ejercicios curado (con checklist postural y errores comunes), filtros por grupo muscular, buscador en tiempo real e integridad de rutinas A, B y C.
4. **Capa 4 (Seguridad):** Neutralización XSS en todos los sinks DOM con `Sanitizer`, validación estricta de CSP en `firebase.json` (sin `unsafe-eval`, sin `http://`), regla anti-stale en `/sw.js` y 0 secretos hardcodeados.
5. **Capa 5 (E2E):** Flujo completo de paciente: Check-in glucémico (145 mg/dL) -> Selección de rutina -> Ejecución de series de prensa con sobrecarga -> Check-out (112 mg/dL) -> Comprobación de -33 mg/dL de descenso GLUT4 y guardado en almacenamiento.

---

## 🛡️ Auditoría de Seguridad (AppSec Guardian)

```bash
pnpm test:security
```
- **Puntaje:** `100 / 100`
- **Vulnerabilidades:** `0 Críticas | 0 Altas | 0 Medias | 0 Bajas`
- **Aislamiento Cloud:** `firestore.rules` con aislamiento estricto por usuario (`request.auth.uid == userId`) y protección anti mass-assignment (`affectedKeys()`).

---

## 📱 Verificación Visual & Experiencia Móvil (Playwright MCP)

- **Viewport probado:** `393x852` (Smartphone en sala de pesas).
- **Consola del Navegador:** **`Errors: 0` | `Warnings: 0`**.
- **Áreas táctiles:** $\ge 48\text{px}$ para operación cómoda con dedos sudados o guantes en el gimnasio.
