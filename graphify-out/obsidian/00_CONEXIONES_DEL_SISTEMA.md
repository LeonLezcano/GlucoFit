---
type: connections_index
total_nodes: 428
total_edges: 655
total_communities: 29
tags:
  - graphify/connections
  - graphify/index
---

# 🕸️ Conexiones del Sistema — Matriz Integral de Relaciones

> **Documento maestro de trazabilidad y conexiones para Obsidian.**
> Generado automáticamente por Graphify. Mapea la totalidad de dependencias, llamadas y relaciones entre módulos, servicios, componentes y bases de datos.

- **Total de Nodos Registrados:** 428
- **Total de Conexiones Activas (Edges):** 655
- **Comunidades Funcionales:** 29

---

## 🏛️ Comunidades y Módulos del Sistema

- [[_COMMUNITY_run_tests.js|run_tests.js]] — 71 componentes
- [[_COMMUNITY_app.js|app.js]] — 61 componentes
- [[_COMMUNITY_required|required]] — 42 componentes
- [[_COMMUNITY_GlucoFitApp|GlucoFitApp]] — 36 componentes
- [[_COMMUNITY_properties|properties]] — 32 componentes
- [[_COMMUNITY_package.json|package.json]] — 22 componentes
- [[_COMMUNITY_mcppackage.json|mcp/package.json]] — 18 componentes
- [[_COMMUNITY_required_1|required]] — 17 componentes
- [[_COMMUNITY_enum|enum]] — 14 componentes
- [[_COMMUNITY_SessionCoach|SessionCoach]] — 14 componentes
- [[_COMMUNITY_bump-version.js|bump-version.js]] — 13 componentes
- [[_COMMUNITY_manifest.json|manifest.json]] — 10 componentes
- [[_COMMUNITY_muscle-map.js|muscle-map.js]] — 9 componentes
- [[_COMMUNITY_properties_1|properties]] — 7 componentes
- [[_COMMUNITY_serve.js|serve.js]] — 6 componentes
- [[_COMMUNITY_progression.js|progression.js]] — 5 componentes
- [[_COMMUNITY_structural-balance.js|structural-balance.js]] — 5 componentes
- [[_COMMUNITY_attribution|attribution]] — 4 componentes
- [[_COMMUNITY_category|category]] — 4 componentes
- [[_COMMUNITY_created_at|created_at]] — 4 componentes
- [[_COMMUNITY_equipment|equipment]] — 4 componentes
- [[_COMMUNITY_gif_url|gif_url]] — 4 componentes
- [[_COMMUNITY_id|id]] — 4 componentes
- [[_COMMUNITY_image|image]] — 4 componentes
- [[_COMMUNITY_media_id|media_id]] — 4 componentes
- [[_COMMUNITY_muscle_group|muscle_group]] — 4 componentes
- [[_COMMUNITY_name|name]] — 4 componentes
- [[_COMMUNITY_target|target]] — 4 componentes
- [[_COMMUNITY_sw.js|sw.js]] — 2 componentes

---

## 🌉 Nodos Principales de Conexión (Top Bridges)

- [[properties_2]] — Grado 16, conecta 13 comunidades
- [[run_tests.js]] — Grado 120, conecta 6 comunidades
- [[app.js]] — Grado 36, conecta 4 comunidades
- [[calculateNextPrescription()]] — Grado 7, conecta 3 comunidades
- [[renderMuscleSvg()]] — Grado 6, conecta 3 comunidades
- [[calculateMuscleVolume()]] — Grado 5, conecta 3 comunidades
- [[calculateMuscleRecovery()]] — Grado 5, conecta 3 comunidades
- [[server.js]] — Grado 23, conecta 2 comunidades
- [[StorageService]] — Grado 19, conecta 2 comunidades
- [[SessionCoach]] — Grado 15, conecta 2 comunidades
- [[Sanitizer]] — Grado 14, conecta 2 comunidades
- [[exercises.js]] — Grado 11, conecta 2 comunidades
- [[muscle-map.js]] — Grado 10, conecta 2 comunidades
- [[handleToolCall()]] — Grado 9, conecta 2 comunidades
- [[getExerciseById()]] — Grado 9, conecta 2 comunidades

---

## 🔗 Matriz Completa de Conexiones por Componente

### [[$defs]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercise]] — `contains` [EXTRACTED]
- [[exercises.schema.json]] — `contains` [EXTRACTED]
- [[languageMap]] — `contains` [EXTRACTED]
- [[languageStepsMap]] — `contains` [EXTRACTED]
- [[steps]] — `contains` [EXTRACTED]

### [[$id]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercises.schema.json]] — `contains` [EXTRACTED]

### [[$ref]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[items]] — `contains` [EXTRACTED]

### [[$ref_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[en]] — `contains` [EXTRACTED]

### [[$ref_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[es]] — `contains` [EXTRACTED]

### [[$ref_3]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[it]] — `contains` [EXTRACTED]

### [[$ref_4]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[tr]] — `contains` [EXTRACTED]

### [[$ref_5]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[ru]] — `contains` [EXTRACTED]

### [[$ref_6]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[zh]] — `contains` [EXTRACTED]

### [[$ref_7]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[hi]] — `contains` [EXTRACTED]

### [[$ref_8]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[pl]] — `contains` [EXTRACTED]

### [[$ref_9]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[ko]] — `contains` [EXTRACTED]

### [[$ref_10]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[fr]] — `contains` [EXTRACTED]

### [[$ref_11]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[additionalProperties_1]] — `contains` [EXTRACTED]

### [[$ref_12]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[instructions]] — `contains` [EXTRACTED]

### [[$ref_13]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[instruction_steps]] — `contains` [EXTRACTED]

### [[$schema]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercises.schema.json]] — `contains` [EXTRACTED]

### [[.askCoach()]] (`src/services/ai-coach.js`)
- [[.buildSystemInstruction()]] — `calls` [EXTRACTED]
- [[.getApiKey()]] — `calls` [EXTRACTED]
- [[.sendAICoachMessage()]] — `calls` [EXTRACTED]
- [[AICoachService]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]

### [[.bindEvents()]] (`app.js`)
- [[.calculatePostWorkoutDelta()]] — `calls` [EXTRACTED]
- [[.constructor()]] — `calls` [EXTRACTED]
- [[.evaluatePreWorkoutGlucose()]] — `calls` [EXTRACTED]
- [[.handleCSVImport()]] — `calls` [EXTRACTED]
- [[.handleRoute()]] — `calls` [EXTRACTED]
- [[.logCurrentSet()]] — `calls` [EXTRACTED]
- [[.openAICoachModal()]] — `calls` [EXTRACTED]
- [[.openPlatesModal()]] — `calls` [EXTRACTED]
- [[.openSettingsModal()]] — `calls` [EXTRACTED]
- [[.renderCatalog()]] — `calls` [EXTRACTED]
- [[.renderDashboardBodyMap()]] — `calls` [EXTRACTED]
- [[.saveCompletedSession()]] — `calls` [EXTRACTED]
- [[.saveSettingsFromModal()]] — `calls` [EXTRACTED]
- [[.sendAICoachMessage()]] — `calls` [EXTRACTED]
- [[.startActiveWorkout()]] — `calls` [EXTRACTED]
- [[.toggleBiomechPhase()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.buildSystemInstruction()]] (`src/services/ai-coach.js`)
- [[.askCoach()]] — `calls` [EXTRACTED]
- [[AICoachService]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.calculatePostWorkoutDelta()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[MetabolicGuard]] — `references` [EXTRACTED]

### [[.calculateTotalVolumeKg()]] (`src/services/session-coach.js`)
- [[.finishSession()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.constructor()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.handleRoute()]] — `calls` [EXTRACTED]
- [[.initElements()]] — `calls` [EXTRACTED]
- [[.registerServiceWorker()]] — `calls` [EXTRACTED]
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.constructor()_1]] (`src/services/session-coach.js`)
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.evaluatePreWorkoutGlucose()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[MetabolicGuard]] — `references` [EXTRACTED]

### [[.finishSession()]] (`src/services/session-coach.js`)
- [[.calculateTotalVolumeKg()]] — `calls` [EXTRACTED]
- [[.releaseWakeLock()]] — `calls` [EXTRACTED]
- [[.stopRestTimer()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.getApiKey()]] (`src/services/ai-coach.js`)
- [[.askCoach()]] — `calls` [EXTRACTED]
- [[.isConfigured()]] — `calls` [EXTRACTED]
- [[.openSettingsModal()]] — `calls` [EXTRACTED]
- [[AICoachService]] — `method` [EXTRACTED]

### [[.handleCSVImport()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[importWorkoutCSV()]] — `calls` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.handleRoute()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.constructor()]] — `calls` [EXTRACTED]
- [[.renderCatalog()]] — `calls` [EXTRACTED]
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[.renderRoutineView()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.handleVisibilityChange()]] (`src/services/session-coach.js`)
- [[.requestWakeLock()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.initElements()]] (`app.js`)
- [[.constructor()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.isConfigured()]] (`src/services/ai-coach.js`)
- [[.getApiKey()]] — `calls` [EXTRACTED]
- [[AICoachService]] — `method` [EXTRACTED]

