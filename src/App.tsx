import "./App.css";
// import { useFetchCategorias } from "./hooks/useFetchCategorias";
import { Categorias } from "./Categorias";
import { CategoriasBasic } from "./basic/CategoriasBasic";
import { useState } from "react";

function App() {
  const [showBasicComponent, setShowBasicComponet] = useState(false);
  // const { isPending, error, data } = useFetchCategorias();

  // if (isPending) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  // if (!data.length) {
  //   return (
  //     <p>
  //       <strong>No se encontraron categorias</strong>
  //     </p>
  //   );
  // }

  return (
    <>
      <div className="vista">
        <button onClick={() => setShowBasicComponet(!showBasicComponent)}>
          Cambiar a vista {showBasicComponent ? " full" : " básica"}
        </button>
      </div>
      {showBasicComponent ? (
        <CategoriasBasic categorias={[]} />
      ) : (
        <Categorias />
      )}
    </>
  );
}

export default App;
