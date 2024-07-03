import express from "express";
import multer from "multer";
import {
  postInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoiceController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/uploadInvoices",
  upload.single("file"),
  authMiddleware,
  postInvoice
);
router.get("/invoices", authMiddleware, getInvoices);
router.put("/invoices/:id", authMiddleware, updateInvoice);

export default router;
