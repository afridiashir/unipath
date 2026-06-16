import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/request.types.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
