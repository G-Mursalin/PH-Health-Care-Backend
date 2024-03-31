import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialtyServices } from "./specialties.service";

// Create Specialties
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtyServices.createSpecialty(req);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});

export const specialtyControllers = {
  createSpecialty,
};
