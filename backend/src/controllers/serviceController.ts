import { Request, Response } from "express";

import { BookingModel } from "../models/Booking";
import { ServiceModel } from "../models/Service";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const getServiceCatalog = catchAsync(async (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;

  const query = category ? { category, isActive: true } : { isActive: true };
  const services = await ServiceModel.find(query).sort({ basePrice: 1 });

  res.status(200).json({
    success: true,
    message: "Service catalog retrieved.",
    data: services
  });
});

export const createServiceBooking = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const { type, serviceName, scheduledFor, price } = req.body;

  if (!type || !serviceName || !scheduledFor || price == null) {
    throw new ApiError(400, "Booking type, service name, schedule, and price are required.");
  }

  const booking = await BookingModel.create({
    user: req.user.userId,
    type,
    title: serviceName,
    scheduledFor,
    status: "confirmed",
    amount: price
  });

  res.status(201).json({
    success: true,
    message: "Service booking created.",
    data: booking
  });
});

export const listServiceBookings = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const bookings = await BookingModel.find({
    user: req.user.userId,
    type: { $in: ["car-wash", "repair"] }
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Service bookings retrieved.",
    data: bookings
  });
});
