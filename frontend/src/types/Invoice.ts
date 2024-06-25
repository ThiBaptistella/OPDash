export type Status = "Paid" | "Pending" | "Overdue";

export interface Invoice {
  _id: any;
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
