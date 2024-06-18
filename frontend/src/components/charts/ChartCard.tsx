// src/components/charts/ChartCard.tsx
import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartCardProps {
  title: string;
  subtitle: string;
  amount: string;
  chartData: number[];
  status: string;
  color: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  amount,
  chartData,
  status,
  color,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 100,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    colors: [color],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
      marker: {
        show: false,
      },
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
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" align="right">
              {amount}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box mt={2}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={100}
        />
      </Box>
    </Card>
  );
};

export default ChartCard;
