// src/routes/eodRoutes.ts
import { Router } from "express";
import multer from "multer";
import { getEODs, uploadEOD, updateEOD } from "../controllers/eodController";

const upload = multer({ dest: "uploads/" });

const router: Router = Router();

router.get("/eod", getEODs);
router.post("/uploadEod", upload.single("file"), uploadEOD);
router.put("/eod/:id", updateEOD);

export default router;
