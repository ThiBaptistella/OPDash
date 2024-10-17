// types/LoyaltyProgram.ts
export interface LoyaltyProgram {
  _id?: any;
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

export interface User {
  _id: string;
  email: string;
}

export interface Subscription {
  _id: string;
  qrCodeImage: string | undefined;
  userId: User;
  programId: string;
  qrCode: string;
  usageCount: number;
}

export interface Tier {
  name: string;
  pointsRequired: number;
}

export interface TierBasedProgram extends LoyaltyProgram {
  tiers: Tier[];
}
