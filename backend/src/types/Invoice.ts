// src/types/Invoice.ts
export interface IInvoice {
  receiptId: string;
  issueDate: string;
  accountName: string;
  accountCity: string;
  paymentDate: string;
  dueDate: string;
  tax: string;
  balance: string;
  status: string;
}
