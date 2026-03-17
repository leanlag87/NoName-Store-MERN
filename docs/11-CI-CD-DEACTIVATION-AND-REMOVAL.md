# ⏸️ Desactivar o Eliminar CI/CD

![CI/CD Off](https://img.shields.io/badge/CI%2FCD-Deactivation%20Guide-red?style=for-the-badge)

> Guía breve para detener automatizaciones del proyecto de forma temporal (reversible) o eliminarlas por completo (irreversible).

---

## ⚠️ Qué pasa al desactivar/eliminar

- Ya no se ejecutan tests automáticos en push/PR.
- Dependabot deja de crear PRs automáticos.
- Branch protection puede bloquear merges si mantiene checks requeridos que ya no existen.

---

## 1) Deshabilitar temporalmente (reversible)

Objetivo: detener automatizaciones sin perder configuración.

### En el proyecto (repositorio)

1. Renombra los workflows para que GitHub no los detecte:
   - `.github/workflows/ci-cd-pipeline.yml` → `ci-cd-pipeline.yml.disabled`
   - `.github/workflows/dependabot-auto-merge.yml` → `dependabot-auto-merge.yml.disabled`
2. Mantén `.github/dependabot.yml` sin borrar (solo para reactivar rápido después).

### En GitHub (interfaz)

1. Ve a `Settings > Branches > Branch protection rules`.
2. Edita la regla de `main`.
3. Desactiva temporalmente:
   - `Require status checks to pass before merging`.
   - `Require branches to be up to date before merging` (si depende de checks).
4. Guarda cambios.

### Cómo reactivar

1. Devuelve los nombres originales `.yml` en `.github/workflows/`.
2. Reactiva los status checks requeridos en branch protection.
3. Haz un push de prueba y confirma en `Actions` que el pipeline se ejecuta.

---

## 2) Eliminar por completo (irreversible)

Objetivo: quitar CI/CD y automatizaciones del repositorio.

### Backup mínimo recomendado (antes de borrar)

- Guarda copia local de:
  - `.github/workflows/ci-cd-pipeline.yml`
  - `.github/workflows/dependabot-auto-merge.yml`
  - `.github/dependabot.yml`
- Exporta/captura configuración actual de branch protection.

### En el proyecto (repositorio)

1. Borra:
   - `.github/workflows/ci-cd-pipeline.yml`
   - `.github/workflows/dependabot-auto-merge.yml`
   - `.github/dependabot.yml`
2. Haz commit y push de la eliminación.

### En GitHub (interfaz)

1. Ve a `Settings > Branches`.
2. Edita o elimina la regla de protección de `main` que exige checks CI.
3. En `Settings > Code security and analysis`, desactiva Dependabot updates/alerts si no quieres automatización de dependencias.
4. En `Actions`, verifica que no queden workflows activos.

---

## ✅ Checklist final

- No se ejecuta ningún workflow nuevo en `Actions`.
- No aparecen PRs automáticos de Dependabot.
- `main` ya no exige checks inexistentes para mergear.
- El equipo conoce si el modo actual es reversible o irreversible.
