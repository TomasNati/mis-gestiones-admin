import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarCategoria } from "api/api";
import { QUERY_CATEGORIAS_FETCH } from "../constants";
import type { Categoria } from "model/types";

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (categoriaId: string) => {
      await eliminarCategoria(categoriaId);
    },
    onMutate: (categoriaId: string) => {
      queryClient.setQueryData([QUERY_CATEGORIAS_FETCH], (prevCategorias: Categoria[]) => 
        prevCategorias?.filter(categoria => categoria.id !== categoriaId))
    },
    onSettled: () =>  queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  }
    
  );
}
