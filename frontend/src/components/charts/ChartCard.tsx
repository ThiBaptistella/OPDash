// src/components/charts/ChartCard.tsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

interface ChartCardProps {
  title: string;
  subtitle: string;
  amount: string;
  chartData: number[];
  status: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  amount,
  chartData,
  status,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: Array(chartData.length).fill(""),
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
    },
  };

  const series = [
    {
      name: status,
      data: chartData,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
        <Typography variant="h4">{amount}</Typography>
        <Box>
          <Chart options={options} series={series} type="line" height={350} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
