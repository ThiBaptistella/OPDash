import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ParsedProfitAndLoss } from "../../types";
import { forecastFinancials } from "../../utils/forecasting";

interface FinancialForecastChartProps {
  data: ParsedProfitAndLoss;
}

const FinancialForecastChart: React.FC<FinancialForecastChartProps> = ({
  data,
}) => {
  const { categories, revenue, expenses } = data;
  const [combinedCategories, setCombinedCategories] = useState<string[]>([]);
  const [combinedRevenue, setCombinedRevenue] = useState<number[]>([]);
  const [combinedExpenses, setCombinedExpenses] = useState<number[]>([]);

  useEffect(() => {
    const getForecastData = async () => {
      const forecast = await forecastFinancials(categories, revenue, expenses);

      setCombinedCategories([...categories, ...forecast.futureCategories]);
      setCombinedRevenue([...revenue, ...forecast.futureRevenue.flat()]);
      setCombinedExpenses([...expenses, ...forecast.futureExpenses.flat()]);
    };

    getForecastData();
  }, [categories, revenue, expenses]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: combinedCategories,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Financial Forecasting",
      align: "left",
    },
  };

  const series = [
    {
      name: "Revenue",
      data: combinedRevenue,
    },
    {
      name: "Expenses",
      data: combinedExpenses,
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default FinancialForecastChart;
