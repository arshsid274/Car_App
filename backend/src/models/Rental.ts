import { Document, Schema, model } from "mongoose";

export interface IRental extends Document {
  title: string;
  type: string;
  seats: number;
  transmission: string;
  dailyRate: number;
  deposit: number;
  available: boolean;
}

const rentalSchema = new Schema<IRental>(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    seats: {
      type: Number,
      required: true,
      min: 1
    },
    transmission: {
      type: String,
      required: true
    },
    dailyRate: {
      type: Number,
      required: true,
      min: 0
    },
    deposit: {
      type: Number,
      required: true,
      min: 0
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const RentalModel = model<IRental>("Rental", rentalSchema);

