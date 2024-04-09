import { Router } from "express";
import { paymentControllers } from "./payment.controllers";

const router = Router();

router
  .get("/ipn", paymentControllers.validatePayment)
  .post("/init-payment/:appointmentId", paymentControllers.initPayment);

export const paymentRoutes = router;
