import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CategoriaBase,
  categoriaBaseSchema,
  type CategoriaEdit,
  categoriaEditSchema,
} from "model/models";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

interface CategoriaCreateEditDialogProps {
  open: boolean;
  initialCategory: Partial<CategoriaEdit>;
  onClose: () => void;
  onSubmit: (categoria: CategoriaBase | CategoriaEdit) => void;
}

export const CategoriaCreateEditDialog = ({
  open,
  initialCategory,
  onClose,
  onSubmit,
}: CategoriaCreateEditDialogProps) => {
  const schema = initialCategory.id ? categoriaEditSchema : categoriaBaseSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoriaBase | CategoriaEdit>({
    resolver: zodResolver(schema),
    defaultValues: initialCategory,
  });

  useEffect(() => {
    reset(initialCategory);
  }, [initialCategory, reset]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialCategory.nombre ? "Editar" : "Crear"} Categoria
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            {...register("nombre")}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
          <TextField
            label="Comentarios"
            fullWidth
            margin="normal"
            {...register("comentarios")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={hasErrors}>
            {initialCategory ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
