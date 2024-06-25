import { Request, Response } from "express";
import { extractInvoiceData } from "../utils/invoiceProcessor";
import Invoice from "../models/Invoice";
import { IInvoice } from "../types/Invoice";
import { saveAnnotatedData } from "../utils/saveAnnotatedData";
import { exec } from "child_process";
import path from "path";

type ExtractedData = {
  receiptId: string;
  issueDate: string;
  accountName: string;
  accountCity: string;
  paymentDate: string;
  dueDate: string;
  tax: string;
  balance: number;
  status: string;
};

const trainNerModel = () => {
  const scriptPath = path.join(
    __dirname,
    "../../../ai-ml/scripts/train_ner_model.py"
  );
  exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

export const postInvoice = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path } = req.file;
    console.log("path", path);
    const response = await extractInvoiceData(path);
    const extractedData: ExtractedData = response.extracted_data;
    console.log("extractedData", extractedData.balance);

    const invoiceData: IInvoice = {
      receiptId: extractedData.receiptId || "N/A",
      issueDate: extractedData.issueDate || "N/A",
      accountName: extractedData.accountName || "N/A",
      accountCity: extractedData.accountCity || "N/A",
      paymentDate: extractedData.paymentDate || "N/A",
      dueDate: extractedData.dueDate || "N/A",
      tax: extractedData.tax || "N/A",
      balance: extractedData.balance,
      status: extractedData.status || "Pending",
    };

    const invoice = new Invoice(invoiceData);
    console.log("invoice", invoice);
    await invoice.save();

    // Format the entities correctly
    const entities = Object.keys(extractedData).map((key) => {
      const value = extractedData[key as keyof ExtractedData];
      const start = response.extracted_text.indexOf(value.toString());
      return {
        start,
        end: start + value.toString().length,
        label: key.toUpperCase(),
      };
    });

    // Save annotated data
    saveAnnotatedData({
      text: response.extracted_text,
      entities,
    });

    // Trigger model training
    trainNerModel();

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
