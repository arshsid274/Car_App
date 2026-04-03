import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";
import { verifyAccessToken } from "../utils/jwt";

export const protect = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authentication token is missing."));
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    req.user = verifyAccessToken(token);
    return next();
  } catch {
    return next(new ApiError(401, "Authentication token is invalid or expired."));
  }
};
