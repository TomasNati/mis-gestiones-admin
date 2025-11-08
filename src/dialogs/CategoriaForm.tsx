import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CategoriaBase, categoriaBaseSchema } from "model/models";
import { Box, Button, TextField } from "@mui/material";

export const CategoriaForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoriaBase>({
    resolver: zodResolver(categoriaBaseSchema),
    defaultValues: {
      active: true,
      nombre: "",
    },
  });

  const onSubmit = (categoria: CategoriaBase) => {
    console.log({ categoria });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
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

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};
