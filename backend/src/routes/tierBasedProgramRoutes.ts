import express from "express";
import {
  createTierBasedProgram,
  getTierBasedPrograms,
  getTierBasedProgramById,
  updateTierBasedProgram,
  deleteTierBasedProgram,
} from "../controllers/tierBasedProgramController";

const router = express.Router();

router.post("/createTierBased", createTierBasedProgram);
router.get("/tierBased", getTierBasedPrograms);
router.get("/tierBased/:id", getTierBasedProgramById);
router.put("/tierBased/:id", updateTierBasedProgram);
router.delete("/tierBased/:id", deleteTierBasedProgram);

export default router;
