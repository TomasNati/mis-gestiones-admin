import { Box, Tooltip, IconButton } from "@mui/material";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MRT_Table,
} from "material-react-table";
import type { Categoria, Subcategoria } from "model/types";
import { useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteConfirmationDialog } from "./dialogs/DeleteConfirmationDialog";
import type { SubcategoriaBase, SubcategoriaEdit } from "model/models";
import { SubcategoriaCreateEditDialog } from "./dialogs/SubcategoriaCreateEditDialog";

interface SubcategoriaProps {
  subcategorias: Subcategoria[];
  categoriaPadre: Categoria;
  onEliminarSubcategoria: (subcategoria: SubcategoriaEdit) => Promise<void>;
  onActualizarSubcategoria: (subcategoria: SubcategoriaEdit) => Promise<void>;
}

export const Subcategorias = ({
  subcategorias,
  categoriaPadre,
  onEliminarSubcategoria,
  onActualizarSubcategoria,
}: SubcategoriaProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [subcategoriaToDelete, setSubcategoriaToDelete] =
    useState<Subcategoria | null>(null);
  const [editSubcategoriaOpenDialog, setEditSubcategoriaOpenDialog] =
    useState<boolean>(false);
  const [subcategoriaAEditar, setSubcategoriaAEditar] = useState<
    Subcategoria | undefined
  >(undefined);

  const columnsSubcategorias = useMemo<MRT_ColumnDef<Subcategoria>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Subcategoria",
      },
      {
        accessorKey: "comentarios",
        header: "Comentarios",
      },
    ],
    [],
  );

  const openEditSubcategoriaDialog = (subcategoria: Subcategoria) => {
    setSubcategoriaAEditar({
      ...subcategoria,
      categoria: categoriaPadre,
    });
    setEditSubcategoriaOpenDialog(true);
  };

  const closeEditSubcategoriaDialog = () => {
    setSubcategoriaAEditar(undefined);
    setEditSubcategoriaOpenDialog(false);
  };

  const handleEditSubcategoria = async (
    subcategoria: SubcategoriaBase | SubcategoriaEdit,
  ) => {
    await onActualizarSubcategoria(subcategoria as SubcategoriaEdit);
    closeEditSubcategoriaDialog();
  };

  const openDeleteConfirmModal = (subcategoria: Subcategoria) => {
    setSubcategoriaToDelete(subcategoria);
    setDeleteDialogOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setSubcategoriaToDelete(null);
    setDeleteDialogOpen(false);
  };

  const onDeleteSubcategoria = async () => {
    if (!subcategoriaToDelete) {
      return;
    }
    await onEliminarSubcategoria({
      ...subcategoriaToDelete,
      categoria: categoriaPadre,
    });
    closeDeleteConfirmModal();
  };

  const tableSubcategorias = useMaterialReactTable({
    columns: columnsSubcategorias,
    data: subcategorias || [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => openEditSubcategoriaDialog(row.original)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmModal(row.original)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    initialState: {
      sorting: [{ id: "nombre", desc: false }],
      density: "compact",
    },
    enableEditing: true,
  });

  return (
    <>
      <DeleteConfirmationDialog
        onClose={closeDeleteConfirmModal}
        open={deleteDialogOpen}
        onConfirm={onDeleteSubcategoria}
        description={`Subcategoria "${subcategoriaToDelete?.nombre}"`}
      />
      <SubcategoriaCreateEditDialog
        open={editSubcategoriaOpenDialog}
        onClose={closeEditSubcategoriaDialog}
        onSubmit={handleEditSubcategoria}
        initialSubcategory={subcategoriaAEditar || {}}
        categorias={[categoriaPadre]}
      />
      <MRT_Table table={tableSubcategorias} />
    </>
  );
};
