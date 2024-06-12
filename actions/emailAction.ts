"use server";

import { sendBookingEmail } from "@/config/mail";

export const sendMail = async (
  customerData: any,
  tourData: any,
  toMail: string
) => {
  await sendBookingEmail(customerData, tourData, toMail);
};
