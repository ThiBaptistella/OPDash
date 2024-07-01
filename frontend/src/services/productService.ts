import axios from "axios";
import { Product } from "../types";

const API_URL = "http://localhost:5002/api/products";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getProducts = () => {
  return axios.get<Product[]>(API_URL, getAuthHeaders());
};

const addProduct = (product: Product) => {
  return axios.post(API_URL, product, getAuthHeaders());
};

const updateProduct = (id: string, product: Partial<Product>) => {
  return axios.put<Product>(`${API_URL}/${id}`, product, getAuthHeaders());
};

const deleteProduct = (id: string) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
