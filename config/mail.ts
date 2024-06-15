import { Resend } from "resend";
import { dateTimeFormat } from "@/helper/DateTimeFormat";

const resend = new Resend("re_j5A8Aygu_G4oQghBHqKtxJaLdWfPN9GAd");

// Function to send booking email
export const sendBookingEmail = async (
  customerData: any,
  tourData: any,
  customerEmail: any
) => {
  try {
    // Send email using Resend API
    const response = await resend.emails.send({
      // 	uab online <online@uab.com.mm>
      from: "Golden Asia Expedition <info@goldenasiaexpedition.com>",
      // to: ["goldenyellowtravel@gmail.com", `${customerEmail}`],
      // to: "goldenyellowtravel@gmail.com","yaetactaung@gmail.com",
      to: ["yaetactaung@gmail.com", `${customerEmail}`],
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
        line-height: 1.5rem;
      }

      td,
      th {
        border: 1px solid #dddddd;
        padding: 15px;
      }
      th {
        text-align: center;
        background-color: aliceblue;
      }

      td {
        text-align: left;
      }

      .title, .content-title {
        width: 20rem;
        font-weight: 600;
        color: darkblue;
      }
      .content {
        color: rgb(97, 97, 97);
      }
      .content.customers {
        text-align: center;
      }
      
    </style>
  </head>
  <body>
    <table>
      <tbody>
        <tr>
          <th colspan="4">Tour Information</th>
        </tr>
        <tr>
          <td class="title">Tour Name</td>
          <td class="content" colspan="3">${tourData.tourName}</td>
        </tr>
        <tr>
          <td class="title">Country Name</td>
          <td class="content" colspan="3">${tourData.countryName}</td>
        </tr>
        <tr>
          <td class="title">City Name</td>
          <td class="content" colspan="3">${tourData.cityName}</td>
        </tr>
        <tr>
          <td class="title">Tour Name</td>
          <td class="content" colspan="3">${tourData.tourName}</td>
        </tr>
        <tr>
          <td class="title">Duration</td>
          <td class="content" colspan="3">${tourData.duration}</td>
        </tr>
        <tr>
          <td class="title">Departure</td>
          <td class="content" colspan="3">${tourData.departure}</td>
        </tr>
        <tr>
          <td class="title">Location</td>
          <td class="content" colspan="3">${tourData.location}</td>
        </tr>
        <tr>
          <td class="title">Start Date</td>
          <td class="content" colspan="3">${tourData.startDate}</td>
        </tr>
        <tr>
          <td class="title">End Date</td>
          <td class="content" colspan="3">${tourData.endDate}</td>
        </tr>
        <tr>
          <td class="title">Sale Price</td>
          <td class="content" colspan="3">${tourData.salePrice}</td>
        </tr>
        <tr>
          <td class="title">Tour ID</td>
          <td class="content" colspan="3">${tourData.id}</td>
        </tr>

        <tr>
          <th colspan="4">Customer Information</th>
        </tr>
        <tr>
          <td class="title" rowspan="2">Number of travellers</td>
          <td class="content content-title customers">Adults</td>
          <td class="content content-title customers">Childrens</td>
          <td class="content content-title customers">Infants</td>
        </tr>
        <tr>
          <td class="content customers">${customerData.adults}</td>
          <td class="content customers">${customerData.childrens}</td>
          <td class="content customers">${customerData.infants}</td>
        </tr>
        <tr>
          <td class="title">Full Name</td>
          <td class="content" colspan="3">${customerData.fullName}</td>
        </tr>
        <tr>
          <td class="title">Tour Type</td>
          <td class="content" colspan="3">${customerData.tourType}</td>
        </tr>
        <tr>
          <td class="title">Arrival Date</td>
          <td class="content" colspan="3">${dateTimeFormat(
            customerData.arrivalDate
          )}</td>
        </tr>
        <tr>
          <td class="title">Arrival Airport</td>
          <td class="content" colspan="3">${customerData.arrivalAirport}</td>
        </tr>
        <tr>
          <td class="title">Accomodations</td>
          <td class="content" colspan="3">${customerData.accommo}</td>
        </tr>
        <tr>
          <td class="title">Email</td>
          <td class="content" colspan="3">${customerData.email}</td>
        </tr>
        <tr>
          <td class="title">Phone</td>
          <td class="content" colspan="3">${customerData.phone}</td>
        </tr>
        <tr>
          <td class="title">Country</td>
          <td class="content" colspan="3">${customerData.country}</td>
        </tr>
        <tr>
          <td class="title">Found Us By</td>
          <td class="content" colspan="3">
            ${customerData.how}<br />${customerData.otherInfo}
          </td>
        </tr>
        <tr>
          <td class="title">Special Requests</td>
          <td class="content" colspan="3">${customerData.special}</td>
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

// adults: 97,
// childrens: 1,
// infants: 1,

// destinations: '',
// tourType: 'Private Tour',
// arrivalDate: '2002-10-21T04:00',
// travelDate: '1975-10-28T08:35',
// arrivalAirport: 'Chiang Mai',
// accommo: 'Not Required',
// fullName: 'Shaeleigh Moore',
// email: 'sylanazel@mailinator.com',
// phone: '+1 (341) 134-9146',
// country: 'At eu iusto ducimus',
// how: 'Others',
// otherInfo: 'aut ut ipsum aut ut ipsum aut ut ipsum aut ut ipsum aut ut ipsum aut ut ipsum aut ut ipsum',
// special: 'Aperiam aut ut ipsum'
