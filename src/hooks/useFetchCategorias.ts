import { useQuery } from "@tanstack/react-query";
import { fetchCategorias } from "api/api";
import { type Categoria } from "model/types";
import { QUERY_CATEGORIAS_FETCH } from "../constants";

export const useFetchCategorias = () => {
  const { isPending, error, data, isLoading, isError } = useQuery<Categoria[]>({
    queryKey: [QUERY_CATEGORIAS_FETCH],
    queryFn: async () => {
      const categorias = await fetchCategorias();
      return categorias;
    },
  });

  return {
    isPending,
    error,
    data: data || [],
    isLoading,
    isError,
  };
};
