import { Request, Response, NextFunction } from "express";
import { JWT_PASSWORD } from "./config";
import jwt from "jsonwebtoken";

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization token missing or malformed" });
      return;
    }

    const token = header.split(" ")[1]; // Extract the token part
    const decoded = jwt.verify(token, JWT_PASSWORD) as jwt.JwtPayload;

    if (decoded) {
      // Attach user ID to the request object
      (req as any).userId = decoded.id; // Ensure compatibility
      next();
    } else {
      res.status(403).json({ message: "You are not logged in" });
    }
  } catch (error) {
    res.status(403).json({ 
      message: "Invalid token", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};