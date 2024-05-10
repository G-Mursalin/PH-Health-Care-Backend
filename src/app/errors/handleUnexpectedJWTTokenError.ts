const handleUnexpectedJWTTokenError = (error: any) => {
  return {
    statusCode: 401,
    message: "Invalid Token. Please login again",
    error: error.message,
  };
};

export default handleUnexpectedJWTTokenError;
