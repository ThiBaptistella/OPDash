// src/utils/invoiceProcessor.ts
import path from "path";
import { spawn } from "child_process";
import axios from "axios";
import { IInvoice } from "../types/Invoice";

export const extractInvoiceData = async (
  filePath: string
): Promise<IInvoice> => {
  const apiEndpoint = "http://localhost:5001/predict";

  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../../../ai-ml/utils/extract.py");
    console.log(`Executing Python script at: ${scriptPath}`);
    const process = spawn("python3", [scriptPath, filePath]);

    let extractedText = "";
    let stderrOutput = "";

    process.stdout.on("data", (data) => {
      extractedText += data.toString();
    });

    process.stderr.on("data", (data) => {
      const stderrData = data.toString();
      // Filter out the specific warning message
      if (!stderrData.includes("WARNING:absl:Compiled the loaded model")) {
        stderrOutput += stderrData;
      }
    });

    process.on("close", async (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        if (stderrOutput) {
          console.error("stderr:", stderrOutput);
          reject(`Error in Python script: ${stderrOutput}`);
        } else {
          try {
            console.log(`Extracted Text: ${extractedText}`);
            const response = await axios.post(apiEndpoint, {
              text: extractedText,
            });
            resolve(response.data);
          } catch (error) {
            reject(`Error processing invoice data: ${(error as any).message}`);
          }
        }
      }
    });
  });
};
