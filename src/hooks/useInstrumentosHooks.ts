import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchInstrumentos,
  createInstrumento,
  actualizarInstrumento,
  eliminarInstrumento,
} from "api/api";
import type { Instrumento } from "model/types";
import { QUERY_INSTRUMENTOS_FETCH } from "utils/constants";
import type { InstrumentoBase, InstrumentoEdit } from "model/models";

export const useCreateInstrumento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (instrumento: InstrumentoBase) => {
      await createInstrumento(instrumento);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_INSTRUMENTOS_FETCH],
      }),
  });
};

export const useDeleteInstrumento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (instrumentoId: string) => {
      await eliminarInstrumento(instrumentoId);
    },
    onMutate: (instrumentoId: string) => {
      queryClient.setQueryData(
        [QUERY_INSTRUMENTOS_FETCH],
        (prev: Instrumento[] | undefined) =>
          prev?.filter((i) => i.id !== instrumentoId),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_INSTRUMENTOS_FETCH],
      }),
  });
};

export const useEditarInstrumento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (instrumento: InstrumentoEdit) => {
      await actualizarInstrumento(instrumento);
    },
    onMutate: (newInstrumento: InstrumentoEdit) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_INSTRUMENTOS_FETCH] },
        (prev: Instrumento[] | undefined) =>
          prev?.map((ins) =>
            ins.id === newInstrumento.id ? newInstrumento : ins,
          ),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_INSTRUMENTOS_FETCH],
      }),
  });
};

export const useUpdateInstrumentoPrecios = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (priceById: Map<string, number | null>) => {
      if (priceById.size === 0) return;
      queryClient.setQueriesData<Instrumento[]>(
        { queryKey: [QUERY_INSTRUMENTOS_FETCH] },
        (prev) =>
          prev?.map((ins) =>
            priceById.has(ins.id)
              ? { ...ins, precios: priceById.get(ins.id) ?? null }
              : ins,
          ),
      );
    },
    [queryClient],
  );
};

export const useFetchInstrumentos = (soloActivas: boolean = true) => {
  const { isPending, error, data, isLoading, isError } = useQuery<
    Instrumento[]
  >({
    queryKey: [QUERY_INSTRUMENTOS_FETCH, soloActivas],
    queryFn: async () => {
      const instrumentos = await fetchInstrumentos(soloActivas);
      return instrumentos;
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
