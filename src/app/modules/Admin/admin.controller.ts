import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

// Get All Admins
const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await adminServices.getAllAdmins(filters, options);

    res.status(200).json({
      success: true,
      message: "Admin Retrieved Successfully",
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

export const adminControllers = {
  getAllAdmins,
};
