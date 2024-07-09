// src/models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "../types/Products";
import { ISupplier } from "../types/Supplier";

export interface Order extends Document {
  products: {
    product: IProduct | string;
    quantity: number;
    price: number;
  }[];
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: Date;
  totalAmount: number;
  supplier: ISupplier | string;
}

const OrderSchema: Schema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  orderDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
});

export default mongoose.model<Order>("Order", OrderSchema);
