import { useState, useEffect } from "react";
import loyaltyProgramService from "../services/loyaltyProgramService";
import { LoyaltyProgram } from "../types";

const useLoyaltyPrograms = () => {
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<LoyaltyProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoyaltyPrograms = async () => {
      setLoading(true);
      try {
        const response = await loyaltyProgramService.getLoyaltyPrograms();
        setLoyaltyPrograms(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyPrograms();
  }, []);

  const subscribeToProgram = async (userId: string, programId: string) => {
    const response = await loyaltyProgramService.subscribeToProgram(
      userId,
      programId
    );
    return response.data.qrCode;
  };

  const createLoyaltyProgram = async (program: LoyaltyProgram) => {
    try {
      const response = await loyaltyProgramService.createLoyaltyProgram(
        program
      );
      setLoyaltyPrograms((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateLoyaltyProgram = async (
    id: string,
    program: Partial<LoyaltyProgram>
  ) => {
    try {
      const response = await loyaltyProgramService.updateLoyaltyProgram(
        id,
        program
      );
      setLoyaltyPrograms((prevPrograms) =>
        prevPrograms.map((prog) => (prog._id === id ? response.data : prog))
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  const deleteLoyaltyProgram = async (id: string) => {
    try {
      await loyaltyProgramService.deleteLoyaltyProgram(id);
      setLoyaltyPrograms((prevPrograms) =>
        prevPrograms.filter((prog) => prog._id !== id)
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  return {
    loyaltyPrograms,
    createLoyaltyProgram,
    updateLoyaltyProgram,
    deleteLoyaltyProgram,
    loading,
    error,
    subscribeToProgram,
  };
};

export default useLoyaltyPrograms;
