// src/pages/Dashboard.tsx
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FinancialForecastChart from "../components/charts/FinancialForecastChart";
import HistoricalProfitAndLossChart from "../components/charts/HistoricalProfitAndLossChart";
import useTrialBalance from "../hooks/useTrialBalance";
import useProfitAndLoss from "../hooks/useProfitAndLoss";
import { parseTrialBalanceData } from "../utils/parseTrialBalance";
import { parseProfitAndLossData } from "../utils/parseProfitAndLoss";
import {
  ParsedProfitAndLoss,
  ParsedTrialBalance,
  HistoricalProfitAndLoss,
} from "../types";

export default function Dashboard() {
  const {
    trialBalance,
    loading: loadingTrialBalance,
    error: errorTrialBalance,
  } = useTrialBalance();
  const {
    profitAndLoss,
    loading: loadingProfitAndLoss,
    error: errorProfitAndLoss,
  } = useProfitAndLoss();

  if (loadingTrialBalance || loadingProfitAndLoss) {
    return <div>Loading...</div>;
  }

  if (errorTrialBalance || errorProfitAndLoss) {
    return <div>Error loading data</div>;
  }

  let parsedTrialBalanceData: ParsedTrialBalance | undefined;
  let parsedProfitAndLossData: ParsedProfitAndLoss | undefined;

  try {
    if (trialBalance) {
      parsedTrialBalanceData = parseTrialBalanceData(trialBalance);
    }
  } catch (e) {
    console.error("Error parsing trial balance data:", e);
    return <div>Error parsing trial balance data</div>;
  }
  try {
    if (profitAndLoss) {
      parsedProfitAndLossData = parseProfitAndLossData(profitAndLoss);
    }
  } catch (e) {
    console.error("Error parsing profit and loss data:", e);
    return <div>Error parsing profit and loss data</div>;
  }

  if (!parsedTrialBalanceData || !parsedProfitAndLossData) {
    return <div>Invalid data</div>;
  }

  // Create historical profit and loss data for the chart
  const historicalData: HistoricalProfitAndLoss[] =
    parsedProfitAndLossData.categories.map((category, index) => ({
      period: category,
      revenue: parsedProfitAndLossData!.revenue[index],
      expenses: parsedProfitAndLossData!.expenses[index],
    }));

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HistoricalProfitAndLossChart data={historicalData} />
        </Grid>
        <Grid item xs={12}>
          <FinancialForecastChart data={parsedProfitAndLossData} />
        </Grid>
      </Grid>
    </Container>
  );
}
