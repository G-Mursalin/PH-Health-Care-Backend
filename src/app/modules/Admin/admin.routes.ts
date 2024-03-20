import { Router } from "express";
import { adminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";

const router = Router();

router
  .get("/", adminControllers.getAllAdmins)
  .get("/:id", adminControllers.getAdminById)
  .patch(
    "/:id",
    validateRequest(adminValidationSchemas.updateAdmin),
    adminControllers.updateAdmin
  )
  .delete("/:id", adminControllers.deleteAdmin)
  .delete("/soft-delete/:id", adminControllers.softDeleteAdmin);

export const adminRoutes = router;
