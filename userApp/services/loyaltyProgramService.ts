import axios from "axios";
import { LoyaltyProgram } from "../types/loyaltyProgram";

const API_URL = "http://localhost:5002/api/loyaltyPrograms";

const getLoyaltyPrograms = () => {
  return axios.get<LoyaltyProgram[]>(`${API_URL}/loyalty`);
};

const subscribeToProgram = (programId: string) => {
  return axios.post(`${API_URL}/subscribe`, { programId });
};

export default {
  getLoyaltyPrograms,
  subscribeToProgram,
};
