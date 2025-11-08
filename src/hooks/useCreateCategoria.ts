import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoria } from "api/api";
import type { Categoria } from "model/types";
import { QUERY_CATEGORIAS_FETCH } from "../constants";
import { type CategoriaBase } from "model/models";

export const useCreateCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoria: CategoriaBase) => {
      await createCategoria(categoria);
    },
    onMutate: (newCategoria: CategoriaBase) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_CATEGORIAS_FETCH] },
        (prevCategorias: Categoria[]) =>
          [
            ...prevCategorias,
            {
              ...newCategoria,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Categoria[],
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  });
};
