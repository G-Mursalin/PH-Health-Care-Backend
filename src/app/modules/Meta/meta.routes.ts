import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { metaControllers } from "./meta.controllers";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  metaControllers.getDashboardMetaData
);

export const metaRoutes = router;
