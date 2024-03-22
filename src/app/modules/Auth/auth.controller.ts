import { Request, Response } from "express";
import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../helpers/catchAsync";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";

// Log in
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);

  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    // secure will be true in production
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

// Refresh Token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Access token generated successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

// Change Password
const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await authServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password Changed successfully",
      data: result,
    });
  }
);

export const authControllers = {
  loginUser,
  refreshToken,
  changePassword,
};
