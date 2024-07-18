import mongoose, { Document, Schema } from "mongoose";

export interface ILoyaltyProgram extends Document {
  name: string;
  description: string;
  type: string;
  duration?: number;
  startDate?: Date;
  pointsPerPurchase: number;
  pointsRedemptionRatio: number;
  pointsExpiry?: number;
  rewardTiers?: Array<{ tier: string; pointsRequired: number }>;
  rewardOptions: Array<{ type: string; details: string }>;
  eligibilityCriteria: string;
  earningRules: string;
  redemptionRules: string;
  exclusionRules?: string;
  visibility: string;
  displayLocations: string[];
}

const LoyaltyProgramSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number },
  startDate: { type: Date },
  pointsPerPurchase: { type: Number, required: true },
  pointsRedemptionRatio: { type: Number, required: true },
  pointsExpiry: { type: Number },
  rewardTiers: [{ tier: String, pointsRequired: Number }],
  rewardOptions: [{ type: String, details: String }],
  eligibilityCriteria: { type: String, required: true },
  earningRules: { type: String, required: true },
  redemptionRules: { type: String, required: true },
  exclusionRules: { type: String },
  visibility: { type: String, required: true },
  displayLocations: [{ type: String, required: true }],
});

export default mongoose.model<ILoyaltyProgram>(
  "LoyaltyProgram",
  LoyaltyProgramSchema
);
