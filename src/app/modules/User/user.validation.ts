import { z } from "zod";
import { UserStatus } from "@prisma/client";

const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const userValidations = {
  updateUserStatusSchema,
};
