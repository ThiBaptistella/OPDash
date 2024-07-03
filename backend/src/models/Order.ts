// src/models/Order.ts
import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";
import { ISupplier } from "./Supplier";

export interface IOrder extends Document {
  products: {
    product: IProduct["_id"];
    quantity: number;
    price: number;
  }[];
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: Date;
  totalAmount: number;
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
});

export default mongoose.model<IOrder>("Order", OrderSchema);
