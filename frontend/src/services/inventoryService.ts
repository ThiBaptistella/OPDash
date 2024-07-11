import axios from "axios";
import { InventoryItem, InventoryLevel, Location } from "../types";

const API_URL = "http://localhost:5002/api/inventory";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getInventoryItems = () => {
  return axios.get<InventoryItem[]>(
    `${API_URL}/inventory-items`,
    getAuthHeaders()
  );
};

const getInventoryLevels = () => {
  return axios.get<InventoryLevel[]>(
    `${API_URL}/inventory-levels`,
    getAuthHeaders()
  );
};

const getLocations = () => {
  return axios.get<Location[]>(`${API_URL}/locations`, getAuthHeaders());
};

const addInventoryItem = (item: InventoryItem) => {
  return axios.post(`${API_URL}/inventory-items`, item, getAuthHeaders());
};

const updateInventoryItem = (id: string, item: Partial<InventoryItem>) => {
  return axios.put<InventoryItem>(
    `${API_URL}/inventory-items/${id}`,
    item,
    getAuthHeaders()
  );
};

const deleteInventoryItem = (id: string) => {
  return axios.delete(`${API_URL}/inventory-items/${id}`, getAuthHeaders());
};

export default {
  getInventoryItems,
  getInventoryLevels,
  getLocations,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
