import express from "express";
import { authControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";

const router = express.Router();

router
  .post(
    "/login",
    validateRequest(authValidations.loginValidationSchema),
    authControllers.loginUser
  )
  .post(
    "/refresh-token",
    validateRequest(authValidations.refreshTokenValidationSchema),
    authControllers.refreshToken
  )
  .post(
    "/change-password",
    validateRequest(authValidations.changePasswordValidationSchema),
    auth(
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.DOCTOR,
      UserRole.PATIENT
    ),
    authControllers.changePassword
  )
  .post(
    "/forgot-password",
    validateRequest(authValidations.forgetPasswordValidationSchema),
    authControllers.forgetPassword
  )
  .post(
    "/reset-password",
    validateRequest(authValidations.resetPasswordValidationSchema),
    authControllers.resetPassword
  );

export const authRoutes = router;
