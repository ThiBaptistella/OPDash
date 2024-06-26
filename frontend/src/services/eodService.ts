// src/services/eodService.ts
import axios from "axios";
import { EOD } from "../types/EOD";

const API_URL = "http://localhost:5002/api/eod";

const getEODs = () => {
  return axios.get<EOD[]>(`${API_URL}/eod`);
};

const uploadEOD = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/uploadEod`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateEOD = (id: string, updatedFields: Partial<EOD>) => {
  return axios.put<EOD>(`${API_URL}/eod/${id}`, updatedFields);
};

export default {
  getEODs,
  uploadEOD,
  updateEOD,
};
