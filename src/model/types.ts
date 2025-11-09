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
