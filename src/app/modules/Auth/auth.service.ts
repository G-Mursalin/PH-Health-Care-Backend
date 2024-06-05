import { UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import config from "../../../config";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { resetPasswordEmailHTMLTemplate } from "./auth.utils";
import { sendEmail } from "../../../helpers/sendEmail";

// Login User
const loginUser = async (payload: { email: string; password: string }) => {
  // Find User
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  // Check Password
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect");
  }

  // Generate access and refresh token
  const accessToken = jwtHelpers.createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_secret,
    config.jwt_access_expired_in
  );

  const refreshToken = jwtHelpers.createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_refresh_secret,
    config.jwt_refresh_expired_in
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

// Refresh Token
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, config.jwt_refresh_secret);
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_secret,
    config.jwt_access_expired_in
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

// Change Password
const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Incorrect old password");
  }

  const hashedNewPassword: string = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedNewPassword,
      needPasswordChange: false,
    },
  });

  return null;
};

// Forgot Password
const forgotPassword = async (payload: { email: string }) => {
  const { email } = payload;

  // Find The User
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  // Create Reset Password Token
  const resetPassToken = jwtHelpers.createToken(
    { email: userData.email, role: userData.role },
    config.jwt_reset_password_secret,
    config.jwt_reset_password_expires_in
  );

  // Generate link and send to email
  const resetLink =
    config.reset_password_ui_link +
    `?id=${userData.id}&token=${resetPassToken}`;

  const htmlForResetPasswordEmail = resetPasswordEmailHTMLTemplate(resetLink);
  sendEmail(userData.email, htmlForResetPasswordEmail);

  return null;
};

// Reset Password
const resetPassword = async (
  token: string,
  payload: { id: string; newPassword: string }
) => {
  // Check if the user exist
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt_reset_password_secret
  );

  if (!isValidToken) {
    throw new AppError(StatusCodes.FORBIDDEN, "Forbidden Access");
  }

  // Hash password
  const password = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );

  // Update The Password
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });

  return null;
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
