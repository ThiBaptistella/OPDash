// src/routes/inventoryRoutes.ts
import { Router } from "express";
import {
  createInventoryItem,
  getInventoryItems,
  createInventoryLevel,
  getInventoryLevels,
  createLocation,
  getLocations,
} from "../controllers/inventoryController";

const router = Router();

router.post("/inventory-items", createInventoryItem);
router.get("/inventory-items", getInventoryItems);

router.post("/inventory-levels", createInventoryLevel);
router.get("/inventory-levels", getInventoryLevels);

router.post("/locations", createLocation);
router.get("/locations", getLocations);

export default router;
