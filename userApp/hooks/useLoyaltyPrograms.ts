import { useState, useEffect } from "react";
import loyaltyProgramService from "../services/loyaltyProgramService";
import { LoyaltyProgram } from "../types/loyaltyProgram";

const useLoyaltyPrograms = () => {
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<LoyaltyProgram[]>([]);

  const fetchLoyaltyPrograms = async () => {
    const response = await loyaltyProgramService.getLoyaltyPrograms();
    setLoyaltyPrograms(response.data);
  };

  const subscribeToProgram = async (programId: string) => {
    await loyaltyProgramService.subscribeToProgram(programId);
    // handle success or error feedback
  };

  return {
    loyaltyPrograms,
    fetchLoyaltyPrograms,
    subscribeToProgram,
  };
};

export default useLoyaltyPrograms;
