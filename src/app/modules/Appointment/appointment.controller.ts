import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import { appointmentServices } from "./appointment.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await appointmentServices.createAppointment(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Appointment booked successfully",
    data: result,
  });
});

export const appointmentControllers = { createAppointment };
