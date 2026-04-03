import { Router } from "express";

import {
  listMerchants,
  registerMerchant
} from "../controllers/merchantController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", listMerchants);
router.post("/register", protect, registerMerchant);

export const merchantRouter = router;
