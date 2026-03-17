# 📘 Glosario

![Glosario](https://img.shields.io/badge/Glosario-CI%2FCD%20Terms-teal?style=for-the-badge)

> Definiciones breves de los términos más usados en esta documentación de CI/CD.

---

## 📋 Tabla de Contenidos

- [Términos de Git y GitHub](#términos-de-git-y-github)
- [Términos de CI/CD](#términos-de-cicd)
- [Términos de Calidad y Seguridad](#términos-de-calidad-y-seguridad)

---

## 🧩 Términos de Git y GitHub

### Branch
Rama de trabajo aislada donde desarrollas cambios sin afectar `main`.

### Main
Rama principal y estable del proyecto.

### Commit
Registro puntual de cambios en el historial del repositorio.

### Pull Request (PR)
Solicitud para integrar cambios de una rama hacia otra (normalmente a `main`).

### Review
Revisión de código de un PR antes del merge.

### Approving Review
Aprobación formal de un PR por un revisor autorizado.

### Merge
Integración final de una rama al destino.

### Squash and Merge
Tipo de merge que combina todos los commits del PR en uno solo.

### Rebase and Merge
Tipo de merge que reaplica commits sobre la rama destino sin crear merge commit.

### Merge Commit
Commit adicional que une historias de dos ramas.

### Branch Protection
Reglas que protegen ramas críticas (por ejemplo, exigir PR y checks).

---

## ⚙️ Términos de CI/CD

### CI (Continuous Integration)
Práctica de integrar cambios frecuentes con validaciones automáticas.

### CD (Continuous Delivery/Deployment)
Automatización para preparar o desplegar cambios de forma continua.

### Workflow
Flujo automatizado en GitHub Actions definido en un archivo YAML.

### Job
Conjunto de pasos dentro de un workflow que se ejecuta en un runner.

### Step
Acción individual dentro de un job (instalar, testear, build, etc.).

### Runner
Máquina que ejecuta los jobs del workflow.

### Status Check
Resultado de un job o workflow usado para permitir o bloquear merges.

### Required Check
Check obligatorio que debe pasar antes de mergear un PR.

### Matrix Strategy
Estrategia para ejecutar el mismo job en múltiples versiones (ej. Node 18 y 20).

### Artifact
Archivo generado en CI para guardar resultados de build o reportes.

---

## 🔒 Términos de Calidad y Seguridad

### Lint
Análisis estático de estilo y errores comunes de código.

### Test Suite
Conjunto de pruebas automáticas del proyecto.

### Build
Proceso de compilación/empacado para generar versión ejecutable o distribuible.

### Security Audit
Revisión automática de vulnerabilidades en dependencias.

### Dependabot
Servicio de GitHub que detecta dependencias desactualizadas y crea PRs.

### Major / Minor / Patch
Niveles de cambio de versión semántica:

- Major: cambios potencialmente incompatibles.
- Minor: nuevas funcionalidades compatibles.
- Patch: correcciones compatibles.

### Signed Commit
Commit firmado criptográficamente para verificar identidad del autor.

### Linear History
Historial sin merge commits, normalmente usando squash o rebase.

---

## 📌 Nota Práctica

Si dudas sobre un término al revisar un PR o un error de pipeline, vuelve a este glosario antes de aplicar cambios en configuración de ramas o workflows.
