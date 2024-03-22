import express from "express";
import { authControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .post("/login", authControllers.loginUser)
  .post("/refresh-token", authControllers.refreshToken)
  .post(
    "/change-password",
    auth(
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.DOCTOR,
      UserRole.PATIENT
    ),
    authControllers.changePassword
  );

export const authRoutes = router;
