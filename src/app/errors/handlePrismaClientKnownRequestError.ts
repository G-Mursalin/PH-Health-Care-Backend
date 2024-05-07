import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const handlePrismaClientKnownRequestError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  console.log(error);
  if (error.code === "P2002") {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Duplicate Key Error",
      error: error.meta,
    };
  } else if (error.code === "P2025") {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Data Not Found",
      error: error.name,
    };
  } else {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Data Not Found",
      error: error,
    };
  }
};

export default handlePrismaClientKnownRequestError;
