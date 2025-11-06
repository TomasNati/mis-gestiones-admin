import type { Categoria, Subcategoria } from "model/types";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Table,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  type MRT_TableOptions,
  type MRT_Row,
  createRow,
} from "material-react-table";
import { useFetchCategorias } from "./hooks/useFetchCategorias";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { validateCategoria } from "model/helpers";
import { useCreateCategoria } from "./hooks/useCreateCategoria";
import { useEditarCategoria } from "./hooks/useEditarCategoria";
import { useDeleteCategoria } from "./hooks/useDeleteCategoria";
import { DeleteConfirmationDialog } from "./dialogs/DeleteConfirmationDialog";

interface SubcategoriaProps {
  subcategorias: Subcategoria[];
}

const Subcategorias = ({ subcategorias }: SubcategoriaProps) => {
  const columnsSubcategorias = useMemo<MRT_ColumnDef<Subcategoria>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Subcategoria",
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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [categoriaIdToDelete, setCategoriaIdToDelete] = useState<string | null>(
    null,
  );

  const columns = useMemo<MRT_ColumnDef<Categoria>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
        size: 100,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.nombre,
          helperText: validationErrors?.nombre,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              nombre: undefined,
            }),
        },
      },
      {
        accessorFn: (categoria: Categoria) => categoria.subcategorias?.length,
        id: "cantidadSubcategorias",
        header: "Cantidad de Subcategorias",
        enableEditing: false,
        size: 240,
      },
    ],
    [validationErrors],
  );

  const { isError, isLoading, data } = useFetchCategorias();
  const { mutateAsync: createCategoria, isPending: isCreatingCategoria } =
    useCreateCategoria();
  const { mutateAsync: actualizarCategoria, isPending: isUpdatingCategoria } =
    useEditarCategoria();
  const { mutateAsync: eliminarCategoria, isPending: isDeletingCategoria } =
    useDeleteCategoria();

  const handleCreateCategoria: MRT_TableOptions<Categoria>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateCategoria(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      const categoria: Categoria = {
        nombre: values.nombre,
        id: "00000000-0000-0000-0000-000000000000",
        comentarios: undefined,
      };
      await createCategoria(categoria);
      table.setCreatingRow(null); //exit creating mode
    };

  const handleSaveCategoria: MRT_TableOptions<Categoria>["onEditingRowSave"] =
    async ({ values, table, row }) => {
      const newValidationErrors = validateCategoria(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      const categoriaUpdated: Categoria = {
        ...row.original,
        nombre: values.nombre,
      };
      await actualizarCategoria(categoriaUpdated);
      table.setEditingRow(null); //exit editing mode
    };

  const openDeleteConfirmModal = (row: MRT_Row<Categoria>) => {
    setCategoriaIdToDelete(row.original.id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setCategoriaIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const onDeleteCategoria = async () => {
    if (!categoriaIdToDelete) {
      return;
    }
    await eliminarCategoria(categoriaIdToDelete);
    closeDeleteConfirmModal();
  };

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
      isSaving:
        isCreatingCategoria || isUpdatingCategoria || isDeletingCategoria,
      showAlertBanner: isError,
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="outlined"
        color="secondary"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Crear Categoria
      </Button>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <>
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </>
    ),
    //, staticRowIndex
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar Subcategoría">
          <IconButton
            onClick={() => {
              //setCreatingRowIndex((staticRowIndex || 0) + 1);
              table.setCreatingRow(
                createRow(
                  table,
                  {
                    id: null!,
                    nombre: "",
                    subcategorias: [],
                  },
                  -1,
                  row.depth + 1,
                ),
              );
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateCategoria,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveCategoria,
  });

  return (
    <>
      {deleteDialogOpen ? (
        <DeleteConfirmationDialog
          onClose={closeDeleteConfirmModal}
          open={deleteDialogOpen}
          onConfirm={onDeleteCategoria}
        />
      ) : null}
      <MaterialReactTable table={table} />
    </>
  );
};
