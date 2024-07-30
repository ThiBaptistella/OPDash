import { useState, useEffect } from "react";
import loyaltyProgramService from "../services/loyaltyProgramService";
import { LoyaltyProgram } from "../types/loyaltyProgram";

const useLoyaltyPrograms = () => {
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<LoyaltyProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoyaltyPrograms = async () => {
    setLoading(true);
    try {
      const response = await loyaltyProgramService.getLoyaltyPrograms();
      setLoyaltyPrograms(response.data);
    } catch (error) {
      setError("Failed to fetch loyalty programs");
    } finally {
      setLoading(false);
    }
  };

  const subscribeToProgram = async (userId: string, programId: string) => {
    try {
      const response = await loyaltyProgramService.subscribeToProgram(
        userId,
        programId
      );
      return response;
    } catch (error) {
      setError((error as any).message);
      throw error;
    }
  };

  const unsubscribeFromProgram = async (userId: string, programId: string) => {
    try {
      await loyaltyProgramService.unsubscribeFromProgram(userId, programId);
    } catch (error) {
      setError((error as any).message);
      throw error;
    }
  };

  useEffect(() => {
    fetchLoyaltyPrograms();
  }, []);

  return {
    loyaltyPrograms,
    fetchLoyaltyPrograms,
    subscribeToProgram,
    unsubscribeFromProgram,
    loading,
    error,
  };
};

export default useLoyaltyPrograms;
