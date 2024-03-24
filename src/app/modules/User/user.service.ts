import { Admin, Doctor, Patient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";

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

export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
};
