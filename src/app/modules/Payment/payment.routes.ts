import { Router } from "express";
import { paymentControllers } from "./payment.controllers";

const router = Router();

router.post("/init-payment/:appointmentId", paymentControllers.initPayment);

export const paymentRoutes = router;
