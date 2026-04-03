import { Document, Schema, Types, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: "customer" | "merchant" | "admin";
  savedVehicles: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ["customer", "merchant", "admin"],
      default: "customer"
    },
    savedVehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vehicle"
      }
    ]
  },
  {
    timestamps: true
  }
);

export const UserModel = model<IUser>("User", userSchema);

