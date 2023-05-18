import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/user";
import dotenv from "dotenv";
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: UserAttributes;
}

export const generateToken = (
  payload: Record<PropertyKey, unknown>
): string => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate token");
  }
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  try {
    const decodedToken = await verifyToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
