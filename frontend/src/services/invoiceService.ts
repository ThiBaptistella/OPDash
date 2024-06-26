// src/services/invoiceService.ts
import axios from "axios";
import { Invoice } from "../types";

const API_URL = "http://localhost:5002/api/invoices";

const getInvoices = () => {
  return axios.get<Invoice[]>(`${API_URL}/invoices`);
};

const uploadInvoice = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/uploadInvoices`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateInvoice = (id: string, updatedFields: Partial<Invoice>) => {
  return axios.put<Invoice>(`${API_URL}/invoices/${id}`, updatedFields);
};

export default {
  getInvoices,
  uploadInvoice,
  updateInvoice,
};
