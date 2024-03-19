import { Router } from "express";
import { adminControllers } from "./admin.controller";

const router = Router();

router
  .get("/", adminControllers.getAllAdmins)
  .get("/:id", adminControllers.getAdminById)
  .patch("/:id", adminControllers.updateAdmin)
  .delete("/:id", adminControllers.deleteAdmin)
  .delete("/soft-delete/:id", adminControllers.softDeleteAdmin);

export const adminRoutes = router;
