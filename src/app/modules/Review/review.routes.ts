import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { reviewControllers } from "./review.controllers";
import { reviewValidators } from "./review.validations";

const router = Router();

router
  .get("/", reviewControllers.getAllReviews)
  .post(
    "/",
    auth(UserRole.PATIENT),
    validateRequest(reviewValidators.createReviewValidationSchema),
    reviewControllers.createReview
  );

export const reviewRoutes = router;
