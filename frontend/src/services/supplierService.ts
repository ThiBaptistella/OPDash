import axios from "axios";
import { Supplier } from "../types";

const API_URL = "http://localhost:5002/api/suppliers";

const getSuppliers = () => {
  return axios.get<Supplier[]>(API_URL);
};

const addSupplier = (supplier: Supplier) => {
  return axios.post(API_URL, supplier);
};

const updateSupplier = (supplier: Supplier) => {
  return axios.put(`${API_URL}/${supplier.id}`, supplier);
};

const deleteSupplier = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};
