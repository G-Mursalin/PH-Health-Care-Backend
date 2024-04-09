import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { sslServices } from "../SSL/ssl.services";
import { IPaymentData } from "../SSL/ssl.interfaces";
import { PaymentStatus } from "@prisma/client";

// Process Payment
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
  const initPaymentData: IPaymentData = {
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

// Validate Payment
// ssl commerz ipn listener query
// amount=1150.00&bank_tran_id=151114130739MqCBNx5&card_brand=VISA&card_issuer=BRAC+BANK%2C+LTD.&card_issuer_country=Bangladesh&card_issuer_country_code=BD&card_no=432149XXXXXX0667&card_type=VISA-Brac+bank¤cy=BDT&status=VALID&store_amount=1104.00&store_id=gms661371caaa15c&tran_date=2015-11-14+13%3A07%3A12&tran_id=5646dd9d4b484&val_id=151114130742Bj94IBUk4uE5GRj&verify_sign=c4f52f38be32218f7c41d8cb1eec04ed&verify_key=amount%2Cbank_tran_id%2Ccard_brand%2Ccard_issuer%2Ccard_issuer_country%2Ccard_issuer_country_code%2Ccard_no%2Ccard_type%2Ccurrency%2Cstatus%2Cstore_amount%2Cstore_id%2Ctran_date%2Ctran_id%2Cval_id

const validatePayment = async (payload: any) => {
  // In Production****()
  // if (!payload || !payload.status || !(payload.status === "VALID")) {
  //   return {
  //     message: "Invalid Payment",
  //   };
  // }

  // const response = await sslServices.validatePayment(payload);

  // if (response?.status !== "VALID") {
  //   return {
  //     message: "Payment Failed",
  //   };
  // }
  // ***********************************

  // In Development***
  const response = payload;
  // ***********************************

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: "Payment success",
  };
};

export const paymentServices = {
  initPayment,
  validatePayment,
};
