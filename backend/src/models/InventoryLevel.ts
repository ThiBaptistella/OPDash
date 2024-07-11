// src/models/InventoryLevel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface InventoryLevel extends Document {
  inventoryItem: mongoose.Types.ObjectId; // Reference to InventoryItem
  location: mongoose.Types.ObjectId; // Reference to Location
  quantity: number;
}

const InventoryLevelSchema: Schema = new Schema({
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<InventoryLevel>(
  "InventoryLevel",
  InventoryLevelSchema
);
