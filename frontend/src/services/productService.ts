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
  return axios.get<Product[]>(`${API_URL}/products`, getAuthHeaders());
};

const addProduct = (product: Product) => {
  return axios.post(`${API_URL}/products`, product, getAuthHeaders());
};

const uploadProductFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/uploadProductFile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
};

const updateProduct = (id: string, product: Partial<Product>) => {
  return axios.put<Product>(
    `${API_URL}/products/${id}`,
    product,
    getAuthHeaders()
  );
};

const deleteProduct = (id: string) => {
  return axios.delete(`${API_URL}/products/${id}`, getAuthHeaders());
};

const lookupProductBySKU = (sku: string) => {
  return axios.post<Product>(`${API_URL}/lookup`, { sku }, getAuthHeaders());
};

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductFile,
  lookupProductBySKU,
};
