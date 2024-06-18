// src/routes/invoiceRoutes.ts
import express from "express";
import multer from "multer";
import { postInvoice, getInvoices } from "../controllers/invoiceController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/uploadInvoices",
  upload.single("file"),
  postInvoice,
  authMiddleware
);
router.get("/invoices", getInvoices, authMiddleware);

export default router;
