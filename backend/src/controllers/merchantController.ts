import { Request, Response } from "express";

import { MerchantModel } from "../models/Merchant";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const registerMerchant = catchAsync(async (req: Request, res: Response) => {
  const { businessName, ownerName, email, phone, emirate, category } = req.body;

  if (!businessName || !ownerName || !email || !phone || !emirate || !category) {
    throw new ApiError(
      400,
      "Business name, owner name, email, phone, emirate, and category are required."
    );
  }

  const merchant = await MerchantModel.create({
    user: req.user?.userId,
    businessName,
    ownerName,
    email,
    phone,
    emirate,
    category,
    status: "submitted"
  });

  res.status(201).json({
    success: true,
    message: "Merchant registration submitted.",
    data: merchant
  });
});

export const listMerchants = catchAsync(async (_req: Request, res: Response) => {
  const merchants = await MerchantModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Merchant records retrieved.",
    data: merchants
  });
});
