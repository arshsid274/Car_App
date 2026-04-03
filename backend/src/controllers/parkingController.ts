import { Request, Response } from "express";

import { BookingModel } from "../models/Booking";
import { ParkingSlotModel } from "../models/ParkingSlot";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";

export const getParkingSlots = catchAsync(async (_req: Request, res: Response) => {
  const slots = await ParkingSlotModel.find({ isAvailable: true }).sort({
    hourlyRate: 1
  });

  res.status(200).json({
    success: true,
    message: "Parking slots retrieved.",
    data: slots
  });
});

export const reserveParkingSlot = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const { parkingSlotId, startsAt } = req.body;

  if (!parkingSlotId || !startsAt) {
    throw new ApiError(400, "Parking slot and start time are required.");
  }

  const slot = await ParkingSlotModel.findById(parkingSlotId);

  if (!slot) {
    throw new ApiError(404, "Parking slot not found.");
  }

  if (!slot.isAvailable) {
    throw new ApiError(409, "Parking slot is no longer available.");
  }

  slot.isAvailable = false;
  await slot.save();

  const booking = await BookingModel.create({
    user: req.user.userId,
    type: "parking",
    title: `${slot.location} - ${slot.zone}`,
    scheduledFor: startsAt,
    status: "confirmed",
    amount: slot.hourlyRate,
    metadata: {
      parkingSlotId
    }
  });

  res.status(201).json({
    success: true,
    message: "Parking slot reserved.",
    data: booking
  });
});
