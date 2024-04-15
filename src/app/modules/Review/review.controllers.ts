import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../helpers/catchAsync";
import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import { reviewFilterableFields } from "./review.contants";
import { reviewServices } from "./review.services";

// Create Review
const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await reviewServices.createReview(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

// Get All Reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await reviewServices.getAllReviews(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All reviews retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const reviewControllers = {
  createReview,
  getAllReviews,
};
