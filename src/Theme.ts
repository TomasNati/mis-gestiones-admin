import type { PaletteMode } from "@mui/material/styles";
import { type ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    mode: PaletteMode;
    primary: {
      main: string;
      dark: string;
    };
    secondary: {
      main: string;
    };
    background: {
      default: string;
      paper: string;
    };
    error: {
      main: string;
    };
    success: {
      main: string;
    };
  }

  interface ThemeOptions {
    mode?: PaletteMode;
    primary?: {
      main?: string;
      dark?: string;
    };
    secondary?: {
      main?: string;
    };
    background?: {
      default?: string;
      paper?: string;
    };
    error?: {
      main?: string;
    };
    success?: {
      main?: string;
    };
  }
}

/**
 * See theme builder here: https://zenoo.github.io/mui-theme-creator
 */
export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#4fc3f7",
      light: "#78909c",
    },
    secondary: {
      main: "#4db6ac",
    },
    background: {
      default: "#455a64",
      paper: "#546e7a",
    },
    error: {
      main: "rgba(140,5,1,0.88)",
    },
    success: {
      main: "rgba(90,203,96,0.63)",
    },
  },
};
