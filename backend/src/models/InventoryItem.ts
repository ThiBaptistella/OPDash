// src/models/InventoryItem.ts
import mongoose, { Schema, Document } from "mongoose";

export interface InventoryItem extends Document {
  sku: string;
  product: mongoose.Types.ObjectId; // Reference to Product
  tracked: boolean;
}

const InventoryItemSchema: Schema = new Schema({
  sku: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  tracked: { type: Boolean, default: true },
});

export default mongoose.model<InventoryItem>(
  "InventoryItem",
  InventoryItemSchema
);
