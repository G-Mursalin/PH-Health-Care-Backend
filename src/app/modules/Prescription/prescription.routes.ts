import express from "express";
import { UserRole } from "@prisma/client";
import { prescriptionControllers } from "./prescription.controllers";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { prescriptionValidators } from "./prescription.validation";

const router = express.Router();

router
  .get(
    "/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    prescriptionControllers.getAllPrescriptions
  )
  .get(
    "/my-prescription",
    auth(UserRole.PATIENT),
    prescriptionControllers.getPatientPrescriptions
  )
  .post(
    "/",
    auth(UserRole.DOCTOR),
    validateRequest(prescriptionValidators.createPrescriptionSchema),
    prescriptionControllers.createPrescription
  );

export const prescriptionRoutes = router;
