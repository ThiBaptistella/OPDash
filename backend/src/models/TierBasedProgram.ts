import mongoose, { Document, Schema } from "mongoose";

export interface ITierBasedProgram extends Document {
  name: string;
  description: string;
  type: string;
  tiers: Array<{ tier: string; pointsRequired: number }>;
  rewardOptions: Array<{ type: string; details: string }>;
  eligibilityCriteria: string;
  earningRules: string;
  redemptionRules: string;
  visibility: string;
  displayLocations: string[];
}

const TierBasedProgramSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  tiers: [
    {
      tier: { type: String, required: true },
      pointsRequired: { type: Number, required: true },
    },
  ],
  rewardOptions: [{ type: { type: String }, details: { type: String } }],
  eligibilityCriteria: { type: String, required: true },
  earningRules: { type: String, required: true },
  redemptionRules: { type: String, required: true },
  visibility: { type: String, required: true },
  displayLocations: [{ type: String, required: true }],
});

export default mongoose.model<ITierBasedProgram>(
  "TierBasedProgram",
  TierBasedProgramSchema
);
