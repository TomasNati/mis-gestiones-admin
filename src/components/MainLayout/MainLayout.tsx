import React from "react";
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
import { Outlet, useNavigate } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();

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
                    <MenuItem onSelect={() => navigate("/gestiones/categorias")}>
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
                    <MenuItem onSelect={() => navigate("/inversiones/enumerados")}>
                      Enumerados
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem onSelect={() => navigate("/inversiones/instrumentos")}>
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
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
