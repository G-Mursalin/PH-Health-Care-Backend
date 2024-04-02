import { Request, Response } from "express";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { patientFilterableFields } from "./patient.constants";
import catchAsync from "../../../helpers/catchAsync";
import { patientServices } from "./patient.services";
import { StatusCodes } from "http-status-codes";

// Get All Patients
const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await patientServices.getAllPatients(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patients retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

// Get Patent By ID
const getPatentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await patientServices.getPatentById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient retrieval successfully",
    data: result,
  });
});

// Update Patent Data
const updatePatent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await patientServices.updatePatent(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient data updated successfully",
    data: result,
  });
});

// Delete Patent Data (Heard Delete)
const deletePatent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await patientServices.deletePatent(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient data deleted successfully",
    data: result,
  });
});

// Delete Patent Data (Soft Delete)
const softDeletePatent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await patientServices.softDeletePatent(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient data soft deleted successfully",
    data: result,
  });
});

export const patientControllers = {
  getAllPatients,
  getPatentById,
  updatePatent,
  deletePatent,
  softDeletePatent,
};
