import React from "react";
import { Bar } from "react-chartjs-2";
import { ParsedBankSummary } from "../../types/BankSummary";

interface BankSummaryChartProps {
  data: ParsedBankSummary;
}

const BankSummaryChart: React.FC<BankSummaryChartProps> = ({ data }) => {
  const chartData = {
    labels: data.accounts.map((account) => account.name),
    datasets: [
      {
        label: "Balance",
        data: data.accounts.map((account) => account.balance),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Cash Movement",
        data: data.accounts.map((account) => account.cashMovement),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
      {
        label: "Inflows",
        data: data.accounts.map((account) => account.inflows),
        backgroundColor: "rgba(54,162,235,0.6)",
      },
      {
        label: "Outflows",
        data: data.accounts.map((account) => account.outflows),
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Bank Summary</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: "Bank Accounts",
              },
            },
            y: {
              title: {
                display: true,
                text: "Amount",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BankSummaryChart;
