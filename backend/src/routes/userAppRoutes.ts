import express from "express";
import {
  register,
  login,
  resetPassword,
} from "../controllers/userAppController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

export default router;
