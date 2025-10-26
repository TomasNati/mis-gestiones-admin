import "./App.css";
import { fetchCategorias } from "api/api";
import { useQuery } from "@tanstack/react-query";
// import type { Subcategoria } from "model/types";
// import { useState } from "react";
import { Categorias } from "./Categorias";

// interface SubcategoriaTableProps {
//   subcategorias: Subcategoria[];
// }

// const SubcategoriaTable = ({ subcategorias }: SubcategoriaTableProps) => (
//   <table>
//     <tbody>
//       {subcategorias.map(({ nombre }) => (
//         <tr>
//           <td>
//             <span>🖊️</span>
//             <span>🗑️</span>
//             <span>▼</span>
//             {/* <span>▲</span> */}
//           </td>
//           <td>{nombre}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// function CategoriasBasic() {
//   const [categoriasExpandidas, setCategoriasExpandidas] = useState<number[]>(
//     [],
//   );
//   const { isPending, error, data } = useQuery({
//     queryKey: ["repoData"],
//     queryFn: async () => {
//       const categorias = await fetchCategorias();
//       return categorias;
//     },
//   });

//   if (isPending) return "Loading...";

//   if (error) return "An error has occurred: " + error.message;

//   if (!data.length) {
//     return (
//       <p>
//         <strong>No se encontraron categorias</strong>
//       </p>
//     );
//   }

//   const handleExpandirClicked = (fila: number) => {
//     const newExpandidas = categoriasExpandidas.includes(fila)
//       ? categoriasExpandidas.filter((row) => row != fila)
//       : [...categoriasExpandidas, fila];
//     setCategoriasExpandidas(newExpandidas);
//   };

//   return (
//     <table border={1}>
//       <caption>Categorias</caption>
//       <thead>
//         <tr>
//           <th>Acciones</th>
//           <th>Nombre</th>
//           <th>Subcategorias</th>
//           <th>Comentarios</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((categoria, index) => (
//           <tr>
//             <td>
//               <span>🖊️</span>
//               <span>🗑️</span>
//               <span onClick={() => handleExpandirClicked(index)}>
//                 {categoriasExpandidas.includes(index) ? "▲" : "▼"}
//               </span>
//             </td>
//             <td>{categoria.nombre}</td>
//             <td>
//               {categoriasExpandidas.includes(index) ? (
//                 <SubcategoriaTable
//                   subcategorias={categoria.subcategorias || []}
//                 />
//               ) : (
//                 `Hay ${categoria.subcategorias?.length} subcategorias`
//               )}
//             </td>
//             <td>{categoria.comentarios}</td>
//           </tr>
//         ))}
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colSpan={4}>Total: {data.length}</td>
//         </tr>
//       </tfoot>
//     </table>
//   );
// }

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const categorias = await fetchCategorias();
      return categorias;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data.length) {
    return (
      <p>
        <strong>No se encontraron categorias</strong>
      </p>
    );
  }

  return <Categorias categorias={data} />;
}

export default App;
