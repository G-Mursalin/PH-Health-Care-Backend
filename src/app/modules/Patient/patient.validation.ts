import { BloodGroup, Gender, MaritalStatus } from "@prisma/client";
import { z } from "zod";

const patientHealthDataSchema = z.object({
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string(),
  bloodGroup: z.nativeEnum(BloodGroup),
  hasAllergies: z.boolean().optional(),
  hasDiabetes: z.boolean().optional(),
  height: z.string(),
  weight: z.string(),
  smokingStatus: z.boolean().optional(),
  dietaryPreferences: z.string().optional(),
  pregnancyStatus: z.boolean().optional(),
  mentalHealthHistory: z.string().optional(),
  immunizationStatus: z.string().optional(),
  hasPastSurgeries: z.boolean().optional(),
  recentAnxiety: z.boolean().optional(),
  recentDepression: z.boolean().optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
});

const medicalReportSchema = z.object({
  reportName: z.string(),
  reportLink: z.string().url(),
});

// Create Patient Validation Schema
const createPatientValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    patient: z.object({
      email: z
        .string({
          required_error: "Email is required!",
        })
        .email(),
      name: z.string({
        required_error: "Name is required!",
      }),
      contactNumber: z.string({
        required_error: "Contact number is required!",
      }),
      address: z.string({
        required_error: "Address is required",
      }),
    }),
  }),
});

// Update Patient Validation Schema
const updatePatientValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    patientHealthData: patientHealthDataSchema.optional(),
    medicalReport: medicalReportSchema.optional(),
  }),
});

export const patientValidators = {
  createPatientValidationSchema,
  updatePatientValidationSchema,
};
