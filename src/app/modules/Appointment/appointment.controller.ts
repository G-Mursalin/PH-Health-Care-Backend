import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import { appointmentServices } from "./appointment.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import { appointmentFilterableFields } from "./appointment.constants";

// Create Appointment
const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await appointmentServices.createAppointment(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Appointment booked successfully",
    data: result,
  });
});

// Get All Appointment For Patients and Doctors
const getMyAppointment = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const filters = pick(req.query, ["status", "paymentStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const { meta, data } = await appointmentServices.getMyAppointment(
    user,
    filters,
    options
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My Appointments retrieved successfully",
    meta,
    data,
  });
});

// Get all Appointments
const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await appointmentServices.getAllAppointments(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Appointments retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

// Update Appointment Status
const updateAppointmentStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await appointmentServices.updateAppointmentStatus(
      id,
      status,
      user
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Appointment status updated successfully",
      data: result,
    });
  }
);

export const appointmentControllers = {
  createAppointment,
  getMyAppointment,
  getAllAppointments,
  updateAppointmentStatus,
};
