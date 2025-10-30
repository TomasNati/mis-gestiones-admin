import { useQuery } from "@tanstack/react-query";
import { fetchCategorias } from "api/api";
import { type Categoria } from "model/types";

export const useFetchCategorias = () => {
  const { isPending, error, data, isLoading, isError } = useQuery<Categoria[]>({
    queryKey: ["repoData"],
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
