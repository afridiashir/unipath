import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { getProfile, upsertProfile } from "./profile.controller.js";

const router = Router();

router.get("/", auth, getProfile);
router.put("/", auth, upsertProfile);

export default router;
