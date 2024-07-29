import { useState } from "react";
import authService from "../services/authService";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(email, password);
      console.log("Register response:", response);
      return response;
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      console.log("Login response:", response);
      return response;
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please check your credentials and try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.resetPassword(email);
      console.log("Reset password response:", response);
      return response;
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Failed to send reset password email. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    resetPassword,
    loading,
    error,
  };
};

export default useAuth;
