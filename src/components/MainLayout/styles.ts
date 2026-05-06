import type { SxProps } from "@mui/material";

interface Styles {
  menu: SxProps;
}

export const styles: Styles = {
  menu: {
    "&.active": {
      color: "primary.main",
      borderBottom: "2px solid",
      borderColor: "primary.main",
    },
    "&.inactive": {
      color: "inherit",
      borderBottom: "none",
      borderColor: "transparent",
    },
  },
};
