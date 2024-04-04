import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { doctorScheduleServices } from "./doctorSchedule.services";

// Create Doctor Schedule
const createDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await doctorScheduleServices.createDoctorSchedule(
    user,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor Schedule created successfully",
    data: result,
  });
});

export const doctorScheduleControllers = { createDoctorSchedule };
