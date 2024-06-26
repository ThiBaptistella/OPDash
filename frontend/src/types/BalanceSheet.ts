export interface BalanceSheetReport {
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

export interface Row {
  rowType: string;
  title?: string;
  cells?: Cell[];
  rows?: Row[];
}

interface Cell {
  value: string;
}

export interface ParsedBalanceSheet {
  balanceDate: string;
  assetsTotal: number;
  liabilitiesTotal: number;
  equityTotal: number;
}
