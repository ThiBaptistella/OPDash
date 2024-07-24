// src/controllers/subscriptionController.ts
import { Request, Response } from "express";
import Subscription from "../models/Subscription";
import UserApp from "../models/UserApp";
import LoyaltyProgram from "../models/LoyaltyProgram";
import QRCode from "qrcode";

// Subscribe to a loyalty program
export const subscribeToProgram = async (req: Request, res: Response) => {
  const { userId, programId } = req.body;

  console.log("Subscribe Request Received:", { userId, programId });

  try {
    const user = await UserApp.findById(userId);
    const program = await LoyaltyProgram.findById(programId);

    console.log("User Found:", user);
    console.log("Program Found:", program);

    if (!user || !program) {
      return res.status(404).json({ message: "User or program not found" });
    }

    const qrCodeData = `${userId}-${programId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    const subscription = new Subscription({
      userId,
      programId,
      qrCodeImage,
      qrCodeData,
    });
    await subscription.save();

    console.log("Subscription Created:", subscription);
    console.log("QR Code Image Generated:", qrCodeImage);
    return res.status(200).json({ qrCodeImage, qrCodeData });
  } catch (error) {
    console.error("Error in subscribeToProgram:", error);
    return res
      .status(500)
      .json({ message: "Failed to subscribe to loyalty program", error });
  }
};

// Unsubscribe from a loyalty program
export const unsubscribeFromProgram = async (req: Request, res: Response) => {
  const { userId, programId } = req.body;

  console.log("Unsubscribe Request Received:", { userId, programId });

  try {
    const subscription = await Subscription.findOneAndDelete({
      userId,
      programId,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    console.log("Subscription Deleted:", subscription);
    return res
      .status(200)
      .json({ message: "Successfully unsubscribed from loyalty program" });
  } catch (error) {
    console.error("Error in unsubscribeFromProgram:", error);
    return res
      .status(500)
      .json({ message: "Failed to unsubscribe from loyalty program", error });
  }
};

// Track usage of a loyalty program
export const trackUsage = async (req: Request, res: Response) => {
  const { qrCode } = req.body;

  console.log("Track Usage Request Received:", { qrCode });

  try {
    const subscription = await Subscription.findOne({
      qrCodeData: qrCode,
    }).populate("programId");

    if (!subscription) {
      return res.status(404).json({ message: "QR code not found" });
    }

    subscription.usageCount += 1;
    await subscription.save();

    console.log("Subscription Usage Updated:", subscription);
    return res
      .status(200)
      .json({ message: "Loyalty program usage tracked", subscription });
  } catch (error) {
    console.error("Error in trackUsage:", error);
    return res
      .status(500)
      .json({ message: "Failed to track loyalty program usage", error });
  }
};

// Get all subscriptions for a loyalty program
export const getUserSubscriptions = async (req: Request, res: Response) => {
  const { programId } = req.params;

  console.log("Get User Subscriptions Request Received:", { programId });

  try {
    const subscriptions = await Subscription.find({ programId })
      .populate("userId", "email") // Populate user details with email
      .exec();

    if (!subscriptions) {
      return res.status(404).json({ message: "No subscriptions found" });
    }

    console.log("Subscriptions Found:", subscriptions);
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error in getUserSubscriptions:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve subscriptions", error });
  }
};
