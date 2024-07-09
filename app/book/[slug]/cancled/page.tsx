"use client";

import React, { useRef } from "react";

import { FaRegCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      toast.error("Payment canceled. Please try again.");
      toastShown.current = true;

      setTimeout(() => {
        router.push("/");
      }, 3000); // 3 seconds
    }
  }, [router]);

  return (
    <div className="w-full p-5 pt-[110px] md:pt-[140px] pb-[60px] bg-[#efefef] open-sans">
      <div className="px-8 py-6 bg-gray-300 text-center mx-auto w-full md:w-[60%]">
        <h1 className="md:text-3xl text-xl font-semibold pb-5">
          Payment Canceled
        </h1>
        <p className="pb-8">Your payment was canceled. Please try again.</p>
        <FaRegCircleXmark color="#ff0000" size={42} className="mx-auto" />
      </div>
    </div>
  );
};

export default Page;
