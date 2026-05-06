import type { SxProps } from "@mui/material";
import { type Density } from "utils/types";
import { themeOptions } from "utils/Theme";

interface RowStylesProps {
  active: boolean;
  density: Density;
}

interface CellStylesProps {
  tipoGrilla: "categoria" | "subcategoria";
}

interface Styles {
  row: (options: RowStylesProps) => SxProps;
  cell: (options: CellStylesProps) => SxProps;
}

export const styles: Styles = {
  row: ({ active = false, density = "comfortable" }) => ({
    backgroundColor:
      active === false
        ? themeOptions.table.row.disabled
        : themeOptions.background?.default,
    "& .MuiIconButton-root": {
      padding: density === "compact" ? "3px" : "8px",
    },
  }),
  cell: ({ tipoGrilla }) => ({
    borderBottom: `1px solid ${tipoGrilla === "categoria" ? "#92cde8" : "#6b9994"}`,
  }),
};
