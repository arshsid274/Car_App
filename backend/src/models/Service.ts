import { Document, Schema, model } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  category: "car-wash" | "repair";
  durationMinutes: number;
  basePrice: number;
  tags: string[];
  isActive: boolean;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["car-wash", "repair"],
      required: true
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 0
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    tags: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const ServiceModel = model<IService>("Service", serviceSchema);

