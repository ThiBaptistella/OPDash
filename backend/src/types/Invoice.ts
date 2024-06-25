// src/types/Invoice.ts

export interface IInvoiceResponse {
  extracted_text: string;
  prediction: number;
  extracted_data: IInvoice;
}

export type Status = "Paid" | "Pending" | "Overdue";

export interface IInvoice {
  receiptId: string;
  issueDate: string;
  accountName: string;
  accountCity: string;
  paymentDate: string;
  dueDate: string;
  tax: string;
  balance: number;
  status: Status;
}

export type ExtractedData = {
  receiptId: string;
  issueDate: string;
  accountName: string;
  accountCity: string;
  paymentDate: string;
  dueDate: string;
  tax: string;
  balance: number;
  status: Status;
};
