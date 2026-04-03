import { Document, Schema, Types, model } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  status: "cart" | "placed" | "paid" | "fulfilled";
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        unitPrice: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["cart", "placed", "paid", "fulfilled"],
      default: "placed"
    }
  },
  {
    timestamps: true
  }
);

export const OrderModel = model<IOrder>("Order", orderSchema);