### [[.logCurrentSet()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.renderActiveExercise()]] — `calls` [EXTRACTED]
- [[.renderCheckout()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.openAICoachModal()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.openPlatesModal()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[calculatePlates()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.openSettingsModal()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.getApiKey()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.playBeep()]] (`src/services/session-coach.js`)
- [[.startRestTimer()]] — `calls` [EXTRACTED]
- [[.triggerRestFinishedAlert()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.recordSet()]] (`src/services/session-coach.js`)
- [[.releaseWakeLock()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.registerServiceWorker()]] (`app.js`)
- [[.constructor()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.releaseWakeLock()]] (`src/services/session-coach.js`)
- [[.finishSession()]] — `calls` [EXTRACTED]
- [[.recordSet()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.renderActiveCompletedSets()]] (`app.js`)
- [[.renderActiveExercise()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]

### [[.renderActiveExercise()]] (`app.js`)
- [[.logCurrentSet()]] — `calls` [EXTRACTED]
- [[.renderActiveCompletedSets()]] — `calls` [EXTRACTED]
- [[.startActiveWorkout()]] — `calls` [EXTRACTED]
- [[calculateNextPrescription()]] — `calls` [EXTRACTED]
- [[estimate1RM()]] — `calls` [EXTRACTED]
- [[getExerciseById()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.renderCatalog()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.handleRoute()]] — `calls` [EXTRACTED]
- [[getExercisesByCategory()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]

### [[.renderCheckout()]] (`app.js`)
- [[.logCurrentSet()]] — `calls` [EXTRACTED]
- [[getExerciseById()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[renderMuscleSvg()]] — `calls` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.renderDashboard()]] (`app.js`)
- [[.constructor()]] — `calls` [EXTRACTED]
- [[.handleCSVImport()]] — `calls` [EXTRACTED]
- [[.handleRoute()]] — `calls` [EXTRACTED]
- [[.renderDashboardBodyMap()]] — `calls` [EXTRACTED]
- [[.renderRoutineSelectorCards()]] — `calls` [EXTRACTED]
- [[.renderSessionsHistory()]] — `calls` [EXTRACTED]
- [[.saveSettingsFromModal()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.renderDashboardBodyMap()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[calculateMuscleRecovery()]] — `calls` [EXTRACTED]
- [[calculateMuscleVolume()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[renderMuscleSvg()]] — `calls` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.renderRoutineSelectorCards()]] (`app.js`)
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[ROUTINES]] — `references` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.renderRoutineView()]] (`app.js`)
- [[.handleRoute()]] — `calls` [EXTRACTED]
- [[getExerciseById()]] — `calls` [EXTRACTED]
- [[getRoutineById()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.renderSessionsHistory()]] (`app.js`)
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[Sanitizer]] — `references` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.requestWakeLock()]] (`src/services/session-coach.js`)
- [[.handleVisibilityChange()]] — `calls` [EXTRACTED]
- [[.startSession()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.saveApiKey()]] (`src/services/ai-coach.js`)
- [[.saveSettingsFromModal()]] — `calls` [EXTRACTED]
- [[AICoachService]] — `method` [EXTRACTED]

### [[.saveCompletedSession()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.saveSettingsFromModal()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.renderDashboard()]] — `calls` [EXTRACTED]
- [[.saveApiKey()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.sendAICoachMessage()]] (`app.js`)
- [[.askCoach()]] — `calls` [EXTRACTED]
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]
- [[StorageService]] — `references` [EXTRACTED]

### [[.startActiveWorkout()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[.renderActiveExercise()]] — `calls` [EXTRACTED]
- [[getRoutineById()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.startRestTimer()]] (`src/services/session-coach.js`)
- [[.playBeep()]] — `calls` [EXTRACTED]
- [[.stopRestTimer()]] — `calls` [EXTRACTED]
- [[.triggerRestFinishedAlert()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.startSession()]] (`src/services/session-coach.js`)
- [[.requestWakeLock()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.stopRestTimer()]] (`src/services/session-coach.js`)
- [[.finishSession()]] — `calls` [EXTRACTED]
- [[.startRestTimer()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[.toggleBiomechPhase()]] (`app.js`)
- [[.bindEvents()]] — `calls` [EXTRACTED]
- [[getExerciseById()]] — `calls` [EXTRACTED]
- [[GlucoFitApp]] — `method` [EXTRACTED]

### [[.triggerRestFinishedAlert()]] (`src/services/session-coach.js`)
- [[.playBeep()]] — `calls` [EXTRACTED]
- [[.startRestTimer()]] — `calls` [EXTRACTED]
- [[SessionCoach]] — `method` [EXTRACTED]

### [[__dirname]] (`mcp/server.js`)
- [[server.js]] — `contains` [EXTRACTED]

### [[__dirname_1]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[__dirname_2]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[__dirname_3]] (`scripts/serve.js`)
- [[serve.js]] — `contains` [EXTRACTED]

### [[__dirname_4]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[__filename]] (`mcp/server.js`)
- [[server.js]] — `contains` [EXTRACTED]

### [[__filename_1]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[__filename_2]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[__filename_3]] (`scripts/serve.js`)
- [[serve.js]] — `contains` [EXTRACTED]

### [[__filename_4]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[addedCount]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[additionalProperties]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[languageMap]] — `contains` [EXTRACTED]
- [[type_12]] — `contains` [EXTRACTED]

### [[additionalProperties_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_11]] — `contains` [EXTRACTED]
- [[languageStepsMap]] — `contains` [EXTRACTED]

### [[additionalProperties_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercise]] — `contains` [EXTRACTED]

### [[ai-coach]] (`mcp/package.json`)
- [[keywords]] — `extends` [EXTRACTED]

### [[ai-coach.js]] (`src/services/ai-coach.js`)
- [[AICoachService]] — `contains` [EXTRACTED]
- [[app.js]] — `imports_from` [EXTRACTED]
- [[GLUCOSE_ZONES]] — `imports` [EXTRACTED]
- [[metabolic-guard.js]] — `imports_from` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[Sanitizer]] — `imports` [EXTRACTED]
- [[sanitizer.js]] — `imports_from` [EXTRACTED]
- [[storage.js]] — `imports_from` [EXTRACTED]
- [[StorageService]] — `imports` [EXTRACTED]

### [[AICoachService]] (`src/services/ai-coach.js`)
- [[.askCoach()]] — `method` [EXTRACTED]
- [[.buildSystemInstruction()]] — `method` [EXTRACTED]
- [[.getApiKey()]] — `method` [EXTRACTED]
- [[.isConfigured()]] — `method` [EXTRACTED]
- [[.saveApiKey()]] — `method` [EXTRACTED]
- [[ai-coach.js]] — `contains` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[aiPrompt]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[app.js]] (`app.js`)
- [[ai-coach.js]] — `imports_from` [EXTRACTED]
- [[AICoachService]] — `imports` [EXTRACTED]
- [[calculateMuscleRecovery()]] — `imports` [EXTRACTED]
- [[calculateMuscleVolume()]] — `imports` [EXTRACTED]
- [[calculateNextPrescription()]] — `imports` [EXTRACTED]
- [[calculatePlates()]] — `imports` [EXTRACTED]
- [[CATALOGUE]] — `imports` [EXTRACTED]
- [[CLINICAL_EXERCISES]] — `imports` [EXTRACTED]
- [[estimate1RM()]] — `imports` [EXTRACTED]
- [[EXERCISES]] — `imports` [EXTRACTED]
- [[exercises.js]] — `imports_from` [EXTRACTED]
- [[formatPlateString()]] — `imports` [EXTRACTED]
- [[getExerciseById()]] — `imports` [EXTRACTED]
- [[getExercisesByCategory()]] — `imports` [EXTRACTED]
- [[getRoutineById()]] — `imports` [EXTRACTED]
- [[GlucoFitApp]] — `contains` [EXTRACTED]
- [[GLUCOSE_ZONES]] — `imports` [EXTRACTED]
- [[importer.js]] — `imports_from` [EXTRACTED]
- [[importWorkoutCSV()]] — `imports` [EXTRACTED]
- [[metabolic-guard.js]] — `imports_from` [EXTRACTED]
- [[MetabolicGuard]] — `imports` [EXTRACTED]
- [[muscle-map.js]] — `imports_from` [EXTRACTED]
- [[onerm.js]] — `imports_from` [EXTRACTED]
- [[plates.js]] — `imports_from` [EXTRACTED]
- [[progression.js]] — `imports_from` [EXTRACTED]
- [[renderMuscleSvg()]] — `imports` [EXTRACTED]
- [[ROUTINES]] — `imports` [EXTRACTED]
- [[routines.js]] — `imports_from` [EXTRACTED]
- [[Sanitizer]] — `imports` [EXTRACTED]
- [[sanitizer.js]] — `imports_from` [EXTRACTED]
- [[searchExercises()]] — `imports` [EXTRACTED]
- [[session-coach.js]] — `imports_from` [EXTRACTED]
- [[SessionCoach]] — `imports` [EXTRACTED]
- [[STANDARD_BARS]] — `imports` [EXTRACTED]
- [[storage.js]] — `imports_from` [EXTRACTED]
- [[StorageService]] — `imports` [EXTRACTED]

