import { spawn } from "child_process";
import path from "path";
import { IInvoiceResponse } from "../types/Invoice";

export const extractInvoiceData = (
  filePath: string
): Promise<IInvoiceResponse> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../../../ai-ml/utils/extract.py");
    console.log(`Executing Python script at: ${scriptPath}`);
    const process = spawn("python3", [scriptPath, filePath]);

    let extractedText = "";
    let stderrOutput = "";

    process.stdout.on("data", (data) => {
      extractedText += data.toString();
      console.log("stdout data:", data.toString());
    });

    process.stderr.on("data", (data) => {
      const stderrData = data.toString();
      console.error("stderr data:", stderrData);
      if (!stderrData.includes("WARNING:absl:Compiled the loaded model")) {
        stderrOutput += stderrData;
      }
    });

    process.on("close", async (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        if (stderrOutput) {
          console.error("stderr output:", stderrOutput);
          reject(`Error in Python script: ${stderrOutput}`);
        } else {
          try {
            console.log(`Extracted Text: ${extractedText}`);
            const response = JSON.parse(extractedText.trim());
            resolve({
              prediction: 1,
              extracted_text: extractedText,
              extracted_data: response,
            });
          } catch (error) {
            console.error("Error processing invoice data:", error);
            reject(`Error processing invoice data: ${(error as any).message}`);
          }
        }
      }
    });

    process.on("error", (error) => {
      console.error("Error executing Python script:", error);
      reject(`Error executing Python script: ${error.message}`);
    });
  });
};
