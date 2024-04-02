import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpers/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { doctorFilterableFields } from "./doctor.constants";
import { doctorServices } from "./doctor.service";

// Get All Doctors
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await doctorServices.getAllDoctors(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctors retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

// Get Doctor By ID
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await doctorServices.getDoctorById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor retrieval successfully",
    data: result,
  });
});

// Update My Profile
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await doctorServices.updateDoctor(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor data updated successfully",
    data: result,
  });
});

// Delete Doctor Data (Hard Delete)
const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await doctorServices.deleteDoctor(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

// Delete Doctor (Soft Delete)
const softDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await doctorServices.softDeleteDoctors(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor soft deleted successfully",
    data: result,
  });
});

export const doctorControllers = {
  updateDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
  softDeleteDoctor,
};
