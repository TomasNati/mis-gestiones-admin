import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CategoriaBase, categoriaBaseSchema } from "model/models";
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
  initialCategory: Partial<CategoriaBase>;
  onClose: () => void;
  onSubmit: (categoria: CategoriaBase) => void;
}

export const CategoriaCreateEditDialog = ({
  open,
  initialCategory,
  onClose,
  onSubmit,
}: CategoriaCreateEditDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoriaBase>({
    resolver: zodResolver(categoriaBaseSchema),
    defaultValues: initialCategory,
  });

  useEffect(() => {
    reset(initialCategory);
  }, [initialCategory, reset]);

  console.log(errors);

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
          <Button type="submit" variant="contained">
            {initialCategory ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
