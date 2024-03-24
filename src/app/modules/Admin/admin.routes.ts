import { Router } from "express";
import { adminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidators } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router
  .get(
    "/",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    adminControllers.getAllAdmins
  )
  .get(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    adminControllers.getAdminById
  )
  .patch(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(adminValidators.updateAdminSchema),
    adminControllers.updateAdmin
  )
  .delete(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    adminControllers.deleteAdmin
  )
  .delete(
    "/soft-delete/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    adminControllers.softDeleteAdmin
  );

export const adminRoutes = router;
