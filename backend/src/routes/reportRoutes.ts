import express from "express";
import {
  getBalanceSheet,
  getBankSummary,
  getExecutiveSummary,
  getProfitAndLoss,
  getTrialBalance,
} from "../controllers/reportController";
import authMiddleware from "../middlewares/authMiddleware";
import { cache } from "../utils/cache";

const router = express.Router();

router.get("/balanceSheet", authMiddleware, getBalanceSheet);
router.get("/bankSummary", authMiddleware, getBankSummary);
router.get("/executiveSummary", authMiddleware, getExecutiveSummary);
router.get("/ProfitAndLoss", authMiddleware, getProfitAndLoss);
router.get("/TrialBalance", authMiddleware, getTrialBalance);

export default router;
