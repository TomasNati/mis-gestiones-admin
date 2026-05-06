import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { instrumentoBaseSchema, instrumentoEditSchema } from "model/models";
import type { InstrumentoBase, InstrumentoEdit } from "model/models";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

interface InstrumentoCreateEditDialogProps {
  open: boolean;
  initialInstrumento: Partial<InstrumentoEdit>;
  onClose: () => void;
  onSubmit: (instrumento: InstrumentoBase | InstrumentoEdit) => void;
}

export const InstrumentoCreateEditDialog = ({
  open,
  initialInstrumento,
  onClose,
  onSubmit,
}: InstrumentoCreateEditDialogProps) => {
  const schema = initialInstrumento.id
    ? instrumentoEditSchema
    : instrumentoBaseSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InstrumentoBase | InstrumentoEdit>({
    resolver: zodResolver(schema),
    defaultValues: initialInstrumento,
  });

  useEffect(() => {
    reset(initialInstrumento);
  }, [initialInstrumento, reset]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialInstrumento.nombre ? "Editar" : "Crear"} Instrumento
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
            label="Código"
            fullWidth
            margin="normal"
            {...register("codigo")}
          />
          <TextField
            label="Tipo"
            fullWidth
            margin="normal"
            {...register("tipo")}
          />
          <TextField
            label="Clase Renta"
            fullWidth
            margin="normal"
            {...register("clase_renta")}
          />
          <TextField
            label="Broker"
            fullWidth
            margin="normal"
            {...register("broker")}
          />
          <TextField
            label="Moneda"
            fullWidth
            margin="normal"
            {...register("moneda")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={hasErrors}>
            {initialInstrumento ? "Guardar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
