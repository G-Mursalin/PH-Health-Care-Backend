import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { doctorScheduleServices } from "./doctorSchedule.services";
import pick from "../../../shared/pick";

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

// Get My Schedule
const getMySchedule = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const user = req.user;
  const result = await doctorScheduleServices.getMySchedule(
    filters,
    options,
    user
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My Schedules retried successfully",
    data: result,
  });
});

// Delete My Schedule
const deleteMySchedule = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;

  const result = await doctorScheduleServices.deleteMySchedule(user, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const doctorScheduleControllers = {
  createDoctorSchedule,
  getMySchedule,
  deleteMySchedule,
};
