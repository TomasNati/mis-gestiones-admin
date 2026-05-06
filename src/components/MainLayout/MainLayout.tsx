import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import Menubar, {
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
} from "../Menubar";
import { Categorias } from "../gestiones/Categorias";
import { Enumerados } from "../inversiones/Enumerados";
import { Instrumentos } from "../inversiones/Instrumentos";

type View = "categorias" | "enumerados" | "instrumentos";

export const MainLayout: React.FC = () => {
  const [view, setView] = useState<View>("categorias");

  const handleSelect = (v: View) => setView(v);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Menubar>
            <MenuRoot>
              <MenuTrigger>
                <Typography variant="button">Gestiones</Typography>
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner>
                  <MenuPopup>
                    <MenuItem onSelect={() => handleSelect("categorias")}>
                      Categorias
                    </MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </MenuRoot>

            <MenuRoot>
              <MenuTrigger>
                <Typography variant="button">Inversiones</Typography>
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner>
                  <MenuPopup>
                    <MenuItem onSelect={() => handleSelect("enumerados")}>
                      Enumerados
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem onSelect={() => handleSelect("instrumentos")}>
                      Instrumentos
                    </MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </MenuRoot>
          </Menubar>
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
