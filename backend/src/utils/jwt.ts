import jwt, { SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export const signAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.jwtSecret) as TokenPayload;
