import { useState, useEffect } from "react";
import axios from "axios";
import { TrialBalanceReport } from "../types/TrialBalance";

const useTrialBalance = () => {
  const [trialBalance, setTrialBalance] = useState<TrialBalanceReport | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrialBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching trial balance...");
        const response = await axios.get<TrialBalanceReport>(
          "http://localhost:5001/api/reports/trialBalance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Trial Balance Data:", response.data);
        setTrialBalance(response.data);
      } catch (error: any) {
        console.error("Error fetching trial balance:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrialBalance();
  }, []);

  return { trialBalance, loading, error };
};

export default useTrialBalance;
