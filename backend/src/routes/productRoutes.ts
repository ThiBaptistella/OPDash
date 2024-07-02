import { Router } from "express";
import multer from "multer";
import {
  uploadProductFile,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import authMiddleware from "../middlewares/authMiddleware";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post(
  "/uploadProductFile",
  upload.single("file"),
  authMiddleware,
  uploadProductFile
);
router.get("/products", authMiddleware, getProducts);
router.post("/products", authMiddleware, createProduct);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
