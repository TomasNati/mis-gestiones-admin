export interface BasicEntity {
  id: string;
  nombre: string;
  comentarios?: string;
}

export interface Categoria extends BasicEntity {
  subcategorias?: Subcategoria[];
}

export interface Subcategoria extends BasicEntity {
  categoria: Categoria;
}
