"use server";

import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const checkoutTour = async (tourData: any, url: string) => {
  try {
    const description = `
      City: ${tourData.cityName}, ${tourData.countryName}
      Duration: ${tourData.duration}
      Departure: ${tourData.departure}
      Location: ${tourData.location}
      Start Date: ${tourData.startDate}
      End Date: ${tourData.endDate}
    `.trim();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tourData.tourName,
              description: description,
              images: [tourData.tourPhoto],
            },
            unit_amount: tourData.salePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/canceled`,
    });

    return { id: session.id };
  } catch (error) {
    console.error(error);
  }
};
