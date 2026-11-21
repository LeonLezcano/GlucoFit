# GlucoFit — Prescripción de Fuerza & Control Glucémico para Diabetes Tipo 2

> **Versión:** `v1.0.03`  
> **Arquetipo:** Medical-Sports Progressive Web App (PWA) Mobile-First  
> **Estándar:** AiAppFactory Invariants, Anti-Slop Crafted UI, Zero-Sink DOM Security, 5-Layer Testing Harness (111 Tests PASS)

---

## Propósito y Visión Fisiológica

**GlucoFit** es una aplicación Web Progresiva concebida para personas con **Diabetes Tipo 2** que inician entrenamiento de sobrecarga en un gimnasio comercial para mejorar su calidad de vida y descender sus niveles de glucosa en sangre.

### Mecanismo Fisiológico Clave: La Translocación de GLUT4
El músculo esquelético es el mayor reservorio y sumidero de glucosa del cuerpo humano (~80% de la glucosa postprandial). En personas con resistencia a la insulina, la vía mediada por el receptor de insulina está amortiguada. Sin embargo, la **contracción muscular mecánica repetida activa la quinasa AMPK y el calcio intracelular**, provocando la **translocación de transportadores GLUT4 a la membrana celular de forma totalmente independiente a la insulina**.

GlucoFit estructura una rutina **Full Body de 3 días por semana (Lunes, Miércoles y Viernes)** para estimular grandes grupos musculares (cuádriceps, glúteos, dorsales y pectorales), garantizando un vaciado glucémico eficiente con 48 horas de recuperación articular entre sesiones.

---

## Pilares Tecnológicos, Clínicos & UX Anti-Slop

### 1. Centinela y Semáforo Glucémico Preventivo (Pautas ADA/EASD)
- **Zona Hipoglucemia (< 70 mg/dL):** Bloqueo estricto del entrenamiento. Se instruye la aplicación de la *Regla de los 15* (15g de carbohidratos simples, 15 min de reposo y re-medición).
- **Zona Precaución (70 – 99 mg/dL):** Sugerencia de colación rápida (15-20g carbohidratos, ej. fruta o galletas) antes de comenzar series pesadas.
- **Zona Óptima Verde (100 – 180 mg/dL):** Rango ideal para estimulación de GLUT4 y gasto de glucógeno sin estrés metabólico.
- **Zona Elevada (181 – 250 mg/dL):** Entrenamiento permitido a intensidad moderada (RPE 6-7), con pausas completas e hidratación obligatoria en cada descanso.
- **Zona Roja (> 250 mg/dL):** Alerta médica de riesgo de elevación paradójica por catecolaminas; se desaconseja sobrecarga pesada y se orienta hacia caminata suave.
- **Cálculo de Delta Glucémico:** Comparativa pre vs. post-entrenamiento que demuestra el descenso en mg/dL obtenido gracias a la sesión.

### 2. 🏋️ Modo Sesión Activa (Coach de Sala de Pesas)
- **Screen Wake Lock API:** Mantiene la pantalla del celular siempre encendida durante el entrenamiento en el soporte de la máquina, con auto re-enganche al regresar de otras aplicaciones.
- **Calculadora Visual de Discos en Vivo:** Desglose gráfico interactivo por lado para barras olímpicas (20 kg, 15 kg, 10 kg, EZ y Smith) al tocar la carga de cualquier serie.
- **Checklist Postural & 3 Errores Críticos:** Cada máquina presenta 3 puntos obligatorios de postura y los 3 errores biomecánicos más peligrosos para prevenir lesiones discales o articulares.
- **Pauta Respiratoria Anti-Valsalva:** Instrucción precisa de respiración en cada ejercicio para prevenir picos bruscos de presión arterial o presión intraocular (crucial ante retinopatía).

### 3. 🗺️ Mapa Muscular Vectorial SVG Reactivo
- **Anatomía Completa:** Siluetas Hombre / Mujer y vistas Frente / Dorso basadas en rutas SVG nativas sin dependencias pesadas.
- **Monitoreo de Volumen y Recuperación 48h:** Colorea los grupos musculares en degradados según el volumen semanal y calcula si el grupo muscular está listo para volver a ser entrenado (>48h) o en recuperación activa.
- **Modo Post-Sesión GLUT4:** Resalta en color verde esmeralda las zonas musculares exactas activadas durante el entrenamiento que facilitaron el drenaje glucémico.

