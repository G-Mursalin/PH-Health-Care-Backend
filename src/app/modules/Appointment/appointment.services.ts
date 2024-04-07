import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { v4 as uuidv4 } from "uuid";

const createAppointment = async (user: JwtPayload, payload: any) => {
  // Check if the patent exist
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  // Check if the doctor exist
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  // Check if the doctorSchedule exist
  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  // Creating video calling ID
  const videoCallingId: string = uuidv4();

  // Transaction and roll back
  const result = await prisma.$transaction(async (tx) => {
    // Create Appointment
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    // Update doctorSchedule isBooked status and appointmentID
    await tx.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    // Generate Unique Transaction ID for payment system
    const today = new Date();

    const transactionId =
      "PH-HealthCare-" +
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDay() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes();

    await tx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });

  return result;
};

export const appointmentServices = {
  createAppointment,
};
