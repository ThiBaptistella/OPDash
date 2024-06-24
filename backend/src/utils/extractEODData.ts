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
      date: row[0] || "",
      openingTillAmount: isNaN(parseFloat(row[1])) ? 0 : parseFloat(row[1]),
      closingTillAmount: isNaN(parseFloat(row[2])) ? 0 : parseFloat(row[2]),
      cashTakingsAmount: isNaN(parseFloat(row[3])) ? 0 : parseFloat(row[3]),
      eftposAfterpay: isNaN(parseFloat(row[4])) ? 0 : parseFloat(row[4]),
      staff: row[5] || "",
      dateBanked: row[6] || "",
    };
  });

  return data;
};

export default extractEODData;
