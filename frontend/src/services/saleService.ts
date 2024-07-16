// src/services/saleService.ts
import axios from "axios";
import { Sale } from "../types";

const API_URL = "http://localhost:5002/api/sales";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getSales = () => {
  return axios.get<Sale[]>(`${API_URL}/sales`, getAuthHeaders());
};

const importSales = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/uploadSales`, formData, {
    headers: {
      ...getAuthHeaders().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getSales,
  importSales,
};
