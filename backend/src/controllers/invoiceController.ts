// src/controllers/invoiceController.ts
import { Request, Response } from "express";
import { extractInvoiceData } from "../utils/invoiceProcessor";
import Invoice from "../models/Invoice";
import { IInvoice } from "../types/Invoice";

export const postInvoice = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path } = req.file;
    const invoiceData: IInvoice = await extractInvoiceData(path);

    const invoice = new Invoice(invoiceData);
    await invoice.save();

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error processing invoice:", error);
    res.status(500).json({ message: "Failed to process invoice", error });
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
};
