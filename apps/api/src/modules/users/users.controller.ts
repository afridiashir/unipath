import type { Request, Response } from "express";
import { prisma } from "@repo/db";
import {
  createUserSchema,
  addPasswordSchema,
  newPasswordSchema,
} from "@repo/schemas";
import type { AuthenticatedRequest } from "../../types/request.types.js";
import bcrypt from "bcryptjs";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

export const listUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: publicUserSelect });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  const user = await prisma.user.create({
    data: parsed.data,
    select: publicUserSelect,
  });
  res.status(201).json(user);
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: publicUserSelect,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addPassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = addPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password) {
      return res.status(400).json({ message: "Password already set" });
    }

    const hashed = await bcrypt.hash(parsed.data.newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });
    res.json({ message: "Password added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const setNewPassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const parsed = newPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const { currentPassword, newPassword } = parsed.data;
    const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.password) {
      return res
        .status(400)
        .json({ message: "No password set. Please add a password first." });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
