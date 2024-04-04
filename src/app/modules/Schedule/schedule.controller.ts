import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../helpers/catchAsync";
import { StatusCodes } from "http-status-codes";
import { scheduleServices } from "./schedule.service";
import pick from "../../../shared/pick";

// Create Schedule
const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.createSchedule(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

// Get all Schedules
const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["startDate", "endDate"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const user = req.user;

  const result = await scheduleServices.getAllSchedules(filters, options, user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedules retrieved successfully",
    data: result,
  });
});

export const scheduleControllers = {
  createSchedule,
  getAllSchedules,
};
