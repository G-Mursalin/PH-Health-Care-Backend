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

export const doctorValidators = {
  createDoctorValidationSchema,
};
