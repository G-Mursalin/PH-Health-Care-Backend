import { Router } from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { appointmentControllers } from "./appointment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { appointmentValidations } from "./appointment.validations";

const router = Router();

router
  .get(
    "/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    appointmentControllers.getAllAppointments
  )
  .post(
    "/",
    auth(UserRole.PATIENT),
    validateRequest(appointmentValidations.createAppointmentSchema),
    appointmentControllers.createAppointment
  )
  .get(
    "/my-appointment",
    auth(UserRole.PATIENT, UserRole.DOCTOR),
    appointmentControllers.getMyAppointment
  )
  .patch(
    "/status/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    appointmentControllers.updateAppointmentStatus
  );

export const appointmentRoutes = router;
