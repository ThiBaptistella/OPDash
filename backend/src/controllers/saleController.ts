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

    // Validate data before inserting
    const validatedSalesData = salesData.map((sale) => ({
      sku: sale.Sku || "Unknown",
      quantity: isNaN(sale.Quantity) ? 0 : sale.Quantity,
      total: isNaN(sale.Total) ? 0 : sale.Total,
      saleDate: sale.SaleDate ? new Date(sale.SaleDate) : new Date(),
      receiptNumber: sale.ReceiptNumber || "Unknown",
      lineType: sale.LineType || "Unknown",
      customerCode: sale.CustomerCode || "Unknown",
      customerName: sale.CustomerName || "Unknown",
      note: sale.Note || "Unknown",
      subtotal: isNaN(sale.Subtotal) ? 0 : sale.Subtotal,
      salesTax: isNaN(sale.SalesTax) ? 0 : sale.SalesTax,
      discount: isNaN(sale.Discount) ? 0 : sale.Discount,
      loyalty: isNaN(sale.Loyalty) ? 0 : sale.Loyalty,
      paid: isNaN(sale.Paid) ? 0 : sale.Paid,
      details: sale.Details || "Unknown",
      register: sale.Register || "Unknown",
      user: sale.User || "Unknown",
      status: sale.Status || "Unknown",
      accountCodeSale: sale.AccountCodeSale || "Unknown",
      accountCodePurchase: sale.AccountCodePurchase || "Unknown",
    }));

    console.log("validatedSalesData", validatedSalesData);

    const saleDocuments = [];
    for (const sale of validatedSalesData) {
      const product = await Product.findOne({ sku: sale.sku });
      if (product) {
        const newSale = new Sale({
          product: product._id,
          quantity: sale.quantity,
          total: sale.total,
          saleDate: sale.saleDate,
          receiptNumber: sale.receiptNumber,
          lineType: sale.lineType,
          customerCode: sale.customerCode,
          customerName: sale.customerName,
          note: sale.note,
          subtotal: sale.subtotal,
          salesTax: sale.salesTax,
          discount: sale.discount,
          loyalty: sale.loyalty,
          paid: sale.paid,
          details: sale.details,
          register: sale.register,
          user: sale.user,
          status: sale.status,
          sku: sale.sku,
          accountCodeSale: sale.accountCodeSale,
          accountCodePurchase: sale.accountCodePurchase,
        });

        await newSale.save();
        saleDocuments.push(newSale);
        console.log("saleDocuments", saleDocuments);

        // Update inventory stock
        const inventoryItem = await InventoryItem.findOne({
          product: product._id,
        });
        if (inventoryItem) {
          inventoryItem.stock -= sale.quantity;
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
