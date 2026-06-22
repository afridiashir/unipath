import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/users/users.route.js";
import profileRoutes from "./modules/profile/profile.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // app (vite + react)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);

const port = Number(process.env.PORT ?? 3005);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
