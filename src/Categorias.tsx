import type { Categoria } from "model/types";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

interface CategoriaProps {
  categorias: Categoria[];
}
export const Categorias = ({ categorias }: CategoriaProps) => {
  const columns = useMemo<MRT_ColumnDef<Categoria>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
      },
      {
        accessorFn: (categoria: Categoria) => categoria.subcategorias?.length,
        id: "cantidadSubcategorias",
        header: "Cantidad de Subcategorias",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: categorias,
  });

  return <MaterialReactTable table={table} />;
};
