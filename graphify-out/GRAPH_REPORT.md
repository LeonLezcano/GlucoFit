# Graph Report - .  (2026-11-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 428 nodes · 655 edges · 29 communities (27 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `037b511b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- run_tests.js
- app.js
- required
- GlucoFitApp
- properties
- package.json
- mcp/package.json
- required
- enum
- SessionCoach
- bump-version.js
- manifest.json
- muscle-map.js
- properties
- serve.js
- progression.js
- structural-balance.js
- attribution
- category
- created_at
- equipment
- gif_url
- id
- image
- media_id
- muscle_group
- name
- target
- sw.js

## God Nodes (most connected - your core abstractions)
1. `GlucoFitApp` - 27 edges
2. `StorageService` - 19 edges
3. `required` - 16 edges
4. `SessionCoach` - 15 edges
5. `Sanitizer` - 14 edges
6. `required` - 11 edges
7. `required` - 11 edges
8. `enum` - 11 edges
9. `handleToolCall()` - 9 edges
10. `getExerciseById()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `handleToolCall()` --calls--> `getExerciseById()`  [EXTRACTED]
  mcp/server.js → src/data/exercises.js
- `handleToolCall()` --calls--> `calculateNextPrescription()`  [EXTRACTED]
  mcp/server.js → src/engines/progression.js
- `handleToolCall()` --calls--> `searchExercises()`  [EXTRACTED]
  mcp/server.js → src/data/exercises.js
- `handleToolCall()` --calls--> `getRoutineById()`  [EXTRACTED]
  mcp/server.js → src/data/routines.js
- `handleToolCall()` --calls--> `estimate1RM()`  [EXTRACTED]
  mcp/server.js → src/engines/onerm.js

## Import Cycles
- None detected.

## Communities (29 total, 2 thin omitted)

### Community 0 - "run_tests.js"
Cohesion: 0.03
Nodes (69): addedCount, aiPrompt, atgResults, balanceBalanced, balanceWeak, chaoticInputs, checkinEval, deltaAscent (+61 more)

### Community 1 - "app.js"
Cohesion: 0.06
Nodes (47): __dirname, __filename, handleToolCall(), loadState(), rl, rootDir, saveState(), STORAGE_FILE (+39 more)

### Community 2 - "required"
Cohesion: 0.05
Nodes (41): type, $defs, exercise, languageMap, steps, description, additionalProperties, required (+33 more)

### Community 3 - "GlucoFitApp"
Cohesion: 0.16
Nodes (5): GlucoFitApp, getExerciseById(), AICoachService, StorageService, Sanitizer

### Community 4 - "properties"
Cohesion: 0.08
Nodes (32): $ref, type, $ref, type, $ref, type, $ref, type (+24 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (21): author, description, diabetes, fitness, keywords, license, name, scripts (+13 more)

### Community 6 - "mcp/package.json"
Cohesion: 0.11
Nodes (17): author, bin, glucofit-mcp, description, diabetes, fitness, keywords, license (+9 more)

### Community 7 - "required"
Cohesion: 0.18
Nodes (17): $ref, languageStepsMap, required, additionalProperties, description, required, type, en (+9 more)

### Community 8 - "enum"
Cohesion: 0.14
Nodes (14): description, enum, type, body_part, back, cardio, chest, lower arms (+6 more)

### Community 10 - "bump-version.js"
Cohesion: 0.15
Nodes (12): __dirname, __filename, major, match, minor, packagePath, patchStr, rawVersion (+4 more)

### Community 11 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 12 - "muscle-map.js"
Cohesion: 0.36
Nodes (7): calculateMuscleRecovery(), calculateMuscleVolume(), getMuscleColor(), INERT_PARTS, MUSCLE_KEY_MAP, normalizeMuscleKey(), renderMuscleSvg()

### Community 13 - "properties"
Cohesion: 0.29
Nodes (7): properties, description, $ref, description, $ref, instruction_steps, instructions

### Community 14 - "serve.js"
Cohesion: 0.33
Nodes (5): __dirname, __filename, MIME_TYPES, rootDir, server

### Community 15 - "progression.js"
Cohesion: 0.50
Nodes (4): calculateNextPrescription(), getDefaultIncrement(), POLICIES, POLICY_META

### Community 16 - "structural-balance.js"
Cohesion: 0.50
Nodes (4): BALANCE_STATUSES, evaluateLiftBalance(), evaluateTemplate(), STRUCTURAL_TEMPLATES

### Community 17 - "attribution"
Cohesion: 0.50
Nodes (4): description, minLength, type, attribution

### Community 18 - "category"
Cohesion: 0.50
Nodes (4): description, minLength, type, category

### Community 19 - "created_at"
Cohesion: 0.50
Nodes (4): description, format, type, created_at

### Community 20 - "equipment"
Cohesion: 0.50
Nodes (4): description, minLength, type, equipment

### Community 21 - "gif_url"
Cohesion: 0.50
Nodes (4): description, pattern, type, gif_url

### Community 22 - "id"
Cohesion: 0.50
Nodes (4): description, pattern, type, id

### Community 23 - "image"
Cohesion: 0.50
Nodes (4): description, pattern, type, image

### Community 24 - "media_id"
Cohesion: 0.50
Nodes (4): description, minLength, type, media_id

### Community 25 - "muscle_group"
Cohesion: 0.50
Nodes (4): description, minLength, type, muscle_group

### Community 26 - "name"
Cohesion: 0.50
Nodes (4): description, minLength, type, name

### Community 27 - "target"
Cohesion: 0.50
Nodes (4): target, description, minLength, type

## Knowledge Gaps
- **255 isolated node(s):** `$schema`, `$id`, `title`, `description`, `type` (+250 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `properties` connect `properties` to `required`, `enum`, `attribution`, `category`, `created_at`, `equipment`, `gif_url`, `id`, `image`, `media_id`, `muscle_group`, `name`, `target`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `exercise` connect `required` to `properties`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `$defs` connect `required` to `required`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `$schema`, `$id`, `title` to the rest of the system?**
  _255 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `run_tests.js` be split into smaller, more focused modules?**
  _Cohesion score 0.028169014084507043 - nodes in this community are weakly interconnected._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.060655737704918035 - nodes in this community are weakly interconnected._
- **Should `required` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._