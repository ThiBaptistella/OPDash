// src/utils/invoiceProcessor.ts
import fs from "fs";
import pdf from "pdf-parse";

export const extractInvoiceData = async (filePath: string) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);

  // Extract the relevant data from pdfData.text
  const receiptId = extractField(pdfData.text, "Receipt ID") || "N/A";
  const issueDate = extractField(pdfData.text, "Issue Date") || "N/A";
  const accountName = extractField(pdfData.text, "Account Name") || "N/A";
  const accountCity = extractField(pdfData.text, "Account City") || "N/A";
  const paymentDate = extractField(pdfData.text, "Payment Date") || "N/A";
  const dueDate = extractField(pdfData.text, "Due Date") || "N/A";
  const tax = extractField(pdfData.text, "Tax") || "N/A";
  const balance = extractField(pdfData.text, "Balance") || "N/A";

  return {
    receiptId,
    issueDate,
    accountName,
    accountCity,
    paymentDate,
    dueDate,
    tax,
    balance,
    status: "Pending" as "Pending",
  };
};

// Helper function to extract fields from PDF text
const extractField = (text: string, fieldName: string) => {
  const regex = new RegExp(`${fieldName}:\\s*(.*)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};
