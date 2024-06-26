// src/hooks/useXeroReports.ts
import { useState, useEffect } from "react";
import xeroService from "../services/xeroService";

const useXeroReports = () => {
  const [balanceSheet, setBalanceSheet] = useState<any>(null);
  const [bankSummary, setBankSummary] = useState<any>(null);
  const [budgetSummary, setBudgetSummary] = useState<any>(null);
  const [executiveSummary, setExecutiveSummary] = useState<any>(null);
  const [profitAndLoss, setProfitAndLoss] = useState<any>(null);
  const [trialBalance, setTrialBalance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const [
          balanceSheetResponse,
          bankSummaryResponse,
          budgetSummaryResponse,
          executiveSummaryResponse,
          profitAndLossResponse,
          trialBalanceResponse,
        ] = await Promise.all([
          xeroService.getBalanceSheet(),
          xeroService.getBankSummary(),
          xeroService.getBudgetSummary(),
          xeroService.getExecutiveSummary(),
          xeroService.getProfitAndLoss(),
          xeroService.getTrialBalance(),
        ]);

        setBalanceSheet(balanceSheetResponse.data);
        setBankSummary(bankSummaryResponse.data);
        setBudgetSummary(budgetSummaryResponse.data);
        setExecutiveSummary(executiveSummaryResponse.data);
        setProfitAndLoss(profitAndLossResponse.data);
        setTrialBalance(trialBalanceResponse.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return {
    balanceSheet,
    bankSummary,
    budgetSummary,
    executiveSummary,
    profitAndLoss,
    trialBalance,
    loading,
    error,
  };
};

export default useXeroReports;
