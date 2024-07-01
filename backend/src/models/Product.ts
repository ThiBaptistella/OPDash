// src/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  brand: string;
  supplier: string;
  inventory: number;
  retailPrice: number;
  createdAt: Date;
  type: string;
  supplierCode: string;
  averageCost: number;
  supplyPrice: number;
  handle: string;
  description: string;
  sku: string;
}

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  supplier: { type: String, required: true },
  inventory: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, required: true },
  supplierCode: { type: String, required: true },
  averageCost: { type: Number, required: true },
  supplyPrice: { type: Number, required: true },
  handle: { type: String, required: true },
  description: { type: String, required: true },
  sku: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
