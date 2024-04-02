import { Patient, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";
import { patientSearchableFields } from "./patient.constants";
import { TPaginationOptions } from "../../types/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

// Get All Patients
const getAllPatients = async (
  filters: IPatientFilterRequest,
  options: TPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  //   Search Term
  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Filter Data
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  // Count Total Result
  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// Get Patent By ID
const getPatentById = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  return result;
};

// Update Patent Data
const updatePatent = async (
  id: string,
  payload: Partial<IPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;

  // Check If the patent Exist
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  // Transaction and Rollback
  await prisma.$transaction(async (transactionClient) => {
    // Update patient data
    await transactionClient.patient.update({
      where: {
        id,
      },
      data: patientData,
      include: {
        patientHealthData: true,
        medicalReport: true,
      },
    });

    // Create or update patient health data
    if (patientHealthData) {
      await transactionClient.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: patientHealthData,
        create: { ...patientHealthData, patientId: patientInfo.id },
      });
    }

    // Create Medical Reports
    if (medicalReport) {
      await transactionClient.medicalReport.create({
        data: { ...medicalReport, patientId: patientInfo.id },
      });
    }
  });

  // Get Updated Patent Data
  const updatedData = await prisma.patient.findUnique({
    where: {
      id: patientInfo.id,
    },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });

  return updatedData;
};

// Delete Patent Data (Heard Delete)
const deletePatent = async (id: string): Promise<Patient | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    // 1.1 Delete all medical report
    await transactionClient.medicalReport.deleteMany({
      where: {
        patientId: id,
      },
    });

    // 1.2 Delete PatientHealth Data
    await transactionClient.patientHealthData.delete({
      where: {
        patientId: id,
      },
    });

    // 2. Delete Patent Data
    const deletedPatient = await transactionClient.patient.delete({
      where: {
        id,
      },
    });

    // 3. Delete User Data
    await transactionClient.user.delete({
      where: {
        email: deletedPatient.email,
      },
    });

    return deletedPatient;
  });

  return result;
};

// Delete Patent Data (Soft Delete)
const softDeletePatent = async (id: string): Promise<Patient | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    // 1. Update patent isDeleted property
    const deletedPatient = await transactionClient.patient.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    // 2. Update user status property
    await transactionClient.user.update({
      where: {
        email: deletedPatient.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletedPatient;
  });

  return result;
};

export const patientServices = {
  getAllPatients,
  getPatentById,
  updatePatent,
  deletePatent,
  softDeletePatent,
};
