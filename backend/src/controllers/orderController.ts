// src/controllers/orderController.ts
import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { supplier, products, totalAmount } = req.body;
    const newOrder = new Order({ supplier, products, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("supplier")
      .populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
    });
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
