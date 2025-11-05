import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarCategoria } from "api/api";
import type { Categoria } from "model/types";
import { QUERY_CATEGORIAS_FETCH } from "../constants";

export const useEditarCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoria: Categoria) => {
      await actualizarCategoria(categoria);
    },
    onMutate: (newCategoria: Categoria) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_CATEGORIAS_FETCH] },
        (prevCategorias: Categoria[]) =>
          prevCategorias.map((cat) =>
            cat.id === newCategoria.id ? newCategoria : cat,
          ),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  });
};
