import { Document, Schema, model } from "mongoose";

export interface IParkingSlot extends Document {
  location: string;
  zone: string;
  emirate: string;
  hourlyRate: number;
  isAvailable: boolean;
  latitude: number;
  longitude: number;
}

const parkingSlotSchema = new Schema<IParkingSlot>(
  {
    location: {
      type: String,
      required: true
    },
    zone: {
      type: String,
      required: true
    },
    emirate: {
      type: String,
      required: true
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ParkingSlotModel = model<IParkingSlot>(
  "ParkingSlot",
  parkingSlotSchema
);
