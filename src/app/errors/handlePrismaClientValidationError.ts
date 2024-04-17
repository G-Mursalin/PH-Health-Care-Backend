import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const handlePrismaClientValidationError = (
  error: Prisma.PrismaClientValidationError
) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Validation Error",
    error: error.message,
  };
};

export default handlePrismaClientValidationError;
