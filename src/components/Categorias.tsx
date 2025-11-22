import type { Categoria, Subcategoria } from "model/types";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  type MRT_Row,
} from "material-react-table";
import {
  useFetchCategorias,
  useCreateCategoria,
  useDeleteCategoria,
  useEditarCategoria,
  useCreateSubcategoria,
  useDeleteSubcategoria,
  useEditarSubcategoria,
} from "hooks/useCategoriasHooks";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteConfirmationDialog } from "dialogs/DeleteConfirmationDialog";
import type {
  CategoriaBase,
  CategoriaEdit,
  SubcategoriaBase,
} from "model/models";
import { CategoriaCreateEditDialog } from "dialogs/CategoriaCreateEditDialog";
import { SubcategoriaCreateEditDialog } from "dialogs/SubcategoriaCreateEditDialog";
import { Subcategorias } from "./Subcategoria";
import { FiltroActivas } from "./FiltroActivas";

export const Categorias = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [createEditCategoriaOpenDialog, setCreateEditCategoriaOpenDialog] =
    useState<boolean>(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState<
    Categoria | undefined
  >(undefined);
  const [subcategoriaAEditar, setSubcategoriaAEditar] = useState<
    Partial<Subcategoria> | undefined
  >(undefined);
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(
    null,
  );
  const [createSubcategoriaOpenDialog, setEditSubcategoriaOpenDialog] =
    useState<boolean>(false);
  const [soloActivas, setSoloActivas] = useState(true);

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

  const { isError, isLoading, data } = useFetchCategorias(soloActivas);
  const { mutateAsync: createCategoria, isPending: isCreatingCategoria } =
    useCreateCategoria();
  const { mutateAsync: actualizarCategoria, isPending: isUpdatingCategoria } =
    useEditarCategoria();
  const { mutateAsync: eliminarCategoria, isPending: isDeletingCategoria } =
    useDeleteCategoria();
  const { mutateAsync: crearSubcategoria, isPending: isCreatingSubcategoria } =
    useCreateSubcategoria();
  const {
    mutateAsync: actualizarSubcategoria,
    isPending: isUpdatingSubcategoria,
  } = useEditarSubcategoria();
  const {
    mutateAsync: eliminarSubcategoria,
    isPending: isDeletingSubcategoria,
  } = useDeleteSubcategoria();

  const openDeleteConfirmModal = (row: MRT_Row<Categoria>) => {
    setCategoriaToDelete(row.original);
    setDeleteDialogOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setCategoriaToDelete(null);
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

  const openCreateEdiSubcategoriaDialog = (
    categoria: Categoria,
    subcategoria?: Subcategoria,
  ) => {
    const defaultValues: Partial<Subcategoria> = subcategoria ?? { categoria };
    setSubcategoriaAEditar(defaultValues);
    setEditSubcategoriaOpenDialog(true);
  };

  const closeCreateSubcategoriaDialog = () => {
    setSubcategoriaAEditar(undefined);
    setEditSubcategoriaOpenDialog(false);
  };

  const handleCreateEditCategoria = async (
    categoria: CategoriaBase | CategoriaEdit,
  ) => {
    if (categoriaAEditar) {
      await actualizarCategoria(categoria as CategoriaEdit);
    } else {
      await createCategoria(categoria as CategoriaBase);
    }
    closeCreateEditCategoriaDialog();
  };

  const handleCreateSubcategoria = async (subcategoria: SubcategoriaBase) => {
    await crearSubcategoria(subcategoria as SubcategoriaBase);
    closeCreateSubcategoriaDialog();
  };

  const onDeleteCategoria = async () => {
    if (!categoriaToDelete) {
      return;
    }
    await eliminarCategoria(categoriaToDelete.id);
    closeDeleteConfirmModal();
  };

  const handleSoloActivasChanged = (soloActivas: boolean) => {
    setSoloActivas(soloActivas);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    rowCount: data.length,
    renderDetailPanel: ({ row }) => (
      <Subcategorias
        onEliminarSubcategoria={eliminarSubcategoria}
        onActualizarSubcategoria={actualizarSubcategoria}
        subcategorias={row.original.subcategorias || []}
        categoriaPadre={row.original}
      />
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
        isCreatingCategoria ||
        isUpdatingCategoria ||
        isDeletingCategoria ||
        isCreatingSubcategoria ||
        isDeletingSubcategoria ||
        isUpdatingSubcategoria,
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
        <FiltroActivas
          soloActivas={soloActivas}
          onSoloActivasChanged={handleSoloActivasChanged}
        />
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
          <IconButton
            onClick={() => openCreateEdiSubcategoriaDialog(row.original)}
          >
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
      <DeleteConfirmationDialog
        onClose={closeDeleteConfirmModal}
        open={deleteDialogOpen}
        onConfirm={onDeleteCategoria}
        description={`Categoria "${categoriaToDelete?.nombre}"`}
      />
      <CategoriaCreateEditDialog
        open={createEditCategoriaOpenDialog}
        onClose={closeCreateEditCategoriaDialog}
        onSubmit={handleCreateEditCategoria}
        initialCategory={categoriaAEditar || {}}
      />
      <SubcategoriaCreateEditDialog
        open={createSubcategoriaOpenDialog}
        onClose={closeCreateSubcategoriaDialog}
        onSubmit={handleCreateSubcategoria}
        initialSubcategory={subcategoriaAEditar || {}}
        categorias={data}
      />
      <MaterialReactTable table={table} />
    </>
  );
};
