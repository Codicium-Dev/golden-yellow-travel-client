import { Resend } from "resend";

const resend = new Resend("re_j5A8Aygu_G4oQghBHqKtxJaLdWfPN9GAd");

// Function to send booking email
export const sendBookingEmail = async (customerData: any, tourData: any) => {
  try {
    // Send email using Resend API
    const response = await resend.emails.send({
      from: "mail@goldenasiaexpedition.com",
      to: "goldenyellowtravel@gmail.com",
      subject: `Booking for "${tourData.tourName}"`,
      html: `
      <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          body {
            overflow-x: scroll;
          }
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          td,
          th {
            border: 1px solid #dddddd;
            padding: 15px;
          }
          th {
            text-align: center;
            background-color: #dddddd;
          }
          th {
            background-color: aliceblue;
          }
          td {
            text-align: left;
          }

          .title {
            width: 20rem;
            font-weight: 500;
            color: rgb(78, 78, 78);
          }
          .content {
            color: rgb(97, 97, 97);
          }
        </style>
      </head>
      <body>
        <table>
          <tbody>
            <tr>
              <th colspan="2">Tour Information</th>
            </tr>
            <tr>
              <td class="title">Tour Name</td>
              <td class="content">${tourData.tourName}</td>
            </tr>
            <tr>
              <td class="title">Country Name</td>
              <td class="content">${tourData.countryName}</td>
            </tr>
            <tr>
              <td class="title">City Name</td>
              <td class="content">${tourData.cityName}</td>
            </tr>
            <tr>
              <td class="title">Tour Name</td>
              <td class="content">${tourData.tourName}</td>
            </tr>
            <tr>
              <td class="title">Duration</td>
              <td class="content">${tourData.duration}</td>
            </tr>
            <tr>
              <td class="title">Departure</td>
              <td class="content">${tourData.departure}</td>
            </tr>
            <tr>
              <td class="title">Location</td>
              <td class="content">${tourData.location}</td>
            </tr>
            <tr>
              <td class="title">Start Date</td>
              <td class="content">${tourData.startDate}</td>
            </tr>
            <tr>
              <td class="title">End Date</td>
              <td class="content">${tourData.endDate}</td>
            </tr>
            <tr>
              <td class="title">Price</td>
              <td class="content">${tourData.price}</td>
            </tr>
            <tr>
              <td class="title">Sale Price</td>
              <td class="content">${tourData.salePrice}</td>
            </tr>
            <tr>
              <td class="title">Tour ID</td>
              <td class="content">${customerData.tour_id}</td>
            </tr>
            <tr>
              <th colspan="2">Customer Information</th>
            </tr>

            <tr>
              <td class="title">Gender</td>
              <td class="content">${customerData.gender}</td>
            </tr>
            <tr>
              <td class="title">Full Name</td>
              <td class="content">${customerData.fullName}</td>
            </tr>
            <tr>
              <td class="title">Email</td>
              <td class="content">${customerData.email}</td>
            </tr>
            <tr>
              <td class="title">Phone</td>
              <td class="content">${customerData.phone}</td>
            </tr>
            <tr>
              <td class="title">Country</td>
              <td class="content">${customerData.country}</td>
            </tr>
            <tr>
              <td class="title">City</td>
              <td class="content">${customerData.city}</td>
            </tr>
            <tr>
              <td class="title">Know From</td>
              <td class="content">${customerData.socialMedia}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
      `,
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
