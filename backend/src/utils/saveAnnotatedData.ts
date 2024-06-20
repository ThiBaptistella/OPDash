import fs from "fs";
import path from "path";

const filePath = path.join(
  __dirname,
  "../../../ai-ml/utils/annotated_invoices.json"
);

export const saveAnnotatedData = (data: { text: string; entities: any[] }) => {
  let annotatedData: any[] = [];

  // Ensure the directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(annotatedData, null, 2));
  }

  // Read the existing data
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    annotatedData = JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading annotated invoices file:", error);
  }

  // Add new data and write back to the file
  annotatedData.push(data);
  try {
    fs.writeFileSync(filePath, JSON.stringify(annotatedData, null, 2));
  } catch (error) {
    console.error("Error writing to annotated invoices file:", error);
  }
};
