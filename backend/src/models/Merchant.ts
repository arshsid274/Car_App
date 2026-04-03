import { Document, Schema, Types, model } from "mongoose";

export interface IMerchant extends Document {
  user?: Types.ObjectId;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  emirate: string;
  category: string;
  status: "draft" | "submitted" | "approved" | "rejected";
}

const merchantSchema = new Schema<IMerchant>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    businessName: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    emirate: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "submitted"
    }
  },
  {
    timestamps: true
  }
);

export const MerchantModel = model<IMerchant>("Merchant", merchantSchema);

