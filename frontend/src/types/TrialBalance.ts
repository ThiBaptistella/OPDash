export interface TrialBalanceReport {
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
  fields: any[];
}

interface Row {
  rowType: string;
  title?: string;
  rows?: Row[];
  cells?: Cell[];
}

interface Cell {
  value: string;
  attributes?: Attribute[];
}

interface Attribute {
  id: string;
  value: string;
}

export interface ParsedTrialBalance {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}
