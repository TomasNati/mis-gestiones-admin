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
  categoria: categoriaEditSchema,
});

export const subcategoriaEditSchema = subcategoriaBaseSchema.extend({
  id: z.uuid({ error: "ID es requerido" }),
  active: z.boolean(),
});

export type CategoriaBase = z.infer<typeof categoriaBaseSchema>;
export type CategoriaEdit = z.infer<typeof categoriaEditSchema>;
export type SubcategoriaBase = z.infer<typeof subcategoriaBaseSchema>;
export type SubcategoriaEdit = z.infer<typeof subcategoriaEditSchema>;

export const instrumentoBaseSchema = z.object({
  nombre: z.string().trim().min(1, "Nombre es requerido"),
  codigo: z.string().optional().nullable(),
  tipo: z.string().min(1, "Tipo es requerido"),
  clase_renta: z.string().min(1, "Clase de Renta es requerida"),
  moneda: z.string().min(1, "Moneda es requerida"),
});

export const instrumentoEditSchema = instrumentoBaseSchema.extend({
  id: z.uuid({ error: "ID es requerido" }),
  active: z.boolean(),
});

export type InstrumentoBase = z.infer<typeof instrumentoBaseSchema>;
export type InstrumentoEdit = z.infer<typeof instrumentoEditSchema>;
