// src/controllers/orderController.ts
import { Request, Response } from "express";
import Order from "../models/Order";

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

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
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
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};
