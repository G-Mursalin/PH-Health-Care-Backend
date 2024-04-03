import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../helpers/catchAsync";
import { StatusCodes } from "http-status-codes";
import { scheduleServices } from "./schedule.service";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.createSchedule(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

export const scheduleControllers = {
  createSchedule,
};
