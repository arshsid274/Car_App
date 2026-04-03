import { Schema, Types, model } from "mongoose";

export interface ICar {
  owner?: Types.ObjectId;
  title: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  price: number;
  city: string;
  listingType: "buy" | "sell";
  financeEligible: boolean;
  images: string[];
}

const carSchema = new Schema<ICar>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true,
      min: 1990
    },
    mileage: {
      type: Number,
      required: true,
      min: 0
    },
    fuelType: {
      type: String,
      required: true
    },
    transmission: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    city: {
      type: String,
      required: true
    },
    listingType: {
      type: String,
      enum: ["buy", "sell"],
      default: "buy"
    },
    financeEligible: {
      type: Boolean,
      default: true
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const CarModel = model<ICar>("Car", carSchema);
