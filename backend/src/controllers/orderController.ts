// src/controllers/orderController.ts
import { Request, Response } from "express";
import Order from "../models/Order";
import InventoryItem from "../models/InventoryItem";
import Product from "../models/Product"; // Make sure to import the Product model

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, status, orderDate, totalAmount, supplier, address } =
      req.body;

    if (!supplier) {
      return res.status(400).json({ message: "Supplier is required" });
    }

    const newOrder = new Order({
      products,
      status,
      orderDate,
      totalAmount,
      supplier,
      address,
    });

    const savedOrder = await newOrder.save();

    // Update or create inventory items
    for (const item of products) {
      console.log("Processing product:", item.product);
      let inventoryItem = await InventoryItem.findOne({
        product: item.product,
      });

      if (inventoryItem) {
        console.log(`Found inventory item: ${inventoryItem}`);
        inventoryItem.stock -= item.quantity;
        await inventoryItem.save();
        console.log("Updated inventory item:", inventoryItem);
      } else {
        const product = await Product.findById(item.product); // Retrieve the product to get the SKU
        if (!product) {
          console.log(`Product not found for ID ${item.product}`);
          continue;
        }

        console.log(
          `No inventory item found for product ${item.product}, creating new inventory item`
        );
        inventoryItem = new InventoryItem({
          product: item.product,
          sku: product.sku, // Assign the SKU from the product
          stock: item.quantity, // Set initial stock to the order quantity
          tracked: true,
        });
        await inventoryItem.save();
        console.log("Created new inventory item:", inventoryItem);
      }
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("supplier").populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { products, status, orderDate, totalAmount, supplier, address } =
      req.body;

    if (!supplier) {
      return res.status(400).json({ message: "Supplier is required" });
    }

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Revert stock for previous products
    for (const item of existingOrder.products) {
      const inventoryItem = await InventoryItem.findOne({
        products: item.product,
      });
      if (inventoryItem) {
        inventoryItem.stock += item.quantity;
        await inventoryItem.save();
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        products,
        status,
        orderDate,
        totalAmount,
        supplier,
        address,
      },
      { new: true }
    );

    // Update stock for new products
    for (const item of products) {
      const inventoryItem = await InventoryItem.findOne({
        product: item.product,
      });
      if (inventoryItem) {
        inventoryItem.stock -= item.quantity;
        await inventoryItem.save();
      }
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Revert stock for deleted order products
    for (const item of deletedOrder.products) {
      const inventoryItem = await InventoryItem.findOne({
        products: item.product,
      });
      if (inventoryItem) {
        inventoryItem.stock += item.quantity;
        await inventoryItem.save();
      }
    }

    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};
