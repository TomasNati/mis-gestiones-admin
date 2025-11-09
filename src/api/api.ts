import axios from "axios";
import { type Categoria, type Subcategoria } from "model/types";
import {
  type CategoriaBase,
  type CategoriaEdit,
  type SubcategoriaBase,
  type SubcategoriaEdit,
} from "model/models";

const backendAPI = import.meta.env.VITE_BACKEND_API;

const apiClient = axios.create({
  baseURL: backendAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCategorias = async () => {
  const response = await apiClient.get<Categoria[]>("/categorias?active=true");
  return response.data;
};

export const createCategoria = async (categoria: CategoriaBase) => {
  const response = await apiClient.post<CategoriaBase>("/categoria", categoria);
  return response;
};

export const actualizarCategoria = async (categoria: CategoriaEdit) => {
  const response = await apiClient.put<CategoriaEdit>(
    `/categoria/${categoria.id}`,
    categoria,
  );
  return response;
};

export const eliminarCategoria = async (categoriaId: string) => {
  const response = await apiClient.delete(`/categoria/${categoriaId}`);
  return response.status == 204;
};

export const fetchSubcategorias = async (categoriaId: string) => {
  const response = await apiClient.get<Subcategoria[]>(
    `/categorias/${categoriaId}/subcategorias`,
  );
  return response.data;
};

export const createSubcategoria = async (subcategoria: SubcategoriaBase) => {
  const payload = {
    ...subcategoria,
    categoriaId: subcategoria.categoria.id,
  };
  const response = await apiClient.post<SubcategoriaBase>(
    "/subcategoria",
    payload,
  );
  return response;
};

export const actualizarSubcategoria = async (
  subcategoria: SubcategoriaEdit,
) => {
  const response = await apiClient.put<SubcategoriaEdit>(
    `/subcategoria/${subcategoria.id}`,
    subcategoria,
  );
  return response;
};

export const eliminarSubcategoria = async (subcategoriaId: string) => {
  const response = await apiClient.delete(`/subcategoria/${subcategoriaId}`);
  return response.status == 204;
};
