import { Request, Response } from "express";
import Supplier, { ISupplier } from "../models/Supplier";

// Create a new supplier
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplierData: ISupplier = req.body;
    const newSupplier = new Supplier(supplierData);
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: "Failed to create supplier", error });
  }
};

// Get all suppliers
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get suppliers", error });
  }
};

// Update a supplier
export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const supplierData: ISupplier = req.body;
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplierData, {
      new: true,
    });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: "Failed to update supplier", error });
  }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Supplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete supplier", error });
  }
};
