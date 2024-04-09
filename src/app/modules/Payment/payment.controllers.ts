import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { paymentServices } from "./payment.services";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;

  const result = await paymentServices.initPayment(appointmentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment initiate successfully",
    data: result,
  });
});

export const paymentControllers = { initPayment };
