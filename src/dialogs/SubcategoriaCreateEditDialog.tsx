import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SubcategoriaBase,
  subcategoriaBaseSchema,
  type SubcategoriaEdit,
  subcategoriaEditSchema,
} from "model/models";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import type { Categoria } from "model/types";
import { formatErrors } from "model/utils";

interface SubcategoriaCreateEditDialogProps {
  open: boolean;
  initialSubcategory: Partial<SubcategoriaEdit>;
  categorias: Categoria[];
  onClose: () => void;
  onSubmit: (subcategoria: SubcategoriaBase | SubcategoriaEdit) => void;
}

export const SubcategoriaCreateEditDialog = ({
  open,
  initialSubcategory,
  categorias,
  onClose,
  onSubmit,
}: SubcategoriaCreateEditDialogProps) => {
  const schema = initialSubcategory.id
    ? subcategoriaEditSchema
    : subcategoriaBaseSchema;

  const { register, handleSubmit, control, formState, reset } = useForm<
    SubcategoriaBase | SubcategoriaEdit
  >({
    resolver: zodResolver(schema),
    defaultValues: initialSubcategory,
  });

  useEffect(() => {
    reset(initialSubcategory);
  }, [initialSubcategory, reset]);

  const errors = formatErrors(formState.errors);
  const hasErrors = Object.keys(errors).length > 0;
  const categoriasSorted = categorias.sort((a, b) =>
    a.nombre.localeCompare(b.nombre),
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialSubcategory.nombre ? "Editar" : "Crear"} Subcategoria
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ width: 400 }}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            {...register("nombre")}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={categoriasSorted}
                onChange={(_, value) => field.onChange(value)}
                value={field.value ?? null}
                getOptionLabel={(cat) => cat.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categoria"
                    variant="outlined"
                    error={!!errors.categoria}
                    helperText={errors.categoria?.message}
                  />
                )}
              />
            )}
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
            {initialSubcategory ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
