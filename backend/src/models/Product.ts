// src/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  handle: string;
  sku: string;
  productName: string;
  description: string;
  productCategory: string;
  productVariantOne: string;
  productVariantOneValue: string;
  productVariantTwo: string;
  productVariantTwoValue: string;
  productVariantThree: string;
  productVariantThreeValue: string;
  supplyPrice: number;
  retailPrice: number;
  averageCost: number;
  inventory: number;
  brand: string;
  supplier: string;
  supplierCode: string;
  active: string;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  handle: { type: String, required: true, default: "unknown-handle" },
  sku: { type: String, required: true, default: "unknown-sku" },
  productName: { type: String, required: true, default: "Unnamed Product" },
  description: { type: String, required: true, default: "No description" },
  productCategory: { type: String, required: true, default: "Uncategorized" },
  productVariantOne: { type: String, required: true, default: "N/A" },
  productVariantOneValue: { type: String, required: true, default: "N/A" },
  productVariantTwo: { type: String, required: true, default: "N/A" },
  productVariantTwoValue: { type: String, required: true, default: "N/A" },
  productVariantThree: { type: String, required: true, default: "N/A" },
  productVariantThreeValue: { type: String, required: true, default: "N/A" },
  supplyPrice: { type: Number, required: true, default: 0 },
  retailPrice: { type: Number, required: true, default: 0 },
  averageCost: { type: Number, required: true, default: 0 },
  inventory: { type: Number, required: true, default: 0 },
  brand: { type: String, required: true, default: "Unknown" },
  supplier: { type: String, required: true, default: "Unknown" },
  supplierCode: { type: String, required: true, default: "unknown-code" },
  active: { type: String, required: true, default: "unknown-active" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
