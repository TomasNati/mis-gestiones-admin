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
  type MRT_Row,
} from "material-react-table";
import { useFetchCategorias } from "./hooks/useFetchCategorias";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateCategoria } from "./hooks/useCreateCategoria";
import { useEditarCategoria } from "./hooks/useEditarCategoria";
import { useDeleteCategoria } from "./hooks/useDeleteCategoria";
import { DeleteConfirmationDialog } from "./dialogs/DeleteConfirmationDialog";
import type { CategoriaBase, CategoriaEdit } from "model/models";
import { CategoriaCreateEditDialog } from "./dialogs/CategoriaCreateEditDialog";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [createEditCategoriaOpenDialog, setCreateEditCategoriaOpenDialog] =
    useState<boolean>(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState<
    Categoria | undefined
  >(undefined);
  const [categoriaIdToDelete, setCategoriaIdToDelete] = useState<string | null>(
    null,
  );

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
        enableEditing: false,
        size: 240,
      },
    ],
    [],
  );

  const { isError, isLoading, data } = useFetchCategorias();
  const { mutateAsync: createCategoria, isPending: isCreatingCategoria } =
    useCreateCategoria();
  const { mutateAsync: actualizarCategoria, isPending: isUpdatingCategoria } =
    useEditarCategoria();
  const { mutateAsync: eliminarCategoria, isPending: isDeletingCategoria } =
    useDeleteCategoria();

  const openDeleteConfirmModal = (row: MRT_Row<Categoria>) => {
    setCategoriaIdToDelete(row.original.id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setCategoriaIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const openCreateEditCategoriaDialog = (categoria?: Categoria) => {
    setCategoriaAEditar(categoria);
    setCreateEditCategoriaOpenDialog(true);
  };

  const closeCreateEditCategoriaDialog = () => {
    setCategoriaAEditar(undefined);
    setCreateEditCategoriaOpenDialog(false);
  };

  const handleCreateEditCategoria = async (
    categoria: CategoriaBase | CategoriaEdit,
  ) => {
    categoriaAEditar
      ? await actualizarCategoria(categoria as CategoriaEdit)
      : await createCategoria(categoria as CategoriaBase);
    closeCreateEditCategoriaDialog();
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
    renderTopToolbarCustomActions: () => (
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="outlined"
        color="secondary"
        onClick={() => openCreateEditCategoriaDialog()}
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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => openCreateEditCategoriaDialog(row.original)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Agregar Subcategoría">
          <IconButton onClick={() => {}}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    enableEditing: true,
    getRowId: (row) => row.id,
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
      <CategoriaCreateEditDialog
        open={createEditCategoriaOpenDialog}
        onClose={closeCreateEditCategoriaDialog}
        onSubmit={handleCreateEditCategoria}
        initialCategory={categoriaAEditar || {}}
      />

      <MaterialReactTable table={table} />
    </>
  );
};
