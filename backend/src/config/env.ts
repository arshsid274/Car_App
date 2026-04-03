import dotenv from "dotenv";

dotenv.config();

const required = (value: string | undefined, fallback: string) => value || fallback;

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  mongoUri: required(
    process.env.MONGO_URI,
    "mongodb://127.0.0.1:27017/uae-car-super-app"
  ),
  jwtSecret: required(process.env.JWT_SECRET, "replace-with-a-strong-secret"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  clientUrl: process.env.CLIENT_URL ?? "*"
};

