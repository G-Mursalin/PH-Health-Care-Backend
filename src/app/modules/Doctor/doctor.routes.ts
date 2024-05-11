import { Router } from "express";
import { doctorControllers } from "./doctor.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { doctorValidators } from "./doctor.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router
  .get("/", doctorControllers.getAllDoctors)
  .get("/:id", doctorControllers.getDoctorById)
  .patch(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    validateRequest(doctorValidators.updateDoctorValidationSchema),
    doctorControllers.updateDoctor
  )
  .delete(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    doctorControllers.deleteDoctor
  )
  .delete(
    "/soft/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    doctorControllers.softDeleteDoctor
  );

export const doctorRoutes = router;
