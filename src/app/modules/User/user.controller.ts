import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import { userServices } from "./user.service";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// Get All Users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userServices.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});
// Create Admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { password, admin } = req.body;

  const result = await userServices.createAdmin(file, password, admin);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

// Create Doctor
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { password, doctor } = req.body;

  const result = await userServices.createDoctor(file, password, doctor);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

// Create Patient
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { password, patient } = req.body;

  const result = await userServices.createPatient(file, password, patient);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Patent created successfully",
    data: result,
  });
});

// Update User Status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.updateUserStatus(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users profile status changed",
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers,
  updateUserStatus,
};
