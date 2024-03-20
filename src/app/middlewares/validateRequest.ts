import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../helpers/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { body, cookies } = await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    if (body) {
      req.body = body;
    }
    if (cookies) {
      req.cookies = cookies;
    }

    next();
  });
};

export default validateRequest;
