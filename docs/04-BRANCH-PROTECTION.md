# 🛡️ Protección de Ramas (Branch Protection)

![Branch Protection](https://img.shields.io/badge/Branch%20Protection-Security%20Rules-red?style=for-the-badge)

> Guía completa para configurar y gestionar branch protection rules como en empresas profesionales.

---

## 📋 Tabla de Contenidos

- [¿Qué es Branch Protection?](#qué-es-branch-protection)
- [¿Por qué es Importante?](#por-qué-es-importante)
- [Configuración Paso a Paso](#configuración-paso-a-paso)
- [Reglas Recomendadas por Rama](#reglas-recomendadas-por-rama)
- [Gestión de Excepciones](#gestión-de-excepciones)
- [Testing de las Reglas](#testing-de-las-reglas)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## 🤔 ¿Qué es Branch Protection?

**Branch Protection** es un conjunto de reglas que GitHub aplica a ramas específicas (como `main`) para:

- ✅ Prevenir pushes directos
- ✅ Requerir Pull Requests
- ✅ Exigir aprobaciones de code review
- ✅ Forzar que pasen tests antes de mergear
- ✅ Proteger contra borrado accidental
- ✅ Prevenir force pushes que reescriban historia

### Analogía Simple

Sin Branch Protection: 🚗 Autopista sin semáforos ni reglas └─ Rápido pero peligroso ⚠️

Con Branch Protection: 🚦 Autopista con señales y controles └─ Seguro y ordenado ✅

---

## 💡 ¿Por qué es Importante?

### 🏢 En Empresas Reales

**Todas las empresas tech tienen branch protection en `main`:**

- **MercadoLibre:** Requiere 2+ aprobaciones, 50+ status checks, Code owners obligatorios, Zero tolerance para bypass
- **Globant:** Requiere 1+ aprobación, Tests obligatorios, SonarQube scan, Security scan
- **Brubank:** Requiere 2+ aprobaciones, Security tests críticos, Compliance checks, Auditoría completa

### 🚨 Problemas que Previene

#### ❌ Sin Branch Protection:

Escenario 1: Developer Junior comete error
├─ Push directo a main
├─ Rompe producción
├─ Nadie lo revisó
└─ 💥 App caída por 3 horas

Escenario 2: Código sin tests
├─ Alguien hace push sin correr tests
├─ Bug pasa a producción
├─ Clientes afectados
└─ 💸 Pérdida de confianza

Escenario 3: Force push accidental
├─ git push --force
├─ Historia de commits perdida
├─ Trabajo de otros developers borrado
└─ 😱 Pánico generalizado

Escenario 4: Borrado de main
├─ git push origin :main
├─ Rama main eliminada
├─ Repositorio inutilizable
└─ 🔥 Desastre total

#### ✅ Con Branch Protection:

Todos los escenarios anteriores:
├─ ❌ Bloqueados por GitHub
├─ ✅ Error claro mostrado
├─ ✅ Workflow correcto forzado └
─ ✅ Producción segura

---

## 🔧 Configuración Paso a Paso

### Paso 1: Acceder a Branch Protection Settings

#### Opción A: Desde Settings

1 Ve a tu repositorio en GitHub
2 Click en "Settings" (arriba a la derecha)
3 En el menú lateral izquierdo, click en "Branches"
4 Verás "Branch protection rules"
5 Click en "Add branch protection rule"

#### Opción B: Atajo desde el mensaje de alerta

Si ves el mensaje "Your main branch isn't protected":

1 Click directamente en "Protect this branch"
2 Te llevará a la configuración

---

### Paso 2: Configurar la Regla para `main`

#### A) Branch Name Pattern

En el campo "Branch name pattern" escribe:

main

**📝 Nota:**

- Distingue mayúsculas/minúsculas
- Puedes usar wildcards: `release/*`, `hotfix/*`
- Para este proyecto usa exactamente: `main`

---

#### B) Protect matching branches

Activa estas opciones en orden:

##### ✅ 1. Require a pull request before merging

☑️ Require a pull request before merging

**¿Qué hace?**

- Previene pushes directos a `main`
- Fuerza crear PRs para cualquier cambio
- Workflow profesional obligatorio

**Sub-opciones:**

☑️ Require approvals Número de aprobaciones: 1

☑️ Dismiss stale pull request approvals when new commits are pushed (Si hay nuevos commits después de aprobación, requiere nueva aprobación)

☐ Require review from Code Owners (Opcional - para equipos grandes con CODEOWNERS file)

**⚙️ Configuración recomendada para tu proyecto:**

✅ Require approvals: 1
✅ Dismiss stale approvals: Activado
❌ Require Code Owners: Desactivado (solo project)

---

##### ✅ 2. Require status checks to pass before merging

☑️ Require status checks to pass before merging

**¿Qué hace?**

- Obliga a que el CI/CD pase antes de mergear
- Bloquea merge si algún test falla
- Asegura calidad del código

**Sub-opciones:**

☑️ Require branches to be up to date before merging (La rama debe tener los últimos cambios de main)

**Status checks a seleccionar:**

En el buscador "Search for status checks", busca y selecciona:

✅ test-client (18.x)
✅ test-client (20.x)
✅ test-server (18.x)
✅ test-server (20.x)
✅ security-audit
✅ code-quality
✅ summary

**📝 Nota importante:**

- Los checks solo aparecen DESPUÉS de que el workflow se haya ejecutado al menos una vez
- Si no ves los checks, ejecuta el workflow primero y vuelve aquí
- Asegúrate de seleccionar los 7 checks

---

##### ✅ 3. Require conversation resolution before merging

☑️ Require conversation resolution before merging

**¿Qué hace?**

- Todos los comentarios del code review deben resolverse
- Previene mergear con temas pendientes
- Fuerza comunicación clara en el equipo

**Ejemplo:**

Reviewer comenta:

"Este if puede simplificarse"
├─ Developer responde y hace cambio
├─ Reviewer marca como "Resolved"
└─ Solo entonces se puede mergear ✅

---

##### ✅ 4. Require signed commits (Opcional)

☐ Require signed commits

**¿Qué hace?**

- Verifica que los commits estén firmados con GPG/SSH
- Asegura autenticidad del autor
- Nivel extra de seguridad

**⚙️ Configuración recomendada para tu proyecto:**

❌ Desactivado (requiere configuración adicional de GPG)

**Si quieres activarlo:**

- Ver [GitHub Docs: Signing Commits](https://docs.github.com/en/authentication/managing-commit-signature-verification)

---

##### ✅ 5. Require linear history (Opcional)

☐ Require linear history

**¿Qué hace?**

- Fuerza squash merge o rebase merge
- Previene merge commits
- Mantiene historial de git limpio

**Ejemplo visual:**

Sin linear history:

Merge PR #123
|
| _ Commit C
| _ Commit B
| Commit A
|/
Main
Con linear history:

Commit C (squashed)
Commit B
Commit A
Main

**⚙️ Configuración recomendada para tu proyecto:**

✅ Activado (para historial limpio)

---

##### ✅ 6. Require deployments to succeed (Opcional)

☐ Require deployments to succeed before merging

**¿Qué hace?**

- Espera a que el deploy se complete exitosamente
- Útil cuando tienes deploy automático

**⚙️ Configuración recomendada para tu proyecto:**

❌ Desactivado (aún no tienes deploy configurado)

**Cuando configures deploy:**

- Actívalo y selecciona el ambiente (production, staging, etc.)

---

##### ✅ 7. Lock branch (Opcional)

☐ Lock branch

**¿Qué hace?**

- Hace la rama completamente read-only
- Útil para archivar releases antiguas

**⚙️ Configuración recomendada para tu proyecto:**

❌ Desactivado (main debe recibir cambios)

---

##### ✅ 8. Do not allow bypassing the above settings

☐ Do not allow bypassing the above settings

**¿Qué hace?**

- Ni siquiera admins pueden saltarse las reglas
- Máxima seguridad

**⚙️ Configuración recomendada para tu proyecto:**

❌ Desactivado (tú eres el único contributor)

**En equipos grandes:**

✅ Activado (nadie puede bypassear, ni el CEO)

---

#### C) Rules applied to everyone (including administrators)

##### ❌ 9. Allow force pushes

☐ Allow force pushes
├─ ☐ Everyone
└─ ☐ Specify who can force push

**⚙️ Configuración recomendada:**

❌ DESACTIVADO COMPLETAMENTE

**Por qué:**

- Force push reescribe historia
- Puede perder trabajo de otros
- Muy peligroso en rama principal

**Solo permitir force push en:**

- Feature branches personales
- Nunca en main

---

##### ❌ 10. Allow deletions

☐ Allow deletions

**⚙️ Configuración recomendada:**

❌ DESACTIVADO

**Por qué:**

- Previene borrado accidental de main
- Es casi imposible recuperar
- No hay razón válida para borrar main

---

### Paso 3: Guardar la Configuración

1 Scroll hasta el final de la página
2 Verifica que todo esté configurado correctamente
3 Click en "Create" (si es nueva) o "Save changes"

**✅ Confirmación:**

Deberías ver un mensaje verde:

✅ Branch protection rule created successfully

---

## 📊 Reglas Recomendadas por Rama

### 🔴 Rama: `main` (Producción)

**Nivel de protección: MÁXIMO**

````yaml
Configuración para main:
├─ ✅ Require PR: YES
│  ├─ Approvals: 1 (o más en equipos)
│  └─ Dismiss stale: YES
├─ ✅ Require status checks: YES
│  ├─ Up to date: YES
│  └─ Required checks: 7 (todos)
├─ ✅ Require conversation resolution: YES
├─ ✅ Require linear history: YES
├─ ❌ Require signed commits: NO (opcional)
├─ ❌ Allow force pushes: NO
└─ ❌ Allow deletions: NO

Resultado:
🔒 Máxima seguridad
✅ Todo cambio revisado y testeado
✅ Historial limpio
✅ Imposible romper por accidente

🟡 Rama: develop (Staging/Development)

Nivel de protección: MEDIO (Opcional si usas GitFlow)

Configuración para develop:
├─ ✅ Require PR: YES
│  ├─ Approvals: 1
│  └─ Dismiss stale: YES
├─ ✅ Require status checks: YES
│  ├─ Up to date: YES
│  └─ Required checks: 7 (todos)
├─ ✅ Require conversation resolution: YES
├─ ❌ Require linear history: NO (más flexible)
├─ ❌ Allow force pushes: NO
└─ ❌ Allow deletions: NO

Resultado:
🔐 Buena seguridad
✅ Workflow ordenado
⚡ Más flexible que main

🟢 Ramas: feature/*, fix/*, hotfix/*

Nivel de protección: NINGUNO

Configuración para feature branches:
└─ Sin reglas de protección

Por qué:
✅ Permite iteración rápida
✅ Developers pueden hacer force push si necesitan
✅ Pueden reorganizar commits
✅ Experimentación libre

Resultado:
🚀 Desarrollo ágil
✅ Flexibilidad máxima
⚠️ Protección al mergear a main

🔓 Gestión de Excepciones

¿Cuándo Necesitas Bypassear las Reglas?

Casos Válidos:
1. Hotfix crítico en producción
   └─ App caída, necesitas fix URGENTE

2. Configuración inicial
   └─ Primera vez setting up el repo

3. Migración de datos
   └─ Cambios masivos estructurales

Casos NO Válidos:
❌ "No quiero esperar a code review"
❌ "Mis tests están fallando pero el código funciona"
❌ "Es solo un pequeño cambio"
❌ "Tengo prisa"

Cómo Bypassear Temporalmente (Emergencias)

Opción 1: Desactivar Regla Temporalmente
1. Settings → Branches
2. Click en "Edit" de la regla
3. Desactiva la opción que bloquea
4. Haz tu cambio urgente
5. INMEDIATAMENTE reactiva la regla

⚠️ IMPORTANTE:
✅ Documenta el bypass en un issue
✅ Notifica al equipo
✅ Crea PR retrospectivo con el fix correcto
❌ NUNCA dejes la regla desactivada

Opción 2: Usar Admin Override (si "Do not allow bypassing" está OFF)
1. Ve al PR bloqueado
2. Como admin, verás botón "Override protections"
3. Click en "Merge"
4. Documenta el por qué en el commit message

Ejemplo de mensaje:
EMERGENCY HOTFIX: Fix critical auth bug

Override branch protection due to:
- Production down
- Users unable to login
- Security vulnerability

Post-mortem issue: #456
Retrospective PR: Will follow in 24h

Crear Regla de Excepción para Usuarios Específicos
Configurar "Allow specified actors to bypass"

En Branch Protection Rules:
1. Scroll a "Rules applied to everyone"
2. Click "Add" en "Allow specified actors to bypass required pull requests"
3. Agrega tu usuario
4. Selecciona qué reglas puede bypassear

⚙️ Configuración recomendada:
❌ NO configurar excepciones
✅ Todos siguen las mismas reglas
✅ Incluido el owner del proyecto

En equipos grandes:

Solo para:
├─ DevOps lead (para deployments)
├─ Security team (para security fixes)
└─ CTO (para emergencias críticas)

🧪 Testing de las Reglas
Test 1: Intentar Push Directo a Main

# Debería FALLAR

# Asegurarte de estar en main
git checkout main

# Hacer un cambio
echo "test" >> test.txt

# Intentar push directo
git add test.txt
git commit -m "test: direct push"
git push origin main

✅ Resultado esperado:

remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: Changes must be made through a pull request.
To https://github.com/leanlag87/NoName-Store-MERN.git
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs

Si pasa: ❌ La protección NO está configurada correctamente

Test 2: Intentar Mergear PR sin Aprobación
1. Crea un PR de prueba
2. NO lo apruebes
3. Intenta mergear

✅ Resultado esperado:

❌ Merge blocked
⚠️ Required review not satisfied
⚠️ 1 approving review is required

Test 3: Intentar Mergear con Tests Fallando
1. Crea un PR que rompa los tests
2. Espera a que los checks fallen
3. Intenta mergear

✅ Resultado esperado:

❌ Merge blocked
⚠️ Required status checks are failing
⚠️ test-client (18.x) - Failed

Test 4: Intentar Force Push

# Debería FALLAR

git checkout main
git push --force origin main


✅ Resultado esperado:

remote: error: GH007: Protected branch update failed for refs/heads/main.
remote: error: Cannot force-push to this branch.

Test 5: Intentar Borrar Main

# Debería FALLAR

git push origin --delete main

✅ Resultado esperado:

remote: error: refusing to delete the current branch: refs/heads/main
remote: error: GH006: Protected branch deletion failed.

🔧 Troubleshooting

❌ Problema: "Merge button is disabled"

Síntomas:
El botón de merge está gris y no se puede clickear

Causas posibles:

1. Status checks no pasaron

Solución:
├─ Revisa qué check falló
├─ Click en "Details" del check fallido
├─ Arregla el problema
└─ Push nuevo commit

2. Falta aprobación

Solución:
├─ Pide a alguien que revise
└─ Si eres el único contributor, aprueba tú mismo
    (si la configuración lo permite)

3. Hay conversaciones sin resolver

Solución:
├─ Ve a la pestaña "Conversation"
├─ Resuelve todos los comentarios
└─ Marca como "Resolved"

4. Rama desactualizada

Solución:
├─ Click en "Update branch"
└─ Espera a que el CI/CD corra nuevamente

❌ Problema: "No puedo ver los status checks en branch protection"

Síntomas:
Al configurar branch protection, el buscador de checks está vacío

Solución:
1. Los checks solo aparecen DESPUÉS de ejecutarse por primera vez
2. Ve a Actions y ejecuta el workflow
3. Espera a que termine
4. Vuelve a branch protection
5. Refresca la página
6. Ahora deberían aparecer

Si aún no aparecen:

Verifica:
├─ ¿El workflow se ejecutó en la rama correcta?
├─ ¿Los jobs tienen el nombre correcto?
└─ ¿El workflow terminó exitosamente?

❌ Problema: "Branch protection bypass no funciona"

Síntomas:
Configuraste bypass para tu usuario pero aún no puedes mergear

Verificaciones:
1. ¿Eres admin del repositorio?
   └─ Settings → Manage access → Verifica tu rol

2. ¿"Do not allow bypassing" está OFF?
   └─ Si está ON, nadie puede bypassear

3. ¿Seleccionaste las reglas correctas?
   └─ Verifica qué reglas están en la lista de bypass

❌ Problema: "Dependabot PRs no se pueden mergear automáticamente"

Síntomas:
Los PRs de Dependabot requieren aprobación manual

Causas:

Causa 1: Dependabot no es "trusted"
Solución:
├─ Settings → Code security
├─ Enable "Dependabot security updates"
└─ Esto le da permisos especiales

Causa 2: Branch protection muy estricta
Solución:
├─ Agrega excepciones para Dependabot
└─ O ajusta el auto-merge workflow

🎯 Best Practices

✅ DO (Hacer)
✅ Protege SIEMPRE la rama main
✅ Requiere al menos 1 aprobación
✅ Requiere que CI/CD pase
✅ Deshabilita force push y deletions
✅ Usa squash merge para historial limpio
✅ Auto-delete feature branches después del merge
✅ Documenta excepciones cuando las uses
✅ Revisa y actualiza reglas periódicamente

❌ DON'T (No hacer)
❌ Dejar main sin protección "para ir más rápido"
❌ Bypassear reglas por pereza
❌ Permitir force push en main
❌ Hacer exceptions permanentes
❌ Deshabilitar status checks "porque fallan"
❌ Mergear sin code review
❌ Dejar reglas inconsistentes entre branches
❌ Olvidar documentar bypasses de emergencia

📚 Configuración Recomendada Completa
Para Proyecto Personal (NoName-Store-MERN)
main:
  require_pull_request: true
  required_approvals: 1
  dismiss_stale_reviews: true
  require_code_owner_review: false

  require_status_checks: true
  require_up_to_date_branch: true
  required_checks:
    - test-client (18.x)
    - test-client (20.x)
    - test-server (18.x)
    - test-server (20.x)
    - security-audit
    - code-quality
    - summary

  require_conversation_resolution: true
  require_linear_history: true
  require_signed_commits: false

  allow_force_pushes: false
  allow_deletions: false
  allow_bypass: false

 Para Proyecto en Equipo (2-5 developers)
 main:
  require_pull_request: true
  required_approvals: 2
  dismiss_stale_reviews: true
  require_code_owner_review: true

  require_status_checks: true
  require_up_to_date_branch: true
  required_checks: [all CI/CD checks]

  require_conversation_resolution: true
  require_linear_history: true
  require_signed_commits: true

  allow_force_pushes: false
  allow_deletions: false
  allow_bypass: false

Para Proyecto Enterprise (10+ developers)
 main:
  require_pull_request: true
  required_approvals: 3
  dismiss_stale_reviews: true
  require_code_owner_review: true
  restrict_review_dismissals: true

  require_status_checks: true
  require_up_to_date_branch: true
  required_checks: [extensive list]

  require_conversation_resolution: true
  require_linear_history: true
  require_signed_commits: true
  require_deployments_to_succeed: true

  allow_force_pushes: false
  allow_deletions: false
  allow_bypass: false

  bypass_actors:
    - devops-team
    - security-team

🎓 Resumen Visual
┌─────────────────────────────────────────────────────────────┐
│                  BRANCH PROTECTION FLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Developer intenta cambio en main                           │
│              │                                              │
│              ▼                                              │
│     ┌─────────────────┐                                     │
│     │ ¿Es vía PR?     │────NO──���─► ❌ BLOQUEADO        │
│     └────────┬────────┘                                     │
│              │ SÍ                                           │
│              ▼                                              │
│     ┌─────────────────┐                                     │
│     │ ¿Tiene aproba-  │────NO────► ❌ BLOQUEADO            │
│     │  ción?          │                                     │
│     └────────┬────────┘                                     │
│              │ SÍ                                           │
│              ▼                                              │
│     ┌─────────────────┐                                     │
│     │ ¿CI/CD pasó?    │────NO────► ❌ BLOQUEADO            │
│     └────────┬────────┘                                     │
│              │ SÍ                                           │
│              ▼                                              │
│     ┌─────────────────┐                                     │
│     │ ¿Conversaciones │────NO────► ❌ BLOQUEADO            │
│     │  resueltas?     │                                     │
│     └────────┬────────┘                                     │
│              │ SÍ                                           │
│              ▼                                              │
│     ┌─────────────────┐                                     │
│     │ ✅ MERGE ALLOWED│                                     │
│     └─────────────────┘                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

🎯 Checklist Final
Antes de considerar que branch protection está completo:
✅ Rama main protegida
✅ Require PR activado
✅ Require 1+ approvals configurado
✅ Status checks configurados (7 checks)
✅ Conversation resolution activado
✅ Force push deshabilitado
✅ Deletions deshabilitado
✅ Auto-delete branches habilitado
✅ Reglas testeadas exitosamente
✅ Equipo notificado del cambio
✅ Documentación actualizada

📖 Recursos Adicionales
GitHub Docs: Branch Protection
GitHub Docs: Status Checks
GitHub Docs: Required Reviews
<div align="center">
⬅️ Setup Guide | ⬆️ Volver al Índice | Siguiente: Testing ➡️

Seguridad configurada profesionalmente 🛡️

</div> ```
````
