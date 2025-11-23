import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  actualizarCategoria,
  actualizarSubcategoria,
  createCategoria,
  createSubcategoria,
  eliminarCategoria,
  eliminarSubcategoria,
  fetchCategorias,
} from "api/api";
import type { Categoria, Subcategoria } from "model/types";
import { QUERY_CATEGORIAS_FETCH } from "utils/constants";
import {
  type CategoriaBase,
  type CategoriaEdit,
  type SubcategoriaBase,
  type SubcategoriaEdit,
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

const actualizarSubcategoriaDeCategoria = (
  subcategoria: SubcategoriaEdit,
  categorias: Categoria[],
  action: "crear" | "editar" | "eliminar",
) => {
  const categoriaPadre = categorias.find(
    ({ id }) => id === subcategoria.categoria.id,
  );
  if (!categoriaPadre) return categorias;

  switch (action) {
    case "crear": {
      const newSubcategoria: Subcategoria = {
        ...subcategoria,
        categoria: categoriaPadre,
      };

      categoriaPadre.subcategorias = categoriaPadre.subcategorias
        ? [...categoriaPadre.subcategorias, newSubcategoria]
        : [newSubcategoria];
      break;
    }
    case "editar": {
      categoriaPadre.subcategorias = categoriaPadre.subcategorias?.map((sub) =>
        sub.id === subcategoria.id ? subcategoria : sub,
      );
      break;
    }
    case "eliminar": {
      categoriaPadre.subcategorias = categoriaPadre.subcategorias?.filter(
        ({ id }) => id !== subcategoria.id,
      );
      break;
    }
  }

  return categorias.map((cat) =>
    cat.id === categoriaPadre.id ? categoriaPadre : cat,
  );
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
        (prevCategorias: Categoria[]) =>
          actualizarSubcategoriaDeCategoria(
            {
              ...newSubcategoria,
              id: (Math.random() + 1).toString(36).substring(7),
              active: true,
            },
            prevCategorias,
            "crear",
          ),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  });
};

export const useDeleteSubcategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subcategoria: SubcategoriaEdit) => {
      await eliminarSubcategoria(subcategoria.id);
    },
    onMutate: (subcategoria: SubcategoriaEdit) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_CATEGORIAS_FETCH] },
        (prevCategorias: Categoria[]) =>
          actualizarSubcategoriaDeCategoria(
            subcategoria,
            prevCategorias,
            "eliminar",
          ),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_CATEGORIAS_FETCH],
      }),
  });
};

export const useEditarSubcategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subcategoria: SubcategoriaEdit) => {
      await actualizarSubcategoria({
        ...subcategoria,
        categoriaId: subcategoria.categoria.id,
      });
    },
    onMutate: (subcategoria: SubcategoriaEdit) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_CATEGORIAS_FETCH] },
        (prevCategorias: Categoria[]) =>
          actualizarSubcategoriaDeCategoria(
            subcategoria,
            prevCategorias,
            "editar",
          ),
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

export const useFetchCategorias = (soloActivas: boolean = true) => {
  const { isPending, error, data, isLoading, isError } = useQuery<Categoria[]>({
    queryKey: [QUERY_CATEGORIAS_FETCH, soloActivas],
    queryFn: async () => {
      const categorias = await fetchCategorias(soloActivas);
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
