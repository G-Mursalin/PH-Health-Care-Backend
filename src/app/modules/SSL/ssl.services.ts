import axios from "axios";
import config from "../../../config";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { IPaymentData } from "./ssl.interfaces";

// Process Payment
const initPayment = async (paymentData: IPaymentData) => {
  try {
    const data = {
      store_id: config.ssl_store_id,
      store_passwd: config.ssl_store_password,
      total_amount: paymentData.amount,
      currency: "BDT",
      tran_id: paymentData.transactionId,
      success_url: config.ssl_success_url,
      fail_url: config.ssl_fail_url,
      cancel_url: config.ssl_cancel_url,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Appointment",
      product_category: "Service",
      product_profile: "general",
      cus_name: paymentData.name,
      cus_email: paymentData.email,
      cus_add1: paymentData.address,
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: paymentData.contactNumber,
      cus_fax: "N/A",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "N/A",
    };

    const response = await axios({
      method: "post",
      url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
      data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch (error) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Payment error occurred");
  }
};

// Validate Payment
const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl_store_id}&store_passwd=${config.ssl_store_password}&format=json`,
    });

    return response.data;
  } catch (err) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Payment validation failed!");
  }
};

export const sslServices = { initPayment, validatePayment };
