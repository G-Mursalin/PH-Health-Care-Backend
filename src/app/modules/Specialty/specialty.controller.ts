import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialtyServices } from "./specialty.service";

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

// Get all Specialties
const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtyServices.getAllSpecialties();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

// Delete Specialty
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await specialtyServices.deleteSpecialty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export const specialtyControllers = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
