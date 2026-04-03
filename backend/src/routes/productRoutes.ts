import { Router } from "express";

import {
  checkoutCart,
  getProducts,
  listOrders
} from "../controllers/productController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", getProducts);
router.get("/orders", protect, listOrders);
router.post("/cart/checkout", protect, checkoutCart);

export const productRouter = router;
