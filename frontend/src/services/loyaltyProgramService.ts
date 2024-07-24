// services/loyaltyProgramService.ts
import axios from "axios";
import { LoyaltyProgram } from "../types";
import { Subscription } from "../types";

const API_URL = "http://localhost:5002/api/loyaltyPrograms";
const API_SUBSCRIBE_URL = "http://localhost:5002/api/subscriptions";

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

const getLoyaltyProgramDetails = (id: string) => {
  return axios.get<LoyaltyProgram>(
    `${API_URL}/loyalty/${id}`,
    getAuthHeaders()
  );
};

const getUserSubscriptions = (programId: string) => {
  return axios.get<Subscription[]>(
    `${API_SUBSCRIBE_URL}/user/${programId}`,
    getAuthHeaders()
  );
};

const trackUsage = (qrCode: string) => {
  return axios.post(
    `${API_SUBSCRIBE_URL}/trackUsage`,
    { qrCode },
    getAuthHeaders()
  );
};

export default {
  getLoyaltyPrograms,
  createLoyaltyProgram,
  updateLoyaltyProgram,
  deleteLoyaltyProgram,
  getLoyaltyProgramDetails,
  getUserSubscriptions,
  trackUsage,
};
