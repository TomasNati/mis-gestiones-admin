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
