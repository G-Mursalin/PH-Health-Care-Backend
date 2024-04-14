import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { prescriptionFilterableFields } from "./prescription.constants";
import catchAsync from "../../../helpers/catchAsync";
import { prescriptionServices } from "./prescription.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// Create Prescription
const createPrescription = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await prescriptionServices.createPrescription(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Prescription created successfully",
    data: result,
  });
});

// Get Patent All Prescriptions
const getPatientPrescriptions = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await prescriptionServices.getPatientPrescriptions(
      user,
      options
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Patient prescriptions fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get All Prescriptions
const getAllPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, prescriptionFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await prescriptionServices.getAllPrescriptions(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Prescriptions retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const prescriptionControllers = {
  createPrescription,
  getPatientPrescriptions,
  getAllPrescriptions,
};
