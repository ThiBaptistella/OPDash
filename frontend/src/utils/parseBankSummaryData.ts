import { BankSummaryReport, ParsedBankSummary } from "../types/BankSummary";

export function parseBankSummaryData(
  data: BankSummaryReport
): ParsedBankSummary {
  if (
    !data ||
    !data.reports ||
    data.reports.length === 0 ||
    !data.reports[0].rows
  ) {
    throw new Error("Invalid bank summary structure");
  }

  const report = data.reports[0];
  const sectionRow = report.rows.find((row) => row.rowType === "Section");

  if (!sectionRow || !sectionRow.rows) {
    throw new Error("Invalid section row structure");
  }

  const accounts = sectionRow.rows
    .filter((row) => row.rowType === "Row")
    .map((row) => ({
      name: row.cells ? row.cells[0].value : "",
      balance: row.cells ? parseFloat(row.cells[1].value.replace(/,/g, "")) : 0,
      inflows: row.cells ? parseFloat(row.cells[2].value.replace(/,/g, "")) : 0,
      outflows: row.cells
        ? parseFloat(row.cells[3].value.replace(/,/g, ""))
        : 0,
      cashMovement: row.cells
        ? parseFloat(row.cells[4].value.replace(/,/g, ""))
        : 0,
    }));

  return {
    reportDate: report.reportDate,
    accounts,
  };
}
