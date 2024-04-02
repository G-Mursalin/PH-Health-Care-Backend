import { Router } from "express";
import { patientControllers } from "./patient.controller";
import validateRequest from "../../middlewares/validateRequest";
import { patientValidators } from "./patient.validation";

const router = Router();

router
  .get("/", patientControllers.getAllPatients)
  .get("/:id", patientControllers.getPatentById)
  .patch(
    "/:id",
    validateRequest(patientValidators.updatePatientValidationSchema),
    patientControllers.updatePatent
  )
  .delete("/:id", patientControllers.deletePatent)
  .delete("/soft/:id", patientControllers.softDeletePatent);

export const patientRoutes = router;
