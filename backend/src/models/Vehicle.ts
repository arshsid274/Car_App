import { Schema, Types, model } from "mongoose";

export interface IVehicle {
  user: Types.ObjectId;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    plateNumber: {
      type: String,
      required: true,
      trim: true
    },
    make: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true,
      min: 1990
    }
  },
  {
    timestamps: true
  }
);

export const VehicleModel = model<IVehicle>("Vehicle", vehicleSchema);
