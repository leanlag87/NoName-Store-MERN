# 🚀 Uso Diario del Pipeline CI/CD

![Daily Usage](https://img.shields.io/badge/Daily%20Usage-Workflow%20Guide-blue?style=for-the-badge)

> Guía práctica del workflow diario trabajando con CI/CD. Cómo desarrollar features, abrir PRs y mantener el proyecto.

---

## 📋 Tabla de Contenidos

- [Workflow Diario Estándar](#workflow-diario-estándar)
- [Desarrollar una Nueva Feature](#desarrollar-una-nueva-feature)
- [Trabajar con Pull Requests](#trabajar-con-pull-requests)
- [Gestionar Dependabot PRs](#gestionar-dependabot-prs)
- [Casos Especiales](#casos-especiales)
- [Comandos Útiles](#comandos-útiles)
- [Best Practices Diarias](#best-practices-diarias)

---

## 🔄 Workflow Diario Estándar

### El Ciclo de Desarrollo Completo

````
┌─────────────────────────────────────────────────────────────┐
│ DÍA A DÍA CON CI/CD                                         │
├─────────────────────────────────────────────────────────────┤
│ 1. Sincronizar con main                                     │
│ ↓                                                            │
│ 2. Crear feature branch                                     │
│ ↓                                                            │
│ 3. Desarrollar + commits                                    │
│ ↓                                                            │
│ 4. Push (CI/CD se ejecuta)                                  │
│ ↓                                                            │
│ 5. Crear Pull Request                                       │
│ ↓                                                            │
│ 6. Code review + ajustes                                    │
│ ↓                                                            │
│ 7. Merge a main                                             │
│ ↓                                                            │
│ 8. Branch auto-borrada                                      │
│ └─ Repetir para siguiente feature                           │
└─────────────────────────────────────────────────────────────┘

---

## 💻 Desarrollar una Nueva Feature

### Paso 1: Actualizar Main Local

**Siempre empieza con main actualizado:**

```bash
# Cambiar a main
git checkout main

# Actualizar desde GitHub
git pull origin main

# Verificar estado limpio
git status
# Debe mostrar: nothing to commit, working tree clean

⏰ Frecuencia: Al inicio de cada día y antes de crear cada feature branch

Paso 2: Crear Feature Branch

Nomenclatura estándar:

# Features
git checkout -b feature/nombre-descriptivo

# Fixes
git checkout -b fix/descripcion-del-bug

# Hotfixes
git checkout -b hotfix/problema-critico

# Chores (tareas de mantenimiento)
git checkout -b chore/descripcion-tarea

# Docs
git checkout -b docs/que-documentas

Ejemplos reales:

git checkout -b feature/add-user-authentication
git checkout -b fix/login-form-validation
git checkout -b hotfix/payment-gateway-error
git checkout -b chore/update-dependencies
git checkout -b docs/api-endpoints

💡 Tips:

Usa nombres descriptivos pero concisos
Usa kebab-case (palabras-separadas-por-guiones)
Evita números de issue al inicio (usa el commit message para eso)

Paso 3: Desarrollar la Feature

Workflow de desarrollo:

# 1. Hacer cambios en el código
# ... editas archivos ...

# 2. Ver qué cambiaste
git status
git diff

# 3. Agregar cambios
git add .
# O selectivo:
git add client/src/components/NewComponent.js

# 4. Commit con mensaje descriptivo
git commit -m "feat: add user authentication component

- Add Login component
- Add registration form
- Integrate with backend API
- Add form validation"

# 5. Continuar desarrollando
# ... más cambios ...

# 6. Más commits (tantos como necesites)
git add .
git commit -m "test: add tests for authentication"

📝 Formato de Commit Messages (Conventional Commits):

Tipo de cambio:
├─ feat:     Nueva funcionalidad
├─ fix:      Corrección de bug
├─ docs:     Documentación
├─ style:    Formato (no afecta código)
├─ refactor: Refactorización
├─ test:     Agregar/modificar tests
├─ chore:    Mantenimiento
└─ perf:     Mejora de performance

Formato:
tipo(scope): descripción breve

descripción detallada (opcional)

- Punto adicional 1
- Punto adicional 2

Fixes #123

Ejemplos:

git commit -m "feat(auth): add login functionality"

git commit -m "fix(cart): resolve checkout button not responding

The button was disabled when cart had only 1 item.
Now it works correctly regardless of item count.

Fixes #456"

git commit -m "docs(readme): update installation instructions"

git commit -m "refactor(api): simplify user service logic"

Paso 4: Push y Primera Ejecución del CI/CD

# Primera vez (crear rama remota)
git push -u origin feature/nombre-de-tu-rama

# Pushes siguientes
git push

✅ Qué sucede automáticamente:

1. Push completo ✅
   ↓
2. GitHub recibe el push
   ↓
3. GitHub Actions se activa automáticamente
   ↓
4. CI/CD Pipeline empieza a ejecutarse:
   ├─ 🧪 test-client (Node 18.x)
   ├─ 🧪 test-client (Node 20.x)
   ├─ 🧪 test-server (Node 18.x)
   ├─ 🧪 test-server (Node 20.x)
   ├─ 🔒 security-audit
   ├─ 📊 code-quality
   └─ 📋 summary
   ↓
5. Recibes notificación (opcional)
   ↓
6. Resultado:
   ├─ ✅ All checks passed
   └─ O ❌ Some checks failed

📧 Ver Resultados:

Ve a tu repositorio en GitHub
Click en Actions
Verás tu workflow ejecutándose en tiempo real
⏱️ Tiempo esperado: 5-7 minutos

Paso 5: Verificar que CI/CD Pasó

Si todo pasa ✅:
  # Continúa desarrollando o abre PR

Si algo falla ❌:
# 1. Ve a Actions y click en el workflow fallido
# 2. Identifica qué job falló
# 3. Lee los logs
# 4. Corrige el error localmente
# 5. Commit y push nuevamente

git add .
git commit -m "fix: resolve linting errors"
git push

# CI/CD se ejecutará automáticamente otra vez

📬 Trabajar con Pull Requests
Crear Pull Request

Cuándo crear el PR:
✅ Feature completa (o suficientemente avanzada)
✅ CI/CD pasando
✅ Commits limpios y bien organizados

Opciones para crear PR:

Opción 1: Desde el Banner de GitHub

1. Push a tu feature branch
2. Ve al repositorio en GitHub
3. Verás banner amarillo: "Compare & pull request"
4. Click en "Compare & pull request"

Opción 2: Manualmente

1. Ve a tu repositorio
2. Click en "Pull requests"
3. Click en "New pull request"
4. Base: main ← Compare: tu-feature-branch
5. Click "Create pull request"

Completar Información del PR

Título:

Formato: tipo: descripción breve

Ejemplos:
✅ feat: add user authentication
✅ fix: resolve cart checkout bug
✅ docs: update API documentation

Descripción (Template recomendado):

## 📝 Descripción

Breve descripción de qué hace este PR.

## 🎯 Cambios

- Cambio 1
- Cambio 2
- Cambio 3

## 🧪 Testing

- [ ] Tests locales pasan
- [ ] CI/CD pasa
- [ ] Probado manualmente

## 📸 Screenshots (si aplica)

(Agregar capturas si es cambio visual)

## 🔗 Issues Relacionados

Fixes #123
Closes #456
Related to #789

Ejemplo completo:

## 📝 Descripción

Implementa sistema de autenticación de usuarios con login y registro.

## 🎯 Cambios

- Agrega componente Login
- Agrega componente Register
- Integra con backend API `/auth/login` y `/auth/register`
- Agrega validación de formularios
- Agrega manejo de errores
- Agrega tests unitarios

## 🧪 Testing

- [x] Tests locales pasan
- [x] CI/CD pasa
- [x] Probado login exitoso
- [x] Probado login con credenciales incorrectas
- [x] Probado registro de nuevo usuario

## 🔗 Issues Relacionados

Closes #45

Ciclo de Review y Ajustes

Estado inicial del PR:

🟡 Some checks haven't completed yet
   • CI/CD Pipeline - In progress

⏳ Esperando...

(5-7 minutos después)

✅ All checks have passed
   • test-client (18.x) ✅
   • test-client (20.x) ✅
   • test-server (18.x) ✅
   • test-server (20.x) ✅
   • security-audit ✅
   • code-quality ✅
   • summary ✅

❌ Merge blocked
   ⚠️ Required: 1 approving review

Si recibes comentarios de review:

# 1. Lee los comentarios en GitHub

# 2. Haz los cambios solicitados localmente
# ... editas archivos ...

# 3. Commit con mensaje descriptivo
git add .
git commit -m "refactor: apply code review suggestions

- Simplify validation logic
- Add error handling
- Fix typo in comment"

# 4. Push (CI/CD se ejecuta automáticamente)
git push

# 5. Responde a los comentarios en GitHub
#    Marca como "Resolved" cuando esté listo

El PR se actualiza automáticamente con tus nuevos commits.

Aprobar y Mergear

Como autor (si eres el único contributor):

1. Espera a que todos los checks pasen ✅
2. Revisa los cambios una última vez
3. Click en "Merge pull request"
4. Selecciona "Squash and merge" (recomendado)
5. Edita el commit message si es necesario
6. Click "Confirm squash and merge"
7. ✅ PR mergeado
8. La rama se borra automáticamente

Como reviewer:

1. Revisa el código en la pestaña "Files changed"
2. Deja comentarios si es necesario
3. Cuando esté OK, click "Review changes"
4. Selecciona "Approve"
5. Click "Submit review"
6. El autor puede mergear ahora

Después del Merge

# 1. Volver a main local
git checkout main

# 2. Actualizar con los cambios mergeados
git pull origin main

# 3. Verificar que tus cambios están en main
git log --oneline -5

# 4. La feature branch remota ya se borró automáticamente

# 5. Borrar feature branch local (opcional)
git branch -d feature/nombre-de-tu-rama

# 6. Listo para la siguiente feature 🎉

🤖 Gestionar Dependabot PRs

PRs de Dependabot Automáticos

Cada lunes a las 9 AM (o cuando hay security alert):

📬 Recibes notificación:
   "Dependabot opened pull request #123"

Título del PR:
   chore(deps-client): bump react from 18.3.1 to 18.3.2

Tipos de PRs de Dependabot

1. Updates PATCH/MINOR (Automáticos) ✅
Ejemplo: react 18.3.1 → 18.3.2 (PATCH)

✅ Aprobado automáticamente
✅ Auto-merge habilitado
⏳ Esperando CI/CD...
✅ Merged automáticamente

Tu acción: NINGUNA (todo automático) 🎉

2. Updates MAJOR (Revisión Manual) ⚠️
Ejemplo: mongoose 8.5.2 → 9.0.0 (MAJOR)

⚠️ Comentario automático:
   "Actualización MAJOR detectada - requiere revisión manual"

Tu acción requerida:
1. Revisa el PR
2. Lee el changelog (link en el PR)
3. Busca breaking changes
4. Prueba localmente si es crítico
5. Aprueba o cierra según corresponda

Revisar PRs MAJOR de Dependabot

# 1. Traer la rama de Dependabot localmente
git fetch origin
git checkout dependabot/npm_and_yarn/server/mongoose-9.0.0

# 2. Instalar dependencias
cd server
npm install

# 3. Correr tests localmente
npm test

# 4. Probar la aplicación
npm start
# ... prueba funcionalidad crítica ...

# 5. Si todo OK, volver a GitHub y aprobar
git checkout main

# 6. En GitHub:
#    - Aprobar el PR
#    - Mergear manualmente

Cerrar PRs de Dependabot No Deseados

Si no quieres actualizar algo:

1. Ve al PR de Dependabot
2. Click en "Close pull request"
3. Agrega comentario explicando por qué:
   "Postponing this update until X is ready"

Dependabot no volverá a crear ese PR hasta la próxima versión.

🔥 Casos Especiales

Hotfix Urgente en Producción

Cuando hay un bug crítico en producción:

# 1. Desde main actualizado
git checkout main
git pull origin main

# 2. Crear rama hotfix
git checkout -b hotfix/critical-payment-bug

# 3. Hacer fix mínimo necesario
# ... edita SOLO lo necesario ...

# 4. Commit
git add .
git commit -m "hotfix: fix payment gateway timeout

Critical fix for production issue where payments
were timing out after 5 seconds.

Increased timeout to 30 seconds.

Fixes #999"

# 5. Push
git push -u origin hotfix/critical-payment-bug

# 6. Crear PR inmediatamente
#    Título: "HOTFIX: Fix payment gateway timeout"

# 7. Esperar CI/CD (5-7 min)

# 8. Si necesitas bypassear branch protection:
#    - Settings → Branches → Edit rule
#    - Temporalmente deshabilita "Require approvals"
#    - Mergea
#    - INMEDIATAMENTE reactiva la regla

# 9. O mejor: pide aprobación rápida a alguien del equipo

⚠️ Importante:

Hotfixes son la excepción, no la regla
Documenta el bypass si lo usas
Crea issue post-mortem
Evita bypassear si es posible

Trabajar en Múltiples Features Simultáneamente

Escenario: Tienes 2 features en progreso.

# Feature 1: Auth
git checkout -b feature/authentication
# ... desarrollo ...
git add .
git commit -m "feat: add login"
git push -u origin feature/authentication
# Abrir PR #1

# Mientras PR #1 está en review, trabajar en Feature 2
git checkout main
git pull  # Actualizar
git checkout -b feature/dashboard
# ... desarrollo ...
git add .
git commit -m "feat: add dashboard"
git push -u origin feature/dashboard
# Abrir PR #2

# Cambiar entre features según necesites
git checkout feature/authentication
# ... hacer cambios de review ...

git checkout feature/dashboard
# ... continuar desarrollo ...


💡 Tips:

Mantén las features independientes
No dependas de código no mergeado
Si Feature B depende de Feature A, espera a que A se mergee

Sincronizar Feature Branch con Main

Cuando main avanzó y quieres los últimos cambios:

# En tu feature branch
git checkout feature/tu-rama

# Opción 1: Merge (crea merge commit)
git merge main

# Opción 2: Rebase (historial lineal) - recomendado
git rebase main

# Si hay conflictos:
# ... resuelve conflictos en los archivos ...
git add .
git rebase --continue

# Push (force push si hiciste rebase)
git push --force-with-lease origin feature/tu-rama

⚠️ Nota sobre force push:

Solo en TU feature branch
NUNCA en main
Usa --force-with-lease (más seguro que --force)

💡 Comandos Útiles

Comandos Diarios

# Ver estado actual
git status

# Ver branches locales
git branch

# Ver branches remotas
git branch -r

# Cambiar de branch
git checkout nombre-branch

# Ver últimos commits
git log --oneline -10

# Ver diferencias antes de commit
git diff

# Ver diferencias staged
git diff --cached

# Deshacer cambios no commiteados
git checkout -- archivo.js

# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Ver quién modificó cada línea
git blame archivo.js

Limpiar Branches Viejas

# Ver todas las branches (locales y remotas)
git branch -a

# Borrar branch local
git branch -d feature/vieja-rama

# Forzar borrado (si no está mergeada)
git branch -D feature/rama-abandonada

# Borrar branch remota
git push origin --delete feature/rama-remota

# Limpiar referencias a branches remotas borradas
git fetch --prune
git remote prune origin

Verificar Estado del CI/CD

# Desde terminal (requiere GitHub CLI)
gh run list --branch feature/tu-rama

# Ver logs del último run
gh run view

# Ver estado del último workflow
gh run view --log

Sin GitHub CLI:

Ve a Actions en GitHub web

✅ Best Practices Diarias

DO (Hacer) ✅

✅ Actualiza main antes de crear feature branches
✅ Usa nombres descriptivos para branches
✅ Commit frecuentemente (pequeños commits)
✅ Escribe mensajes de commit claros
✅ Push al menos 1 vez al día
✅ Revisa logs de CI/CD si falla
✅ Resuelve comentarios de code review rápido
✅ Mantén PRs pequeños y enfocados
✅ Mergea PRs cuando estén listos (no los acumules)
✅ Borra branches locales después de merge

DON'T (No hacer) ❌

❌ No hagas push directo a main
❌ No ignores fallos del CI/CD
❌ No hagas commits de código roto
❌ No acumules 50 commits en un PR
❌ No mezcles múltiples features en un PR
❌ No dejes PRs abiertos por semanas
❌ No hagas force push a branches compartidas
❌ No bypassees branch protection sin razón válida
❌ No ignores comentarios de code review
❌ No comitees console.log() o código de debug

📊 Checklist Diario

Al Empezar el Día

☐ git checkout main
☐ git pull origin main
☐ Revisar PRs pendientes en GitHub
☐ Revisar PRs de Dependabot
☐ Responder comentarios de code review

Durante Desarrollo

☐ Commits frecuentes con mensajes claros
☐ Push al menos 1 vez al día
☐ Verificar que CI/CD pase después de cada push
☐ Mantener feature branch actualizada con main

Antes de Terminar el Día

☐ Commit y push todo el trabajo
☐ Verificar que CI/CD esté pasando
☐ Actualizar PRs si hay comentarios
☐ Revisar estado de PRs propios y de otros

🎯 Resumen del Flujo Ideal

┌────────────────────────────────────────┐
│  1. git checkout main                  │
│  2. git pull                           │
│  3. git checkout -b feature/xxx        │
│  4. [desarrollo + commits]             │
│  5. git push -u origin feature/xxx     │
│  6. Verificar CI/CD ✅                 │
│  7. Crear PR en GitHub                 │
│  8. [code review + ajustes]            │
│  9. Aprobar PR                         │
│ 10. Merge (squash)                     │
│ 11. git checkout main                  │
│ 12. git pull                           │
│ 13. Siguiente feature 🔄               │
└────────────────────────────────────────┘

Tiempo promedio por feature: 1-3 días (dependiendo de tamaño)

<div align="center">
⬅️ Testing | ⬆️ Volver al Índice | Siguiente: Troubleshooting ➡️

Workflow profesional implementado 🚀

</div> ```


````
