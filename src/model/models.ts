import { z } from "zod";

export const categoriaBaseSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  comentarios: z.string().optional(),
});

export const categoriaEditSchema = categoriaBaseSchema.extend({
  id: z.uuid({ error: "ID es requerido" }),
});

export const subcategoriaBaseSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  comentarios: z.string().optional(),
  categoria: categoriaBaseSchema.refine(() => true, {
    error: "La categoria es inválida",
  }),
});

export const subcategoriaEditSchema = subcategoriaBaseSchema.extend({
  id: z.uuid({ error: "ID es requerido" }),
});

export type CategoriaBase = z.infer<typeof categoriaBaseSchema>;
export type CategoriaEdit = z.infer<typeof categoriaEditSchema>;
export type SubcategoriaBase = z.infer<typeof subcategoriaBaseSchema>;
export type SubcategoriaEdit = z.infer<typeof subcategoriaEditSchema>;
