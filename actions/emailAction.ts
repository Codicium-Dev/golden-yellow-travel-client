"use server";

import { sendBookingEmail } from "@/config/mail";

export const sendMail = async (
  customerData: any,
  tourData: any,
  customerEmail: any
) => {
  await sendBookingEmail(customerData, tourData, customerEmail);
  console.log("customerEmail in server >> ", customerEmail);
};
