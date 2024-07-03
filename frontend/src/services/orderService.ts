// src/services/orderService.ts
import axios from "axios";
import { Order } from "../types";

const API_URL = "http://localhost:5002/api/orders";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getOrders = () => {
  return axios.get<Order[]>(`${API_URL}/orders`, getAuthHeaders());
};

const addOrder = (order: Order) => {
  return axios.post(`${API_URL}/orders`, order, getAuthHeaders());
};

const updateOrder = (id: string, order: Partial<Order>) => {
  return axios.put<Order>(`${API_URL}/orders/${id}`, order, getAuthHeaders());
};

const deleteOrder = (id: string) => {
  return axios.delete(`${API_URL}/orders/${id}`, getAuthHeaders());
};

export default {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
