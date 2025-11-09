import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  actualizarCategoria,
  createCategoria,
  createSubcategoria,
  eliminarCategoria,
  fetchCategorias,
} from "api/api";
import type { Categoria, Subcategoria } from "model/types";
import { QUERY_CATEGORIAS_FETCH } from "../constants";
import {
  type CategoriaBase,
  type CategoriaEdit,
  type SubcategoriaBase,
} from "model/models";

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

export const useCreateSubcategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subcategoria: SubcategoriaBase) => {
      await createSubcategoria(subcategoria);
    },
    onMutate: (newSubcategoria: SubcategoriaBase) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_CATEGORIAS_FETCH] },
        (prevCategorias: Categoria[]) => {
          const categoriaPadre = prevCategorias.find(
            ({ id }) => id === newSubcategoria.categoria.id,
          );
          if (!categoriaPadre) return prevCategorias;

          const subcategoria: Subcategoria = {
            ...newSubcategoria,
            categoria: categoriaPadre,
            id: (Math.random() + 1).toString(36).substring(7),
            active: true,
          };

          categoriaPadre.subcategorias = categoriaPadre.subcategorias
            ? [...categoriaPadre.subcategorias, subcategoria]
            : [subcategoria];

          return prevCategorias.map((cat) =>
            cat.id === categoriaPadre.id ? categoriaPadre : cat,
          );
        },
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  });
};

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoriaId: string) => {
      await eliminarCategoria(categoriaId);
    },
    onMutate: (categoriaId: string) => {
      queryClient.setQueryData(
        [QUERY_CATEGORIAS_FETCH],
        (prevCategorias: Categoria[]) =>
          prevCategorias?.filter((categoria) => categoria.id !== categoriaId),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  });
};

export const useEditarCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoria: CategoriaEdit) => {
      await actualizarCategoria(categoria);
    },
    onMutate: (newCategoria: CategoriaEdit) => {
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
