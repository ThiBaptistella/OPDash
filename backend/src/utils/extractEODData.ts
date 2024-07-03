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
      register: row[0] || "", // Column 0 - A - Register
      sequence: row[1] || "", // Column 1 - B - Sequence
      opened: new Date(row[2] || ""), // Column 2 - C - Opened
      closed: new Date(row[3] || ""), // Column 3 - D - Closed
      xeroAmount: isNaN(parseFloat(row[4])) ? 0 : parseFloat(row[4]), // Column 4 - E - Xero Amount
      xeroPosted: row[5] || "", // Column 5 - F - Xero Posted
      xeroCreditNoteAmount: isNaN(parseFloat(row[6])) ? 0 : parseFloat(row[6]), // Column 6 - G - Xero Credit Note Amount
      xeroCreditNotePosted: row[7] || "", // Column 7 - H - Xero Credit Note Posted
      giftCardAmount: isNaN(parseFloat(row[8])) ? 0 : parseFloat(row[8]), // Column 8 - I - Gift Card Amount
      giftCardPosted: row[9] || "", // Column 9 - J - Gift Card Posted
      cashRoundingAmount: isNaN(parseFloat(row[10])) ? 0 : parseFloat(row[10]), // Column 10 - K - Cash Rounding Amount
      cashRoundingPosted: row[11] || "", // Column 11 - L - Cash Rounding Posted
      eftposCommbankAmount: isNaN(parseFloat(row[12]))
        ? 0
        : parseFloat(row[12]), // Column 12 - M - Eftpos Commbank Amount
      eftposCommbankPosted: row[13] || "", // Column 13 - N - Eftpos Commbank Posted
      smartpayAmount: isNaN(parseFloat(row[14])) ? 0 : parseFloat(row[14]), // Column 14 - O - Smartpay Amount
      smartpayPosted: row[15] || "", // Column 15 - P - Smartpay Posted
      shopbackAmount: isNaN(parseFloat(row[16])) ? 0 : parseFloat(row[16]), // Column 16 - Q - SHOPBACK Amount
      shopbackPosted: row[17] || "", // Column 17 - R - SHOPBACK Posted
      lightspeedPaymentsAmount: isNaN(parseFloat(row[18]))
        ? 0
        : parseFloat(row[18]), // Column 18 - S - Lightspeed Payments Amount
      lightspeedPaymentsPosted: row[19] || "", // Column 19 - T - Lightspeed Payments Posted
      amexAmount: isNaN(parseFloat(row[20])) ? 0 : parseFloat(row[20]), // Column 20 - U - AMEX Amount
      amexPosted: row[21] || "", // Column 21 - V - AMEX Posted
      squareAmount: isNaN(parseFloat(row[22])) ? 0 : parseFloat(row[22]), // Column 22 - W - Square Amount
      squarePosted: row[23] || "", // Column 23 - X - Square Posted
      storeCreditAmount: isNaN(parseFloat(row[24])) ? 0 : parseFloat(row[24]), // Column 24 - Y - Store Credit Amount
      storeCreditPosted: row[25] || "", // Column 25 - Z - Store Credit Posted
      zipPayAmount: isNaN(parseFloat(row[26])) ? 0 : parseFloat(row[26]), // Column 26 - AA - Zip Pay Amount
      zipPayPosted: row[27] || "", // Column 27 - AB - Zip Pay Posted

      otherPaymentMethodAmount: isNaN(parseFloat(row[28]))
        ? 0
        : parseFloat(row[28]), // Column 28 - AC - Other Payment Method Amount
      otherPaymentMethodPosted: row[29] || "", // Column 29 - AD - Other Payment Method Posted
      afterpayManualAmount: isNaN(parseFloat(row[30]))
        ? 0
        : parseFloat(row[30]), // Column 30 - AE - Afterpay (Manual) Amount
      afterpayManualPosted: row[31] || "", // Column 31 - AF - Afterpay (Manual) Posted
      cashAmount: isNaN(parseFloat(row[32])) ? 0 : parseFloat(row[32]), // Column 32 - AG - Cash Amount
      cashPosted: row[33] || "", // Column 33 - AH - Cash Posted
      zellerT1Amount: isNaN(parseFloat(row[34])) ? 0 : parseFloat(row[34]), // Column 34 - AI - Zeller T1 Amount
      zellerT1Posted: row[35] || "", // Column 35 - AJ - Zeller T1 Posted
      eftposNewAfterpayAmount: isNaN(parseFloat(row[36]))
        ? 0
        : parseFloat(row[36]), // Column 36 - AK - Eftpos / New Afterpay Amount
      eftposNewAfterpayPosted: row[37] || "", // Column 37 - AL - Eftpos / New Afterpay Posted
      total: isNaN(parseFloat(row[38])) ? 0 : parseFloat(row[38]), // Column 38 - AM - Total
    };
  });

  return data;
};

export default extractEODData;

// 0 - A - Register
// 1 - B - Sequence
// 2 - C - Opened
// 3 - D - Closed
// 4 - E - Xero Amount
// 5 - F - Xero Posted
// 6 - G - Xero Credit Note Amount
// 7 - H - Xero Credit Note Posted
// 8 - I - Gift Card Amount
// 9 - J - Gift Card Posted
// 10 - K - Cash Rounding Amount
// 11 - L - Cash Rounding Posted
// 12 - M - Eftpos Commbank Amount
// 13 - N - Eftpos Commbank Posted
// 14 - O - Smartpay Amount
// 15 - P - Smartpay Posted
// 16 - Q - SHOPBACK Amount
// 17 - R - SHOPBACK Posted
// 18 - S - Lightspeed Payments Amount
// 19 - T - Lightspeed Payments Posted
// 20 - U - AMEX Amount
// 21 - V - AMEX Posted
// 22 - W - Square Amount
// 23 - X - Square Posted
// 24 - Y - Store Credit Amount
// 25 - Z - Store Credit Posted
// 26 - AA - Zip Pay Amount
// 27 - AB - Zip Pay Posted

// 28 - AC - Other Payment Method Amount
// 29 - AD - Other Payment Method Posted
// 30 - AE - Afterpay (Manual) Amount
// 31 - AF - Afterpay (Manual) Posted
// 32 - AG - Cash Amount
// 33 - AH - Cash Posted
// 34 - AI - Zeller T1 Amount
// 35 - AJ - Zeller T1 Posted
// 36 - AK - Eftpos / New Afterpay Amount
// 37 - AL - Eftpos / New Afterpay Posted
// 38 - AM - Total
