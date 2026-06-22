import type { Request, Response } from "express";
import { prisma, Prisma } from "@repo/db";
import { registerSchema, loginSchema, googleAuthSchema } from "@repo/schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user: { id: string; email: string; role: string }) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

/** A user is "onboarded" once they have a saved profile. */
const isOnboarded = async (userId: string) =>
  !!(await prisma.profile.findUnique({
    where: { userId },
    select: { id: true },
  }));

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed } as Prisma.UserCreateInput,
    });

    const token = signToken(user);
    // A freshly registered user never has a profile yet.
    res
      .status(201)
      .json({ token, email: user.email, name: user.name, onboarded: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);
    const onboarded = await isOnboarded(user.id);
    res.json({ token, email: user.email, name: user.name, onboarded });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

interface GoogleProfile {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const parsed = googleAuthSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const { token: accessToken } = parsed.data;

    // The frontend uses Google's implicit flow, which yields an access token.
    // Exchange it for the user's profile (this also validates the token).
    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!googleRes.ok) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const profile = (await googleRes.json()) as GoogleProfile;

    if (!profile.email) {
      return res.status(400).json({ message: "Google account has no email" });
    }

    // Link to an existing account by email, or create a passwordless one.
    let user = await prisma.user.findUnique({
      where: { email: profile.email },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name ?? null,
        } as Prisma.UserCreateInput,
      });
    }

    const token = signToken(user);
    const onboarded = await isOnboarded(user.id);
    res.json({
      token,
      email: user.email,
      name: user.name,
      avatar: profile.picture,
      onboarded,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
