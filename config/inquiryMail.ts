// import { Resend } from "resend";
// import { dateTimeFormat } from "@/helper/DateTimeFormat";

// const resend = new Resend("re_j5A8Aygu_G4oQghBHqKtxJaLdWfPN9GAd");

// // Function to send booking email
// export const sendInquiryMail = async (inquiryInfo: any) => {
//   try {
//     // Send email using Resend API
//     const response = await resend.emails.send({
//       from: "mail@goldenasiaexpedition.com",
//       // to: "goldenyellowtravel@gmail.com",
//       to: "yaetactaung@gmail.com",
//       // to: ["yaetactaung@gmail.com", `${inquiryInfo.email}`],
//       subject: `Inquiry for "${inquiryInfo.destinations}"`,
//       html: `
//   <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <style>
//       body {
//         overflow-x: scroll;
//       }
//       table {
//         font-family: arial, sans-serif;
//         border-collapse: collapse;
//         width: 100%;
//         line-height: 1.5rem;
//       }

//       td,
//       th {
//         border: 1px solid #dddddd;
//         padding: 15px;
//       }
//       th {
//         text-align: center;
//         background-color: aliceblue;
//       }

//       td {
//         text-align: left;
//       }

//       .title {
//         width: 20rem;
//         font-weight: 500;
//         color: rgb(60, 60, 60);
//       }
//       .content {
//         color: rgb(97, 97, 97);
//       }
//       .content.customers {
//         text-align: center;
//       }
//       .content-title {
//         font-weight: 600;
//         color: rgb(90, 90, 90);
//       }

//     </style>
//   </head>
//   <body>
//     <table>
//       <tbody>
//         <tr>
//           <th colspan="4">Client Information</th>
//         </tr>
//         <tr>
//           <td class="title">Client Name</td>
//           <td class="content" colspan="3">${inquiryInfo.fullName}</td>
//         </tr>
//         <tr>
//           <td class="title">Email</td>
//           <td class="content" colspan="3">${inquiryInfo.email}</td>
//         </tr>
//         <tr>
//           <td class="title">Phone</td>
//           <td class="content" colspan="3">${inquiryInfo.phone}</td>
//         </tr>
//         <tr>
//           <td class="title">Language</td>
//           <td class="content" colspan="3">${inquiryInfo.language}</td>
//         </tr>
//         <tr>
//           <td class="title">Found Us By</td>
//           <td class="content" colspan="3">
//             ${inquiryInfo.how}<br />${inquiryInfo.otherInfo}
//           </td>
//         </tr>

//         <tr>
//           <td class="title">Location</td>
//           <td class="content" colspan="3">${inquiryInfo.location}</td>
//         </tr>
//         <tr>
//           <td class="title">Start Date</td>
//           <td class="content" colspan="3">${inquiryInfo.startDate}</td>
//         </tr>
//         <tr>
//           <td class="title">End Date</td>
//           <td class="content" colspan="3">${inquiryInfo.endDate}</td>
//         </tr>
//         <tr>
//           <td class="title">Sale Price</td>
//           <td class="content" colspan="3">${inquiryInfo.salePrice}</td>
//         </tr>
//         <tr>
//           <td class="title">Tour ID</td>
//           <td class="content" colspan="3">${inquiryInfo.id}</td>
//         </tr>

//         <tr>
//           <th colspan="4">Tour Information</th>
//         </tr>
//         <tr>
//           <td class="title" rowspan="2">Number of travellers</td>
//           <td class="content content-title">Adults</td>
//           <td class="content content-title">Childrens</td>
//           <td class="content content-title">Infants</td>
//         </tr>
//         <tr>
//           <td class="content customers">${inquiryInfo.adults}</td>
//           <td class="content customers">${inquiryInfo.children}</td>
//           <td class="content customers">${inquiryInfo.infants}</td>
//         </tr>
//         <tr>
//           <td class="title">Destination</td>
//           <td class="content" colspan="3">${inquiryInfo.destinations}</td>
//         </tr>
//         <tr>
//           <td class="title">Accommodation</td>
//           <td class="content" colspan="3">${inquiryInfo.Accommodation}</td>
//         </tr>
//         <tr>
//           <td class="title">Travel Month</td>
//           <td class="content" colspan="3">${dateTimeFormat(
//             inquiryInfo.travelMonth
//           )}</td>
//         </tr>
//         <tr>
//           <td class="title">Travel Year</td>
//           <td class="content" colspan="3">${inquiryInfo.travelYear}</td>
//         </tr>
//         <tr>
//           <td class="title">Budget</td>
//           <td class="content" colspan="3">${inquiryInfo.budget}</td>
//         </tr>
//         <tr>
//           <td class="title">Tour duration</td>
//           <td class="content" colspan="3">${inquiryInfo.duration}</td>
//         </tr>
//         <tr>
//           <td class="title">Client's tour-idea</td>
//           <td class="content" colspan="3">${inquiryInfo.idea}</td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
// </html>
//       `,
//     });
//     // console.log("Email sent successfully:", response);
//   } catch (error: any) {
//     // Log error details
//     console.error("Failed to send email:", error);
//     if (error.response) {
//       console.error("Error response:", await error.response.text());
//     }
//   }
// };

// // <p>If you haven't made the payment yet, click <a href=${resumePaymentLink}>here</a>.</p>
