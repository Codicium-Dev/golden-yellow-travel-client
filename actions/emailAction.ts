"use server";

import { sendBookingEmail } from "@/config/mail";

export const sendMail = async (customerData: any, tourData: any) => {
  await sendBookingEmail(customerData, tourData);
};
