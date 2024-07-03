// src/controllers/eodController.ts
import { Request, Response } from "express";
import EOD from "../models/EOD";
import extractEODData from "../utils/extractEODData";
import { saveAnnotatedData } from "../utils/saveAnnotatedData";
import { exec } from "child_process";
import path from "path";

const trainNerModel = () => {
  const scriptPath = path.join(
    __dirname,
    "../../../ai-ml/scripts/train_eod_model.py"
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

export const uploadEOD = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path } = req.file;
    console.log("path", path);
    const eodData = extractEODData(path);

    // Validate data before inserting
    const validatedData = eodData.map((data) => ({
      register: data.register || "Unknown",
      sequence: data.sequence || "Unknown",
      opened: data.opened ? new Date(data.opened) : new Date(),
      closed: data.closed ? new Date(data.closed) : new Date(),
      xeroAmount: isNaN(data.xeroAmount) ? 0 : data.xeroAmount,
      xeroPosted: data.xeroPosted || "Unknown",
      xeroCreditNoteAmount: isNaN(data.xeroCreditNoteAmount)
        ? 0
        : data.xeroCreditNoteAmount,
      xeroCreditNotePosted: data.xeroCreditNotePosted || "Unknown",
      giftCardAmount: isNaN(data.giftCardAmount) ? 0 : data.giftCardAmount,
      giftCardPosted: data.giftCardPosted || "Unknown",
      cashRoundingAmount: isNaN(data.cashRoundingAmount)
        ? 0
        : data.cashRoundingAmount,
      cashRoundingPosted: data.cashRoundingPosted || "Unknown",
      eftposCommbankAmount: isNaN(data.eftposCommbankAmount)
        ? 0
        : data.eftposCommbankAmount,
      eftposCommbankPosted: data.eftposCommbankPosted || "Unknown",
      smartpayAmount: isNaN(data.smartpayAmount) ? 0 : data.smartpayAmount,
      smartpayPosted: data.smartpayPosted || "Unknown",
      shopbackAmount: isNaN(data.shopbackAmount) ? 0 : data.shopbackAmount,
      shopbackPosted: data.shopbackPosted || "Unknown",
      lightspeedPaymentsAmount: isNaN(data.lightspeedPaymentsAmount)
        ? 0
        : data.lightspeedPaymentsAmount,
      lightspeedPaymentsPosted: data.lightspeedPaymentsPosted || "Unknown",
      amexAmount: isNaN(data.amexAmount) ? 0 : data.amexAmount,
      amexPosted: data.amexPosted || "Unknown",
      squareAmount: isNaN(data.squareAmount) ? 0 : data.squareAmount,
      squarePosted: data.squarePosted || "Unknown",
      storeCreditAmount: isNaN(data.storeCreditAmount)
        ? 0
        : data.storeCreditAmount,
      storeCreditPosted: data.storeCreditPosted || "Unknown",
      zipPayAmount: isNaN(data.zipPayAmount) ? 0 : data.zipPayAmount,
      zipPayPosted: data.zipPayPosted || "Unknown",
      otherPaymentMethodAmount: isNaN(data.otherPaymentMethodAmount)
        ? 0
        : data.otherPaymentMethodAmount,
      otherPaymentMethodPosted: data.otherPaymentMethodPosted || "Unknown",
      afterpayManualAmount: isNaN(data.afterpayManualAmount)
        ? 0
        : data.afterpayManualAmount,
      afterpayManualPosted: data.afterpayManualPosted || "Unknown",
      cashAmount: isNaN(data.cashAmount) ? 0 : data.cashAmount,
      cashPosted: data.cashPosted || "Unknown",
      zellerT1Amount: isNaN(data.zellerT1Amount) ? 0 : data.zellerT1Amount,
      zellerT1Posted: data.zellerT1Posted || "Unknown",
      eftposNewAfterpayAmount: isNaN(data.eftposNewAfterpayAmount)
        ? 0
        : data.eftposNewAfterpayAmount,
      eftposNewAfterpayPosted: data.eftposNewAfterpayPosted || "Unknown",
      total: isNaN(data.total) ? 0 : data.total,
    }));

    const eodDocuments = validatedData.map((data) => new EOD(data));
    await EOD.insertMany(eodDocuments);

    // Format the entities correctly
    const entities = eodData.flatMap((data) =>
      Object.keys(data).map((key) => {
        const value = data[key as keyof typeof data];
        const start = value.toString().indexOf(value.toString());
        return {
          start,
          end: start + value.toString().length,
          label: key.toUpperCase(),
        };
      })
    );

    // Save annotated data
    saveAnnotatedData({
      text: JSON.stringify(eodData),
      entities,
    });

    // Trigger model training
    trainNerModel();

    res.status(200).json(eodDocuments);
  } catch (error) {
    console.error("Error processing EOD:", error);
    res.status(500).json({ message: "Failed to process EOD", error });
  }
};

export const getEODs = async (req: Request, res: Response) => {
  try {
    const eods = await EOD.find();
    console.error("EOD:", eods);
    res.status(200).json(eods);
  } catch (error) {
    console.error("Error fetching EODs:", error);
    res.status(500).json({ message: "Failed to fetch EODs" });
  }
};

export const updateEOD = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEOD = await EOD.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedEOD) {
      return res.status(404).json({ message: "EOD not found" });
    }
    res.status(200).json(updatedEOD);
  } catch (error) {
    console.error("Error updating EOD:", error);
    res.status(500).json({ message: "Failed to update EOD", error });
  }
};
