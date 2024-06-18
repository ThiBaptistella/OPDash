import {
  ProfitAndLossReport,
  ParsedProfitAndLoss,
} from "../types/ProfitAndLoss";

export function parseProfitAndLossData(
  data: ProfitAndLossReport
): ParsedProfitAndLoss {
  if (!data.reports || !data.reports[0] || !data.reports[0].rows) {
    throw new Error("Invalid report structure");
  }

  const categories: string[] = [];
  const revenue: number[] = [];
  const expenses: number[] = [];
  let currentSection: "Income" | "Expenses" | null = null;

  const parseRows = (rows: any[], section: "Income" | "Expenses" | null) => {
    rows.forEach((row) => {
      if (row.RowType === "Section" && row.Title) {
        section =
          row.Title.trim().toLowerCase() === "income"
            ? "Income"
            : row.Title.trim().toLowerCase() === "expenses"
            ? "Expenses"
            : section;
      }

      if (section && row.RowType === "Row" && row.Cells) {
        const value = parseFloat(row.Cells[1]?.Value.replace(/,/g, "") || "0");

        if (section === "Income") {
          categories.push(row.Cells[0]?.Value || "Unknown");
          revenue.push(value);
        } else if (section === "Expenses") {
          categories.push(row.Cells[0]?.Value || "Unknown");
          expenses.push(value);
        }
      }

      if (row.RowType === "SummaryRow" && row.Cells) {
        if (row.Cells[0]?.Value.trim().toLowerCase() === "net profit") {
          categories.push("Net Profit");
          const netProfit = parseFloat(
            row.Cells[1]?.Value.replace(/,/g, "") || "0"
          );
          if (netProfit > 0) {
            revenue.push(netProfit);
            expenses.push(0);
          } else {
            expenses.push(-netProfit);
            revenue.push(0);
          }
        }
      }

      if (row.Rows) {
        parseRows(row.Rows, section);
      }
    });
  };

  parseRows(data.reports[0].rows, currentSection);

  return {
    categories,
    revenue,
    expenses,
  };
}
