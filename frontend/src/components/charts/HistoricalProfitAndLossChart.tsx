// src/components/charts/HistoricalProfitAndLossChart.tsx
import React from "react";
import Chart from "react-apexcharts";
import { HistoricalProfitAndLoss } from "../../types/ProfitAndLoss";

interface HistoricalProfitAndLossChartProps {
  data: HistoricalProfitAndLoss[];
}

const HistoricalProfitAndLossChart: React.FC<
  HistoricalProfitAndLossChartProps
> = ({ data }) => {
  const categories = data.map((item) => item.period);
  const revenueSeries = data.map((item) => item.revenue);
  const expensesSeries = data.map((item) => item.expenses);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Revenue",
      data: revenueSeries,
    },
    {
      name: "Expenses",
      data: expensesSeries,
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default HistoricalProfitAndLossChart;
