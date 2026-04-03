import { Document, Schema, Types, model } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  type: "car-wash" | "repair" | "parking" | "rental";
  title: string;
  scheduledFor: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
  metadata?: Record<string, unknown>;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["car-wash", "repair", "parking", "rental"],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    scheduledFor: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    metadata: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);

