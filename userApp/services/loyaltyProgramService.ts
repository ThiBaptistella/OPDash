import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoyaltyProgram } from "../types/loyaltyProgram";

const API_URL = "http://localhost:5002/api/loyaltyPrograms";
const SUBSCRIPTION_API_URL = "http://localhost:5002/api/subscriptions";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getLoyaltyPrograms = async () => {
  const headers = await getAuthHeaders();
  return axios.get<LoyaltyProgram[]>(`${API_URL}/loyalty`, headers);
};

const subscribeToProgram = async (userId: string, programId: string) => {
  const headers = await getAuthHeaders();
  return axios.post(
    `${SUBSCRIPTION_API_URL}/subscribe`,
    { userId, programId },
    headers
  );
};

export default {
  getLoyaltyPrograms,
  subscribeToProgram,
};
