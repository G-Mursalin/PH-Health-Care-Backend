import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router
  .get("/", auth(UserRole.DOCTOR), scheduleControllers.getAllSchedules)
  .get(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    scheduleControllers.getScheduleById
  )
  .post(
    "/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    scheduleControllers.createSchedule
  )
  .delete(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    scheduleControllers.deleteSchedule
  );

export const scheduleRoutes = router;
