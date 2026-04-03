import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { UserModel } from "../models/User";
import { ApiError } from "../utils/apiError";
import { catchAsync } from "../utils/catchAsync";
import { signAccessToken } from "../utils/jwt";

const sanitizeUser = (user: {
  _id: unknown;
  name: string;
  email: string;
  phone?: string;
  role: string;
}) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required.");
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await UserModel.create({
    name,
    email,
    passwordHash,
    phone
  });

  const token = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  res.status(201).json({
    success: true,
    message: "Registration successful.",
    data: {
      user: sanitizeUser(user),
      token
    }
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      user: sanitizeUser(user),
      token
    }
  });
});

export const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication is required.");
  }

  const user = await UserModel.findById(req.user.userId).select("-passwordHash");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  res.status(200).json({
    success: true,
    message: "Current user retrieved.",
    data: user
  });
});
