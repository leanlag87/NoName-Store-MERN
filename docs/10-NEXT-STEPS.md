# 🧭 Próximos Pasos

![Next Steps](https://img.shields.io/badge/Next%20Steps-Roadmap%20CI%2FCD-purple?style=for-the-badge)

> Roadmap breve para evolucionar el pipeline actual hacia un flujo más robusto, seguro y listo para producción.

---

## 📋 Tabla de Contenidos

- [Prioridad Alta (Esta Semana)](#prioridad-alta-esta-semana)
- [Prioridad Media (Próximas 2-4 Semanas)](#prioridad-media-próximas-2-4-semanas)
- [Prioridad Estratégica (1-3 Meses)](#prioridad-estratégica-1-3-meses)
- [Checklist de Cierre](#checklist-de-cierre)

---

## 🔥 Prioridad Alta (Esta Semana)

### 1) Ajustar branch protection a tu contexto real

- Si trabajas solo: desactivar `Require approvals` para evitar bloqueos.
- Si quieres máxima seguridad: mantenerlo y sumar al menos 1 reviewer con permisos.

### 2) Estabilizar checks requeridos

- Verificar que en branch protection estén exactamente estos checks:
  - `test-client`
  - `test-server`
  - `security-audit`
  - `code-quality`
  - `summary`

### 3) Estandarizar tipo de merge

- Definir y documentar **Squash and merge** como opción por defecto.
- Mantener título del PR con formato claro (`feat:`, `fix:`, `docs:`).

---

## ⚙️ Prioridad Media (Próximas 2-4 Semanas)

### 4) Mejorar calidad automática

- Agregar lint formal al pipeline (cliente y servidor).
- Subir cobertura mínima de tests (meta sugerida: 70%+).

### 5) Fortalecer seguridad

- Pasar `security-audit` de modo informativo a modo bloqueante por severidad.
- Revisar y cerrar PRs de Dependabot semanalmente.

### 6) Reducir tiempos de CI

- Optimizar cache de dependencias.
- Evitar pasos redundantes en jobs.
- Meta sugerida: pipeline completo en menos de 5 minutos.

---

## 🚀 Prioridad Estratégica (1-3 Meses)

### 7) Preparar CD real (deploy automático)

- Habilitar job de deploy para entorno de staging al mergear en `main`.
- Agregar aprobación manual para producción.

### 8) Observabilidad post-deploy

- Incorporar monitoreo de uptime y alertas básicas.
- Registrar errores de backend y frontend (logs centralizados).

### 9) Gobierno de ingeniería

- Crear plantilla de PR obligatoria.
- Crear CODEOWNERS si el equipo crece.
- Definir SLA de revisión de PRs.

---

## ✅ Checklist de Cierre

Marca esto como "completo" cuando:

- `main` no recibe pushes directos.
- Todos los merges pasan por PR.
- Los checks requeridos siempre se ejecutan.
- El equipo usa el mismo tipo de merge.
- Existe al menos un plan de deploy a staging.

---

## 📌 Siguiente Meta Recomendada

Objetivo inmediato: **activar deploy a staging con aprobación manual a producción**.
Es el paso que más valor agrega después de tener CI estable.
