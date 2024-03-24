import { z } from "zod";

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    admin: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      email: z.string({
        required_error: "Email is required",
      }),
      contactNumber: z.string({
        required_error: "Contact Number is required",
      }),
    }),
  }),
});

const updateAdminSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

export const adminValidators = {
  updateAdminSchema,
  createAdminValidationSchema,
};
