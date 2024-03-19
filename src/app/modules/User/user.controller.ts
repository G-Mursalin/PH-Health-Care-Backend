import { Request, Response } from "express";
import { userServices } from "./user.service";
import catchAsync from "../../../helpers/catchAsync";

// Create Admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req.body);
  res.status(201).json({
    success: true,
    message: "Admin Created Successfully",
    data: result,
  });
});

export const userControllers = {
  createAdmin,
};
