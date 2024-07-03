// src/routes/orderRoutes.ts
import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getOrders);
router.put("/orders/:id", authMiddleware, updateOrder);
router.delete("/orders/:id", authMiddleware, deleteOrder);

export default router;