### [[assert()]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[atgResults]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[attribution]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_16]] — `contains` [EXTRACTED]
- [[minLength_7]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_28]] — `contains` [EXTRACTED]

### [[attribution_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[author]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[author_1]] (`package.json`)
- [[package.json]] — `contains` [EXTRACTED]

### [[back]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[background_color]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[BALANCE_STATUSES]] (`src/engines/structural-balance.js`)
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[structural-balance.js]] — `contains` [EXTRACTED]

### [[balanceBalanced]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[balanceWeak]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[best1RMOfSets()]] (`src/engines/onerm.js`)
- [[estimate1RM()]] — `calls` [EXTRACTED]
- [[onerm.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[bin]] (`mcp/package.json`)
- [[glucofit-mcp]] — `contains` [EXTRACTED]
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[body-paths.js]] (`src/data/body-paths.js`)
- [[muscle-map.js]] — `imports_from` [EXTRACTED]

### [[body_part]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_6]] — `contains` [EXTRACTED]
- [[enum]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_20]] — `contains` [EXTRACTED]

### [[body_part_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[bump-version.js]] (`scripts/bump-version.js`)
- [[__dirname_1]] — `contains` [EXTRACTED]
- [[__filename_1]] — `contains` [EXTRACTED]
- [[major]] — `contains` [EXTRACTED]
- [[match]] — `contains` [EXTRACTED]
- [[minor]] — `contains` [EXTRACTED]
- [[packagePath]] — `contains` [EXTRACTED]
- [[patchStr]] — `contains` [EXTRACTED]
- [[rawVersion]] — `contains` [EXTRACTED]
- [[rootDir_1]] — `contains` [EXTRACTED]
- [[swPath]] — `contains` [EXTRACTED]
- [[versionData]] — `contains` [EXTRACTED]
- [[versionPath]] — `contains` [EXTRACTED]

