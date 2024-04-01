import { NextFunction, Request, Response, Router } from "express";
import { specialtyControllers } from "./specialty.controller";
import { UserRole } from "@prisma/client";
import { upload } from "../../../helpers/uploadImageToCloudinary";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { specialtyValidations } from "./specialty.validation";

const router = Router();

router
  .get("/", specialtyControllers.getAllSpecialties)
  .post(
    "/",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(specialtyValidations.createSpecialtySchema),
    specialtyControllers.createSpecialty
  )
  .delete(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    specialtyControllers.deleteSpecialty
  );

export const specialtyRoutes = router;
