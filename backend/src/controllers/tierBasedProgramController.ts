import { Request, Response } from "express";
import TierBasedProgram, {
  ITierBasedProgram,
} from "../models/TierBasedProgram";

export const createTierBasedProgram = async (req: Request, res: Response) => {
  try {
    const tierBasedProgram: ITierBasedProgram = new TierBasedProgram(req.body);
    await tierBasedProgram.save();
    res.status(201).json(tierBasedProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create Tier Based Program", error });
  }
};

export const getTierBasedPrograms = async (req: Request, res: Response) => {
  try {
    const tierBasedPrograms = await TierBasedProgram.find();
    res.status(200).json(tierBasedPrograms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Tier Based Programs", error });
  }
};

export const getTierBasedProgramById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tierBasedProgram = await TierBasedProgram.findById(id);
    if (!tierBasedProgram) {
      return res.status(404).json({ message: "Tier Based Program not found" });
    }
    res.status(200).json(tierBasedProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Tier Based Program", error });
  }
};

export const updateTierBasedProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProgram = await TierBasedProgram.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    if (!updatedProgram) {
      return res.status(404).json({ message: "Tier Based Program not found" });
    }
    res.status(200).json(updatedProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update Tier Based Program", error });
  }
};

export const deleteTierBasedProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProgram = await TierBasedProgram.findByIdAndDelete(id);
    if (!deletedProgram) {
      return res.status(404).json({ message: "Tier Based Program not found" });
    }
    res.status(200).json(deletedProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Tier Based Program", error });
  }
};
