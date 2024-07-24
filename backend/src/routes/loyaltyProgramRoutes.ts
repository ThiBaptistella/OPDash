import express from "express";
import {
  createLoyaltyProgram,
  getLoyaltyPrograms,
  getByIdLoyaltyPrograms,
  updateLoyaltyProgram,
  deleteLoyaltyProgram,
} from "../controllers/loyaltyProgramController";

const router = express.Router();

router.post("/createLoyalty", createLoyaltyProgram);
router.get("/loyalty", getLoyaltyPrograms);
router.get("/loyalty/:id", getByIdLoyaltyPrograms);
router.put("/loyalty/:id", updateLoyaltyProgram);
router.delete("/loyalty/:id", deleteLoyaltyProgram);

export default router;
