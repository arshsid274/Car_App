import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  description?: string;
  fitment?: string;
  imageUrl?: string;
}

const productSchema = new Schema<IProduct>(
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
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String
    },
    fitment: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const ProductModel = model<IProduct>("Product", productSchema);
