const handleJWTExpiredError = (error: any) => {
  return {
    statusCode: 401,
    message: "Your token is expired. Please login again",
    error: error.message,
  };
};

export default handleJWTExpiredError;
