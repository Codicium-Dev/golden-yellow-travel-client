import { Resend } from "resend";

const resend = new Resend("re_j5A8Aygu_G4oQghBHqKtxJaLdWfPN9GAd");

// Function to send booking email
export const sendBookingEmail = async () => {
  try {
    // Send email using Resend API
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yaetactaung@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
    console.log("Email sent successfully:", response);
  } catch (error: any) {
    // Log error details
    console.error("Failed to send email:", error);
    if (error.response) {
      console.error("Error response:", await error.response.text());
    }
  }
};

// Execute the function to send the email
