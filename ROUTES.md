# Routing Plan for mis-gestiones-admin

## Summary
Provide client-side routing for the three current views so deep links, browser history, and navigation work naturally.

Routes:
- /gestiones/categorias (default)
- /inversiones/enumerados
- /inversiones/instrumentos

## Files to change
1. src/main.tsx — wrap the app with BrowserRouter
2. src/App.tsx — declare Routes and Route tree, set default redirect to /gestiones/categorias
3. src/components/MainLayout/MainLayout.tsx — replace internal view state with router navigation (useNavigate/useLocation) and render <Outlet /> for routed children

## Code snippets

### main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./utils/Theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

### App.tsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { Categorias } from "./components/gestiones/Categorias";
import { Enumerados } from "./components/inversiones/Enumerados";
import { Instrumentos } from "./components/inversiones/Instrumentos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/gestiones/categorias" replace />} />
        <Route path="gestiones/categorias" element={<Categorias />} />
        <Route path="inversiones/enumerados" element={<Enumerados />} />
        <Route path="inversiones/instrumentos" element={<Instrumentos />} />
        <Route path="*" element={<Navigate to="/gestiones/categorias" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

### MainLayout.tsx (menu -> navigation changes)
- Remove view state that toggles which component is shown.
- Use react-router hooks for navigation and active state.

Example replacements inside the component:

import { Outlet, useNavigate, useLocation } from "react-router-dom";
const navigate = useNavigate();
const location = useLocation();
const isGestionesActive = location.pathname.startsWith("/gestiones");
const isInversionesActive = location.pathname.startsWith("/inversiones");

<MenuItem onClick={() => navigate("/gestiones/categorias")}>Categorias</MenuItem>
<MenuItem onClick={() => navigate("/inversiones/enumerados")}>Enumerados</MenuItem>
<MenuItem onClick={() => navigate("/inversiones/instrumentos")}>Instrumentos</MenuItem>

Replace the content area with:

<Box sx={{ flex: 1, overflow: "auto" }}>
  <Outlet />
</Box>

## Notes
- Requires react-router-dom v6: install if not present (npm/yarn/pnpm add react-router-dom@6).
- Using NavLink instead of manual classes enables automatic active styling.
- This keeps existing components unchanged and enables deep linking and browser navigation.

## Next steps
- Implement the edits above (update files), run the app, and test navigation/back/forward and direct deep links.
- Optionally add route-based code-splitting for performance.
