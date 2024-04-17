import AppError from "./AppError";

const handleAppError = (error: AppError) => {
  return {
    statusCode: error.statusCode,
    message: error.message,
    error: error,
  };
};

export default handleAppError;
