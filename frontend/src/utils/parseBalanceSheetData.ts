import {
  BalanceSheetReport,
  ParsedBalanceSheet,
  Row,
} from "../types/BalanceSheet";

export function parseBalanceSheetData(
  data: BalanceSheetReport
): ParsedBalanceSheet | null {
  if (
    !data ||
    !data.reports ||
    data.reports.length === 0 ||
    !data.reports[0].rows
  ) {
    console.error("Invalid balance sheet structure:", data);
    return null;
  }

  const report = data.reports[0];
  const balanceDate = report.reportDate;
  let assetsTotal = 0;
  let liabilitiesTotal = 0;
  let equityTotal = 0;

  report.rows.forEach((row) => {
    if (row.title === "Assets") {
      assetsTotal = calculateTotal(row.rows || []);
    } else if (row.title === "Liabilities") {
      liabilitiesTotal = calculateTotal(row.rows || []);
    } else if (row.title === "Equity") {
      equityTotal = calculateTotal(row.rows || []);
    }
  });

  return {
    balanceDate,
    assetsTotal,
    liabilitiesTotal,
    equityTotal,
  };
}

const calculateTotal = (rows: Row[]): number => {
  return rows.reduce((total, row) => {
    if (row.cells && row.cells[1] && row.cells[1].value) {
      const value = parseFloat(row.cells[1].value.replace(/,/g, ""));
      return total + value;
    }
    if (row.rows) {
      return total + calculateTotal(row.rows);
    }
    return total;
  }, 0);
};
