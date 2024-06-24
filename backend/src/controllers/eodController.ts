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
    const validatedData = eodData.map((data) => {
      return {
        date: data.date || new Date().toISOString(),
        openingTillAmount: isNaN(data.openingTillAmount)
          ? 0
          : data.openingTillAmount,
        closingTillAmount: isNaN(data.closingTillAmount)
          ? 0
          : data.closingTillAmount,
        cashTakingsAmount: isNaN(data.cashTakingsAmount)
          ? 0
          : data.cashTakingsAmount,
        eftposAfterpay: isNaN(data.eftposAfterpay) ? 0 : data.eftposAfterpay,
        staff: data.staff || "Unknown",
        dateBanked: data.dateBanked || new Date().toISOString(),
      };
    });

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
