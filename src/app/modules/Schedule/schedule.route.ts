import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router
  .get("/", auth(UserRole.DOCTOR), scheduleControllers.getAllSchedules)
  .post(
    "/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    scheduleControllers.createSchedule
  );

export const scheduleRoutes = router;
