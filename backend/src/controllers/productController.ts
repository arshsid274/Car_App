import { Request, Response } from "express";

import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const query = category ? { category } : {};

  const products = await ProductModel.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Products retrieved.",
    data: products
  });
});

export const checkoutCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const items = req.body.items as Array<{ productId: string; quantity: number }>;

  if (!items?.length) {
    throw new ApiError(400, "At least one cart item is required.");
  }

  const productIds = items.map((item) => item.productId);
  const products = await ProductModel.find({ _id: { $in: productIds } });

  const orderItems = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);

    if (!product) {
      throw new ApiError(404, `Product ${item.productId} was not found.`);
    }

    return {
      product: product._id,
      quantity: item.quantity,
      unitPrice: product.price
    };
  });

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const order = await OrderModel.create({
    user: req.user.userId,
    items: orderItems,
    subtotal,
    status: "placed"
  });

  res.status(201).json({
    success: true,
    message: "Checkout completed.",
    data: order
  });
});

export const listOrders = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const orders = await OrderModel.find({ user: req.user.userId })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Orders retrieved.",
    data: orders
  });
});
