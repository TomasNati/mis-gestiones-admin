import type { Categoria } from "./types";

const validateRequired = (value: string) => !!value.length;

export const validateCategoria = (categoria: Categoria) => {
  return {
    nombre: !validateRequired(categoria.nombre) ? "Nombre es requerido" : "",
  };
};
