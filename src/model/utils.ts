import type { FieldErrors } from "react-hook-form";
import type { SubcategoriaBase, SubcategoriaEdit } from "./models";

export const formatErrors = (
  errors: FieldErrors<SubcategoriaBase | SubcategoriaEdit>,
) => {
  if (errors.categoria?.message) {
    errors.categoria.message = "Categoría es requerido";
  }
  return errors;
};
