import express from "express";
import multer from "multer";
import {
  postInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoiceController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/uploadInvoices", upload.single("file"), postInvoice);
router.get("/invoices", getInvoices);
router.put("/invoices/:id", updateInvoice);

export default router;
