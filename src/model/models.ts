import { z } from "zod";

export const categoriaBaseSchema = z.object({
  nombre: z.string().trim().min(1, "Nombre es requerido"),
  comentarios: z.string().optional().nullable(),
});

export const categoriaEditSchema = categoriaBaseSchema.extend({
  id: z.uuid({ error: "ID es requerido" }),
  active: z.boolean(),
});

export const subcategoriaBaseSchema = z.object({
  nombre: z.string().trim().min(1, "Nombre es requerido"),
  comentarios: z.string().optional().nullable(),
  categoria: categoriaEditSchema.refine((val) => !!val, {
    message: "Categoría es requerida",
  }),
});

export const subcategoriaEditSchema = subcategoriaBaseSchema.extend({
  id: z.uuid({ error: "ID es requerido" }),
  active: z.boolean(),
});

export type CategoriaBase = z.infer<typeof categoriaBaseSchema>;
export type CategoriaEdit = z.infer<typeof categoriaEditSchema>;
export type SubcategoriaBase = z.infer<typeof subcategoriaBaseSchema>;
export type SubcategoriaEdit = z.infer<typeof subcategoriaEditSchema>;
