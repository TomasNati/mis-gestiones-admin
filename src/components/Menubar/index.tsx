import React, { createContext, useContext, useState, ReactNode, MouseEvent } from "react";
import { Button, Menu, MenuItem as MUIMenuItem, Divider, Box } from "@mui/material";

type AnchorState = {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
};

const MenuRootContext = createContext<AnchorState | null>(null);

// MenuRoot: provides anchor state for a single root menu
export const MenuRoot = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <MenuRootContext.Provider value={{ anchorEl, setAnchorEl }}>
      {children}
    </MenuRootContext.Provider>
  );
};

// MenuTrigger: button that opens the menu
export const MenuTrigger = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(MenuRootContext);
  if (!ctx) return null;
  const { setAnchorEl } = ctx;
  return (
    <Button
      onClick={(e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget as HTMLElement)}
      color="inherit"
    >
      {children}
    </Button>
  );
};

// MenuPortal and MenuPositioner are structural in this lightweight implementation
export const MenuPortal = ({ children }: { children: ReactNode }) => <>{children}</>;
export const MenuPositioner = ({ children }: { children: ReactNode }) => <Box>{children}</Box>;

// MenuPopup: renders the actual MUI Menu anchored to the trigger
export const MenuPopup = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(MenuRootContext);
  if (!ctx) return null;
  const { anchorEl, setAnchorEl } = ctx;
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ role: "menu" }}>
      {children}
    </Menu>
  );
};

export const MenuItem = ({ children, onSelect }: { children: ReactNode; onSelect?: () => void }) => {
  const ctx = useContext(MenuRootContext);
  const handleClick = () => {
    if (onSelect) onSelect();
    if (ctx) ctx.setAnchorEl(null);
  };
  return <MUIMenuItem onClick={handleClick}>{children}</MUIMenuItem>;
};

export const MenuSeparator = () => <Divider sx={{ my: 0.5 }} />;

// Submenu: manages its own anchor but is intended to be used inside a MenuPopup
const SubmenuContext = createContext<AnchorState | null>(null);

export const MenuSubmenuRoot = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return <SubmenuContext.Provider value={{ anchorEl, setAnchorEl }}>{children}</SubmenuContext.Provider>;
};

export const MenuSubmenuTrigger = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(SubmenuContext);
  if (!ctx) return null;
  const { setAnchorEl } = ctx;
  return (
    <MUIMenuItem onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}>{children}</MUIMenuItem>
  );
};

export const MenuSubmenuPopup = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(SubmenuContext);
  if (!ctx) return null;
  const { anchorEl, setAnchorEl } = ctx;
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
      {children}
    </Menu>
  );
};

// Top-level Menubar container — lays out MenuRoot children horizontally
export const Menubar = ({ children }: { children: ReactNode }) => {
  return <Box component="nav" sx={{ display: "flex", gap: 1 }}>{children}</Box>;
};

// Default export to ease imports
export default Menubar;
