import { z } from "zod";
import { Gender } from "@prisma/client";

const createDoctorValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    doctor: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      email: z.string({
        required_error: "Email is required",
      }),
      contactNumber: z.string({
        required_error: "Contact Number is required",
      }),
      address: z.string().optional(),
      registrationNumber: z.string({
        required_error: "Reg number is required",
      }),
      experience: z.number().optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
      appointmentFee: z.number({
        required_error: "appointment fee is required",
      }),
      qualification: z.string({
        required_error: "qualification is required",
      }),
      currentWorkingPlace: z.string({
        required_error: "Current working place is required",
      }),
      designation: z.string({
        required_error: "Designation is required",
      }),
    }),
  }),
});

const SpecialtySchema = z.object({
  specialtiesId: z.string(),
  isDeleted: z.boolean(),
});
const updateDoctorValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    experience: z.number().optional(),
    gender: z.string().optional(),
    appointmentFee: z.number().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
    specialties: z.array(SpecialtySchema).optional(),
  }),
});

export const doctorValidators = {
  createDoctorValidationSchema,
  updateDoctorValidationSchema,
};
