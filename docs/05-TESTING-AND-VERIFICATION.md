# ✅ Testing y Verificación del Pipeline

![Testing](https://img.shields.io/badge/Testing-Verification%20Guide-brightgreen?style=for-the-badge)

> Guía para verificar que todo el pipeline de CI/CD funcione correctamente.

---

## 📋 Tabla de Contenidos

- [Checklist de Verificación](#checklist-de-verificación)
- [Testing del Pipeline CI/CD](#testing-del-pipeline-cicd)
- [Testing de Dependabot](#testing-de-dependabot)
- [Testing de Auto-merge](#testing-de-auto-merge)
- [Testing de Branch Protection](#testing-de-branch-protection)
- [Verificación End-to-End](#verificación-end-to-end)
- [Monitoreo Continuo](#monitoreo-continuo)

---

## ✅ Checklist de Verificación

### Verificación Inicial (5 minutos)

Archivos Creados:
├─ ✅ .github/workflows/ci-cd-pipeline.yml
├─ ✅ .github/workflows/dependabot-auto-merge.yml
└─ ✅ .github/dependabot.yml

GitHub Actions:
├─ ✅ Workflow "CI/CD Pipeline" visible en Actions
├─ ✅ Workflow "Dependabot Auto-Merge" visible en Actions
└─ ✅ Al menos 1 ejecución exitosa del pipeline

Dependabot:
├─ ✅ Dependabot alerts habilitado
├─ ✅ Dependabot security updates habilitado
└─ ✅ Configuración detectada en Settings

Branch Protection:
├─ ✅ Rama main protegida
├─ ✅ 7 status checks requeridos
├─ ✅ Aprobación requerida
└─ ✅ Force push/delete deshabilitados

---

## 🧪 Testing del Pipeline CI/CD

### Test 1: Push a Feature Branch

**Objetivo:** Verificar que el pipeline se ejecute en cada push.

````bash
# 1. Crear rama de prueba
git checkout -b test/pipeline-verification

# 2. Hacer un cambio simple
echo "# Test Pipeline" >> TEST.md
git add TEST.md
git commit -m "test: verify pipeline execution"

# 3. Push
git push origin test/pipeline-verification

✅ Verificar en GitHub:

1. Ve a Actions
2. Deberías ver "CI/CD Pipeline" ejecutándose
3. Click en el workflow para ver detalles

Resultado esperado:

 🟢 CI/CD Pipeline
   ├─ ✅ test-client (18.x) - 2m 15s
   ├─ ✅ test-client (20.x) - 2m 18s
   ├─ ✅ test-server (18.x) - 1m 45s
   ├─ ✅ test-server (20.x) - 1m 42s
   ├─ ✅ security-audit - 1m 05s
   ├─ ✅ code-quality - 45s
   └─ ✅ summary - 12s

Total: ~5-7 minutos
Estado: Success ✅

❌ Si falla:

Click en el job que falló
Revisa los logs
Corrige el error
Push nuevamente

Test 2: Crear Pull Request

Objetivo: Verificar que el pipeline se ejecute en PRs.

# En la misma rama test/pipeline-verification
En GitHub:

1. Abre un PR: test/pipeline-verification → main
2. Título: "Test: Pipeline Verification"
3. Click "Create pull request"

✅ Verificar:

En la página del PR, verás:

🟡 Some checks haven't completed yet
   • CI/CD Pipeline - In progress

Después de 5-7 minutos:

✅ All checks have passed
   • test-client (18.x) - Required
   • test-client (20.x) - Required
   • test-server (18.x) - Required
   • test-server (20.x) - Required
   • security-audit - Required
   • code-quality - Required
   • summary - Required

Botón de merge:

❌ Merge blocked
⚠️ Required: 1 approving review

Test 3: Verificar Bloqueo por Tests Fallidos

Objetivo: Confirmar que un test fallido bloquea el merge.

# 1. Crear cambio que rompa algo
echo "const syntax error = " >> client/src/App.js
git add client/src/App.js
git commit -m "test: intentional syntax error"
git push origin test/pipeline-verification

✅ Verificar:
❌ Some checks were not successful
   • test-client (18.x) - Failed ❌
   • test-client (20.x) - Failed ❌

❌ Merge blocked
⚠️ Required status checks must pass

Revertir:
git revert HEAD
git push origin test/pipeline-verification

Test 4: Verificar Multi-Version Testing
Objetivo: Confirmar que se ejecuta en Node 18.x y 20.x.

1. Ve a Actions
2. Click en una ejecución del workflow
3. Verás jobs duplicados:

Jobs:
├─ test-client (18.x)  ← Matrix 1
├─ test-client (20.x)  ← Matrix 2
├─ test-server (18.x)  ← Matrix 1
└─ test-server (20.x)  ← Matrix 2

✅ Confirmación: Todos los 4 jobs ejecutados = Testing multi-version OK

🔄 Testing de Dependabot

Test 5: Forzar Revisión de Dependabot
Objetivo: Verificar que Dependabot escanea dependencias.

Ve a Insights → Dependency graph
Click en Dependabot
Verás dos configuraciones:

npm - /client
npm - /server

4. Click en "Check for updates" en cada una

✅ Resultado esperado (si hay actualizaciones):

Dependabot crea PRs automáticamente:
├─ chore(deps-client): bump [dependencia]
└─ chore(deps-server): bump [dependencia]

Si no hay actualizaciones:

✅ "No updates found" = Dependabot funcionando, deps actualizadas

Test 6: Verificar Labels en PRs de Dependabot

Cuando Dependabot cree un PR, verifica:

Labels aplicadas:
├─ ✅ dependencies
├─ ✅ client (o server)
└─ ✅ automated

Formato del commit:

✅ chore(deps-client): bump react from 18.3.1 to 18.3.2
✅ chore(deps-server): bump express from 4.21.0 to 4.22.0

Test 7: Verificar Agrupación de Updates

Objetivo: Confirmar que updates MINOR/PATCH se agrupan.

Si Dependabot encuentra múltiples updates:

Esperado:
├─ PR #1: "chore(deps-client): bump production-dependencies"
│          Contiene: react, axios, etc. (agrupados)
│
└─ PR #2: "chore(deps-server): bump mongoose to 9.0.0"
           MAJOR update = PR individual

  ❌ Si cada update crea un PR separado:

Revisa el archivo dependabot.yml
Verifica la sección groups:

🤝 Testing de Auto-merge

Test 8: Auto-merge de Update PATCH/MINOR

Objetivo: Verificar que updates menores se mergean automáticamente.

Cuando Dependabot cree un PR PATCH/MINOR:

1. Observa el PR recién creado
2. En 1-2 minutos deberías ver:

🤖 dependabot-auto-merge comentó:
   "✅ Auto-aprobado por Dependabot Auto-Merge"

Estado del PR:
├─ ✅ Aprobado automáticamente
├─ 🔀 Auto-merge habilitado
└─ ⏳ Esperando checks de CI/CD

3. Cuando el CI/CD termine:

✅ All checks passed
✅ Approved
✅ Ready to merge

🔀 Auto-merging...
✅ Merged

Tiempo total: ~10-15 minutos (automático)

Test 9: Revisión Manual de Update MAJOR

Objetivo: Confirmar que updates MAJOR requieren revisión manual.

Cuando Dependabot cree un PR MAJOR:

🤖 dependabot-auto-merge comentó:
   "⚠️ Actualización MAJOR detectada

   Esta actualización requiere revisión manual porque:
   - Es una actualización MAJOR
   - Puede contener breaking changes
   - Requiere verificación de compatibilidad"

Estado del PR:
├─ ⚠️ No aprobado automáticamente
├─ ❌ Auto-merge NO habilitado
└�� 👤 Esperando revisión manual

✅ Confirmación: Workflow correcto para MAJOR updates

🛡️ Testing de Branch Protection

Test 10: Intentar Push Directo a Main

Objetivo: Confirmar que main está protegida.

git checkout main
git pull origin main

# Intentar push directo
echo "test" >> README.md
git add README.md
git commit -m "test: direct push"
git push origin main

✅ Resultado esperado:

remote: error: GH006: Protected branch update failed
remote: error: Changes must be made through a pull request
To https://github.com/leanlag87/NoName-Store-MERN.git
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs

❌ Si el push funciona: Branch protection NO configurada correctamente

Test 11: Intentar Mergear sin Aprobación

Objetivo: Verificar que se requiere aprobación.

En un PR de prueba:

No lo apruebes
Intenta hacer click en "Merge pull request"

✅ Resultado esperado:

❌ Botón "Merge" deshabilitado (gris)
⚠️ Required: 1 approving review

Test 12: Intentar Force Push

git checkout main
git push --force origin main

✅ Resultado esperado:

remote: error: GH007: Protected branch update failed
remote: error: Cannot force-push to this branch

🔄 Verificación End-to-End

Test 13: Workflow Completo (Happy Path)

Objetivo: Simular el workflow completo de desarrollo.

# 1. Crear feature branch
git checkout main
git pull
git checkout -b feature/complete-workflow-test

# 2. Hacer cambio
echo "# Feature Complete" >> FEATURE.md
git add FEATURE.md
git commit -m "feat: add complete workflow test"

# 3. Push
git push origin feature/complete-workflow-test

En GitHub:

PASO 1: Push
├─ ✅ CI/CD se ejecuta automáticamente
└─ ⏳ Esperar 5-7 minutos

PASO 2: Crear PR
├─ Abrir PR a main
├─ ✅ CI/CD se ejecuta nuevamente
└─ ✅ Status checks pasan

PASO 3: Code Review
├─ Aprobar el PR
└─ ✅ Aprobación registrada

PASO 4: Merge
├─ Click "Merge pull request"
├─ ✅ Merge exitoso
└─ ✅ Branch borrada automáticamente

PASO 5: Verificar Main
├─ git checkout main
├─ git pull
└─ ✅ Cambios en main

Tiempo total: ~15 minutos

✅ Todo el flujo funciona correctamente

📊 Monitoreo Continuo
Dashboard de GitHub Actions
Revisar semanalmente:

1. Ve a Actions
2. Revisa el historial de ejecuciones

Métricas a monitorear:

Success Rate:
├─ Objetivo: > 95%
└─ Actual: Verifica en Actions

Average Duration:
├─ Objetivo: < 10 minutos
└─ Actual: Verifica tiempo promedio

Failed Workflows:
├─ Investiga causas de fallos
└─ Ajusta según sea necesario

Status Checks en PRs

En cada PR, verifica:

✅ Todos los checks ejecutándose
✅ Tiempo de ejecución razonable
✅ Logs claros y útiles
✅ Errores fáciles de debuggear

Dependabot Activity

Revisar mensualmente:

1. Insights → Dependency graph → Dependabot

2. Verifica:

PRs creados: X/mes
PRs auto-merged: X/mes
PRs pendientes: X
Security updates: X

Objetivos:

✅ > 80% auto-merged
✅ < 5 PRs pendientes
✅ 0 security alerts abiertas

🔧 Troubleshooting de Tests

❌ Pipeline no se ejecuta

Verificar:

1. ¿Archivo en .github/workflows/?
2. ¿Extensión .yml?
3. ¿Rama incluida en triggers?
4. ¿Syntax YAML correcto?

Herramienta de debug:

# Validar YAML
yamllint .github/workflows/ci-cd-pipeline.yml

❌ Status checks no aparecen en PR

Causa común:

Workflow nunca se ejecutó exitosamente

Solución:

1. Ejecuta workflow manualmente
2. Espera a que termine
3. Refresca página de branch protection
4. Checks deberían aparecer ahora

❌ Auto-merge no funciona

Verificar:

1. ¿Es update PATCH/MINOR?
2. ¿CI/CD pasó exitosamente?
3. ¿Hay conflictos de merge?
4. ¿Branch protection configurada?

✅ Checklist Final de Verificación

Pipeline CI/CD:
├─ ✅ Se ejecuta en push
├─ ✅ Se ejecuta en PR
├─ ✅ Tests pasan consistentemente
├─ ✅ Multi-version testing funciona
└─ ✅ Build exitoso

Dependabot:
├─ ✅ Escanea semanalmente
├─ ✅ Crea PRs automáticamente
├─ ✅ Agrupa updates correctamente
└─ ✅ Security updates priorizados

Auto-merge:
├─ ✅ Aprueba PATCH/MINOR automáticamente
├─ ✅ Requiere revisión manual para MAJOR
├─ ✅ Mergea cuando CI/CD pasa
└─ ✅ Comenta en PRs correctamente

Branch Protection:
├─ ✅ Bloquea push directo
├─ ✅ Requiere aprobación
├─ ✅ Requiere status checks
├─ ✅ Bloquea force push
└─ ✅ Bloquea deletions

Workflow E2E:
├─ ✅ Feature branch → PR → Review → Merge
├─ ✅ Tiempo total razonable
└─ ✅ Auto-delete branches funciona

🎯 Próximos Pasos
Todo verificado exitosamente? 🎉

Continúa con:

06-DAILY-USAGE.md - Aprende el workflow diario
07-TROUBLESHOOTING.md - Problemas comunes
10-NEXT-STEPS.md - Configurar deploy
<div align="center">
⬅️ Branch Protection | ⬆️ Volver al Índice | Siguiente: Uso Diario ➡️

Pipeline verificado y listo para producción ✅

</div> ```
````
