import { Router } from "express";
import {
  subscribeToProgram,
  trackUsage,
  getUserSubscriptions,
} from "../controllers/subscriptionController";

const router: Router = Router();

router.post("/subscribe", subscribeToProgram);
router.post("/track-usage", trackUsage);
router.get("/:userId/subscriptions", getUserSubscriptions);

export default router;
