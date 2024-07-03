// src/utils/extractEODData.ts
import xlsx from "xlsx";
import { PlainEOD } from "../types/PlainEOD";

const extractEODData = (filePath: string): Omit<PlainEOD, "_id">[] => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

  const data: Omit<PlainEOD, "_id">[] = rows.slice(1).map((row) => {
    return {
      register: row[0] || "",
      sequence: row[1] || "",
      opened: new Date(row[2] || ""),
      closed: new Date(row[3] || ""),
      xeroAmount: isNaN(parseFloat(row[4])) ? 0 : parseFloat(row[4]),
      xeroPosted: row[5] || "",
      xeroCreditNoteAmount: isNaN(parseFloat(row[6])) ? 0 : parseFloat(row[6]),
      xeroCreditNotePosted: row[7] || "",
      giftCardAmount: isNaN(parseFloat(row[8])) ? 0 : parseFloat(row[8]),
      giftCardPosted: row[9] || "",
      cashRoundingAmount: isNaN(parseFloat(row[10])) ? 0 : parseFloat(row[10]),
      cashRoundingPosted: row[11] || "",
      eftposCommbankAmount: isNaN(parseFloat(row[12]))
        ? 0
        : parseFloat(row[12]),
      eftposCommbankPosted: row[13] || "",
      smartpayAmount: isNaN(parseFloat(row[14])) ? 0 : parseFloat(row[14]),
      smartpayPosted: row[15] || "",
      shopbackAmount: isNaN(parseFloat(row[16])) ? 0 : parseFloat(row[16]),
      shopbackPosted: row[17] || "",
      lightspeedPaymentsAmount: isNaN(parseFloat(row[18]))
        ? 0
        : parseFloat(row[18]),
      lightspeedPaymentsPosted: row[19] || "",
      amexAmount: isNaN(parseFloat(row[20])) ? 0 : parseFloat(row[20]),
      amexPosted: row[21] || "",
      squareAmount: isNaN(parseFloat(row[22])) ? 0 : parseFloat(row[22]),
      squarePosted: row[23] || "",
      storeCreditAmount: isNaN(parseFloat(row[24])) ? 0 : parseFloat(row[24]),
      storeCreditPosted: row[25] || "",
      zipPayAmount: isNaN(parseFloat(row[26])) ? 0 : parseFloat(row[26]),
      zipPayPosted: row[27] || "",
      otherPaymentMethodAmount: isNaN(parseFloat(row[28]))
        ? 0
        : parseFloat(row[28]),
      otherPaymentMethodPosted: row[29] || "",
      afterpayManualAmount: isNaN(parseFloat(row[30]))
        ? 0
        : parseFloat(row[30]),
      afterpayManualPosted: row[31] || "",
      cashAmount: isNaN(parseFloat(row[32])) ? 0 : parseFloat(row[32]),
      cashPosted: row[33] || "",
      zellerT1Amount: isNaN(parseFloat(row[34])) ? 0 : parseFloat(row[34]),
      zellerT1Posted: row[35] || "",
      eftposNewAfterpayAmount: isNaN(parseFloat(row[36]))
        ? 0
        : parseFloat(row[36]),
      eftposNewAfterpayPosted: row[37] || "",
      total: isNaN(parseFloat(row[38])) ? 0 : parseFloat(row[38]),
    };
  });

  return data;
};

export default extractEODData;
