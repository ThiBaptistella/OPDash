// src/services/invoiceService.ts
import axios from "axios";
import { Invoice } from "../hooks/useInvoices";

const API_URL = "http://localhost:5001/api/invoices";

const getInvoices = () => {
  return axios.get<Invoice[]>(API_URL);
};

const uploadInvoice = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getInvoices,
  uploadInvoice,
};
