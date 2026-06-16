import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/users/users.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // web (next)
      "http://localhost:3001", // docs (next)
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

const port = Number(process.env.PORT ?? 3005);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
