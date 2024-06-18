// src/components/StatisticCard.tsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatisticCardProps {
  title: string;
  value: number | string;
  color: string;
  icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  color,
  icon,
}) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4" color={color}>
            {value}
          </Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

export default StatisticCard;
