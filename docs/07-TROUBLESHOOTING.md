# 🛠️ Troubleshooting

![Troubleshooting](https://img.shields.io/badge/Troubleshooting-Common%20Issues-orange?style=for-the-badge)

> Guía breve para diagnosticar y resolver los problemas más comunes del pipeline CI/CD, Pull Requests y protección de ramas.

---

## 📋 Tabla de Contenidos

- [Diagnóstico Rápido](#diagnóstico-rápido)
- [Errores Comunes y Soluciones](#errores-comunes-y-soluciones)
- [Comandos Útiles de Diagnóstico](#comandos-útiles-de-diagnóstico)
- [Checklist Antes de Pedir Ayuda](#checklist-antes-de-pedir-ayuda)

---

## ⚡ Diagnóstico Rápido

Si algo falla, revisa en este orden:

1. En GitHub, ve a `Actions` y abre el workflow fallido.
2. Identifica el job con error: `test-client`, `test-server`, `security-audit`, `code-quality` o `summary`.
3. Lee el primer error real en logs (no el último).
4. Reproduce localmente el mismo comando.
5. Corrige, haz commit y push.

---

## 🚨 Errores Comunes y Soluciones

### 1) Merge bloqueado por aprobación

**Síntoma:**

- `At least 1 approving review is required by reviewers with write access`

**Causa:**

- La regla de branch protection exige 1 aprobación y no hay otro reviewer con permisos de escritura.

**Solución:**

- Proyecto personal: desactivar `Require approvals` para `main`.
- Equipo: mantenerlo activo y pedir review a otro colaborador.

### 2) Merge bloqueado por commits firmados

**Síntoma:**

- `Commits must have verified signatures`

**Causa:**

- Está activo `Require signed commits` y tus commits no están firmados.

**Solución:**

- O configuras firma GPG/SSH en GitHub.
- O desactivas temporalmente `Require signed commits`.

### 3) Required checks en estado pendiente

**Síntoma:**

- `Required status check is expected` o checks que no terminan.

**Causa probable:**

- El nombre requerido en branch protection no coincide con el check real del workflow.

**Solución:**

- En `Settings > Branches > Branch protection rule`, vuelve a seleccionar los checks desde la lista actual.

### 4) Falla `npm ci` en CI

**Síntoma:**

- Error de instalación en `client` o `server`.

**Causa probable:**

- `package-lock.json` desactualizado o inconsistente.

**Solución:**

```bash
# client
cd client
npm install

# server
cd ../server
npm install
```

Luego commit de los lockfiles actualizados y push.

### 5) Test local pasa, pero CI falla

**Síntoma:**

- En tu máquina funciona, en GitHub Actions no.

**Causa probable:**

- Diferencia de versión Node, variable de entorno faltante o archivos no comiteados.

**Solución:**

- Probar con Node 18 y 20 localmente.
- Verificar variables de entorno requeridas por tests.
- Confirmar con `git status` que todo lo necesario está comiteado.

### 6) PR dice "Branch is out-of-date"

**Síntoma:**

- No permite mergear hasta actualizar rama.

**Causa:**

- Está activa la opción `Require branches to be up to date before merging`.

**Solución:**

```bash
git checkout tu-rama
git fetch origin
git rebase origin/main
# Resolver conflictos si aparecen
git push --force-with-lease
```

---

## 🔎 Comandos Útiles de Diagnóstico

```bash
# Ver estado local
git status

# Ver últimos commits
git log --oneline -n 10

# Ver diferencias contra main
git fetch origin
git diff origin/main...HEAD

# Probar cliente
cd client
npm ci
npm test -- --watchAll=false --passWithNoTests
npm run build

# Probar servidor
cd ../server
npm ci
node -c index.js
```

---

## ✅ Checklist Antes de Pedir Ayuda

- Reproduje el error localmente.
- Revisé logs completos en GitHub Actions.
- Confirmé que uso la rama correcta.
- Verifiqué lockfiles (`package-lock.json`) actualizados.
- Confirmé que la branch protection coincide con los checks actuales.

Si después de esto sigue fallando, comparte:

- Nombre del job fallido.
- Primer bloque de error en logs.
- Último commit (`git log -1 --oneline`).
