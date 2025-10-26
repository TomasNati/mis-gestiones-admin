import type { Subcategoria, Categoria } from "model/types";
import { useState } from "react";

interface SubcategoriaTableProps {
  subcategorias: Subcategoria[];
}

const SubcategoriaTable = ({ subcategorias }: SubcategoriaTableProps) => (
  <table>
    <tbody>
      {subcategorias.map(({ nombre }) => (
        <tr>
          <td>
            <span>🖊️</span>
            <span>🗑️</span>
            <span>▼</span>
          </td>
          <td>{nombre}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

interface CategoriasBasicProps {
  categorias: Categoria[];
}

export function CategoriasBasic({ categorias }: CategoriasBasicProps) {
  const [categoriasExpandidas, setCategoriasExpandidas] = useState<number[]>(
    [],
  );

  const handleExpandirClicked = (fila: number) => {
    const newExpandidas = categoriasExpandidas.includes(fila)
      ? categoriasExpandidas.filter((row) => row != fila)
      : [...categoriasExpandidas, fila];
    setCategoriasExpandidas(newExpandidas);
  };

  return (
    <table border={1}>
      <caption>Categorias</caption>
      <thead>
        <tr>
          <th>Acciones</th>
          <th>Nombre</th>
          <th>Subcategorias</th>
          <th>Comentarios</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria, index) => (
          <tr>
            <td>
              <span>🖊️</span>
              <span>🗑️</span>
              <span onClick={() => handleExpandirClicked(index)}>
                {categoriasExpandidas.includes(index) ? "▲" : "▼"}
              </span>
            </td>
            <td>{categoria.nombre}</td>
            <td>
              {categoriasExpandidas.includes(index) ? (
                <SubcategoriaTable
                  subcategorias={categoria.subcategorias || []}
                />
              ) : (
                `Hay ${categoria.subcategorias?.length} subcategorias`
              )}
            </td>
            <td>{categoria.comentarios}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Total: {categorias.length}</td>
        </tr>
      </tfoot>
    </table>
  );
}
