// src/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";
import { ISupplier } from "./Supplier";

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
  brand: string;
  supplier: mongoose.Types.ObjectId;
  supplierCode: string;
  active: string;
  createdAt: Date;
  barcode?: string;
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
  brand: { type: String, required: true, default: "Unknown" },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  supplierCode: { type: String, required: true, default: "unknown-code" },
  active: { type: String, required: true, default: "unknown-active" },
  createdAt: { type: Date, default: Date.now },
  barcode: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
