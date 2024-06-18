import { useState, useEffect } from "react";
import axios from "axios";
import { ProfitAndLossReport } from "../types/ProfitAndLoss";

const useProfitAndLoss = () => {
  const [profitAndLoss, setProfitAndLoss] =
    useState<ProfitAndLossReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfitAndLoss = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<ProfitAndLossReport>(
          "http://localhost:5001/api/Reports/ProfitAndLoss",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfitAndLoss(response.data);
      } catch (error: any) {
        console.error("Error fetching profit and loss:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfitAndLoss();
  }, []);

  return { profitAndLoss, loading, error };
};

export default useProfitAndLoss;
