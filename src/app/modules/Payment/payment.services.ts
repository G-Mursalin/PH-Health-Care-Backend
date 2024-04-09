import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { sslServices } from "../SSL/ssl.services";

const initPayment = async (appointmentId: string) => {
  // Get the payment data
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  // Data for payment
  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    contactNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await sslServices.initPayment(initPaymentData);

  return {
    paymentURL: result.GatewayPageURL,
  };
};

export const paymentServices = {
  initPayment,
};
