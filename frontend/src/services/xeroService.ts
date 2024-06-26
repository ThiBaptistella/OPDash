// src/services/xeroService.ts
import axios from "axios";

const API_URL = "http://localhost:5002/api/reports";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getBalanceSheet = () => {
  return axios.get(`${API_URL}/balanceSheet`, getAuthHeaders());
};

const getBankSummary = () => {
  return axios.get(`${API_URL}/bankSummary`, getAuthHeaders());
};

const getBudgetSummary = () => {
  return axios.get(`${API_URL}/budgetSummary`, getAuthHeaders());
};

const getExecutiveSummary = () => {
  return axios.get(`${API_URL}/executiveSummary`, getAuthHeaders());
};

const getProfitAndLoss = () => {
  return axios.get(`${API_URL}/profitAndLoss`, getAuthHeaders());
};

const getTrialBalance = () => {
  return axios.get(`${API_URL}/trialBalance`, getAuthHeaders());
};

export default {
  getBalanceSheet,
  getBankSummary,
  getBudgetSummary,
  getExecutiveSummary,
  getProfitAndLoss,
  getTrialBalance,
};
