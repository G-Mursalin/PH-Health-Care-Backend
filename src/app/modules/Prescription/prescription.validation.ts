import { z } from "zod";

const createPrescriptionSchema = z.object({
  body: z.object({
    appointmentId: z.string({
      required_error: "Appointment Id is required",
    }),
    instructions: z.string({
      required_error: "Instructions is required",
    }),
  }),
});

export const prescriptionValidators = {
  createPrescriptionSchema,
};
