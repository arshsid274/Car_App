import { Router } from "express";

import {
  createRentalBooking,
  getRentals
} from "../controllers/rentalController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", getRentals);
router.post("/book", protect, createRentalBooking);

export const rentalRouter = router;
