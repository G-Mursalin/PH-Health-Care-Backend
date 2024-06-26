import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { appointmentServices } from "./app/modules/Appointment/appointment.services";

// Global Middlewares
const app: Application = express();
app.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App routers
app.use("/api/v1", router);

// Global Error Handler
app.use(globalErrorHandler);

// Scheduled Functions
cron.schedule("* * * * *", () => {
  try {
    appointmentServices.cancelUnpaidAppointments();
  } catch (err) {
    console.error(err);
  }
});

// Check Health of The Server
app.get("/health", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Server is running" });
});

// Handle Not Found Route
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
});

export default app;
