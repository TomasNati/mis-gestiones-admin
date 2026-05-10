export type Density = "comfortable" | "compact" | "spacious";

export type FciLocal = {
  nombre: string;
  moneda: string; // Ej: "USD"
  precio_actual: number;
  codigo_cnv: number;
  codigo_cafci: number;
};

export type InstrumentoExterior = {
  symbol: string; // Ej: "KO"
  price: number;
};

export type InstrumentoLocal = {
  ticker: string; // Ej: "ACWI"
  precio: number;
  precio_raw: string; // Ej: "8.880,00"
  simbolo_moneda: string; // Ej: "$"
  moneda: string; // Ej: "ARS"
  fuente: string; // Ej: "iol.invertironline.com"
  url: string;
  fecha_consulta: string; // ISO date string
};

export type DolarCotizacion = {
  tipo: string; // Ej: "oficial", "blue", "bolsa", etc.
  moneda: string; // Ej: "USD"
  casa: string; // Ej: "oficial"
  nombre: string; // Ej: "Oficial"
  compra: number;
  venta: number;
  fecha_actualizacion: string; // ISO date string
};
