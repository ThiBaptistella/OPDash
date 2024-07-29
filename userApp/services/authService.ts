import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5002/api/users";

const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    console.log("Register API response:", response.data);
    await AsyncStorage.setItem("userId", response.data.user._id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    await AsyncStorage.setItem("userId", response.data.user._id);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const resetPassword = (email: string) => {
  return axios.post(`${API_URL}/reset-password`, { email });
};

export default {
  register,
  resetPassword,
  login,
};
