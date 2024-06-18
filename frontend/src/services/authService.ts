// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

const register = (name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { name, email, password });
};

const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")!);
};

export default {
  register,
  login,
  getCurrentUser,
};
