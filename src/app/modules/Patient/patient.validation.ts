import { z } from "zod";

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

export const patientValidators = {
  createPatientValidationSchema,
};
