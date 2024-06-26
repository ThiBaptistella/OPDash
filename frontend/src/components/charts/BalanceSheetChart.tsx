import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  BarController,
} from "chart.js";
import { ParsedBalanceSheet } from "../../types/BalanceSheet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

interface BalanceSheetChartProps {
  data: ParsedBalanceSheet;
}

const BalanceSheetChart: React.FC<BalanceSheetChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<"bar", number[], string> | null>(null);

  const chartData: ChartData<"bar", number[], string> = {
    labels: ["Assets", "Liabilities", "Equity"],
    datasets: [
      {
        label: "Balance Sheet",
        data: [data.assetsTotal, data.liabilitiesTotal, data.equityTotal],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Balance Sheet",
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = (
      document.getElementById("balanceSheetChart") as HTMLCanvasElement
    ).getContext("2d");
    if (ctx) {
      chartRef.current = new ChartJS(ctx, {
        type: "bar",
        data: chartData,
        options,
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return <canvas id="balanceSheetChart" />;
};

export default BalanceSheetChart;
