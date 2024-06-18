// src/utils/invoiceProcessor.ts
import { spawn } from "child_process";
import path from "path";
import { IInvoice } from "../types/Invoice";

export const extractInvoiceData = async (
  filePath: string
): Promise<IInvoice> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../../../ai-ml/utils/extract.py");
    console.log(`Executing Python script at: ${scriptPath}`);
    const process = spawn("python3", [scriptPath, filePath]);

    process.stdout.on("data", (data) => {
      try {
        resolve(JSON.parse(data.toString()));
      } catch (error) {
        reject(`Error parsing JSON: ${(error as any).message}`);
      }
    });

    process.stderr.on("data", (data) => {
      reject(data.toString());
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      }
    });
  });
};
