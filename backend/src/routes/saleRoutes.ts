// src/routes/saleRoutes.ts
import { Router } from "express";
import { uploadSales, getSales } from "../controllers/saleController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router: Router = Router();

router.get("/sales", getSales);
router.post("/uploadSales", upload.single("file"), uploadSales);

export default router;
