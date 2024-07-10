"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FaRegCircleXmark } from "react-icons/fa6";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("session_id") === null ||
      searchParams.get("session_id") === ""
    ) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [searchParams.get("session_id")]);

  const redirectToCheckout = async () => {
    if (
      searchParams.get("session_id") !== null ||
      searchParams.get("session_id") !== ""
    ) {
      const stripe = await stripePromise;
      if (stripe === null) {
        toast.error("Failed to checkout. Please try again.");
        router.push("/");
      } else {
        await stripe.redirectToCheckout({
          sessionId: searchParams.get("session_id")!,
        });
      }
    } else {
      toast.error("Failed to redirect to checkout. Please try again.");
    }
  };
  // const toastShown = useRef(false);

  // useEffect(() => {
  //   // if (!toastShown.current) {
  //   //   toast.error("Payment canceled. Please try again.");
  //   //   toastShown.current = true;
  //   // }
  //   // setTimeout(() => {
  //   //   router.push("/");
  //   // }, 3000); // 3 seconds
  // }, [router]);

  return (
    <div className="w-full p-5 pt-[110px] md:pt-[140px] pb-[60px] bg-[#efefef] open-sans ">
      <div className="px-8 py-6 bg-gray-300 text-center mx-auto w-full md:w-[60%] rounded-md">
        <h1 className="md:text-3xl text-xl font-semibold flex items-center justify-center">
          Payment Canceled
          <span>
            <FaRegCircleXmark
              color="#ff0000"
              size={42}
              className="inline pl-2"
            />
          </span>
        </h1>
        <p className="py-5">Your payment was canceled. Please try again.</p>
        {searchParams.get("session_id") && (
          <button
            className="text-sm lg:text-[20px] open-sans bg-[#010E3B] hover:bg-[#010e3be3] text-white py-3 px-6 transition-all rounded-sm cursor-pointer"
            onClick={redirectToCheckout}
          >
            Resume payment
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
