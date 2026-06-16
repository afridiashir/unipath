import type { Request } from "express";

export interface JwtPayload {
  id: string;
  email: string;
  role?: string;
}

// Augment Express' Request so `req.user` is available after the auth
// middleware runs, without casting on every handler.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
