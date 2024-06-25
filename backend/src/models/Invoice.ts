import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  receiptId: string;
  issueDate: string;
  accountName: string;
  accountCity: string;
  paymentDate: string;
  dueDate: string;
  tax: string;
  balance: number;
  status: string;
}

const InvoiceSchema: Schema = new Schema({
  receiptId: { type: String, required: true },
  issueDate: { type: String, required: true },
  accountName: { type: String, required: true },
  accountCity: { type: String, required: true },
  paymentDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  tax: { type: String, required: true },
  balance: { type: Number, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IInvoice>("Invoice", InvoiceSchema);
