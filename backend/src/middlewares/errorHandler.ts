import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, "The requested resource could not be found."));
};

export const errorHandler = (
  error: Error & { statusCode?: number; code?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with the same unique field already exists."
    });
  }

  const statusCode = error.statusCode ?? 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Unexpected server error."
  });
};
