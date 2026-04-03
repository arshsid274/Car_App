import { Router } from "express";

import {
  addVehicle,
  getProfile,
  listSavedVehicles
} from "../controllers/userController";
import { protect } from "../middlewares/auth";

const router = Router();

router.use(protect);
router.get("/profile", getProfile);
router.get("/vehicles", listSavedVehicles);
router.post("/vehicles", addVehicle);

export const userRouter = router;
