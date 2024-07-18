import { Request, Response } from "express";
import LoyaltyProgram, { ILoyaltyProgram } from "../models/LoyaltyProgram";

export const createLoyaltyProgram = async (req: Request, res: Response) => {
  try {
    const loyaltyProgram: ILoyaltyProgram = new LoyaltyProgram(req.body);
    await loyaltyProgram.save();
    res.status(201).json(loyaltyProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create loyalty program", error });
  }
};

export const getLoyaltyPrograms = async (req: Request, res: Response) => {
  try {
    const loyaltyPrograms = await LoyaltyProgram.find();
    res.status(200).json(loyaltyPrograms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch loyalty programs", error });
  }
};

export const updateLoyaltyProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProgram = await LoyaltyProgram.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    if (!updatedProgram) {
      return res.status(404).json({ message: "Loyalty Program not found" });
    }
    res.status(200).json(updatedProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update loyalty program", error });
  }
};

export const deleteLoyaltyProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProgram = await LoyaltyProgram.findByIdAndDelete(id);
    if (!deletedProgram) {
      return res.status(404).json({ message: "Loyalty Program not found" });
    }
    res.status(200).json(deletedProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete loyalty program", error });
  }
};
