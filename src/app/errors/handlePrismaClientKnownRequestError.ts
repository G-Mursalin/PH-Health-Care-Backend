import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const handlePrismaClientKnownRequestError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  if (error.code === "P2002") {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Duplicate Key Error",
      error: error.meta,
    };
  }
};

export default handlePrismaClientKnownRequestError;
