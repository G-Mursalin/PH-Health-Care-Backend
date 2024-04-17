import { metaServices } from "./meta.services";
import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// Get Dashboard Meta Data
const getDashboardMetaData = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await metaServices.getDashboardMetaData(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Dashboard data retrieval successfully",
    data: result,
  });
});

export const metaControllers = { getDashboardMetaData };
