import { Request, Response } from "express";

import { BookingModel } from "../models/Booking";
import { RentalModel } from "../models/Rental";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const getRentals = catchAsync(async (_req: Request, res: Response) => {
  const rentals = await RentalModel.find({ available: true }).sort({ dailyRate: 1 });

  res.status(200).json({
    success: true,
    message: "Rental listings retrieved.",
    data: rentals
  });
});

export const createRentalBooking = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const { rentalId, startDate, endDate } = req.body;

  if (!rentalId || !startDate || !endDate) {
    throw new ApiError(400, "Rental, start date, and end date are required.");
  }

  const rental = await RentalModel.findById(rentalId);

  if (!rental) {
    throw new ApiError(404, "Rental was not found.");
  }

  const booking = await BookingModel.create({
    user: req.user.userId,
    type: "rental",
    title: rental.title,
    scheduledFor: startDate,
    status: "confirmed",
    amount: rental.dailyRate,
    metadata: {
      endDate,
      rentalId
    }
  });

  res.status(201).json({
    success: true,
    message: "Rental booking created.",
    data: booking
  });
});
