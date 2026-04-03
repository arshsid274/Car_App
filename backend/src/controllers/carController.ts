import { Request, Response } from "express";

import { CarModel } from "../models/Car";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const getCars = catchAsync(async (req: Request, res: Response) => {
  const listingType = (req.query.listingType as string | undefined) ?? "buy";

  const cars = await CarModel.find({ listingType }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Cars retrieved.",
    data: cars
  });
});

export const createSellListing = catchAsync(async (req: Request, res: Response) => {
  const { title, make, model, year, mileage, price } = req.body;

  if (!title || !make || !model || !year || mileage == null || price == null) {
    throw new ApiError(400, "Sell-listing details are incomplete.");
  }

  const car = await CarModel.create({
    owner: req.user?.userId,
    title,
    make,
    model,
    year,
    mileage,
    price,
    city: "Dubai",
    fuelType: "Petrol",
    transmission: "Automatic",
    listingType: "sell",
    financeEligible: false
  });

  res.status(201).json({
    success: true,
    message: "Sell listing created.",
    data: car
  });
});

export const getValuation = catchAsync(async (req: Request, res: Response) => {
  const year = Number(req.query.year);
  const mileage = Number(req.query.mileage ?? 0);
  const currentYear = new Date().getFullYear();

  if (!year) {
    throw new ApiError(400, "Vehicle year is required.");
  }

  const depreciation = Math.max(0, (currentYear - year) * 9500 + mileage * 0.18);
  const estimatedValue = Math.max(25000, 145000 - depreciation);

  res.status(200).json({
    success: true,
    message: "Valuation calculated.",
    data: {
      estimatedValue: Math.round(estimatedValue),
      currency: "AED"
    }
  });
});
