import { Request } from "express";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";
import prisma from "../../../shared/prisma";

// Create Specialties
const createSpecialty = async (req: Request) => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await uploadImageToCloudinary(file.path);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

// Get all Specialties
const getAllSpecialties = async () => {
  return await prisma.specialties.findMany();
};

// Delete Specialty
const deleteSpecialty = async (id: string) => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });

  return result;
};

export const specialtyServices = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
