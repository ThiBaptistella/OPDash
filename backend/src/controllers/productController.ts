// src/controllers/productController.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import Product, { IProduct } from "../models/Product";
import Supplier, { ISupplier } from "../models/Supplier";
import extractProductData from "../utils/extractProductData";
import { saveAnnotatedData } from "../utils/saveAnnotatedData";
import { exec } from "child_process";
import path from "path";
import bwipjs from "bwip-js";

const trainNerModel = () => {
  const scriptPath = path.join(
    __dirname,
    "../../../ai-ml/scripts/train_product_model.py"
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

const linkOrCreateSupplier = async (
  supplierName: string
): Promise<mongoose.Types.ObjectId> => {
  let supplier = await Supplier.findOne({ supplierName });

  if (!supplier) {
    supplier = new Supplier({ supplierName });
    await supplier.save();
  }

  return supplier._id;
};

const findOrCreateSupplier = async (
  supplierName: string
): Promise<mongoose.Types.ObjectId> => {
  let supplier = await Supplier.findOne({ supplierName });
  if (!supplier) {
    supplier = new Supplier({ supplierName });
    await supplier.save();
  }
  return supplier._id;
};

const generateBarcode = (sku: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128", // Barcode type
        text: sku, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      },
      (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(png.toString("base64"));
        }
      }
    );
  });
};

// upload file
export const uploadProductFile = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path } = req.file;
    const productData = extractProductData(path);

    const validatedData = [];
    const supplierCache: { [key: string]: mongoose.Types.ObjectId } = {};

    for (const data of productData) {
      const supplierName = data.supplier as unknown as string;
      let supplierId: mongoose.Types.ObjectId;

      if (supplierCache[supplierName]) {
        supplierId = supplierCache[supplierName];
      } else {
        supplierId = await findOrCreateSupplier(supplierName);
        supplierCache[supplierName] = supplierId;
      }

      // Generate barcode
      const barcode = await generateBarcode(data.sku);

      const newProduct = new Product({
        ...data,
        supplier: supplierId,
        barcode,
      });

      validatedData.push(newProduct);
    }

    await Product.insertMany(validatedData);

    const entities = productData.flatMap((data) =>
      Object.keys(data).map((key) => {
        const value = data[key as keyof typeof data];
        const start = value.toString().indexOf(value.toString());
        return {
          start,
          end: start + value.toString().length,
          label: key.toUpperCase(),
        };
      })
    );

    saveAnnotatedData({
      text: JSON.stringify(productData),
      entities,
    });

    trainNerModel();

    res.status(200).json(validatedData);
  } catch (error) {
    console.error("Error processing product file:", error);
    res.status(500).json({ message: "Failed to process product file", error });
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("supplier");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: Partial<IProduct> = req.body;
    const supplierId = await linkOrCreateSupplier(
      productData.supplier as unknown as string
    );

    // Generate barcode
    const barcode = await generateBarcode(productData.sku as string);

    const newProduct = new Product({
      ...productData,
      supplier: supplierId,
      barcode,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData: Partial<IProduct> = req.body;
    const supplierId = await linkOrCreateSupplier(
      productData.supplier as unknown as string
    );

    let barcode;

    if (productData.sku) {
      barcode = await generateBarcode(productData.sku);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...productData, supplier: supplierId, barcode },
      { new: true }
    )
      .lean()
      .exec();
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

export const lookupProductBySKU = async (req: Request, res: Response) => {
  try {
    const { sku } = req.body;
    const product = await Product.findOne({ sku });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to lookup product by SKU", error });
  }
};
