import { Request, Response } from "express";
import Sale from "../models/Sale";
import InventoryItem from "../models/InventoryItem";
import Product from "../models/Product";
import extractSalesData from "../utils/extractSalesData";
import { saveAnnotatedSalesData } from "../utils/saveAnnotatedSalesData";
import { exec } from "child_process";
import path from "path";

const trainNerModel = () => {
  const scriptPath = path.join(
    __dirname,
    "../../../ai-ml/scripts/train_sales_model.py"
  );
  exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

export const uploadSales = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path } = req.file;
    const salesData = extractSalesData(path);
    console.log("salesData", salesData[0]); // Log the sales data

    // Validate data before inserting
    const validatedSalesData = salesData.map((sale) => ({
      Sku: sale.Sku || "Unknown",
      Quantity: isNaN(sale.Quantity) ? 0 : sale.Quantity,
      Total: isNaN(sale.Total) ? 0 : sale.Total,
      SaleDate: sale.SaleDate ? new Date(sale.SaleDate) : new Date(),
      ReceiptNumber: sale.ReceiptNumber || "Unknown",
      LineType: sale.LineType || "Unknown",
      CustomerCode: sale.CustomerCode || "Unknown",
      CustomerName: sale.CustomerName || "Unknown",
      Note: sale.Note || "Unknown",
      Subtotal: isNaN(sale.Subtotal) ? 0 : sale.Subtotal,
      SalesTax: isNaN(sale.SalesTax) ? 0 : sale.SalesTax,
      Discount: isNaN(sale.Discount) ? 0 : sale.Discount,
      Loyalty: isNaN(sale.Loyalty) ? 0 : sale.Loyalty,
      Paid: isNaN(sale.Paid) ? 0 : sale.Paid,
      Details: sale.Details || "Unknown",
      Register: sale.Register || "Unknown",
      User: sale.User || "Unknown",
      Status: sale.Status || "Unknown",
      AccountCodeSale: sale.AccountCodeSale || "Unknown",
      AccountCodePurchase: sale.AccountCodePurchase || "Unknown",
    }));

    const saleDocuments = [];
    for (const sale of validatedSalesData) {
      const product = await Product.findOne({ sku: sale.Sku });
      if (product) {
        const newSale = new Sale({
          product: product._id,
          quantity: sale.Quantity,
          totalRevenue: sale.Total,
          saleDate: sale.SaleDate,
          receiptNumber: sale.ReceiptNumber,
          lineType: sale.LineType,
          customerCode: sale.CustomerCode,
          customerName: sale.CustomerName,
          note: sale.Note,
          subtotal: sale.Subtotal,
          salesTax: sale.SalesTax,
          discount: sale.Discount,
          loyalty: sale.Loyalty,
          paid: sale.Paid,
          details: sale.Details,
          register: sale.Register,
          user: sale.User,
          status: sale.Status,
          accountCodeSale: sale.AccountCodeSale,
          accountCodePurchase: sale.AccountCodePurchase,
        });

        await newSale.save();
        saleDocuments.push(newSale);

        // Update inventory stock
        const inventoryItem = await InventoryItem.findOne({
          product: product._id,
        });
        if (inventoryItem) {
          inventoryItem.stock -= sale.Quantity;
          await inventoryItem.save();
        }
      }
    }

    // Format the entities correctly
    const entities = validatedSalesData.flatMap((sale) =>
      Object.keys(sale).map((key) => {
        const value = sale[key as keyof typeof sale];
        const start = value.toString().indexOf(value.toString());
        return {
          start,
          end: start + value.toString().length,
          label: key.toUpperCase(),
        };
      })
    );

    // Save annotated data
    saveAnnotatedSalesData({
      text: JSON.stringify(validatedSalesData),
      entities,
    });

    // Trigger model training
    trainNerModel();

    res.status(200).json(saleDocuments);
  } catch (error) {
    console.error("Error importing sales:", error);
    res.status(500).json({ message: "Failed to import sales", error });
  }
};

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find().populate("product");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sales", error });
  }
};
