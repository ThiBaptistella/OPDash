// src/hooks/useLoyaltyProgramDetails.ts
import { useState, useEffect } from "react";
import loyaltyProgramService from "../services/loyaltyProgramService";
import { LoyaltyProgram, Subscription } from "../types";

const useLoyaltyProgramDetails = (programId: string) => {
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      setLoading(true);
      try {
        const programResponse =
          await loyaltyProgramService.getLoyaltyProgramDetails(programId);
        setProgram(programResponse.data);

        const subscriptionsResponse =
          await loyaltyProgramService.getUserSubscriptions(programId);
        setSubscriptions(subscriptionsResponse.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  const trackUsage = async (qrCode: string) => {
    try {
      await loyaltyProgramService.trackUsage(qrCode);
      // Refresh subscriptions to get updated usage count
      const subscriptionsResponse =
        await loyaltyProgramService.getUserSubscriptions(programId);
      setSubscriptions(subscriptionsResponse.data);
    } catch (error) {
      setError((error as any).message);
      throw error;
    }
  };

  return {
    program,
    subscriptions,
    loading,
    error,
    trackUsage,
  };
};

export default useLoyaltyProgramDetails;
