import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { doctorScheduleControllers } from "./doctorSchedule.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { doctorScheduleValidators } from "./doctorSchedule.validations";

const router = Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(
    doctorScheduleValidators.createDoctorScheduleValidationSchema
  ),
  doctorScheduleControllers.createDoctorSchedule
);

export const doctorScheduleRoutes = router;
