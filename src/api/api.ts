import axios from "axios";
import { type Categoria, type Subcategoria } from "model/types";
const backendAPI = import.meta.env.VITE_BACKEND_API;

const apiClient = axios.create({
  baseURL: backendAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCategorias = async () => {
  const response = await apiClient.get<Categoria[]>("/categorias");
  return response.data;
};

export const createCategoria = async (categoria: Categoria) => {
  const response = await apiClient.post<Categoria>("/categoria", categoria);
  return response;
};

export const actualizarCategoria = async (categoria: Categoria) => {
  const response = await apiClient.put<Categoria>(
    `/categoria/${categoria.id}`,
    categoria,
  );
  return response;
};

export const fetchSubcategorias = async (categoriaId: string) => {
  const response = await apiClient.get<Subcategoria[]>(
    `/categorias/${categoriaId}/subcategorias`,
  );
  return response.data;
};
