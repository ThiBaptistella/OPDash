// src/routes/auth.ts
import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUser);

export default router;
