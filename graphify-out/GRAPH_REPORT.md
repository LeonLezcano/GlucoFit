# Graph Report - .  (2026-11-18)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 310 nodes · 406 edges · 25 communities (23 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `43bf6575`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- run_tests.js
- GlucoFitApp
- properties
- exercises.schema.json
- package.json
- required
- required
- enum
- SessionCoach
- bump-version.js
- manifest.json
- properties
- serve.js
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
1. `GlucoFitApp` - 20 edges
2. `required` - 16 edges
3. `SessionCoach` - 15 edges
4. `required` - 11 edges
5. `required` - 11 edges
6. `enum` - 11 edges
7. `Sanitizer` - 9 edges
8. `keywords` - 8 edges
9. `scripts` - 7 edges
10. `StorageService` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (25 total, 2 thin omitted)

### Community 0 - "run_tests.js"
Cohesion: 0.04
Nodes (48): activeSession, allSessions, cacheControl, chaoticInputs, checkinEval, coach, cspHeader, deltaEval (+40 more)

### Community 1 - "GlucoFitApp"
Cohesion: 0.14
Nodes (12): GlucoFitApp, EXERCISES, getExerciseById(), getExercisesByCategory(), searchExercises(), getRoutineById(), ROUTINES, GLUCOSE_ZONES (+4 more)

### Community 2 - "properties"
Cohesion: 0.08
Nodes (32): $ref, type, $ref, type, $ref, type, $ref, type (+24 more)

### Community 3 - "exercises.schema.json"
Cohesion: 0.08
Nodes (25): $ref, $defs, exercise, languageStepsMap, steps, description, additionalProperties, type (+17 more)

### Community 4 - "package.json"
Cohesion: 0.09
Nodes (21): author, description, keywords, license, name, scripts, dev, security:full (+13 more)

### Community 5 - "required"
Cohesion: 0.18
Nodes (17): type, languageMap, additionalProperties, description, required, type, required, en (+9 more)

### Community 6 - "required"
Cohesion: 0.12
Nodes (16): required, attribution, body_part, category, created_at, equipment, gif_url, id (+8 more)

### Community 7 - "enum"
Cohesion: 0.14
Nodes (14): description, enum, type, body_part, back, cardio, chest, lower arms (+6 more)

### Community 9 - "bump-version.js"
Cohesion: 0.15
Nodes (12): __dirname, __filename, major, match, minor, packagePath, patchStr, rawVersion (+4 more)

### Community 10 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 11 - "properties"
Cohesion: 0.29
Nodes (7): properties, description, $ref, description, $ref, instruction_steps, instructions

### Community 12 - "serve.js"
Cohesion: 0.33
Nodes (5): __dirname, __filename, MIME_TYPES, rootDir, server

### Community 13 - "attribution"
Cohesion: 0.50
Nodes (4): description, minLength, type, attribution

### Community 14 - "category"
Cohesion: 0.50
Nodes (4): description, minLength, type, category

### Community 15 - "created_at"
Cohesion: 0.50
Nodes (4): description, format, type, created_at

### Community 16 - "equipment"
Cohesion: 0.50
Nodes (4): description, minLength, type, equipment

### Community 17 - "gif_url"
Cohesion: 0.50
Nodes (4): description, pattern, type, gif_url

### Community 18 - "id"
Cohesion: 0.50
Nodes (4): description, pattern, type, id

### Community 19 - "image"
Cohesion: 0.50
Nodes (4): description, pattern, type, image

### Community 20 - "media_id"
Cohesion: 0.50
Nodes (4): description, minLength, type, media_id

### Community 21 - "muscle_group"
Cohesion: 0.50
Nodes (4): description, minLength, type, muscle_group

### Community 22 - "name"
Cohesion: 0.50
Nodes (4): description, minLength, type, name

### Community 23 - "target"
Cohesion: 0.50
Nodes (4): target, description, minLength, type

## Knowledge Gaps
- **196 isolated node(s):** `$schema`, `$id`, `title`, `description`, `type` (+191 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `properties` connect `properties` to `exercises.schema.json`, `enum`, `attribution`, `category`, `created_at`, `equipment`, `gif_url`, `id`, `image`, `media_id`, `muscle_group`, `name`, `target`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `exercise` connect `exercises.schema.json` to `properties`, `required`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `$defs` connect `exercises.schema.json` to `required`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `$schema`, `$id`, `title` to the rest of the system?**
  _196 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `run_tests.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `GlucoFitApp` be split into smaller, more focused modules?**
  _Cohesion score 0.13513513513513514 - nodes in this community are weakly interconnected._
- **Should `properties` be split into smaller, more focused modules?**
  _Cohesion score 0.08064516129032258 - nodes in this community are weakly interconnected._