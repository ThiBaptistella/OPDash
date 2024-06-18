// src/types/ProfitAndLoss.ts

export interface ProfitAndLossReport {
  reports: Report[];
}

interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  rows: Row[];
}

interface Row {
  RowType: string;
  Title?: string;
  Cells?: Cell[];
}

interface Cell {
  Value: string;
}

export interface ParsedProfitAndLoss {
  categories: string[];
  revenue: number[];
  expenses: number[];
}

export interface HistoricalProfitAndLoss {
  period: string;
  revenue: number;
  expenses: number;
}
