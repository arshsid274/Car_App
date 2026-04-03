import { Router } from "express";

import { authRouter } from "./authRoutes";
import { carRouter } from "./carRoutes";
import { merchantRouter } from "./merchantRoutes";
import { parkingRouter } from "./parkingRoutes";
import { productRouter } from "./productRoutes";
import { rentalRouter } from "./rentalRoutes";
import { serviceRouter } from "./serviceRoutes";
import { userRouter } from "./userRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/services", serviceRouter);
router.use("/products", productRouter);
router.use("/cars", carRouter);
router.use("/rentals", rentalRouter);
router.use("/parking", parkingRouter);
router.use("/merchant", merchantRouter);

export const apiRouter = router;
