"use server";

import { sendBookingEmail } from "@/config/mail";

export const sendMail = async () => {
  await sendBookingEmail();
};
