import { Router } from "express";
import {
  subscribeToProgram,
  trackUsage,
  getUserSubscriptions,
  unsubscribeFromProgram,
} from "../controllers/subscriptionController";

const router: Router = Router();

router.post("/subscribe", subscribeToProgram);
router.post("/unsubscribe", unsubscribeFromProgram);
router.post("/trackUsage", trackUsage);
router.get("/user/:programId", getUserSubscriptions);

export default router;
