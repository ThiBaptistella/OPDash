// src/models/Sale.ts
import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

export interface ISale extends Document {
  product: IProduct | mongoose.Types.ObjectId;
  receiptNumber: string;
  lineType: string;
  customerCode: string;
  customerName: string;
  note: string;
  quantity: number;
  subtotal: number;
  salesTax: number;
  discount: number;
  loyalty: number;
  total: number;
  paid: number;
  details: string;
  register: string;
  user: string;
  status: string;
  sku: string;
  accountCodeSale: string;
  accountCodePurchase: string;
  saleDate: Date;
}

const SaleSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  receiptNumber: { type: String, required: true },
  lineType: { type: String, required: true },
  customerCode: { type: String, required: true },
  customerName: { type: String, required: true },
  note: { type: String, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  salesTax: { type: Number, required: true },
  discount: { type: Number, required: true },
  loyalty: { type: Number, required: true },
  total: { type: Number, required: true },
  paid: { type: Number, required: true },
  details: { type: String, required: true },
  register: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, required: true },
  sku: { type: String, required: true },
  accountCodeSale: { type: String, required: true },
  accountCodePurchase: { type: String, required: true },
  saleDate: { type: Date, required: true },
});

export default mongoose.model<ISale>("Sale", SaleSchema);