### 4. 🧮 Suite de Motores Fisiológicos y Matemáticos (`src/engines/`)
- **1RM Sub-máximo & Ensamble (`onerm.js`):** 7 fórmulas clásicas (Epley, Brzycki, Lander, Lombardi, Mayhew, O'Conner, Wathan), estimación por ensamble ponderado y escala RIR de Mike Tuchscherer con límites de repeticiones para prevenir sobre-estimaciones.
- **Calculadora de Discos Olímpica (`plates.js`):** Algoritmo *greedy* exacto para barras de 20 kg, 15 kg, 10 kg, EZ y multipower, con soporte para discos fraccionarios (0.5 a 2.5 kg) y pesados (5 a 25 kg).
- **Equilibrio Estructural Poliquin & ATG (`structural-balance.js`):** Ratios biomecánicos para identificar eslabones débiles (ej. relación entre Press Plano, Press Militar, Jalón y Curl; o Sentadilla vs. Peso Muerto Rumano) calculando el déficit en kg.
- **Motor de Sobrecarga Progresiva (`progression.js`):** 9 políticas funcionales puras (`double`, `linear`, `greyskull`, `triple`, `density`, `time`, etc.) que recomiendan ajustes de carga, repeticiones o deload según el rendimiento registrado.

### 5. 📚 Catálogo Unificado openGym (+6.550 Ejercicios)
- **6.577 ejercicios** catalogados e indexados en español, con equipamiento, músculo objetivo y sinergistas.
- **6.554 ilustraciones WebP locales** sin dependencias externas de red.
- **Insignia Clínica:** Los 23 ejercicios clínicos fundamentales de prescripción metabólica conservan su insignia `[Clínico / GLUT4]`, instrucciones anti-valsalva y checklists posturales.

### 6. 🔄 Importación & Exportación Universal (`src/services/importer.js`)
- **Compatibilidad con Ecosistema Fitness:** Importación fluida de historiales en formato CSV desde **Strong**, **Hevy** y **FitNotes**.
- **Exportación Segura Excel:** Generación nativa de archivos CSV con BOM UTF-8 (`\uFEFF`) para apertura directa en Microsoft Excel en Windows sin distorsión de caracteres.

### 7. 🤖 Coach Clínico IA & Servidor MCP Local
- **Coach IA Integrado:** Asistente conversacional en la PWA potenciado por Gemini API (BYOK) con *system prompt* clínico que analiza glucemias, RPE y adaptaciones biomecánicas.
- **Servidor MCP stdio (`mcp/server.js`):** Conector compatible con el estándar Model Context Protocol (MCP) para Antigravity y Claude Code, exponiendo herramientas para inspeccionar catálogo, estimar 1RM, calcular discos y planificar entrenamientos.

---

## 📐 Estructura de Rutinas Clínicas (Full Body 3 Días)

| Día | Nombre | Enfoque Muscular | Estaciones Principales |
| :--- | :--- | :--- | :--- |
| **Lunes (Día A)** | Fuerza Base & Vaciado Glucémico | Cuádriceps + Espalda Media + Pectoral + Core | Prensa de Piernas 45°, Remo en Polea Baja, Press de Pecho Sentado, Elevaciones Laterales, Plancha Abdominal |
| **Miércoles (Día B)** | Cadena Posterior & Tracción Metabólica | Isquiosurales + Dorsales + Deltoides + Brazos | Curl Femoral Sentado, Jalón al Pecho en Polea Alta, Press de Hombros en Máquina, Extensión de Cuádriceps, Tríceps Polea, Bíceps Mancuernas |
| **Viernes (Día C)** | Densidad Muscular & Estabilidad | Glúteos + Isquios + Pectoral + Espalda + Core | Sentadilla Goblet, Peso Muerto Rumano con Mancuernas, Remo con Apoyo al Pecho, Press Plano, Paseo del Granjero Funcional |

---

## 🧪 Arnés de Pruebas Multi-Capa (5 Capas — 111 Tests PASS)

```bash
# Ejecutar la suite completa de pruebas:
pnpm test
```

1. **Capa 1 (Unitarias & Fuzzing):** Parseo de glucemia, límites fisiológicos (20-600 mg/dL), semáforo ADA, cálculo de delta glucémico, fórmulas de 1RM, calculadora de discos, ratios de balance estructural, políticas de progresión funcional y fuzzing caótico con valores extremos.
2. **Capa 2 (Integración & Memoria):** Persistencia en `StorageService`, ciclo de sesión activa con `SessionCoach`, cálculo de volumen muscular acumulado, recuperación 48h, renderizado de mapas SVG, importadores CSV de Strong, Hevy y FitNotes, exportación con BOM UTF-8 y prompt del Coach IA.
3. **Capa 3 (Componentes):** Integridad del catálogo unificado de 6.577 ejercicios (+6.550 requeridos), preservación de los 23 ejercicios clínicos GLUT4 originales, filtros por grupo muscular, buscador en tiempo real e integridad de rutinas A, B y C.
4. **Capa 4 (Seguridad):** Neutralización XSS en todos los sinks DOM con `Sanitizer`, validación estricta de CSP en `firebase.json` (sin `unsafe-eval`, sin `http://`), regla anti-stale en `/sw.js` y 0 secretos hardcodeados.
5. **Capa 5 (E2E):** Flujo completo de paciente: Check-in glucémico (145 mg/dL) -> Selección de rutina -> Ejecución de series de prensa con sobrecarga -> Check-out (112 mg/dL) -> Comprobación de -33 mg/dL de descenso GLUT4, guardado en almacenamiento e iluminación esmeralda en mapa muscular.

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
