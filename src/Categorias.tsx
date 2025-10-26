import type { Categoria, Subcategoria } from "model/types";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

interface SubcategoriaProps {
  subcategorias: Subcategoria[];
}

const Subcategorias = ({ subcategorias }: SubcategoriaProps) => {
  const columnsSubcategorias = useMemo<MRT_ColumnDef<Subcategoria>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
      },
    ],
    [],
  );

  const tableSubcategorias = useMaterialReactTable({
    columns: columnsSubcategorias,
    data: subcategorias || [],
  });

  return <MaterialReactTable table={tableSubcategorias} />;
};

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
    renderDetailPanel: ({ row }) => (
      <Subcategorias subcategorias={row.original.subcategorias || []} />
    ),
  });

  return <MaterialReactTable table={table} />;
};
