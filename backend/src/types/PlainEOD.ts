// src/types/PlainEOD.ts
export interface PlainEOD {
  date: string;
  openingTillAmount: number;
  closingTillAmount: number;
  cashTakingsAmount: number;
  eftposAfterpay: number;
  staff: string;
  dateBanked: string;
}
