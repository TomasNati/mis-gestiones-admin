# Mis Gestiones Admin — Tech Stack & Funcionalidades

## Tech Stack

| Categoría | Tecnología | Versión |
|---|---|---|
| **Lenguaje** | TypeScript | ~5.9.3 |
| **Frontend** | React | ^19.1.1 |
| **Build** | Vite (Rolldown) | 7.1.14 |
| **UI** | Material UI (MUI) | ^7.3.4 |
| **Íconos** | @mui/icons-material | ^7.3.4 |
| **Tablas** | material-react-table | ^3.2.1 |
| **Routing** | react-router-dom | ^7.15.0 |
| **HTTP Client** | axios | 1.12.2 |
| **Server State** | @tanstack/react-query | ^5.90.5 |
| **Formularios** | react-hook-form | ^7.66.0 |
| **Validación** | zod + @hookform/resolvers | ^4.1.12 / ^5.2.2 |
| **Linting** | ESLint (flat config) | ^9.36.0 |
| **Formateo** | Prettier | 3.6.2 |
| **Package Manager** | npm / bun | — |
| **Backend** | Hosteado en Vercel (`mis-gestiones-backend.vercel.app/api`) | — |

> No hay código backend en este repositorio. Es solo un frontend SPA que consume una API externa.

## Funcionalidades Principales

### 1. Gestión de Categorías (`/gestiones/categorias`)
- CRUD completo de categorías y subcategorías.
- Tabla con sort, filtro, paginación y panel expandible con subcategorías anidadas.
- Soft-delete (toggle `active`).
- Filtro "Solo Activos".
- Diálogos de creación/edición con validación Zod.

### 2. Gestión de Instrumentos de Inversión (`/inversiones/instrumentos`)
- CRUD completo de instrumentos financieros (acciones, bonos, ETFs, cripto, FCI, etc.).
- Tabla avanzada con columnas de nombre, código, tipo, clase de renta, moneda y precio.
- **Cotizaciones en vivo**: fetch automático de precios para instrumentos internacionales y FCI locales desde la API.
- Filtro "Solo Activos".
- Diálogo de creación/edición con campos dinámicos según metadatos de la API.

### 3. Enumerados (`/inversiones/enumerados`)
- Placeholder — pendiente de implementación.

## Arquitectura

```
src/
├── main.tsx                 → Bootstrap (QueryClient, Theme, Router)
├── App.tsx                  → Definición de rutas
├── api/api.ts               → Cliente Axios (todos los endpoints)
├── model/
│   ├── types.ts             → Interfaces TypeScript
│   ├── models.ts            → Schemas Zod + tipos inferidos
│   └── utils.ts             → Helper de errores de formulario
├── hooks/
│   ├── useCategoriasHooks.ts   → React Query para categorías
│   └── useInstrumentosHooks.ts → React Query para instrumentos
├── components/
│   ├── MainLayout/          → Layout con AppBar y Menubar
│   ├── Menubar/             → Menú dropdown personalizado
│   ├── gestiones/           → Páginas de categorías/subcategorías
│   ├── inversiones/         → Páginas de instrumentos/enumerados
│   └── FiltroActivas.tsx    → Toggle reusable "Solo Activos"
├── dialogs/                 → Diálogos de creación/edición/borrado
└── utils/                   → Tema MUI, constantes, tipos auxiliares
```

- **SPA** con React Router v7 y layout compartido.
- **Server State** vía React Query con mutaciones optimistas.
- **Validación** con Zod + react-hook-form.
- **Tema oscuro** fijo con MUI.
- **Alias de paths** configurados en Vite y TypeScript.
