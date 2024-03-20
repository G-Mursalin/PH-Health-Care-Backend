import { Admin, Prisma, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "./admin.constant";
import { TPaginationOptions } from "../../types/pagination";
import { TAdminParams } from "./admin.types";

// Get All Admin
const getAllAdmins = async (
  params: TAdminParams,
  options: TPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.AdminWhereInput[] = [];

  //   Search Terms
  if (searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //   Filter Data
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({ isDeleted: false });
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.admin.count({
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

// Get Admin By ID
const getAdminById = async (adminId: string): Promise<Admin | null> => {
  // Check if the update admin is exists or not
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: adminId,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.findUnique({
    where: { id: adminId },
  });

  return result;
};

// Update Admin Data
const updateAdmin = async (
  adminId: string,
  payload: Partial<Admin>
): Promise<Admin> => {
  // Check if the update admin is exists or not
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: adminId,
      isDeleted: false,
    },
  });

  // Update Admin
  const result = await prisma.admin.update({
    where: {
      id: adminId,
    },
    data: payload,
  });

  return result;
};

// Delete Admin (Hard Delete)
const deleteAdmin = async (adminId: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: adminId,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id: adminId,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return adminDeletedData;
  });

  return result;
};

// Delete Admin (Soft Delete)
const softDeleteAdmin = async (adminId: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: adminId,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id: adminId,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeletedData;
  });

  return result;
};

export const adminServices = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
