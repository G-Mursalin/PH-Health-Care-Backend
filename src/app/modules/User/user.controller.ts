import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import { userServices } from "./user.service";

// Create Admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { password, admin } = req.body;

  const result = await userServices.createAdmin(file, password, admin);

  res.status(201).json({
    success: true,
    message: "Admin Created Successfully",
    data: result,
  });
});

// Create Doctor
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { password, doctor } = req.body;

  const result = await userServices.createDoctor(file, password, doctor);

  res.status(201).json({
    success: true,
    message: "Doctor Created Successfully",
    data: result,
  });
});

// Create Patient
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { password, patient } = req.body;

  const result = await userServices.createPatient(file, password, patient);

  res.status(201).json({
    success: true,
    message: "Patient Created Successfully",
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
};
