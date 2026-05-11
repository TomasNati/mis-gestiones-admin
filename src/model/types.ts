import type { INSTRUMENTO_TIPO } from "utils/constants";

export interface BasicEntity {
  id: string;
  nombre: string;
  comentarios?: string | null;
  active: boolean;
}

export interface Categoria extends BasicEntity {
  subcategorias?: Subcategoria[];
}

export interface Subcategoria extends BasicEntity {
  categoria: Categoria;
}

export interface SubcategoriaEditPayload extends BasicEntity {
  categoriaId: string;
}

export type InstrumentoTipo =
  (typeof INSTRUMENTO_TIPO)[keyof typeof INSTRUMENTO_TIPO];

export interface Instrumento extends BasicEntity {
  codigo?: string | null;
  tipo?: InstrumentoTipo | null;
  clase_renta?: string | null;
  moneda?: string | null;
  precios?: number | null;
}

export interface CryptoQuoteResponse {
  Id: string;
  Nombre: string;
  PrecioUsd: number;
  PrecioArs: number;
  FechaActualizacion: string;
}
