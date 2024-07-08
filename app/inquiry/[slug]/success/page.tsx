"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FaCheckCircle } from "react-icons/fa";
import router from "next/router";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastShown = useRef(false);

  useEffect(() => {
    if (searchParams.get("session_id")) {
      if (!toastShown.current) {
        toast.success("Payment successful! Thank you for your purchase.");
        toastShown.current = true;

        setTimeout(() => {
          router.push("/");
        }, 3000); // 3 seconds
      }
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="w-full p-5 pt-[110px] md:pt-[140px] pb-[60px] bg-[#efefef] open-sans">
      <div className="px-8 py-6 bg-gray-300 text-center mx-auto w-full md:w-[60%]">
        <h1 className="md:text-3xl text-xl font-semibold pb-5">
          Payment Successful
        </h1>
        <p className="pb-8">
          Thank you for your purchase. You will receive a confirmation email
          shortly.
        </p>
        <FaCheckCircle color="#00ff00" size={42} className="mx-auto" />
      </div>
    </div>
  );
};

export default Page;
