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
    console.log("path", path);
    const response = await extractInvoiceData(path);
    const extractedData = response.extracted_data;
    console.log("extractedData", extractedData.balance);

    const invoiceData: IInvoice = {
      receiptId: extractedData.receiptId || "N/A",
      issueDate: extractedData.issueDate || "N/A",
      accountName: extractedData.accountName || "N/A",
      accountCity: extractedData.accountCity || "N/A",
      paymentDate: extractedData.paymentDate || "N/A",
      dueDate: extractedData.dueDate || "N/A",
      tax: extractedData.tax || "N/A",
      balance: extractedData.balance || "N/A",
      status: extractedData.status || "Pending",
    };

    const invoice = new Invoice(invoiceData);
    console.log("invoice", invoice);
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

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: "Failed to update invoice", error });
  }
};
