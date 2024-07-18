"use server";

import { sendBookingEmail } from "@/config/mail";

export const sendMail = async (
  customerData: any,
  tourData: any,
  customerEmail: any,
  resumePaymentLink?: String
) => {
  await sendBookingEmail(
    customerData,
    tourData,
    customerEmail,
    resumePaymentLink
  );
};
// export const sendInquiryMail = async (inquiryInfo: any) => {
//   await sendInquiryMail(inquiryInfo);
// };
