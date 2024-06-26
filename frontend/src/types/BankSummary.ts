export interface BankSummaryReport {
  reports: Report[];
}

interface Report {
  reportID: string;
  reportName: string;
  reportType: string;
  reportTitles: string[];
  reportDate: string;
  updatedDateUTC: string;
  rows: Row[];
}

interface Row {
  rowType: string;
  title?: string;
  cells?: Cell[];
  rows?: Row[];
}

interface Cell {
  value: string;
}

export interface ParsedBankSummary {
  reportDate: string;
  accounts: Account[];
}

interface Account {
  inflows: number;
  outflows: number;
  name: string;
  balance: number;
  cashMovement: number;
}
