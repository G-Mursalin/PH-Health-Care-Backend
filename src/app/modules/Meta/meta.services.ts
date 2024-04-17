import { UserRole } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

// Get Dashboard Meta Data
const getDashboardMetaData = async (user: JwtPayload) => {
  let metaData;

  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      metaData = getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      metaData = getAdminMetaData();
      break;
    case UserRole.DOCTOR:
      metaData = getDoctorMetaData();
      break;
    case UserRole.PATIENT:
      metaData = getPatientMetaData();
      break;
    default:
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Role");
  }

  return metaData;
};

// Super admin meta data
const getSuperAdminMetaData = async () => {
  return "super admin";
};

// Admin meta data
const getAdminMetaData = async () => {
  return "admin";
};

// Admin meta data
const getDoctorMetaData = async () => {
  return "doctor";
};

// Admin meta data
const getPatientMetaData = async () => {
  return "patient";
};

export const metaServices = {
  getDashboardMetaData,
};
