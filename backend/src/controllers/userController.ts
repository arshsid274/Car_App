import { Request, Response } from "express";

import { UserModel } from "../models/User";
import { VehicleModel } from "../models/Vehicle";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const user = await UserModel.findById(req.user.userId)
    .select("-passwordHash")
    .populate("savedVehicles");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  res.status(200).json({
    success: true,
    message: "Profile retrieved.",
    data: user
  });
});

export const addVehicle = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const { plateNumber, make, model, year } = req.body;

  if (!plateNumber || !make || !model || !year) {
    throw new ApiError(400, "Vehicle details are incomplete.");
  }

  const vehicle = await VehicleModel.create({
    user: req.user.userId,
    plateNumber,
    make,
    model,
    year
  });

  await UserModel.findByIdAndUpdate(req.user.userId, {
    $addToSet: { savedVehicles: vehicle._id }
  });

  res.status(201).json({
    success: true,
    message: "Vehicle saved successfully.",
    data: vehicle
  });
});

export const listSavedVehicles = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const vehicles = await VehicleModel.find({ user: req.user.userId }).sort({
    createdAt: -1
  });

  res.status(200).json({
    success: true,
    message: "Vehicles retrieved.",
    data: vehicles
  });
});
