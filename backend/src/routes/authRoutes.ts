import { Router } from "express";

import { getCurrentUser, login, register } from "../controllers/authController";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

export const authRouter = router;
