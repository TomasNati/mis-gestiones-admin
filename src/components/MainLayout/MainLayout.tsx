import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Categorias } from "../gestiones/Categorias";
import { Enumerados } from "../inversiones/Enumerados";
import { Instrumentos } from "../inversiones/Instrumentos";
import { styles } from "./styles";

type View = "categorias" | "enumerados" | "instrumentos";

export const MainLayout: React.FC = () => {
  const [anchorGestiones, setAnchorGestiones] = useState<null | HTMLElement>(
    null,
  );
  const [anchorInversiones, setAnchorInversiones] =
    useState<null | HTMLElement>(null);
  const [view, setView] = useState<View>("categorias");

  // active group state helpers
  const isGestionesActive = view === "categorias";
  const isInversionesActive = ["enumerados", "instrumentos"].includes(view);

  const openGestiones = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorGestiones(e.currentTarget);
  const closeGestiones = () => setAnchorGestiones(null);
  const openInversiones = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorInversiones(e.currentTarget);
  const closeInversiones = () => setAnchorInversiones(null);

  const handleSelect = (v: View) => {
    setView(v);
    closeGestiones();
    closeInversiones();
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={openGestiones}
            aria-controls={anchorGestiones ? "gestiones-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorGestiones ? "true" : undefined}
            color="inherit"
            className={isGestionesActive ? "active" : "inactive"}
            sx={styles.menu}
          >
            <Typography variant="button">Gestiones</Typography>
          </Button>
          <Menu
            id="gestiones-menu"
            anchorEl={anchorGestiones}
            open={Boolean(anchorGestiones)}
            onClose={closeGestiones}
          >
            <MenuItem onClick={() => handleSelect("categorias")}>
              Categorias
            </MenuItem>
          </Menu>

          <Button
            onClick={openInversiones}
            aria-controls={anchorInversiones ? "inversiones-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorInversiones ? "true" : undefined}
            color="inherit"
            className={isInversionesActive ? "active" : "inactive"}
            sx={styles.menu}
          >
            <Typography variant="button">Inversiones</Typography>
          </Button>
          <Menu
            id="inversiones-menu"
            anchorEl={anchorInversiones}
            open={Boolean(anchorInversiones)}
            onClose={closeInversiones}
          >
            <MenuItem onClick={() => handleSelect("enumerados")}>
              Enumerados
            </MenuItem>
            <MenuItem onClick={() => handleSelect("instrumentos")}>
              Instrumentos
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {view === "categorias" && <Categorias />}
          {view === "enumerados" && <Enumerados />}
          {view === "instrumentos" && <Instrumentos />}
        </Box>
      </Box>
    </Box>
  );
};
