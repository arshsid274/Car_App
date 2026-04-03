import { Router } from "express";

import {
  createSellListing,
  getCars,
  getValuation
} from "../controllers/carController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", getCars);
router.get("/valuation", getValuation);
router.post("/sell", protect, createSellListing);

export const carRouter = router;
