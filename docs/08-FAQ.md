# ❓ FAQ

![FAQ](https://img.shields.io/badge/FAQ-Preguntas%20Frecuentes-blue?style=for-the-badge)

> Respuestas rápidas a las dudas más comunes sobre CI/CD, Pull Requests, branch protection y Dependabot.

---

## 📋 Tabla de Contenidos

- [Pull Requests y Merge](#pull-requests-y-merge)
- [CI/CD y Checks](#cicd-y-checks)
- [Dependabot](#dependabot)
- [Buenas Prácticas](#buenas-prácticas)

---

## 🔀 Pull Requests y Merge

### ¿Qué tipo de merge debo usar?

Para este proyecto, recomendado: **Squash and merge**.

- Mantiene `main` limpio.
- Deja 1 commit final por feature/fix.
- Facilita auditoría y rollback.

### ¿Por qué no puedo hacer push directo a `main`?

Porque la rama está protegida. Debes:

1. Crear branch.
2. Abrir Pull Request.
3. Esperar checks requeridos.
4. Mergear cuando todo esté en verde.

### ¿Por qué GitHub pide una aprobación y no me deja mergear?

Porque en branch protection está activo `Require approvals: 1`.
Si trabajas solo, puedes desactivarlo para evitar bloqueos.

---

## ✅ CI/CD y Checks

### ¿Cuánto tarda el pipeline normalmente?

Entre **5 y 7 minutos**, dependiendo de carga de runners y cache.

### ¿Qué checks son obligatorios para mergear?

- `test-client`
- `test-server`
- `security-audit`
- `code-quality`
- `summary`

### ¿Qué hago si un check falla?

1. Abre `Actions`.
2. Entra al job fallido.
3. Lee el primer error real.
4. Reproduce localmente.
5. Corrige, commit, push.

### ¿Qué significa "Required status check is expected"?

Significa que el check requerido en branch protection no coincide con el nombre real del workflow actual.
Reasigna los checks desde `Settings > Branches`.

---

## 🤖 Dependabot

### ¿Dependabot hace merge automático de todo?

No. Solo de updates seguras según tu política (normalmente `minor` y `patch`).
Los `major` deben revisarse manualmente.

### ¿Cada cuánto busca updates?

Según tu `dependabot.yml` (por ejemplo, semanal). Si no hay updates, no crea PR.

### ¿Qué hago si un PR de Dependabot rompe tests?

- No mergear.
- Revisar changelog de la dependencia.
- Ajustar código si aplica.
- O cerrar el PR si no conviene actualizar aún.

---

## 🧭 Buenas Prácticas

### ¿Trabajo directo en `main` o siempre en ramas?

Siempre en ramas (`feature/`, `fix/`, `chore/`, `docs/`).

### ¿Conviene hacer commits muy grandes?

No. Mejor commits pequeños y descriptivos.
Facilita review, debugging y rollback.

### ¿Qué convención de commits usar?

Usa **Conventional Commits**:

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` documentación
- `test:` pruebas
- `chore:` mantenimiento

---

## 📌 Resumen Rápido

- Si bloquea merge: revisa approvals, signed commits y checks.
- Si falla pipeline: corrige local, luego push.
- Si hay duda de historial: usa `Squash and merge`.
- Si Dependabot propone major update: revisión manual.
