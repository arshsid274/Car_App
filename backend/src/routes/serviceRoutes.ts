import { Router } from "express";

import {
  createServiceBooking,
  getServiceCatalog,
  listServiceBookings
} from "../controllers/serviceController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/catalog", getServiceCatalog);
router.get("/bookings", protect, listServiceBookings);
router.post("/bookings", protect, createServiceBooking);

export const serviceRouter = router;
