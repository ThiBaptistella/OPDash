import axios from "axios";
import { Supplier } from "../types";

const API_URL = "http://localhost:5002/api/suppliers";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getSuppliers = () => {
  return axios.get<Supplier[]>(`${API_URL}/suppliers`, getAuthHeaders());
};

const addSupplier = (supplier: Supplier) => {
  return axios.post(`${API_URL}/suppliers`, supplier, getAuthHeaders());
};

const updateSupplier = (id: string, supplier: Partial<Supplier>) => {
  return axios.put<Supplier>(
    `${API_URL}/suppliers/${id}`,
    supplier,
    getAuthHeaders()
  );
};

const deleteSupplier = (id: string) => {
  return axios.delete(`${API_URL}/suppliers/${id}`, getAuthHeaders());
};

export default {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};
