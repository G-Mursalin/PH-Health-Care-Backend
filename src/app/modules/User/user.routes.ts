import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../../helpers/uploadImageToCloudinary";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidators } from "../Admin/admin.validation";
import { userControllers } from "./user.controller";
import { doctorValidators } from "../Doctor/doctor.validation";
import { patientValidators } from "../Patient/patient.validation";
import { userValidations } from "./user.validation";

const router = Router();

router
  .get(
    "/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    userControllers.getAllUsers
  )
  .post(
    "/create-admin",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(adminValidators.createAdminValidationSchema),
    userControllers.createAdmin
  )
  .post(
    "/create-doctor",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(doctorValidators.createDoctorValidationSchema),
    userControllers.createDoctor
  )
  .post(
    "/create-patient",
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(patientValidators.createPatientValidationSchema),
    userControllers.createPatient
  )
  .patch(
    "/:id/status",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(userValidations.updateUserStatusSchema),
    userControllers.updateUserStatus
  );

export const userRoutes = router;
