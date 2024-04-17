import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import errorPreprocessor from "../errors/errorPreprocessor";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default Error response object
  let errorResponse = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong",
    error: error,
  };

  // Handle al kinds of error
  errorResponse = errorPreprocessor(error);

  // Send Error Response
  res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    error: errorResponse.error,
  });
};

export default globalErrorHandler;
