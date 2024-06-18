import express, { Request, Response } from "express";
import { authenticateXero, handleCallback, xero } from "../xeroConfig";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/connect", authMiddleware, authenticateXero);
router.get("/callback", handleCallback);

// Protect routes that require authentication
router.get("/tenants", authMiddleware, async (req: Request, res: Response) => {
  try {
    await xero.updateTenants();
    res.json(xero.tenants);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching tenants:", error);
    res.status(500).send(error.message);
  }
});

export default router;
