---
type: community
cohesion: 0.06
members: 61
---

# app.js

**Cohesion:** 0.06 - loosely connected
**Members:** 61 nodes

## Members
- [[CATALOGUE]] - code - src/data/exercises-catalogue.js
- [[CATEGORY_MAP]] - code - scripts/compile-catalogue.mjs
- [[CLINICAL_EXERCISES]] - code - src/data/exercises.js
- [[DEFAULT_PLATES]] - code - src/engines/plates.js
- [[EXERCISES]] - code - src/data/exercises.js
- [[FORMULAS]] - code - src/engines/onerm.js
- [[GLUCOSE_ZONES]] - code - src/services/metabolic-guard.js
- [[MUSCLE_IMAGE_MAP]] - code - scripts/compile-catalogue.mjs
- [[MetabolicGuard]] - code - src/services/metabolic-guard.js
- [[RIR_PCT]] - code - src/engines/onerm.js
- [[ROUTINES]] - code - src/data/routines.js
- [[STANDARD_BARS]] - code - src/engines/plates.js
- [[STORAGE_FILE]] - code - mcp/server.js
- [[TOOLS]] - code - mcp/server.js
- [[__dirname]] - code - mcp/server.js
- [[__dirname_2]] - code - scripts/compile-catalogue.mjs
- [[__filename]] - code - mcp/server.js
- [[__filename_2]] - code - scripts/compile-catalogue.mjs
- [[ai-coach.js]] - code - src/services/ai-coach.js
- [[app.js]] - code - app.js
- [[best1RMOfSets()]] - code - src/engines/onerm.js
- [[calculatePlates()]] - code - src/engines/plates.js
- [[clinicalMap]] - code - scripts/compile-catalogue.mjs
- [[compile-catalogue.mjs]] - code - scripts/compile-catalogue.mjs
- [[compiled]] - code - scripts/compile-catalogue.mjs
- [[detectFormat()]] - code - src/services/importer.js
- [[esData]] - code - scripts/compile-catalogue.mjs
- [[esPath]] - code - scripts/compile-catalogue.mjs
- [[estimate1RM()]] - code - src/engines/onerm.js
- [[exDir]] - code - scripts/compile-catalogue.mjs
- [[exercises-catalogue.js]] - code - src/data/exercises-catalogue.js
- [[exercises.js]] - code - src/data/exercises.js
- [[exportToExcelCSV()]] - code - src/services/importer.js
- [[files]] - code - scripts/compile-catalogue.mjs
- [[formatPlateString()]] - code - src/engines/plates.js
- [[getExercisesByCategory()]] - code - src/data/exercises.js
- [[getRoutineById()]] - code - src/data/routines.js
- [[handleToolCall()]] - code - mcp/server.js
- [[importWorkoutCSV()]] - code - src/services/importer.js
- [[importer.js]] - code - src/services/importer.js
- [[loadState()]] - code - mcp/server.js
- [[matchExercise()]] - code - src/services/importer.js
- [[memoryStorage]] - code - src/services/storage.js
- [[metabolic-guard.js]] - code - src/services/metabolic-guard.js
- [[onerm.js]] - code - src/engines/onerm.js
- [[outputPath]] - code - scripts/compile-catalogue.mjs
- [[parseCSV()]] - code - src/services/importer.js
- [[plates.js]] - code - src/engines/plates.js
- [[rawMap]] - code - scripts/compile-catalogue.mjs
- [[resolveExercise()]] - code - scripts/compile-catalogue.mjs
- [[rirEstimate()]] - code - src/engines/onerm.js
- [[rl]] - code - mcp/server.js
- [[rootDir]] - code - mcp/server.js
- [[rootDir_2]] - code - scripts/compile-catalogue.mjs
- [[routines.js]] - code - src/data/routines.js
- [[sanitizer.js]] - code - src/utils/sanitizer.js
- [[saveState()]] - code - mcp/server.js
- [[searchExercises()]] - code - src/data/exercises.js
- [[server.js]] - code - mcp/server.js
- [[storage.js]] - code - src/services/storage.js
- [[weightedEstimate()]] - code - src/engines/onerm.js

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/appjs
SORT file.name ASC
```

## Connections to other communities
- 31 edges to [[_COMMUNITY_run_tests.js]]
- 22 edges to [[_COMMUNITY_GlucoFitApp]]
- 5 edges to [[_COMMUNITY_progression.js]]
- 4 edges to [[_COMMUNITY_muscle-map.js]]
- 2 edges to [[_COMMUNITY_SessionCoach]]

## Top bridge nodes
- [[app.js]] - degree 36, connects to 4 communities
- [[server.js]] - degree 23, connects to 2 communities
- [[exercises.js]] - degree 11, connects to 2 communities
- [[handleToolCall()]] - degree 9, connects to 2 communities
- [[ai-coach.js]] - degree 9, connects to 2 communities