import xlsx from "xlsx";

interface SalesData {
  SaleDate: string;
  ReceiptNumber: string;
  LineType: string;
  CustomerCode: string;
  CustomerName: string;
  Note: string;
  Quantity: number;
  Subtotal: number;
  SalesTax: number;
  Discount: number;
  Loyalty: number;
  Total: number;
  Paid: number;
  Details: string;
  Register: string;
  User: string;
  Status: string;
  Sku: string;
  AccountCodeSale: string;
  AccountCodePurchase: string;
}

const extractSalesData = (filePath: string): SalesData[] => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json<any>(sheet, { header: 1 });

  // Map the extracted data to the sales structure
  const salesData = jsonData.slice(1).map((row: any) => ({
    SaleDate: row[0], // Column A
    ReceiptNumber: row[1], // Column B
    LineType: row[2], // Column C
    CustomerCode: row[3], // Column D
    CustomerName: row[4], // Column E
    Note: row[5], // Column F
    Quantity: row[6], // Column G
    Subtotal: row[7], // Column H
    SalesTax: row[8], // Column I
    Discount: row[9], // Column J
    Loyalty: row[10], // Column K
    Total: row[11], // Column L
    Paid: row[12], // Column M
    Details: row[13], // Column N
    Register: row[14], // Column O
    User: row[15], // Column P
    Status: row[16], // Column Q
    Sku: row[17], // Column R
    AccountCodeSale: row[18], // Column S
    AccountCodePurchase: row[19], // Column T
  }));

  return salesData;
};

export default extractSalesData;
