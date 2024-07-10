"use client";

import React, { useRef } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { FaRegCircleXmark } from "react-icons/fa6";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useEffect } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    redirectToCheckout();
  }, []);

  const redirectToCheckout = async () => {
    if (
      searchParams.get("session_id") !== null ||
      searchParams.get("session_id") !== ""
    ) {
      const stripe = await stripePromise;
      await stripe!.redirectToCheckout({
        sessionId: searchParams.get("session_id")!,
      });
    } else {
      toast.error("Failed to redirect to checkout. Please try again.");
    }
  };

  return (
    <div className="w-full p-5 pt-[110px] md:pt-[140px] pb-[60px] bg-[#efefef] open-sans">
      <div className="px-8 py-6 bg-gray-300 text-center mx-auto w-full md:w-[60%]">
        <h1 className="md:text-3xl text-xl font-semibold pb-5">
          Redirecting To Checkout
        </h1>
        <p className="pb-8">Please wait a moment.</p>
        {/* <FaRegCircleXmark color="#ff0000" size={42} className="mx-auto" /> */}
      </div>
    </div>
  );
};

export default Page;