### [[calculateMuscleRecovery()]] (`src/services/muscle-map.js`)
- [[.renderDashboardBodyMap()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[muscle-map.js]] — `contains` [EXTRACTED]
- [[normalizeMuscleKey()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[calculateMuscleVolume()]] (`src/services/muscle-map.js`)
- [[.renderDashboardBodyMap()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[muscle-map.js]] — `contains` [EXTRACTED]
- [[normalizeMuscleKey()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[calculateNextPrescription()]] (`src/engines/progression.js`)
- [[.renderActiveExercise()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[getDefaultIncrement()]] — `calls` [EXTRACTED]
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[progression.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[calculatePlates()]] (`src/engines/plates.js`)
- [[.openPlatesModal()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[plates.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[cardio]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[CATALOGUE]] (`src/data/exercises-catalogue.js`)
- [[app.js]] — `imports` [EXTRACTED]
- [[compile-catalogue.mjs]] — `imports` [EXTRACTED]
- [[exercises-catalogue.js]] — `contains` [EXTRACTED]
- [[exercises.js]] — `imports` [EXTRACTED]
- [[importer.js]] — `imports` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[category]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_5]] — `contains` [EXTRACTED]
- [[minLength_2]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_19]] — `contains` [EXTRACTED]

### [[category_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[CATEGORY_MAP]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[chaoticInputs]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[checkinEval]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[chest]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[CLINICAL_EXERCISES]] (`src/data/exercises.js`)
- [[app.js]] — `imports` [EXTRACTED]
- [[exercises.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[clinicalMap]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[coach]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[compile-catalogue.mjs]] (`scripts/compile-catalogue.mjs`)
- [[__dirname_2]] — `contains` [EXTRACTED]
- [[__filename_2]] — `contains` [EXTRACTED]
- [[CATALOGUE]] — `imports` [EXTRACTED]
- [[CATEGORY_MAP]] — `contains` [EXTRACTED]
- [[clinicalMap]] — `contains` [EXTRACTED]
- [[compiled]] — `contains` [EXTRACTED]
- [[esData]] — `contains` [EXTRACTED]
- [[esPath]] — `contains` [EXTRACTED]
- [[exDir]] — `contains` [EXTRACTED]
- [[EXERCISES]] — `imports` [EXTRACTED]
- [[exercises.js]] — `imports_from` [EXTRACTED]
- [[files]] — `contains` [EXTRACTED]
- [[MUSCLE_IMAGE_MAP]] — `contains` [EXTRACTED]
- [[outputPath]] — `contains` [EXTRACTED]
- [[rawMap]] — `contains` [EXTRACTED]
- [[resolveExercise()]] — `contains` [EXTRACTED]
- [[rootDir_2]] — `contains` [EXTRACTED]

### [[compiled]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[created_at]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_17]] — `contains` [EXTRACTED]
- [[format]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_29]] — `contains` [EXTRACTED]

### [[created_at_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[CRITICAL_ASSETS]] (`sw.js`)
- [[sw.js]] — `contains` [EXTRACTED]

### [[DEFAULT_PLATES]] (`src/engines/plates.js`)
- [[plates.js]] — `contains` [EXTRACTED]

### [[deltaAscent]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[deltaDescent]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[deltaEval]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[deltaStable]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[description]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercises.schema.json]] — `contains` [EXTRACTED]

### [[description_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[languageMap]] — `contains` [EXTRACTED]

### [[description_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[languageStepsMap]] — `contains` [EXTRACTED]

### [[description_3]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[id]] — `contains` [EXTRACTED]

### [[description_4]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[name]] — `contains` [EXTRACTED]

### [[description_5]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[category]] — `contains` [EXTRACTED]

### [[description_6]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[body_part]] — `contains` [EXTRACTED]

### [[description_7]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[equipment]] — `contains` [EXTRACTED]

### [[description_8]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[instructions]] — `contains` [EXTRACTED]

### [[description_9]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[instruction_steps]] — `contains` [EXTRACTED]

### [[description_10]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[muscle_group]] — `contains` [EXTRACTED]

### [[description_11]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[secondary_muscles]] — `contains` [EXTRACTED]

### [[description_12]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[target]] — `contains` [EXTRACTED]

### [[description_13]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[media_id]] — `contains` [EXTRACTED]

### [[description_14]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[image]] — `contains` [EXTRACTED]

### [[description_15]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[gif_url]] — `contains` [EXTRACTED]

### [[description_16]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[attribution]] — `contains` [EXTRACTED]

### [[description_17]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[created_at]] — `contains` [EXTRACTED]

### [[description_18]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[description_19]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[description_20]] (`package.json`)
- [[package.json]] — `contains` [EXTRACTED]

### [[detectFormat()]] (`src/services/importer.js`)
- [[importer.js]] — `contains` [EXTRACTED]
- [[importWorkoutCSV()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[dev]] (`package.json`)
- [[scripts_1]] — `contains` [EXTRACTED]

### [[diabetes]] (`mcp/package.json`)
- [[keywords]] — `extends` [EXTRACTED]

### [[diabetes_1]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[display]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[dummySessionsForMap]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[en]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_1]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_2]] — `contains` [EXTRACTED]

### [[en_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[enum]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[back]] — `extends` [EXTRACTED]
- [[body_part]] — `contains` [EXTRACTED]
- [[cardio]] — `extends` [EXTRACTED]
- [[chest]] — `extends` [EXTRACTED]
- [[lower arms]] — `extends` [EXTRACTED]
- [[lower legs]] — `extends` [EXTRACTED]
- [[neck]] — `extends` [EXTRACTED]
- [[shoulders]] — `extends` [EXTRACTED]
- [[upper arms]] — `extends` [EXTRACTED]
- [[upper legs]] — `extends` [EXTRACTED]
- [[waist]] — `extends` [EXTRACTED]

### [[epleVal]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[equipment]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_7]] — `contains` [EXTRACTED]
- [[minLength_3]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_21]] — `contains` [EXTRACTED]

### [[equipment_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[es]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_2]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_3]] — `contains` [EXTRACTED]

### [[es_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[esData]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[esPath]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[estimate1RM()]] (`src/engines/onerm.js`)
- [[.renderActiveExercise()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[best1RMOfSets()]] — `calls` [EXTRACTED]
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[onerm.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]
- [[weightedEstimate()]] — `calls` [EXTRACTED]

### [[evalCaution]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[evalHigh]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[evalHypo]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[evalOptimalHigh]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[evalOptimalLow]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[evalOptimalMid]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[evaluateLiftBalance()]] (`src/engines/structural-balance.js`)
- [[evaluateTemplate()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[structural-balance.js]] — `contains` [EXTRACTED]

### [[evaluateTemplate()]] (`src/engines/structural-balance.js`)
- [[evaluateLiftBalance()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[structural-balance.js]] — `contains` [EXTRACTED]

### [[evalVeryHigh]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[exByIdOpenGym]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[exCategoriesAll]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[exDir]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[exercise]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$defs]] — `contains` [EXTRACTED]
- [[additionalProperties_2]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[required_2]] — `contains` [EXTRACTED]
- [[type_16]] — `contains` [EXTRACTED]

### [[EXERCISES]] (`src/data/exercises.js`)
- [[app.js]] — `imports` [EXTRACTED]
- [[compile-catalogue.mjs]] — `imports` [EXTRACTED]
- [[importer.js]] — `imports` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[exercises-catalogue.js]] (`src/data/exercises-catalogue.js`)
- [[CATALOGUE]] — `contains` [EXTRACTED]
- [[exercises.js]] — `re_exports` [EXTRACTED]

### [[exercises.js]] (`src/data/exercises.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[CATALOGUE]] — `imports` [EXTRACTED]
- [[CLINICAL_EXERCISES]] — `contains` [EXTRACTED]
- [[compile-catalogue.mjs]] — `imports_from` [EXTRACTED]
- [[exercises-catalogue.js]] — `re_exports` [EXTRACTED]
- [[getExerciseById()]] — `contains` [EXTRACTED]
- [[getExercisesByCategory()]] — `contains` [EXTRACTED]
- [[importer.js]] — `imports_from` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[searchExercises()]] — `contains` [EXTRACTED]
- [[server.js]] — `imports_from` [EXTRACTED]

### [[exercises.schema.json]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$defs]] — `contains` [EXTRACTED]
- [[$id]] — `contains` [EXTRACTED]
- [[$schema]] — `contains` [EXTRACTED]
- [[description]] — `contains` [EXTRACTED]
- [[items]] — `contains` [EXTRACTED]
- [[title]] — `contains` [EXTRACTED]
- [[type]] — `contains` [EXTRACTED]

### [[exportedCSV]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[exportToExcelCSV()]] (`src/services/importer.js`)
- [[importer.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[storage.js]] — `imports` [EXTRACTED]

### [[files]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[finalSummary]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[firebaseConfigPath]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[firebaseJson]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[fitness]] (`mcp/package.json`)
- [[keywords]] — `extends` [EXTRACTED]

### [[fitness_1]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[format]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[created_at]] — `contains` [EXTRACTED]

### [[formatPlateString()]] (`src/engines/plates.js`)
- [[app.js]] — `imports` [EXTRACTED]
- [[plates.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[FORMULAS]] (`src/engines/onerm.js`)
- [[onerm.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[weightedEstimate()]] — `references` [EXTRACTED]

### [[fr]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_10]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_11]] — `contains` [EXTRACTED]

### [[fr_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[getDefaultIncrement()]] (`src/engines/progression.js`)
- [[calculateNextPrescription()]] — `calls` [EXTRACTED]
- [[progression.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[getExerciseById()]] (`src/data/exercises.js`)
- [[.renderActiveExercise()]] — `calls` [EXTRACTED]
- [[.renderCheckout()]] — `calls` [EXTRACTED]
- [[.renderRoutineView()]] — `calls` [EXTRACTED]
- [[.toggleBiomechPhase()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[exercises.js]] — `contains` [EXTRACTED]
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[getExercisesByCategory()]] (`src/data/exercises.js`)
- [[.renderCatalog()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[exercises.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[getMuscleColor()]] (`src/services/muscle-map.js`)
- [[INERT_PARTS]] — `references` [EXTRACTED]
- [[muscle-map.js]] — `contains` [EXTRACTED]
- [[normalizeMuscleKey()]] — `calls` [EXTRACTED]
- [[renderMuscleSvg()]] — `calls` [EXTRACTED]

### [[getRoutineById()]] (`src/data/routines.js`)
- [[.renderRoutineView()]] — `calls` [EXTRACTED]
- [[.startActiveWorkout()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[ROUTINES]] — `references` [EXTRACTED]
- [[routines.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[gif_url]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_15]] — `contains` [EXTRACTED]
- [[pattern_2]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_27]] — `contains` [EXTRACTED]

### [[gif_url_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[glucofit]] (`mcp/package.json`)
- [[keywords]] — `extends` [EXTRACTED]

### [[glucofit-mcp]] (`mcp/package.json`)
- [[bin]] — `contains` [EXTRACTED]

### [[GlucoFitApp]] (`app.js`)
- [[.bindEvents()]] — `method` [EXTRACTED]
- [[.calculatePostWorkoutDelta()]] — `method` [EXTRACTED]
- [[.constructor()]] — `method` [EXTRACTED]
- [[.evaluatePreWorkoutGlucose()]] — `method` [EXTRACTED]
- [[.handleCSVImport()]] — `method` [EXTRACTED]
- [[.handleRoute()]] — `method` [EXTRACTED]
- [[.initElements()]] — `method` [EXTRACTED]
- [[.logCurrentSet()]] — `method` [EXTRACTED]
- [[.openAICoachModal()]] — `method` [EXTRACTED]
- [[.openPlatesModal()]] — `method` [EXTRACTED]
- [[.openSettingsModal()]] — `method` [EXTRACTED]
- [[.registerServiceWorker()]] — `method` [EXTRACTED]
- [[.renderActiveCompletedSets()]] — `method` [EXTRACTED]
- [[.renderActiveExercise()]] — `method` [EXTRACTED]
- [[.renderCatalog()]] — `method` [EXTRACTED]
- [[.renderCheckout()]] — `method` [EXTRACTED]
- [[.renderDashboard()]] — `method` [EXTRACTED]
- [[.renderDashboardBodyMap()]] — `method` [EXTRACTED]
- [[.renderRoutineSelectorCards()]] — `method` [EXTRACTED]
- [[.renderRoutineView()]] — `method` [EXTRACTED]
- [[.renderSessionsHistory()]] — `method` [EXTRACTED]
- [[.saveCompletedSession()]] — `method` [EXTRACTED]
- [[.saveSettingsFromModal()]] — `method` [EXTRACTED]
- [[.sendAICoachMessage()]] — `method` [EXTRACTED]
- [[.startActiveWorkout()]] — `method` [EXTRACTED]
- [[.toggleBiomechPhase()]] — `method` [EXTRACTED]
- [[app.js]] — `contains` [EXTRACTED]

### [[GLUCOSE_ZONES]] (`src/services/metabolic-guard.js`)
- [[ai-coach.js]] — `imports` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[metabolic-guard.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[glut4]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[gym]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[handleToolCall()]] (`mcp/server.js`)
- [[calculateNextPrescription()]] — `calls` [EXTRACTED]
- [[calculatePlates()]] — `calls` [EXTRACTED]
- [[estimate1RM()]] — `calls` [EXTRACTED]
- [[getExerciseById()]] — `calls` [EXTRACTED]
- [[getRoutineById()]] — `calls` [EXTRACTED]
- [[loadState()]] — `calls` [EXTRACTED]
- [[saveState()]] — `calls` [EXTRACTED]
- [[searchExercises()]] — `calls` [EXTRACTED]
- [[server.js]] — `contains` [EXTRACTED]

### [[hi]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_7]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_8]] — `contains` [EXTRACTED]

### [[hi_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[histMockDensity]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[histMockGreyskull]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[histMockHit]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[histMockMid]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[histMockStall]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[histMockTime]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[icons]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[id]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_3]] — `contains` [EXTRACTED]
- [[pattern]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_17]] — `contains` [EXTRACTED]

### [[id_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[image]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_14]] — `contains` [EXTRACTED]
- [[pattern_1]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_26]] — `contains` [EXTRACTED]

### [[image_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[importedFitNotes]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[importedHevy]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[importedStrong]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[importer.js]] (`src/services/importer.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[CATALOGUE]] — `imports` [EXTRACTED]
- [[detectFormat()]] — `contains` [EXTRACTED]
- [[EXERCISES]] — `imports` [EXTRACTED]
- [[exercises.js]] — `imports_from` [EXTRACTED]
- [[exportToExcelCSV()]] — `contains` [EXTRACTED]
- [[importWorkoutCSV()]] — `contains` [EXTRACTED]
- [[matchExercise()]] — `contains` [EXTRACTED]
- [[parseCSV()]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[searchExercises()]] — `imports` [EXTRACTED]
- [[storage.js]] — `imports_from` [EXTRACTED]

### [[importWorkoutCSV()]] (`src/services/importer.js`)
- [[.handleCSVImport()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[detectFormat()]] — `calls` [EXTRACTED]
- [[importer.js]] — `contains` [EXTRACTED]
- [[matchExercise()]] — `calls` [EXTRACTED]
- [[parseCSV()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[INERT_PARTS]] (`src/services/muscle-map.js`)
- [[getMuscleColor()]] — `references` [EXTRACTED]
- [[muscle-map.js]] — `contains` [EXTRACTED]

### [[initialSettings]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[instruction_steps]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_13]] — `contains` [EXTRACTED]
- [[description_9]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]

### [[instruction_steps_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[instructions]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_12]] — `contains` [EXTRACTED]
- [[description_8]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]

### [[instructions_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[it]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_3]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_4]] — `contains` [EXTRACTED]

### [[it_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[items]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref]] — `contains` [EXTRACTED]
- [[exercises.schema.json]] — `contains` [EXTRACTED]

### [[items_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[minLength]] — `contains` [EXTRACTED]
- [[steps]] — `contains` [EXTRACTED]
- [[type_15]] — `contains` [EXTRACTED]

### [[items_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[minLength]] — `contains` [EXTRACTED]
- [[secondary_muscles]] — `contains` [EXTRACTED]
- [[type_15]] — `contains` [EXTRACTED]

### [[keywords]] (`mcp/package.json`)
- [[ai-coach]] — `extends` [EXTRACTED]
- [[diabetes]] — `extends` [EXTRACTED]
- [[fitness]] — `extends` [EXTRACTED]
- [[glucofit]] — `extends` [EXTRACTED]
- [[mcp]] — `extends` [EXTRACTED]
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[keywords_1]] (`package.json`)
- [[coach]] — `extends` [EXTRACTED]
- [[diabetes_1]] — `extends` [EXTRACTED]
- [[fitness_1]] — `extends` [EXTRACTED]
- [[glut4]] — `extends` [EXTRACTED]
- [[gym]] — `extends` [EXTRACTED]
- [[offline-first]] — `extends` [EXTRACTED]
- [[package.json]] — `contains` [EXTRACTED]
- [[pwa]] — `extends` [EXTRACTED]

### [[ko]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_9]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_10]] — `contains` [EXTRACTED]

### [[ko_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[languageMap]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$defs]] — `contains` [EXTRACTED]
- [[additionalProperties]] — `contains` [EXTRACTED]
- [[description_1]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[required]] — `contains` [EXTRACTED]
- [[type_1]] — `contains` [EXTRACTED]

### [[languageStepsMap]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$defs]] — `contains` [EXTRACTED]
- [[additionalProperties_1]] — `contains` [EXTRACTED]
- [[description_2]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[required_1]] — `contains` [EXTRACTED]
- [[type_13]] — `contains` [EXTRACTED]

### [[legExercises]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[license]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[license_1]] (`package.json`)
- [[package.json]] — `contains` [EXTRACTED]

### [[loadState()]] (`mcp/server.js`)
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[server.js]] — `contains` [EXTRACTED]

### [[lower arms]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[lower legs]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[main]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[major]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[manifest.json]] (`manifest.json`)
- [[background_color]] — `contains` [EXTRACTED]
- [[description_18]] — `contains` [EXTRACTED]
- [[display]] — `contains` [EXTRACTED]
- [[icons]] — `contains` [EXTRACTED]
- [[name_2]] — `contains` [EXTRACTED]
- [[orientation]] — `contains` [EXTRACTED]
- [[short_name]] — `contains` [EXTRACTED]
- [[start_url]] — `contains` [EXTRACTED]
- [[theme_color]] — `contains` [EXTRACTED]

### [[match]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[matchExercise()]] (`src/services/importer.js`)
- [[importer.js]] — `contains` [EXTRACTED]
- [[importWorkoutCSV()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[searchExercises()]] — `calls` [EXTRACTED]

### [[mcp]] (`mcp/package.json`)
- [[keywords]] — `extends` [EXTRACTED]

### [[mcppackage.json]] (`mcp/package.json`)
- [[author]] — `contains` [EXTRACTED]
- [[bin]] — `contains` [EXTRACTED]
- [[description_19]] — `contains` [EXTRACTED]
- [[keywords]] — `contains` [EXTRACTED]
- [[license]] — `contains` [EXTRACTED]
- [[main]] — `contains` [EXTRACTED]
- [[name_3]] — `contains` [EXTRACTED]
- [[scripts]] — `contains` [EXTRACTED]
- [[type_30]] — `contains` [EXTRACTED]
- [[version]] — `contains` [EXTRACTED]

### [[media_id]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_13]] — `contains` [EXTRACTED]
- [[minLength_6]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_25]] — `contains` [EXTRACTED]

### [[media_id_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[memoryStorage]] (`src/services/storage.js`)
- [[storage.js]] — `contains` [EXTRACTED]

### [[metabolic-guard.js]] (`src/services/metabolic-guard.js`)
- [[ai-coach.js]] — `imports_from` [EXTRACTED]
- [[app.js]] — `imports_from` [EXTRACTED]
- [[GLUCOSE_ZONES]] — `contains` [EXTRACTED]
- [[MetabolicGuard]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]

### [[MetabolicGuard]] (`src/services/metabolic-guard.js`)
- [[.calculatePostWorkoutDelta()]] — `references` [EXTRACTED]
- [[.evaluatePreWorkoutGlucose()]] — `references` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[metabolic-guard.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[MIME_TYPES]] (`scripts/serve.js`)
- [[serve.js]] — `contains` [EXTRACTED]

### [[minLength]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[items_1]] — `contains` [EXTRACTED]
- [[items_2]] — `contains` [EXTRACTED]

### [[minLength_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[name]] — `contains` [EXTRACTED]

### [[minLength_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[category]] — `contains` [EXTRACTED]

### [[minLength_3]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[equipment]] — `contains` [EXTRACTED]

### [[minLength_4]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[muscle_group]] — `contains` [EXTRACTED]

### [[minLength_5]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[target]] — `contains` [EXTRACTED]

### [[minLength_6]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[media_id]] — `contains` [EXTRACTED]

### [[minLength_7]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[attribution]] — `contains` [EXTRACTED]

### [[minor]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[muscle-map.js]] (`src/services/muscle-map.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[body-paths.js]] — `imports_from` [EXTRACTED]
- [[calculateMuscleRecovery()]] — `contains` [EXTRACTED]
- [[calculateMuscleVolume()]] — `contains` [EXTRACTED]
- [[getMuscleColor()]] — `contains` [EXTRACTED]
- [[INERT_PARTS]] — `contains` [EXTRACTED]
- [[MUSCLE_KEY_MAP]] — `contains` [EXTRACTED]
- [[normalizeMuscleKey()]] — `contains` [EXTRACTED]
- [[renderMuscleSvg()]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]

### [[muscle_group]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_10]] — `contains` [EXTRACTED]
- [[minLength_4]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_22]] — `contains` [EXTRACTED]

### [[muscle_group_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[MUSCLE_IMAGE_MAP]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[MUSCLE_KEY_MAP]] (`src/services/muscle-map.js`)
- [[muscle-map.js]] — `contains` [EXTRACTED]

### [[name]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_4]] — `contains` [EXTRACTED]
- [[minLength_1]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_18]] — `contains` [EXTRACTED]

### [[name_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[name_2]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[name_3]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[name_4]] (`package.json`)
- [[package.json]] — `contains` [EXTRACTED]

### [[neck]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[normalizeMuscleKey()]] (`src/services/muscle-map.js`)
- [[calculateMuscleRecovery()]] — `calls` [EXTRACTED]
- [[calculateMuscleVolume()]] — `calls` [EXTRACTED]
- [[getMuscleColor()]] — `calls` [EXTRACTED]
- [[muscle-map.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[offline-first]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[onerm.js]] (`src/engines/onerm.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[best1RMOfSets()]] — `contains` [EXTRACTED]
- [[estimate1RM()]] — `contains` [EXTRACTED]
- [[FORMULAS]] — `contains` [EXTRACTED]
- [[RIR_PCT]] — `contains` [EXTRACTED]
- [[rirEstimate()]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[server.js]] — `imports_from` [EXTRACTED]
- [[weightedEstimate()]] — `contains` [EXTRACTED]

### [[orientation]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[outputPath]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[package.json]] (`package.json`)
- [[author_1]] — `contains` [EXTRACTED]
- [[description_20]] — `contains` [EXTRACTED]
- [[keywords_1]] — `contains` [EXTRACTED]
- [[license_1]] — `contains` [EXTRACTED]
- [[name_4]] — `contains` [EXTRACTED]
- [[scripts_1]] — `contains` [EXTRACTED]
- [[type_31]] — `contains` [EXTRACTED]
- [[version_1]] — `contains` [EXTRACTED]

### [[packagePath]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[parseCSV()]] (`src/services/importer.js`)
- [[importer.js]] — `contains` [EXTRACTED]
- [[importWorkoutCSV()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[patchStr]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[pattern]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[id]] — `contains` [EXTRACTED]

### [[pattern_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[image]] — `contains` [EXTRACTED]

### [[pattern_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[gif_url]] — `contains` [EXTRACTED]

### [[pl]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_8]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_9]] — `contains` [EXTRACTED]

### [[pl_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[plateCalc]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[plateEmpty]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[plateEzBar]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[plateFormatStr]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[plates.js]] (`src/engines/plates.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[calculatePlates()]] — `contains` [EXTRACTED]
- [[DEFAULT_PLATES]] — `contains` [EXTRACTED]
- [[formatPlateString()]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[server.js]] — `imports_from` [EXTRACTED]
- [[STANDARD_BARS]] — `contains` [EXTRACTED]

### [[plateTest100]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[plateWomenBar]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[POLICIES]] (`src/engines/progression.js`)
- [[progression.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[POLICY_META]] (`src/engines/progression.js`)
- [[progression.js]] — `contains` [EXTRACTED]

### [[postSvg]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prensa]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prescripDeload]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prescripDensity]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prescripDouble]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prescripDoubleMid]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prescripGreyskull]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[prescripTime]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[progression.js]] (`src/engines/progression.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[calculateNextPrescription()]] — `contains` [EXTRACTED]
- [[getDefaultIncrement()]] — `contains` [EXTRACTED]
- [[POLICIES]] — `contains` [EXTRACTED]
- [[POLICY_META]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[server.js]] — `imports_from` [EXTRACTED]

### [[properties]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[en]] — `contains` [EXTRACTED]
- [[es]] — `contains` [EXTRACTED]
- [[fr]] — `contains` [EXTRACTED]
- [[hi]] — `contains` [EXTRACTED]
- [[it]] — `contains` [EXTRACTED]
- [[ko]] — `contains` [EXTRACTED]
- [[languageMap]] — `contains` [EXTRACTED]
- [[pl]] — `contains` [EXTRACTED]
- [[ru]] — `contains` [EXTRACTED]
- [[tr]] — `contains` [EXTRACTED]
- [[zh]] — `contains` [EXTRACTED]

### [[properties_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[en]] — `contains` [EXTRACTED]
- [[es]] — `contains` [EXTRACTED]
- [[fr]] — `contains` [EXTRACTED]
- [[hi]] — `contains` [EXTRACTED]
- [[it]] — `contains` [EXTRACTED]
- [[ko]] — `contains` [EXTRACTED]
- [[languageStepsMap]] — `contains` [EXTRACTED]
- [[pl]] — `contains` [EXTRACTED]
- [[ru]] — `contains` [EXTRACTED]
- [[tr]] — `contains` [EXTRACTED]
- [[zh]] — `contains` [EXTRACTED]

### [[properties_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[attribution]] — `contains` [EXTRACTED]
- [[body_part]] — `contains` [EXTRACTED]
- [[category]] — `contains` [EXTRACTED]
- [[created_at]] — `contains` [EXTRACTED]
- [[equipment]] — `contains` [EXTRACTED]
- [[exercise]] — `contains` [EXTRACTED]
- [[gif_url]] — `contains` [EXTRACTED]
- [[id]] — `contains` [EXTRACTED]
- [[image]] — `contains` [EXTRACTED]
- [[instruction_steps]] — `contains` [EXTRACTED]
- [[instructions]] — `contains` [EXTRACTED]
- [[media_id]] — `contains` [EXTRACTED]
- [[muscle_group]] — `contains` [EXTRACTED]
- [[name]] — `contains` [EXTRACTED]
- [[secondary_muscles]] — `contains` [EXTRACTED]
- [[target]] — `contains` [EXTRACTED]

### [[pwa]] (`package.json`)
- [[keywords_1]] — `extends` [EXTRACTED]

### [[rawMap]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[rawVersion]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[recMap]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[renderMuscleSvg()]] (`src/services/muscle-map.js`)
- [[.renderCheckout()]] — `calls` [EXTRACTED]
- [[.renderDashboardBodyMap()]] — `calls` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[getMuscleColor()]] — `calls` [EXTRACTED]
- [[muscle-map.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[required]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[en_1]] — `extends` [EXTRACTED]
- [[es_1]] — `extends` [EXTRACTED]
- [[fr_1]] — `extends` [EXTRACTED]
- [[hi_1]] — `extends` [EXTRACTED]
- [[it_1]] — `extends` [EXTRACTED]
- [[ko_1]] — `extends` [EXTRACTED]
- [[languageMap]] — `contains` [EXTRACTED]
- [[pl_1]] — `extends` [EXTRACTED]
- [[ru_1]] — `extends` [EXTRACTED]
- [[tr_1]] — `extends` [EXTRACTED]
- [[zh_1]] — `extends` [EXTRACTED]

### [[required_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[en_1]] — `extends` [EXTRACTED]
- [[es_1]] — `extends` [EXTRACTED]
- [[fr_1]] — `extends` [EXTRACTED]
- [[hi_1]] — `extends` [EXTRACTED]
- [[it_1]] — `extends` [EXTRACTED]
- [[ko_1]] — `extends` [EXTRACTED]
- [[languageStepsMap]] — `contains` [EXTRACTED]
- [[pl_1]] — `extends` [EXTRACTED]
- [[ru_1]] — `extends` [EXTRACTED]
- [[tr_1]] — `extends` [EXTRACTED]
- [[zh_1]] — `extends` [EXTRACTED]

### [[required_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[attribution_1]] — `extends` [EXTRACTED]
- [[body_part_1]] — `extends` [EXTRACTED]
- [[category_1]] — `extends` [EXTRACTED]
- [[created_at_1]] — `extends` [EXTRACTED]
- [[equipment_1]] — `extends` [EXTRACTED]
- [[exercise]] — `contains` [EXTRACTED]
- [[gif_url_1]] — `extends` [EXTRACTED]
- [[id_1]] — `extends` [EXTRACTED]
- [[image_1]] — `extends` [EXTRACTED]
- [[instruction_steps_1]] — `extends` [EXTRACTED]
- [[instructions_1]] — `extends` [EXTRACTED]
- [[media_id_1]] — `extends` [EXTRACTED]
- [[muscle_group_1]] — `extends` [EXTRACTED]
- [[name_1]] — `extends` [EXTRACTED]
- [[secondary_muscles_1]] — `extends` [EXTRACTED]
- [[target_1]] — `extends` [EXTRACTED]

### [[resolveExercise()]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[RIR_PCT]] (`src/engines/onerm.js`)
- [[onerm.js]] — `contains` [EXTRACTED]

### [[rirEstimate()]] (`src/engines/onerm.js`)
- [[onerm.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[weightedEstimate()]] — `calls` [EXTRACTED]

### [[rirVal]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[rl]] (`mcp/server.js`)
- [[server.js]] — `contains` [EXTRACTED]

### [[rootDir]] (`mcp/server.js`)
- [[server.js]] — `contains` [EXTRACTED]

### [[rootDir_1]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[rootDir_2]] (`scripts/compile-catalogue.mjs`)
- [[compile-catalogue.mjs]] — `contains` [EXTRACTED]

### [[rootDir_3]] (`scripts/serve.js`)
- [[serve.js]] — `contains` [EXTRACTED]

### [[rootDir_4]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[ROUTINES]] (`src/data/routines.js`)
- [[.renderRoutineSelectorCards()]] — `references` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[getRoutineById()]] — `references` [EXTRACTED]
- [[routines.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[routines.js]] (`src/data/routines.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[getRoutineById()]] — `contains` [EXTRACTED]
- [[ROUTINES]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[server.js]] — `imports_from` [EXTRACTED]

### [[routineSelected]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[ru]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_5]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_6]] — `contains` [EXTRACTED]

### [[ru_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[run_tests.js]] (`tests/run_tests.js`)
- [[__dirname_4]] — `contains` [EXTRACTED]
- [[__filename_4]] — `contains` [EXTRACTED]
- [[addedCount]] — `contains` [EXTRACTED]
- [[ai-coach.js]] — `imports_from` [EXTRACTED]
- [[AICoachService]] — `imports` [EXTRACTED]
- [[aiPrompt]] — `contains` [EXTRACTED]
- [[assert()]] — `contains` [EXTRACTED]
- [[atgResults]] — `contains` [EXTRACTED]
- [[BALANCE_STATUSES]] — `imports` [EXTRACTED]
- [[balanceBalanced]] — `contains` [EXTRACTED]
- [[balanceWeak]] — `contains` [EXTRACTED]
- [[best1RMOfSets()]] — `imports` [EXTRACTED]
- [[calculateMuscleRecovery()]] — `imports` [EXTRACTED]
- [[calculateMuscleVolume()]] — `imports` [EXTRACTED]
- [[calculateNextPrescription()]] — `imports` [EXTRACTED]
- [[calculatePlates()]] — `imports` [EXTRACTED]
- [[CATALOGUE]] — `imports` [EXTRACTED]
- [[chaoticInputs]] — `contains` [EXTRACTED]
- [[checkinEval]] — `contains` [EXTRACTED]
- [[CLINICAL_EXERCISES]] — `imports` [EXTRACTED]
- [[deltaAscent]] — `contains` [EXTRACTED]
- [[deltaDescent]] — `contains` [EXTRACTED]
- [[deltaEval]] — `contains` [EXTRACTED]
- [[deltaStable]] — `contains` [EXTRACTED]
- [[detectFormat()]] — `imports` [EXTRACTED]
- [[dummySessionsForMap]] — `contains` [EXTRACTED]
- [[epleVal]] — `contains` [EXTRACTED]
- [[estimate1RM()]] — `imports` [EXTRACTED]
- [[evalCaution]] — `contains` [EXTRACTED]
- [[evalHigh]] — `contains` [EXTRACTED]
- [[evalHypo]] — `contains` [EXTRACTED]
- [[evalOptimalHigh]] — `contains` [EXTRACTED]
- [[evalOptimalLow]] — `contains` [EXTRACTED]
- [[evalOptimalMid]] — `contains` [EXTRACTED]
- [[evaluateLiftBalance()]] — `imports` [EXTRACTED]
- [[evaluateTemplate()]] — `imports` [EXTRACTED]
- [[evalVeryHigh]] — `contains` [EXTRACTED]
- [[exByIdOpenGym]] — `contains` [EXTRACTED]
- [[exCategoriesAll]] — `contains` [EXTRACTED]
- [[EXERCISES]] — `imports` [EXTRACTED]
- [[exercises.js]] — `imports_from` [EXTRACTED]
- [[exportedCSV]] — `contains` [EXTRACTED]
- [[exportToExcelCSV()]] — `imports` [EXTRACTED]
- [[finalSummary]] — `contains` [EXTRACTED]
- [[firebaseConfigPath]] — `contains` [EXTRACTED]
- [[firebaseJson]] — `contains` [EXTRACTED]
- [[formatPlateString()]] — `imports` [EXTRACTED]
- [[FORMULAS]] — `imports` [EXTRACTED]
- [[getDefaultIncrement()]] — `imports` [EXTRACTED]
- [[getExerciseById()]] — `imports` [EXTRACTED]
- [[getExercisesByCategory()]] — `imports` [EXTRACTED]
- [[getRoutineById()]] — `imports` [EXTRACTED]
- [[GLUCOSE_ZONES]] — `imports` [EXTRACTED]
- [[histMockDensity]] — `contains` [EXTRACTED]
- [[histMockGreyskull]] — `contains` [EXTRACTED]
- [[histMockHit]] — `contains` [EXTRACTED]
- [[histMockMid]] — `contains` [EXTRACTED]
- [[histMockStall]] — `contains` [EXTRACTED]
- [[histMockTime]] — `contains` [EXTRACTED]
- [[importedFitNotes]] — `contains` [EXTRACTED]
- [[importedHevy]] — `contains` [EXTRACTED]
- [[importedStrong]] — `contains` [EXTRACTED]
- [[importer.js]] — `imports_from` [EXTRACTED]
- [[importWorkoutCSV()]] — `imports` [EXTRACTED]
- [[initialSettings]] — `contains` [EXTRACTED]
- [[legExercises]] — `contains` [EXTRACTED]
- [[matchExercise()]] — `imports` [EXTRACTED]
- [[metabolic-guard.js]] — `imports_from` [EXTRACTED]
- [[MetabolicGuard]] — `imports` [EXTRACTED]
- [[muscle-map.js]] — `imports_from` [EXTRACTED]
- [[normalizeMuscleKey()]] — `imports` [EXTRACTED]
- [[onerm.js]] — `imports_from` [EXTRACTED]
- [[parseCSV()]] — `imports` [EXTRACTED]
- [[plateCalc]] — `contains` [EXTRACTED]
- [[plateEmpty]] — `contains` [EXTRACTED]
- [[plateEzBar]] — `contains` [EXTRACTED]
- [[plateFormatStr]] — `contains` [EXTRACTED]
- [[plates.js]] — `imports_from` [EXTRACTED]
- [[plateTest100]] — `contains` [EXTRACTED]
- [[plateWomenBar]] — `contains` [EXTRACTED]
- [[POLICIES]] — `imports` [EXTRACTED]
- [[postSvg]] — `contains` [EXTRACTED]
- [[prensa]] — `contains` [EXTRACTED]
- [[prescripDeload]] — `contains` [EXTRACTED]
- [[prescripDensity]] — `contains` [EXTRACTED]
- [[prescripDouble]] — `contains` [EXTRACTED]
- [[prescripDoubleMid]] — `contains` [EXTRACTED]
- [[prescripGreyskull]] — `contains` [EXTRACTED]
- [[prescripTime]] — `contains` [EXTRACTED]
- [[progression.js]] — `imports_from` [EXTRACTED]
- [[recMap]] — `contains` [EXTRACTED]
- [[renderMuscleSvg()]] — `imports` [EXTRACTED]
- [[rirEstimate()]] — `imports` [EXTRACTED]
- [[rirVal]] — `contains` [EXTRACTED]
- [[rootDir_4]] — `contains` [EXTRACTED]
- [[ROUTINES]] — `imports` [EXTRACTED]
- [[routines.js]] — `imports_from` [EXTRACTED]
- [[routineSelected]] — `contains` [EXTRACTED]
- [[Sanitizer]] — `imports` [EXTRACTED]
- [[sanitizer.js]] — `imports_from` [EXTRACTED]
- [[searchExercises()]] — `imports` [EXTRACTED]
- [[searchMatch]] — `contains` [EXTRACTED]
- [[searchOpenGym]] — `contains` [EXTRACTED]
- [[secretPatterns]] — `contains` [EXTRACTED]
- [[session-coach.js]] — `imports_from` [EXTRACTED]
- [[SessionCoach]] — `imports` [EXTRACTED]
- [[sessionMuscles]] — `contains` [EXTRACTED]
- [[srcFiles]] — `contains` [EXTRACTED]
- [[STANDARD_BARS]] — `imports` [EXTRACTED]
- [[storage.js]] — `imports_from` [EXTRACTED]
- [[StorageService]] — `imports` [EXTRACTED]
- [[storedSession]] — `contains` [EXTRACTED]
- [[structural-balance.js]] — `imports_from` [EXTRACTED]
- [[svgFemaleBack]] — `contains` [EXTRACTED]
- [[svgMaleFront]] — `contains` [EXTRACTED]
- [[testCoach]] — `contains` [EXTRACTED]
- [[tplResults]] — `contains` [EXTRACTED]
- [[volMap]] — `contains` [EXTRACTED]
- [[weightedEstimate()]] — `imports` [EXTRACTED]
- [[weightedVal]] — `contains` [EXTRACTED]

### [[Sanitizer]] (`src/utils/sanitizer.js`)
- [[.askCoach()]] — `references` [EXTRACTED]
- [[.openPlatesModal()]] — `references` [EXTRACTED]
- [[.renderActiveCompletedSets()]] — `references` [EXTRACTED]
- [[.renderCatalog()]] — `references` [EXTRACTED]
- [[.renderCheckout()]] — `references` [EXTRACTED]
- [[.renderDashboard()]] — `references` [EXTRACTED]
- [[.renderDashboardBodyMap()]] — `references` [EXTRACTED]
- [[.renderRoutineSelectorCards()]] — `references` [EXTRACTED]
- [[.renderRoutineView()]] — `references` [EXTRACTED]
- [[.renderSessionsHistory()]] — `references` [EXTRACTED]
- [[ai-coach.js]] — `imports` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[sanitizer.js]] — `contains` [EXTRACTED]

### [[sanitizer.js]] (`src/utils/sanitizer.js`)
- [[ai-coach.js]] — `imports_from` [EXTRACTED]
- [[app.js]] — `imports_from` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[Sanitizer]] — `contains` [EXTRACTED]

### [[saveState()]] (`mcp/server.js`)
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[server.js]] — `contains` [EXTRACTED]

### [[scripts]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]
- [[start]] — `contains` [EXTRACTED]

### [[scripts_1]] (`package.json`)
- [[dev]] — `contains` [EXTRACTED]
- [[package.json]] — `contains` [EXTRACTED]
- [[securityfull]] — `contains` [EXTRACTED]
- [[serve]] — `contains` [EXTRACTED]
- [[test]] — `contains` [EXTRACTED]
- [[testsecurity]] — `contains` [EXTRACTED]
- [[versionbump]] — `contains` [EXTRACTED]

### [[searchExercises()]] (`src/data/exercises.js`)
- [[app.js]] — `imports` [EXTRACTED]
- [[exercises.js]] — `contains` [EXTRACTED]
- [[handleToolCall()]] — `calls` [EXTRACTED]
- [[importer.js]] — `imports` [EXTRACTED]
- [[matchExercise()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[server.js]] — `imports` [EXTRACTED]

### [[searchMatch]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[searchOpenGym]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[secondary_muscles]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_11]] — `contains` [EXTRACTED]
- [[items_2]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_23]] — `contains` [EXTRACTED]

### [[secondary_muscles_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[secretPatterns]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[securityfull]] (`package.json`)
- [[scripts_1]] — `contains` [EXTRACTED]

### [[serve]] (`package.json`)
- [[scripts_1]] — `contains` [EXTRACTED]

### [[serve.js]] (`scripts/serve.js`)
- [[__dirname_3]] — `contains` [EXTRACTED]
- [[__filename_3]] — `contains` [EXTRACTED]
- [[MIME_TYPES]] — `contains` [EXTRACTED]
- [[rootDir_3]] — `contains` [EXTRACTED]
- [[server]] — `contains` [EXTRACTED]

### [[server]] (`scripts/serve.js`)
- [[serve.js]] — `contains` [EXTRACTED]

### [[server.js]] (`mcp/server.js`)
- [[__dirname]] — `contains` [EXTRACTED]
- [[__filename]] — `contains` [EXTRACTED]
- [[calculateNextPrescription()]] — `imports` [EXTRACTED]
- [[calculatePlates()]] — `imports` [EXTRACTED]
- [[CATALOGUE]] — `imports` [EXTRACTED]
- [[estimate1RM()]] — `imports` [EXTRACTED]
- [[EXERCISES]] — `imports` [EXTRACTED]
- [[exercises.js]] — `imports_from` [EXTRACTED]
- [[getExerciseById()]] — `imports` [EXTRACTED]
- [[getRoutineById()]] — `imports` [EXTRACTED]
- [[handleToolCall()]] — `contains` [EXTRACTED]
- [[loadState()]] — `contains` [EXTRACTED]
- [[onerm.js]] — `imports_from` [EXTRACTED]
- [[plates.js]] — `imports_from` [EXTRACTED]
- [[progression.js]] — `imports_from` [EXTRACTED]
- [[rl]] — `contains` [EXTRACTED]
- [[rootDir]] — `contains` [EXTRACTED]
- [[ROUTINES]] — `imports` [EXTRACTED]
- [[routines.js]] — `imports_from` [EXTRACTED]
- [[saveState()]] — `contains` [EXTRACTED]
- [[searchExercises()]] — `imports` [EXTRACTED]
- [[STORAGE_FILE]] — `contains` [EXTRACTED]
- [[TOOLS]] — `contains` [EXTRACTED]

### [[session-coach.js]] (`src/services/session-coach.js`)
- [[app.js]] — `imports_from` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[SessionCoach]] — `contains` [EXTRACTED]

### [[SessionCoach]] (`src/services/session-coach.js`)
- [[.calculateTotalVolumeKg()]] — `method` [EXTRACTED]
- [[.constructor()_1]] — `method` [EXTRACTED]
- [[.finishSession()]] — `method` [EXTRACTED]
- [[.handleVisibilityChange()]] — `method` [EXTRACTED]
- [[.playBeep()]] — `method` [EXTRACTED]
- [[.recordSet()]] — `method` [EXTRACTED]
- [[.releaseWakeLock()]] — `method` [EXTRACTED]
- [[.requestWakeLock()]] — `method` [EXTRACTED]
- [[.startRestTimer()]] — `method` [EXTRACTED]
- [[.startSession()]] — `method` [EXTRACTED]
- [[.stopRestTimer()]] — `method` [EXTRACTED]
- [[.triggerRestFinishedAlert()]] — `method` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[session-coach.js]] — `contains` [EXTRACTED]

### [[sessionMuscles]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[short_name]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[shoulders]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[srcFiles]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[STANDARD_BARS]] (`src/engines/plates.js`)
- [[app.js]] — `imports` [EXTRACTED]
- [[plates.js]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[start]] (`mcp/package.json`)
- [[scripts]] — `contains` [EXTRACTED]

### [[start_url]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[steps]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$defs]] — `contains` [EXTRACTED]
- [[items_1]] — `contains` [EXTRACTED]
- [[type_14]] — `contains` [EXTRACTED]

### [[storage.js]] (`src/services/storage.js`)
- [[ai-coach.js]] — `imports_from` [EXTRACTED]
- [[app.js]] — `imports_from` [EXTRACTED]
- [[exportToExcelCSV()]] — `imports` [EXTRACTED]
- [[importer.js]] — `imports_from` [EXTRACTED]
- [[memoryStorage]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[StorageService]] — `contains` [EXTRACTED]

### [[STORAGE_FILE]] (`mcp/server.js`)
- [[server.js]] — `contains` [EXTRACTED]

### [[StorageService]] (`src/services/storage.js`)
- [[.bindEvents()]] — `references` [EXTRACTED]
- [[.buildSystemInstruction()]] — `references` [EXTRACTED]
- [[.handleCSVImport()]] — `references` [EXTRACTED]
- [[.openPlatesModal()]] — `references` [EXTRACTED]
- [[.openSettingsModal()]] — `references` [EXTRACTED]
- [[.renderActiveExercise()]] — `references` [EXTRACTED]
- [[.renderCheckout()]] — `references` [EXTRACTED]
- [[.renderDashboard()]] — `references` [EXTRACTED]
- [[.renderDashboardBodyMap()]] — `references` [EXTRACTED]
- [[.renderRoutineSelectorCards()]] — `references` [EXTRACTED]
- [[.renderRoutineView()]] — `references` [EXTRACTED]
- [[.renderSessionsHistory()]] — `references` [EXTRACTED]
- [[.saveCompletedSession()]] — `references` [EXTRACTED]
- [[.saveSettingsFromModal()]] — `references` [EXTRACTED]
- [[.sendAICoachMessage()]] — `references` [EXTRACTED]
- [[ai-coach.js]] — `imports` [EXTRACTED]
- [[app.js]] — `imports` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]
- [[storage.js]] — `contains` [EXTRACTED]

### [[storedSession]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[structural-balance.js]] (`src/engines/structural-balance.js`)
- [[BALANCE_STATUSES]] — `contains` [EXTRACTED]
- [[evaluateLiftBalance()]] — `contains` [EXTRACTED]
- [[evaluateTemplate()]] — `contains` [EXTRACTED]
- [[run_tests.js]] — `imports_from` [EXTRACTED]
- [[STRUCTURAL_TEMPLATES]] — `contains` [EXTRACTED]

### [[STRUCTURAL_TEMPLATES]] (`src/engines/structural-balance.js`)
- [[structural-balance.js]] — `contains` [EXTRACTED]

### [[svgFemaleBack]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[svgMaleFront]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[sw.js]] (`sw.js`)
- [[CRITICAL_ASSETS]] — `contains` [EXTRACTED]

### [[swPath]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[target]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[description_12]] — `contains` [EXTRACTED]
- [[minLength_5]] — `contains` [EXTRACTED]
- [[properties_2]] — `contains` [EXTRACTED]
- [[type_24]] — `contains` [EXTRACTED]

### [[target_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required_2]] — `extends` [EXTRACTED]

### [[test]] (`package.json`)
- [[scripts_1]] — `contains` [EXTRACTED]

### [[testsecurity]] (`package.json`)
- [[scripts_1]] — `contains` [EXTRACTED]

### [[testCoach]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[theme_color]] (`manifest.json`)
- [[manifest.json]] — `contains` [EXTRACTED]

### [[title]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercises.schema.json]] — `contains` [EXTRACTED]

### [[TOOLS]] (`mcp/server.js`)
- [[server.js]] — `contains` [EXTRACTED]

### [[tplResults]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[tr]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_4]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_5]] — `contains` [EXTRACTED]

### [[tr_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]

### [[type]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercises.schema.json]] — `contains` [EXTRACTED]

### [[type_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[languageMap]] — `contains` [EXTRACTED]

### [[type_2]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[en]] — `contains` [EXTRACTED]

### [[type_3]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[es]] — `contains` [EXTRACTED]

### [[type_4]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[it]] — `contains` [EXTRACTED]

### [[type_5]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[tr]] — `contains` [EXTRACTED]

### [[type_6]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[ru]] — `contains` [EXTRACTED]

### [[type_7]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[zh]] — `contains` [EXTRACTED]

### [[type_8]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[hi]] — `contains` [EXTRACTED]

### [[type_9]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[pl]] — `contains` [EXTRACTED]

### [[type_10]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[ko]] — `contains` [EXTRACTED]

### [[type_11]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[fr]] — `contains` [EXTRACTED]

### [[type_12]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[additionalProperties]] — `contains` [EXTRACTED]

### [[type_13]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[languageStepsMap]] — `contains` [EXTRACTED]

### [[type_14]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[steps]] — `contains` [EXTRACTED]

### [[type_15]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[items_1]] — `contains` [EXTRACTED]
- [[items_2]] — `contains` [EXTRACTED]

### [[type_16]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[exercise]] — `contains` [EXTRACTED]

### [[type_17]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[id]] — `contains` [EXTRACTED]

### [[type_18]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[name]] — `contains` [EXTRACTED]

### [[type_19]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[category]] — `contains` [EXTRACTED]

### [[type_20]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[body_part]] — `contains` [EXTRACTED]

### [[type_21]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[equipment]] — `contains` [EXTRACTED]

### [[type_22]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[muscle_group]] — `contains` [EXTRACTED]

### [[type_23]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[secondary_muscles]] — `contains` [EXTRACTED]

### [[type_24]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[target]] — `contains` [EXTRACTED]

### [[type_25]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[media_id]] — `contains` [EXTRACTED]

### [[type_26]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[image]] — `contains` [EXTRACTED]

### [[type_27]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[gif_url]] — `contains` [EXTRACTED]

### [[type_28]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[attribution]] — `contains` [EXTRACTED]

### [[type_29]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[created_at]] — `contains` [EXTRACTED]

### [[type_30]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[type_31]] (`package.json`)
- [[package.json]] — `contains` [EXTRACTED]

### [[upper arms]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[upper legs]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[version]] (`mcp/package.json`)
- [[mcppackage.json]] — `contains` [EXTRACTED]

### [[version_1]] (`package.json`)
- [[package.json]] — `contains` [EXTRACTED]

### [[versionbump]] (`package.json`)
- [[scripts_1]] — `contains` [EXTRACTED]

### [[versionData]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[versionPath]] (`scripts/bump-version.js`)
- [[bump-version.js]] — `contains` [EXTRACTED]

### [[volMap]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[waist]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[enum]] — `extends` [EXTRACTED]

### [[weightedEstimate()]] (`src/engines/onerm.js`)
- [[estimate1RM()]] — `calls` [EXTRACTED]
- [[FORMULAS]] — `references` [EXTRACTED]
- [[onerm.js]] — `contains` [EXTRACTED]
- [[rirEstimate()]] — `calls` [EXTRACTED]
- [[run_tests.js]] — `imports` [EXTRACTED]

### [[weightedVal]] (`tests/run_tests.js`)
- [[run_tests.js]] — `contains` [EXTRACTED]

### [[zh]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[$ref_6]] — `contains` [EXTRACTED]
- [[properties]] — `contains` [EXTRACTED]
- [[properties_1]] — `contains` [EXTRACTED]
- [[type_7]] — `contains` [EXTRACTED]

### [[zh_1]] (`extra-datasets/hasaneyldrm-exercises-dataset/data/exercises.schema.json`)
- [[required]] — `extends` [EXTRACTED]
- [[required_1]] — `extends` [EXTRACTED]
