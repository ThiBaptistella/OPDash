import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  qrCodeImage: string;
  qrCodeData: string;
  usageCount: number;
}

const SubscriptionSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "UserApp", required: true },
  programId: {
    type: mongoose.Types.ObjectId,
    ref: "LoyaltyProgram",
    required: true,
  },
  qrCodeImage: { type: String, required: true },
  qrCodeData: { type: String, required: true },
  usageCount: { type: Number, default: 0 },
});

export default mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
