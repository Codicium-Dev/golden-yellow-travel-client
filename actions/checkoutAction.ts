"use server";

import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const checkoutTour = async (tourData: any, url: string) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tourData.tourName,
              description: `${tourData.cityName}, ${tourData.countryName}\nDuration: ${tourData.duration}\nDeparture: ${tourData.departure}\nLocation: ${tourData.location}\nStart Date: ${tourData.startDate}\nEnd Date: ${tourData.endDate}`,
              images: [tourData.tour_photo],
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
