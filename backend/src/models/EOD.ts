// src/models/EOD.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IEOD extends Document {
  date: string;
  openingTillAmount: number;
  closingTillAmount: number;
  cashTakingsAmount: number;
  eftposAfterpay: number;
  staff: string;
  dateBanked: string;
}

const EODSchema: Schema = new Schema({
  date: { type: String, required: true },
  openingTillAmount: { type: Number, required: true },
  closingTillAmount: { type: Number, required: true },
  cashTakingsAmount: { type: Number, required: true },
  eftposAfterpay: { type: Number, required: true },
  staff: { type: String, required: true },
  dateBanked: { type: String, required: true },
});

export default mongoose.model<IEOD>("EOD", EODSchema);
