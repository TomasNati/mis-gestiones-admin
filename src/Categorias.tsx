import type { Categoria, Subcategoria } from "model/types";
import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_Table,
  useMaterialReactTable,
  type MRT_ColumnDef,
  // MRT_ToggleDensePaddingButton,
  // MRT_ToggleFullScreenButton,
  // MRT_ToggleGlobalFilterButton,
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
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    initialState: {
      sorting: [{ id: "nombre", desc: false }],
      density: "compact",
    },
  });

  return <MRT_Table table={tableSubcategorias} />;
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
        size: 100,
      },
      {
        accessorFn: (categoria: Categoria) => categoria.subcategorias?.length,
        id: "cantidadSubcategorias",
        header: "Cantidad de Subcategorias",
        size: 240,
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
    initialState: {
      sorting: [{ id: "nombre", desc: false }],
      pagination: {
        pageSize: 15,
        pageIndex: 0,
      },
    },
  });

  return <MaterialReactTable table={table} />;
};
