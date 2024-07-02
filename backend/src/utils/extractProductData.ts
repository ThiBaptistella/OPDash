import * as XLSX from "xlsx";

const extractProductData = (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Map the extracted data to the product structure
  const products = jsonData.slice(1).map((row: any) => ({
    handle: row[1] || "unknown-handle", // Column B
    sku: row[2] || "unknown-sku", // Column C
    productName: row[6] || "Unnamed Product", // Column G
    description: row[7] ? row[7] : "No description", // Column H
    productCategory: row[8] || "Uncategorized", // Column I
    productVariantOne: row[9] || "N/A", // Column J
    productVariantOneValue: row[10] || "N/A", // Column K
    productVariantTwo: row[11] || "N/A", // Column L
    productVariantTwoValue: row[12] || "N/A", // Column M
    productVariantThree: row[13] || "N/A", // Column N
    productVariantThreeValue: row[14] || "N/A", // Column O
    supplyPrice: row[16] || 0, // Column Q
    retailPrice: row[17] || 0, // Column R
    brand: row[22] || "Unknown", // Column W
    supplier: row[23] || "Unknown", // Column X
    supplierCode: row[24] || "unknown-code", // Column Y
    active: row[25] || "unknown-active", // Column Z
    averageCost: 0, // Default value for averageCost
    inventory: 0, // Default value for inventory
  }));

  return products;
};

export default extractProductData;
