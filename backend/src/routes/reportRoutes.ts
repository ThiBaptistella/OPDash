import express from "express";
import {
  getBalanceSheet,
  getBankSummary,
  getBudgetSummary,
  getExecutiveSummary,
  getProfitAndLoss,
  getTrialBalance,
} from "../controllers/reportController";
import authMiddleware from "../middlewares/authMiddleware";
import { cache } from "../utils/cache";

const router = express.Router();

router.get("/balanceSheet", authMiddleware, cache, getBalanceSheet);
router.get("/bankSummary", authMiddleware, cache, getBankSummary);
router.get("/budgetSummary", authMiddleware, cache, getBudgetSummary);
router.get("/executiveSummary", authMiddleware, cache, getExecutiveSummary);
router.get("/ProfitAndLoss", authMiddleware, getProfitAndLoss);
router.get("/TrialBalance", authMiddleware, getTrialBalance);

export default router;
