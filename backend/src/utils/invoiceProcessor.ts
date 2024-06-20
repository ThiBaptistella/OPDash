import path from "path";
import { spawn } from "child_process";
import axios from "axios";
import { IInvoice } from "../types/Invoice";

export const extractInvoiceData = async (
  filePath: string
): Promise<IInvoice> => {
  const apiEndpoint = "http://127.0.0.1:5001/predict";

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
            const response = await axios.post(apiEndpoint, {
              text: extractedText,
            });
            console.log("API response data:", response.data);
            resolve(response.data.extracted_data); // Adjust to get the extracted_data part
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
