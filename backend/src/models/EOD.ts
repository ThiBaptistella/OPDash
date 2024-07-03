// src/models/EOD.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IEOD extends Document {
  register: string;
  sequence: string;
  opened: Date;
  closed: Date;
  xeroAmount: number;
  xeroPosted: string;
  xeroCreditNoteAmount: number;
  xeroCreditNotePosted: string;
  giftCardAmount: number;
  giftCardPosted: string;
  cashRoundingAmount: number;
  cashRoundingPosted: string;
  eftposCommbankAmount: number;
  eftposCommbankPosted: string;
  smartpayAmount: number;
  smartpayPosted: string;
  shopbackAmount: number;
  shopbackPosted: string;
  lightspeedPaymentsAmount: number;
  lightspeedPaymentsPosted: string;
  amexAmount: number;
  amexPosted: string;
  squareAmount: number;
  squarePosted: string;
  storeCreditAmount: number;
  storeCreditPosted: string;
  zipPayAmount: number;
  zipPayPosted: string;
  otherPaymentMethodAmount: number;
  otherPaymentMethodPosted: string;
  afterpayManualAmount: number;
  afterpayManualPosted: string;
  cashAmount: number;
  cashPosted: string;
  zellerT1Amount: number;
  zellerT1Posted: string;
  eftposNewAfterpayAmount: number;
  eftposNewAfterpayPosted: string;
  total: number;
}

const EODSchema: Schema = new Schema({
  register: { type: String, required: true },
  sequence: { type: String, required: true },
  opened: { type: Date, required: true },
  closed: { type: Date, required: true },
  xeroAmount: { type: Number, required: true },
  xeroPosted: { type: String, required: true },
  xeroCreditNoteAmount: { type: Number, required: true },
  xeroCreditNotePosted: { type: String, required: true },
  giftCardAmount: { type: Number, required: true },
  giftCardPosted: { type: String, required: true },
  cashRoundingAmount: { type: Number, required: true },
  cashRoundingPosted: { type: String, required: true },
  eftposCommbankAmount: { type: Number, required: true },
  eftposCommbankPosted: { type: String, required: true },
  smartpayAmount: { type: Number, required: true },
  smartpayPosted: { type: String, required: true },
  shopbackAmount: { type: Number, required: true },
  shopbackPosted: { type: String, required: true },
  lightspeedPaymentsAmount: { type: Number, required: true },
  lightspeedPaymentsPosted: { type: String, required: true },
  amexAmount: { type: Number, required: true },
  amexPosted: { type: String, required: true },
  squareAmount: { type: Number, required: true },
  squarePosted: { type: String, required: true },
  storeCreditAmount: { type: Number, required: true },
  storeCreditPosted: { type: String, required: true },
  zipPayAmount: { type: Number, required: true },
  zipPayPosted: { type: String, required: true },
  otherPaymentMethodAmount: { type: Number, required: true },
  otherPaymentMethodPosted: { type: String, required: true },
  afterpayManualAmount: { type: Number, required: true },
  afterpayManualPosted: { type: String, required: true },
  cashAmount: { type: Number, required: true },
  cashPosted: { type: String, required: true },
  zellerT1Amount: { type: Number, required: true },
  zellerT1Posted: { type: String, required: true },
  eftposNewAfterpayAmount: { type: Number, required: true },
  eftposNewAfterpayPosted: { type: String, required: true },
  total: { type: Number, required: true },
});

export default mongoose.model<IEOD>("EOD", EODSchema);
