import { Request, Response } from "express";
import Subscription from "../models/Subscription";
import UserApp from "../models/UserApp";
import LoyaltyProgram from "../models/LoyaltyProgram";
import QRCode from "qrcode";

// Subscribe to a loyalty program
export const subscribeToProgram = async (req: Request, res: Response) => {
  const { userId, programId } = req.body;

  try {
    const user = await UserApp.findById(userId);
    const program = await LoyaltyProgram.findById(programId);

    if (!user || !program) {
      return res.status(404).json({ message: "User or program not found" });
    }

    const qrCodeData = `${userId}-${programId}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    const subscription = new Subscription({ userId, programId, qrCode });
    await subscription.save();
    console.log("qrCode", qrCode);
    return res.status(200).json({ qrCode });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to subscribe to loyalty program", error });
  }
};

// Track usage of a loyalty program
export const trackUsage = async (req: Request, res: Response) => {
  const { qrCode } = req.body;

  try {
    const subscription = await Subscription.findOne({ qrCode });

    if (!subscription) {
      return res.status(404).json({ message: "QR code not found" });
    }

    subscription.usageCount += 1;
    await subscription.save();

    return res.status(200).json({ message: "Loyalty program usage tracked" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to track loyalty program usage", error });
  }
};

// Get all subscriptions for a user
export const getUserSubscriptions = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const subscriptions = await Subscription.find({ userId }).populate(
      "programId"
    );
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve subscriptions", error });
  }
};
