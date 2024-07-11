// src/controllers/inventoryController.ts
import { Request, Response } from "express";
import InventoryItem from "../models/InventoryItem";
import InventoryLevel from "../models/InventoryLevel";
import Location from "../models/Location";

// Inventory Items
export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const inventoryItem = new InventoryItem(req.body);
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create inventory item", error });
  }
};

export const getInventoryItems = async (req: Request, res: Response) => {
  try {
    const inventoryItems = await InventoryItem.find().populate("product");
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory items", error });
  }
};

// Inventory Levels
export const createInventoryLevel = async (req: Request, res: Response) => {
  try {
    const inventoryLevel = new InventoryLevel(req.body);
    await inventoryLevel.save();
    res.status(201).json(inventoryLevel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create inventory level", error });
  }
};

export const getInventoryLevels = async (req: Request, res: Response) => {
  try {
    const inventoryLevels = await InventoryLevel.find()
      .populate("inventoryItem")
      .populate("location");
    res.status(200).json(inventoryLevels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch inventory levels", error });
  }
};

// Locations
export const createLocation = async (req: Request, res: Response) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: "Failed to create location", error });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locations", error });
  }
};
