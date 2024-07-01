import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/suppliers", authMiddleware, createSupplier);
router.get("/suppliers", authMiddleware, getSuppliers);
router.get("/suppliers/:id", authMiddleware, getSupplierById);
router.put("/suppliers/:id", authMiddleware, updateSupplier);
router.delete("/suppliers/:id", authMiddleware, deleteSupplier);

export default router;
