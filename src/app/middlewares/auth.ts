import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../helpers/catchAsync";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import AppError from "../errors/AppError";
import prisma from "../../shared/prisma";
import { UserStatus } from "@prisma/client";

const auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Check If Token Exists
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    // Decode Token By Verifying it
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt_access_secret
    );

    // Check if the user is exists or not
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: verifiedUser.email,
        role: verifiedUser.role,
        status: UserStatus.ACTIVE,
      },
    });

    // Check if user can access this route
    if (roles.length && !roles.includes(verifiedUser.role)) {
      throw new AppError(StatusCodes.FORBIDDEN, "Forbidden");
    }

    // Set user information to request object
    req.user = verifiedUser;
    next();
  });
};

export default auth;
