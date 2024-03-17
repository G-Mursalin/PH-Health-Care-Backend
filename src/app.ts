import express, { Application } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/Admin/admin.routes";

// Global Middlewares
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All routers
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Health check route
app.get("/health", (req, res, next) => {
  res.send({ message: "server is running" });
});

export default app;
