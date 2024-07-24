import { useState } from "react";
import loyaltyProgramService from "../services/loyaltyProgramService";

const useTrackUsage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [subscription, setSubscription] = useState(null);

  const trackUsage = async (qrCode: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await loyaltyProgramService.trackUsage(qrCode);
      setSuccess("Usage tracked successfully.");
      setSubscription(response.data.subscription);
    } catch (error) {
      setError("Failed to track usage. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    trackUsage,
    loading,
    error,
    success,
    subscription,
  };
};

export default useTrackUsage;
