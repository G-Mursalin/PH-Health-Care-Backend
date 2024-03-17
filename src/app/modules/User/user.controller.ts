import { Request, Response } from "express";
import { userServices } from "./user.service";

// Create Admin
const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.name || "Something Went Wrong!",
      error,
    });
  }
};

export const userControllers = {
  createAdmin,
};
