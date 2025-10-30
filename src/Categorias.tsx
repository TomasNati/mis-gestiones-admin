import type { Categoria, Subcategoria } from "model/types";
import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_Table,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { useFetchCategorias } from "./hooks/useFetchCategorias";

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

export const Categorias = () => {
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

  const { isError, isLoading, data } = useFetchCategorias();

  const table = useMaterialReactTable({
    columns,
    data,
    rowCount: data.length,
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
    state: {
      isLoading,
      showAlertBanner: isError,
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    renderToolbarInternalActions: ({ table }) => (
      <>
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </>
    ),
  });

  return <MaterialReactTable table={table} />;
};
