import { Prisma } from "@prisma/client";
import AppError from "./AppError";
import handleAppError from "./handleAppError";
import handlePrismaClientKnownRequestError from "./handlePrismaClientKnownRequestError";
import handlePrismaClientValidationError from "./handlePrismaClientValidationError";

/* eslint-disable @typescript-eslint/no-explicit-any */
const errorPreprocessor = (error: any) => {
  // Handle Prisma Errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return handlePrismaClientValidationError(error);
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaClientKnownRequestError(error);
  }
  // Handle throw App Errors
  else if (error instanceof AppError) {
    return handleAppError(error);
  }
  // Handle Others Unknown Error
  else {
    return {
      statusCode: 500,
      message: "Unknown Error",
      error: error,
    };
  }
};

export default errorPreprocessor;
