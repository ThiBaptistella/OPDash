import { useState, useEffect } from "react";
import loyaltyProgramService from "../services/loyaltyProgramService";
import { LoyaltyProgram, TierBasedProgram } from "../types";

const useTierBasedPrograms = () => {
  const [tierBasedPrograms, setTierBasedPrograms] = useState<
    TierBasedProgram[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTierBasedPrograms = async () => {
      setLoading(true);
      try {
        const response = await loyaltyProgramService.getLoyaltyPrograms(); // Assuming this returns an array of mixed programs
        const tierPrograms = response.data.filter(
          (program: LoyaltyProgram): program is TierBasedProgram =>
            program.type === "Tier Based Program"
        );
        setTierBasedPrograms(tierPrograms);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTierBasedPrograms();
  }, []);

  const createTierBasedProgram = async (program: TierBasedProgram) => {
    try {
      const response = await loyaltyProgramService.createTierBasedProgram(
        program
      );
      setTierBasedPrograms((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateTierBasedProgram = async (
    id: string,
    program: Partial<TierBasedProgram>
  ) => {
    try {
      const response = await loyaltyProgramService.updateTierBasedProgram(
        id,
        program
      );
      const updatedProgram = response.data as TierBasedProgram;

      setTierBasedPrograms((prevPrograms) =>
        prevPrograms.map((prog) => (prog._id === id ? updatedProgram : prog))
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  return {
    tierBasedPrograms,
    createTierBasedProgram,
    updateTierBasedProgram,
    loading,
    error,
  };
};

export default useTierBasedPrograms;
