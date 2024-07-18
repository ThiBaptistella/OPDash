import axios from "axios";
import { LoyaltyProgram } from "../types";

const API_URL = "http://localhost:5002/api/loyaltyPrograms";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getLoyaltyPrograms = () => {
  return axios.get<LoyaltyProgram[]>(`${API_URL}/loyalty`, getAuthHeaders());
};

const createLoyaltyProgram = (program: Omit<LoyaltyProgram, "_id">) => {
  return axios.post(`${API_URL}/createloyalty`, program, getAuthHeaders());
};

const updateLoyaltyProgram = (id: string, program: Partial<LoyaltyProgram>) => {
  return axios.put<LoyaltyProgram>(
    `${API_URL}/loyalty/${id}`,
    program,
    getAuthHeaders()
  );
};

const deleteLoyaltyProgram = (id: string) => {
  return axios.delete(`${API_URL}/loyalty/${id}`, getAuthHeaders());
};

const subscribeToProgram = (userId: string, programId: string) => {
  return axios.post(
    `${API_URL}/subscriptions/subscribe`,
    { userId, loyaltyProgramId: programId },
    getAuthHeaders()
  );
};

export default {
  getLoyaltyPrograms,
  createLoyaltyProgram,
  updateLoyaltyProgram,
  deleteLoyaltyProgram,
  subscribeToProgram,
};
