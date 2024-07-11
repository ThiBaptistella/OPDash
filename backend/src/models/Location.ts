// src/models/Location.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Location extends Document {
  name: string;
  address: string;
}

const LocationSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

export default mongoose.model<Location>("Location", LocationSchema);
