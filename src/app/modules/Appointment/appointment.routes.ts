import { Router } from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { appointmentControllers } from "./appointment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { appointmentValidations } from "./appointment.validations";

const router = Router();

router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(appointmentValidations.createAppointmentSchema),
  appointmentControllers.createAppointment
);

export const appointmentRoutes = router;
