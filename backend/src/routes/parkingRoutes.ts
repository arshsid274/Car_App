import { Router } from "express";

import {
  getParkingSlots,
  reserveParkingSlot
} from "../controllers/parkingController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", getParkingSlots);
router.post("/reserve", protect, reserveParkingSlot);

export const parkingRouter = router;
