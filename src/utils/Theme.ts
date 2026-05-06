import type { PaletteMode } from "@mui/material/styles";
import { createTheme, type ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
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
    table: {
      row: {
        disabled: string;
      };
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
      main: "hsl(0deg 65.08% 50.59%)",
    },
    success: {
      main: "rgba(90,203,96,0.63)",
    },
  },
  table: {
    row: {
      disabled: "#3c566c",
    },
  },
};

export const customTheme = createTheme({
  ...themeOptions,
  components: {
    ...(themeOptions.components || {}),
    MuiIconButton: {
      styleOverrides: {
        ...(themeOptions.components?.MuiIconButton?.styleOverrides || {}),
        root: {
          "&:focus": {
            outline: "1px solid #4fc3f7",
          },
          "&:focus-visible": {
            outline: "1px solid #4fc3f7",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        ...(themeOptions.components?.MuiButton?.styleOverrides || {}),
        outlinedPrimary: {
          "&:hover": {
            borderColor: "#4fc3f7",
          },
        },
        outlinedSecondary: {
          "&:hover": {
            borderColor: "#4db6ac",
          },
        },
        containedError: {
          color: "#fff",
        },
      },
    },
  },
});
