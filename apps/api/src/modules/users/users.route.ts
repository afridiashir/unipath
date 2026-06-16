import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import {
  listUsers,
  createUser,
  me,
  addPassword,
  setNewPassword,
} from "./users.controller.js";

const router = Router();

router.get("/", listUsers);
router.post("/", createUser);

// Authenticated routes
router.get("/me", auth, me);
router.post("/add-password", auth, addPassword);
router.post("/new-password", auth, setNewPassword);

export default router;
