import {
  Admin,
  Doctor,
  Patient,
  Prisma,
  UserRole,
  UserStatus,
} from "@prisma/client";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";
import { TPaginationOptions } from "../../types/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { Request } from "express";
import { TFile } from "../../types/file";
import { JwtPayload } from "jsonwebtoken";

// Get All Users
const getAllUsers = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      patient: true,
      doctor: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Create Admin
const createAdmin = async (file: any, password: string, admin: Admin) => {
  // Upload Image to Cloudanary
  if (file) {
    const uploadToCloudinary = await uploadImageToCloudinary(file.path);
    admin.profilePhoto = uploadToCloudinary?.secure_url as string;
  }

  // Hash The Password
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt)
  );

  const userData = {
    email: admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: admin,
    });

    return createdAdminData;
  });

  return result;
};

// Create Doctor
const createDoctor = async (file: any, password: string, doctor: Doctor) => {
  // Upload Image to Cloudanary
  if (file) {
    const uploadToCloudinary = await uploadImageToCloudinary(file.path);
    doctor.profilePhoto = uploadToCloudinary?.secure_url as string;
  }

  // Hash The Password
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt)
  );

  const userData = {
    email: doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: doctor,
    });

    return createdDoctorData;
  });

  return result;
};

// Create Patient
const createPatient = async (file: any, password: string, patient: Patient) => {
  // Upload Image to Cloudanary
  if (file) {
    const uploadToCloudinary = await uploadImageToCloudinary(file.path);
    patient.profilePhoto = uploadToCloudinary?.secure_url as string;
  }

  // Hash The Password
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt)
  );

  const userData = {
    email: patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdPatientData = await transactionClient.patient.create({
      data: patient,
    });

    return createdPatientData;
  });

  return result;
};

// Update User Status
const updateUserStatus = async (id: string, status: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const newUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newUserStatus;
};

// Get my profile
const getMyProfile = async (user: JwtPayload) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

// Update My Profile
const updateMyProfile = async (user: JwtPayload, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await uploadImageToCloudinary(file.path);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers,
  updateUserStatus,
  getMyProfile,
  updateMyProfile,
};
