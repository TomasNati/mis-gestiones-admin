import { useForm, Controller } from "react-hook-form";
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
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";

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
    control,
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

  const [tipoOptions, setTipoOptions] = useState<string[]>([]);
  const [claseOptions, setClaseOptions] = useState<string[]>([]);
  const [monedaOptions, setMonedaOptions] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          "https://mis-gestiones-backend.vercel.app/api/inversiones/inversiones/meta",
        );
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted) return;
        setTipoOptions(json.tipo || []);
        setClaseOptions(json.clase_renta || []);
        setMonedaOptions(json.moneda || []);
      } catch (e) {
        // ignore errors, options stay empty
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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
            required
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
          <Controller
            name="tipo"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={tipoOptions}
                value={field.value ?? null}
                onChange={(_, v) => field.onChange(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    margin="normal"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                disableClearable
              />
            )}
          />
          <Controller
            name="clase_renta"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={claseOptions}
                value={field.value ?? null}
                onChange={(_, v) => field.onChange(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Clase Renta"
                    margin="normal"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                disableClearable
              />
            )}
          />
          <Controller
            name="moneda"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={monedaOptions}
                value={field.value ?? null}
                onChange={(_, v) => field.onChange(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Moneda"
                    margin="normal"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                disableClearable
              />
            )}
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
