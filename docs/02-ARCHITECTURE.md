# 🏗️ Arquitectura del Pipeline CI/CD

![Architecture](https://img.shields.io/badge/Architecture-CI%2FCD%20Pipeline-orange?style=for-the-badge)

> Documentación técnica de la arquitectura, componentes, flujos y diagramas del pipeline CI/CD implementado en NoName-Store-MERN.

---

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Diagrama de Arquitectura Completo](#diagrama-de-arquitectura-completo)
- [Componentes del Sistema](#componentes-del-sistema)
- [Flujos de Trabajo Detallados](#flujos-de-trabajo-detallados)
- [Matriz de Ejecución](#matriz-de-ejecución)
- [Estrategias de Testing](#estrategias-de-testing)
- [Gestión de Dependencias](#gestión-de-dependencias)
- [Branch Protection Strategy](#branch-protection-strategy)
- [Decisiones de Arquitectura](#decisiones-de-arquitectura)

---

## 🎯 Visión General

### Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│ GITHUB REPOSITORY                                               │
│ leanlag87/NoName-Store-MERN                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌───────▼────────┐
        │ Git Events     │       │ Schedule       │
        │ (push, PR)     │       │ (weekly)       │
        └───────┬────────┘       └───────┬────────┘
                │                       │
                └───────────┬───────────┘
                            │
                ┌───────────▼───────────┐
                │ GitHub Actions        │
                │ Workflow Engine       │
                └───────────┬───────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼────────┐  ┌──────▼──────┐  ┌────▼────────┐
    │ CI/CD      │  │ Dependabot  │  │ Auto-merge  │
    │ Pipeline   │  │ Updates     │  │ Workflow    │
    └───┬────────┘  └──────┬──────┘  └────┬────────┘
        │                   │                  │
        └───────────────────┼──────────────────┘
                            │
        ┌───────────────────▼───────────────────┐
        │ Status Checks & Reports               │
        │ (Visible en PRs y Actions tab)        │
        └───────────────────────────────────────┘
```

---

## 🏛️ Diagrama de Arquitectura Completo

### Flujo Completo del Sistema

                        DEVELOPER
                            │
                            │ git push
                            ▼
                    ┌────────��──────┐
                    │  GitHub Repo    │
                    └───────┬───────  ┘
                            │
                ┌───────────┼───────────┐
                │           │           │
          [Push Event] [PR Event] [Schedule]
                │           │           │
                └───────────┼───────────┘
                            │
                ┌───────────▼────────────┐
                │   GitHub Actions       │
                │   Trigger System       │
                └───────────┬────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
    ┌───────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
    │   Workflow   │ │ Workflow  │ │  Workflow   │
    │   CI/CD      │ │ Dependabot│ │  Auto-merge │
    └───────┬──────┘ └─────┬─────┘ └──────┬──────┘
            │               │               │
    ┌───────▼──────────┐    │               │
    │                  │    │               │
    │  ┌────────────┐  │    │               │
    │  │test-client │  │    │               │
    │  │ Node 18,20 │  │    │               │
    │  └──────┬─────┘  │    │               │
    │         │        │    │               │
    │  ┌──────▼─────┐  │    │               │
    │  │test-server │  │    │               │
    │  │ Node 18,20 │  │    │               │
    │  └──────┬─────┘  │    │               │
    │         │        │    │               │
    │  ┌──────▼─────┐  │    │               │
    │  │  security  │  │    │               │
    │  │   audit    │  │    │               │
    │  └──────┬─────┘  │    │               │
    │         │        │    │               │
    │  ┌──────▼─────┐  │    │               │
    │  │code-quality│  │    │               │
    │  └──────┬─────┘  │    │               │
    │         │        │    │               │
    │  ┌──────▼─────┐  │    │               │
    │  │  summary   │  │    │               │
    │  └──────┬─────┘  │    │               │
    │         │        │    │               │
    └─────────┼────────┘    │               │
              │             │               │
              ▼             ▼               ▼
        ┌─────────────────────────────────────┐
        │      Status Checks Results          │
        │  ✅ All passed / ❌ Failed         │
        └─────────────┬───────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │  PR Decision  │
              │ Merge/Block   │
              └───────────────┘

---

## 🧩 Componentes del Sistema

### 1. CI/CD Pipeline Workflow

**Archivo:** `.github/workflows/ci-cd-pipeline.yml`

**Responsabilidades:**

- ✅ Ejecutar tests automáticos
- ✅ Validar builds
- ✅ Realizar security audits
- ✅ Generar reportes de calidad
- ✅ Bloquear merges si fallan validaciones

**Triggers:**

```yaml
on:
  push:
    branches: [main, develop, feature/*]
  pull_request:
    branches: [main, develop]

Jobs:
test-client (Node 18.x, 20.x)    ← Paralelo
test-server (Node 18.x, 20.x)    ← Paralelo
     │
     └──────┬─────────────────────┘
            │
            ▼
    security-audit                ← Depende de tests
    code-quality                  ← Depende de tests
            │
            ▼
         summary                  ← Depende de todos

2. Dependabot Configuration
Archivo: .github/dependabot.yml

Responsabilidades:

🔍 Escanear dependencias semanalmente
📦 Detectar actualizaciones disponibles
🔒 Priorizar security updates
📬 Crear PRs automáticos
🏷️ Etiquetar y categorizar updates
Estrategia de Agrupación:
Cliente:
  - production-dependencies (minor/patch)
  - testing-dependencies (minor/patch)
  - react-ecosystem (patch only)

Servidor:
  - production-dependencies (minor/patch)
  - critical-server-dependencies (patch only)
  - database-dependencies (patch only)

Schedule:
Revisión semanal: Lunes 09:00 AM (America/Argentina/Buenos_Aires)
Security alerts: Inmediato (24/7)

3. Auto-merge Workflow
Archivo: .github/workflows/dependabot-auto-merge.yml

Responsabilidades:

🤖 Aprobar PRs de Dependabot automáticamente
🔀 Habilitar auto-merge condicional
⚠️ Comentar en updates MAJOR
📊 Generar reportes de acciones
Lógica de Decisión:
┌─────────────────────┐
│  PR de Dependabot   │
└──────────┬──────────┘
           │
    ┌──────▼──────┐
    │  Metadata   │
    │  Analysis   │
    └──────┬──────┘
           │
    ┌──────▼───────────────────────┐
    │  ¿Tipo de actualización?     │
    └──┬────────────┬──────────────┘
       │            │
   PATCH/MINOR   MAJOR
       │            │
       ▼            ▼
   ┌───────┐   ┌─────────────┐
   │Aprobar│   │Comentar     │
   │       │   │"Requiere    │
   │Auto-  │   │ revisión    │
   │merge  │   │ manual"     │
   └───┬───┘   └─────────────┘
       │
       ▼
   ┌───────────┐
   │Esperar    │
   │CI/CD pass │
   └───┬───────┘
       │
   ✅ Pasa
       │
       ▼
   ┌───────┐
   │ Merge │
   └───────┘

4. Branch Protection
Configuración: GitHub Settings → Branches → main

Reglas Aplicadas:
✅ Require pull request before merging
   ├─ Require approvals: 1
   └─ Dismiss stale approvals on new commits

✅ Require status checks to pass before merging
   ├─ test-client (Node 18.x)
   ├─ test-client (Node 20.x)
   ├─ test-server (Node 18.x)
   ├─ test-server (Node 20.x)
   ├─ security-audit
   ├─ code-quality
   └─ summary

✅ Require conversation resolution before merging

❌ Allow force pushes (DISABLED)
❌ Allow deletions (DISABLED)


🔄 Flujos de Trabajo Detallados
Flujo 1: Desarrollo Normal (Feature Branch)
┌──────────────────────────────────────────────────────────────┐
│  FASE 1: Desarrollo Local                                    │
└──────────────────────────────────────────────────────────────┘

Developer crea rama: feature/nueva-funcionalidad
    │
    ├─ Escribe código
    ├─ Tests locales
    └─ Commits

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  FASE 2: Push a GitHub                                       │
└──────────────────────────────────────────────────────────────┘

git push origin feature/nueva-funcionalidad
    │
    └─ Trigger: GitHub Actions

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  FASE 3: CI/CD Pipeline Execution                            │
└──────────────────────────────────────────────────────────────┘

GitHub Actions ejecuta:
    │
    ├─ [Paralelo] test-client (Node 18.x)    → 2-3 min
    ├─ [Paralelo] test-client (Node 20.x)    → 2-3 min
    ├─ [Paralelo] test-server (Node 18.x)    → 1-2 min
    └─ [Paralelo] test-server (Node 20.x)    → 1-2 min
              │
              └─ Todos completan
                      │
                      ▼
    ├─ [Serial] security-audit                → 1 min
    └─ [Serial] code-quality                  → 1 min
              │
              ▼
    └─ [Serial] summary                       → 30 seg

Total: ~5-7 minutos

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  FASE 4: Resultados                                          │
└──────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  ✅ PASS    │ → Developer puede crear PR
    └─────────────┘
           O
    ┌─────────────┐
    │  ❌ FAIL    │ → Developer debe arreglar y volver a pushear
    └─────────────┘

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  FASE 5: Pull Request                                        │
└──────────────────────────────────────────────────────────────┘

Developer abre PR a main
    │
    ├─ CI/CD se ejecuta nuevamente
    ├─ Code review por equipo
    └─ Conversaciones resueltas
              │
              ▼
    ┌─────────────────┐
    │  ✅ Approved    │
    │  ✅ CI/CD Pass  │
    │  ✅ Conflicts ✗│
    └────────┬────────┘
             │
             ▼
    ┌─────────────┐
    │   MERGE     │ → Se integra a main
    └─────────────┘

 Flujo 2: Dependabot Update (Automático)
 ┌──────────────────────────────────────────────────────────────┐
│  LUNES 09:00 AM                                              │
└──────────────────────────────────────────────────────────────┘

Dependabot se ejecuta (scheduled)
    │
    └─ Escanea: client/package.json
    └─ Escanea: server/package.json

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  Análisis de Dependencias                                    │
└──────────────────────────────────────────────────────────────┘

Encuentra actualizaciones:
    │
    ├─ react: 18.3.1 → 18.3.2 (PATCH)
    ├─ express: 4.21.0 → 4.22.0 (MINOR)
    └─ mongoose: 8.5.2 → 9.0.0 (MAJOR)

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  Creación de PRs                                             │
└──────────────────────────────────────────────────────────────┘

Dependabot crea 2 PRs (agrupados):
    │
    ├─ PR #1: "chore(deps-client): bump production-dependencies"
    │          Incluye: react (PATCH)
    │
    └─ PR #2: "chore(deps-server): bump express (MINOR)"

    └─ PR #3: "chore(deps-server): bump mongoose to 9.0.0 (MAJOR)"
               ⚠️ Separado, no agrupado

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  Auto-merge Workflow se Ejecuta                              │
└──────────────────────────────────────────────────────────────┘

Para PR #1 (PATCH):
    │
    ├─ ✅ Aprueba automáticamente
    ├─ 🔀 Habilita auto-merge
    └─ ⏳ Espera CI/CD
         │
         ├─ CI/CD ejecuta tests
         ├─ ✅ Tests pasan
         └─ 🎉 MERGE AUTOMÁTICO

Para PR #2 (MINOR):
    │
    ├─ ✅ Aprueba automáticamente
    ├─ 🔀 Habilita auto-merge
    └─ ⏳ Espera CI/CD
         │
         ├─ CI/CD ejecuta tests
         ├─ ✅ Tests pasan
         └─ 🎉 MERGE AUTOMÁTICO

Para PR #3 (MAJOR):
    │
    ├─ 💬 Deja comentario: "Requiere revisión manual"
    ├─ ⚠️ NO aprueba
    └─ 👤 Espera revisión del developer

Total: 2 PRs mergeados automáticamente, 1 requiere atención manual

Flujo 3: Security Alert (Crítico)
┌──────────────────────────────────────────────────────────────┐
│  CUALQUIER DÍA/HORA                                          │
└──────────────────────────────────────────────────────────────┘

GitHub detecta vulnerabilidad crítica en dependencia
    │
    Ejemplo: tar@2.2.2 (CVE-2024-XXXXX)
    │
    Severidad: HIGH
    │
    ▼

┌──────────────────────────────────────────────────────────────┐
│  Dependabot Security Alert                                   │
└──────────────────────────────────────────────────────────────┘

Dependabot INMEDIATAMENTE:
    │
    ├─ 🚨 Crea security alert
    ├─ 📧 Notifica al owner
    └─ 🔧 Crea PR de emergencia
         │
         Título: "[Security] Bump tar from 2.2.2 to 7.5.10"
         Labels: security, dependencies, high-priority
         │
         ▼

┌──────────────────────────────────────────────────────────────┐
│  Auto-merge Workflow (Modo Security)                         │
└──────────────────────────────────────────────────────────────┘

PR de seguridad:
    │
    ├─ Si es PATCH/MINOR:
    │    ├─ ✅ Aprueba automáticamente
    │    ├─ 🔀 Habilita auto-merge
    │    ├─ 📊 CI/CD ejecuta
    │    └─ ✅ Merge si pasa tests
    │
    └─ Si es MAJOR:
         ├─ 💬 Comenta urgencia
         ├─ 📧 Notifica
         └─ 👤 Espera revisión URGENTE

                        ▼

┌──────────────────────────────────────────────────────────────┐
│  Resolución                                                  │
└──────────────────────────────────────────────────────────────┘

Tiempo de respuesta objetivo:
    │
    ├─ Critical: < 1 hora
    ├─ High: < 24 horas
    ├─ Medium: < 1 semana
    └─ Low: Siguiente ciclo semanal

📊 Matriz de Ejecución
Jobs Execution Matrix
Job	Trigger	Node Versions	Parallel	Depends On	Avg Time	Can Fail PR
test-client	push, PR	18.x, 20.x	✅	-	2-3 min	✅
test-server	push, PR	18.x, 20.x	✅	-	1-2 min	✅
security-audit	push, PR	20.x	❌	tests	1 min	⚠️ Soft
code-quality	push, PR	20.x	❌	tests	1 min	❌
summary	push, PR	20.x	❌	all	30 seg	✅

Leyenda:

✅ Can Fail PR: Bloquea merge si falla
⚠️ Soft Fail: Reporta pero no bloquea
❌ Cannot Fail: Solo informativo

Runners Configuration
Runner	OS	CPU	RAM	Storage	Cost
ubuntu-latest	Ubuntu 22.04	2 cores	7 GB	14 GB SSD	FREE (public repos)

Límites FREE tier:

✅ Repos públicos: Ilimitado
⚠️ Repos privados: 2,000 min/mes
🧪 Estrategias de Testing
Test Strategy por Componente
┌─────────────────────────────────────────────────────────────┐
│  CLIENTE (React)                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  1. Install Dependencies                           │     │
│  │     npm ci --legacy-peer-deps                      │     │
│  │     • Asegura reproducibilidad                     │     │
│  │     • Usa package-lock.json exacto                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  2. Run Tests                                      │     │
│  │     npm test -- --watchAll=false --passWithNoTests │     │
│  │     • Ejecuta Jest                                 │     │
│  │     • No-interactive mode                          │     │
│  │     • Pasa si no hay tests (temporal)              │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  3. Build Verification                             │     │
│  │     npm run build                                  │     │
│  │     • Verifica que compile                         │     │
│  │     • Detecta errores de TypeScript/JSX            │     │
│  │     • Valida imports                               │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  4. Build Size Check                               │     │
│  │     du -sh build/                                  │     │
│  │     • Monitorea tamaño del bundle                  │     │
│  │     • Detecta bundle bloat                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SERVIDOR (Node/Express)                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  1. Install Dependencies                           │     │
│  │     npm ci                                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  2. Syntax Check                                   │     │
│  │     node -c index.js                               │     │
│  │     • Valida sintaxis JavaScript                   │     │
│  │     • Detecta errores de parsing                   │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  3. Import Verification                            │     │
│  │     Verifica existencia de archivos                │     │
│  │     • index.js existe                              │     │
│  │     • Estructura correcta                          │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Multi-Version Testing Strategy
¿Por qué Node 18.x y 20.x?
Razones:
├─ Node 18.x: LTS actual (hasta 2025-04)
├─ Node 20.x: LTS nuevo (hasta 2026-04)
├─ Compatibilidad: Asegurar que funciona en ambos
└─ Future-proof: Preparado para migración

Matrix Strategy:
┌────────────┬──────────┬──────────┐
│ Component  │ Node 18  │ Node 20  │
├────────────┼──────────┼──────────┤
│ Cliente    │    ✅    │    ✅   │
│ Servidor   │    ✅    │    ✅   │
└────────────┴──────────┴──────────┘

Resultado: 4 jobs en paralelo
- test-client (18.x)
- test-client (20.x)
- test-server (18.x)
- test-server (20.x)

📦 Gestión de Dependencias
Dependabot Grouping Strategy
┌─────────────────────────────────────────────────────────────┐
│  CLIENTE                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Group 1: production-dependencies                           │
│  ├─ Patterns: *                                             │
│  ├─ Update types: minor, patch                              │
│  ├─ Exclude: @testing-library/*, react-scripts              │
│  └─ Resultado: 1 PR con múltiples deps actualizadas         │
│                                                             │
│  Group 2: testing-dependencies                              │
│  ├─ Patterns: @testing-library/*                            │
│  ├─ Update types: minor, patch                              │
│  └─ Resultado: 1 PR con todas las testing libs              │
│                                                             │
│  Group 3: react-ecosystem                                   │
│  ├─ Patterns: react*, @emotion/*                            │
│  ├─ Update types: patch ONLY                                │
│  └─ Resultado: Solo patches de React (más conservador)      │
│                                                             │
│  MAJOR updates: Siempre PRs individuales                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SERVIDOR                                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Group 1: production-dependencies                           │
│  ├─ Patterns: *                                             │
│  ├─ Update types: minor, patch                              │
│  ├─ Exclude: express*, mongoose, jsonwebtoken               │
│  └─ Resultado: 1 PR con deps no-críticas                    │
│                                                             │
│  Group 2: critical-server-dependencies                      │
│  ├─ Patterns: express, body-parser, cors                    │
│  ├─ Update types: patch ONLY                                │
│  └─ Resultado: 1 PR conservador para deps críticas          │
│                                                             │
│  Group 3: database-dependencies                             │
│  ├─ Patterns: mongoose                                      │
│  ├─ Update types: patch ONLY                                │
│  └─ Resultado: Updates muy conservadores de BD              │
│                                                             │
│  MAJOR updates: Siempre PRs individuales                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Update Priority Matrix
Tipo Update	Severidad	Auto-merge	Tiempo Respuesta
Security CRITICAL	🔴	PATCH/MINOR	< 1 hora
Security HIGH	🟠	PATCH/MINOR	< 24 horas
Security MEDIUM	🟡	PATCH/MINOR	< 1 semana
Regular MAJOR	⚪	❌ Manual	Próximo sprint
Regular MINOR	🟢	✅ Auto	Automático
Regular PATCH	🟢	✅ Auto	Automático

🛡️ Branch Protection Strategy
Protection Rules Hierarchy
┌─────────────────────────────────────────────────────────────┐
│  BRANCH: main                                               │
│  Protection Level: MAXIMUM                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ Require Pull Request
│     ├─ Minimum approvals: 1                                 │
│     ├─ Dismiss stale approvals: YES                         │
│     └─ Require review from code owners: NO (solo project)   │
│                                                             │
│  ✅ Require Status Checks
│     ├─ Require branches up to date: YES                     │
│     ├─ Required checks:                                     │
│     │   ├─ test-client (18.x)                               │
│     │   ├─ test-client (20.x)                               │
│     │   ├─ test-server (18.x)                               │
│     │   ├─ test-server (20.x)                               │
│     │   ├─ security-audit                                   │
│     │   ├─ code-quality                                     │
│     │   └─ summary                                          │
│     └─ Total: 7 checks obligatorios                         │
│                                                             │
│  ✅ Require Conversation Resolution
│     └─ Todos los comentarios deben resolverse               │
│                                                             │
│  ❌ Allow Force Pushes: DISABLED
│     └─ Protege historia de commits                          │
│                                                             │
│  ❌ Allow Deletions: DISABLED
│     └─ Imposible borrar main                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  BRANCH: develop (Opcional, si se usa)                      │
│  Protection Level: MEDIUM                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ Require Pull Request
│     └─ Minimum approvals: 1                                 │
│                                                             │
│  ✅ Require Status Checks
│     └─ Same as main                                         │
│                                                             │
│  ✅ Allow Force Pushes: DISABLED
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  BRANCH: feature/* (Feature branches)                       │
│  Protection Level: NONE                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Sin restricciones                                          │
│  └─ Permite iteración rápida                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

🎯 Decisiones de Arquitectura
ADR (Architecture Decision Records)
ADR-001: GitHub Actions como CI/CD Platform
Contexto: Necesitamos una plataforma de CI/CD para automatizar testing y deployment.

Opciones consideradas:

GitHub Actions
Jenkins
GitLab CI
CircleCI
Travis CI

Decisión: ✅ GitHub Actions

Razones:

✅ Integración nativa con GitHub
✅ FREE para repos públicos (ilimitado)
✅ 2,000 min/mes FREE para repos privados
✅ YAML configuration (infraestructura como código)
✅ Marketplace con miles de actions pre-hechas
✅ Documentación excelente
✅ Usado por empresas top (Microsoft, Google, etc.)

Consecuencias:

✅ Setup simple y rápido
✅ Bajo costo (FREE)
⚠️ Lock-in con GitHub (mitigable con YAML estándar)
ADR-002: Multi-Version Testing (Node 18.x y 20.x)
Contexto: Node.js tiene múltiples versiones LTS activas.

Decisión: ✅ Testear en Node 18.x y 20.x simultáneamente

Razones:

✅ Node 18.x: LTS actual, usado en producción
✅ Node 20.x: LTS nuevo, preparación para futuro
✅ Detecta incompatibilidades temprano
✅ Costo computacional bajo (paralelo)
✅ Best practice de la industria
Consecuencias:

✅ Mayor confianza en compatibilidad
✅ Migración futura más fácil
⚠️ Duplica tiempo de ejecución (mitigado con paralelización)
ADR-003: Dependabot con Auto-merge
Contexto: Las dependencias se desactualizan rápido y requieren mantenimiento constante.

Decisión: ✅ Dependabot + Auto-merge para PATCH/MINOR

Razones:

✅ Reduce carga manual del equipo
✅ Mantiene dependencias actualizadas
✅ Security updates aplicadas rápido
✅ MAJOR updates siguen siendo manuales (seguridad)
✅ CI/CD valida antes de merge (no riesgo)
Consecuencias:

✅ Menos deuda técnica
✅ Mejor seguridad
⚠️ Posibles breaking changes no detectados (mitigado con tests)
ADR-004: Squash Merge Strategy
Contexto: Necesitamos estrategia de merge para PRs.

Opciones:

Merge commit
Squash and merge
Rebase and merge
Decisión: ✅ Squash and merge

Razones:

✅ Historial de main limpio (1 commit por feature)
✅ Mensajes de commit consistentes
✅ Fácil de hacer rollback
✅ Reduce ruido en git log
✅ Best practice para repos mono-contributor
Consecuencias:

✅ Main tiene historial lineal y claro
⚠️ Se pierden commits individuales de la rama (mitigado: info en PR)
ADR-005: Branch Protection Mandatory
Contexto: Necesitamos prevenir merges directos a main y asegurar calidad.

Decisión: ✅ Branch protection obligatorio en main

Razones:

✅ Fuerza code review
✅ Asegura que CI/CD pase
✅ Previene errores humanos
✅ Best practice empresarial
✅ Profesionaliza el workflow

Consecuencias:

✅ Mayor calidad del código
✅ Menos bugs en producción
⚠️ Workflow más lento (trade-off aceptable)
📊 Métricas y Monitoreo
KPIs del Pipeline
Métrica	Objetivo	Actual	Status
Pipeline Success Rate	> 95%	-	🟢
Average Pipeline Time	< 10 min	5-7 min	🟢
Security Audit Failures	< 5%	-	🟢
Dependabot PRs Auto-merged	> 80%	-	🟢
Time to Merge (PATCH/MINOR)	< 30 min	~15 min	🟢
Failed Deployments	0	0	🟢
```
