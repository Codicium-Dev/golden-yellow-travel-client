"use client";

import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoPinterestAlt,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/services/api/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";
import { toast } from "react-toastify";

const FooterLinks = [
  {
    url: "about-us",
    label: "About us",
  },
  {
    url: "privacy-statement",
    label: "Privacy Statement",
  },
  {
    url: "term-conditions",
    label: "Terms & Conditions",
  },
  {
    url: "news",
    label: "News",
  },
  {
    url: "payment-method",
    label: "Payment Method",
  },
];

const Footer = () => {
  const [subscribeMail, setSubscribeMail] = useState("");

  const { data: subscribedMails, isLoading: subscribedMailsLoading } = useQuery(
    {
      queryKey: ["subscribedMails"],
      queryFn: () => getRequest(`subscribe/list`),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const subscribeMutation = useMutation({
    mutationFn: (data: { email: string }) =>
      postRequest("/review/create", data),
    onSuccess: () => {
      setSubscribeMail("");
      toast.success("Successfully Subscribe");
    },
    onError: () => {
      setSubscribeMail("");
      toast.error("Something went wrong! Please try again.");
    },
  });

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subscribedMailsLoading) {
      return;
    }

    const alreadySubscribed = checkAlreadySubscribe(subscribeMail);

    if (alreadySubscribed) {
      toast.info("Email already in subscription");
      return;
    }

    subscribeMutation.mutateAsync({
      email: subscribeMail,
    });
  };

  const checkAlreadySubscribe = (email) => {
    const alreadySubscribeMails = subscribedMails.data.data.filter(
      (mail) => mail.email === email
    );

    if (alreadySubscribeMails.length !== 0) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <div className="sticky bottom-0 px-[20px] lg:px-[70px] py-5 bg-[#f1f2f3] grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0">
        <div>
          <div className=" flex items-center gap-5">
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              id="GY_icon"
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[65px] xl:h-[65px] "
              alt="Picture of Golden Asia Expectations"
            />

            {/* <img src="/logo.png" className=' w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[65px] xl:h-[65px]' alt="" /> */}
            {/* <h1 className=' text-orange-500 font-bold text-2xl'>Golden Asia Expectations</h1> */}
          </div>
          <div className="w-full mt-5 icon">
            <h1 className="w-full font-semibold md:text-lg mb-3 follow">
              Follow us
            </h1>
            <div className="social">
              <div className=" bg-blue-600 text-white iconus mr-4 rounded-lg p-[2px] flex items-center justify-center">
                <a href="#">
                  <BiLogoFacebook size={30} />
                </a>
              </div>

              <div className=" bg-sky-500 text-white iconus mr-4 rounded-lg p-[2px] flex items-center justify-center">
                <a href="">
                  <BiLogoInstagram size={30} />
                </a>
              </div>

              <div className=" bg-red-700 text-white iconus mr-4 rounded-lg p-[2px] flex items-center justify-center">
                <a href="">
                  <BiLogoYoutube size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" text-gray-800">
          {FooterLinks.map((link) => {
            return (
              <Link key={link.label} href={link?.url}>
                <p className=" text-lg font-semibold my-5">{link?.label}</p>
              </Link>
            );
          })}
        </div>

        <div className="my-5 text-gray-800">
          <h1 className=" text-lg font-semibold uppercase">
            Contact Information
          </h1>

          <div className=" flex items-center gap-5 mt-3">
            <HiOutlineMailOpen size={30} className=" text-orange-600" />
            <a href="mailto:info@goldenyellowtravel.com">
              info@goldenyellowtravel.com
            </a>
          </div>

          <div className=" flex items-center gap-5 mt-3">
            <AiOutlinePhone size={30} className=" text-orange-600" />
            <a href="tel:+959883353253">+959 883 353 253</a>
          </div>

          <div className=" flex items-center gap-5 mt-3">
            <MdOutlineNotificationsActive
              size={30}
              className=" text-orange-600"
            />
            <form
              onSubmit={(e) => handleSubscribe(e)}
              className=" w-[300px] lg:w-full flex items-center shadow rounded"
            >
              <input
                type="text"
                value={subscribeMail}
                onChange={(e) => setSubscribeMail(e.target.value)}
                placeholder="Enter your email for subscription"
                className=" w-full px-3 py-2 bg-slate-50 outline-none"
              />
              <button
                disabled={subscribeMutation.isLoading}
                className=" bg-slate-300 px-2 py-[7px]"
                type="submit"
              >
                <RiMailSendFill
                  size={30}
                  className=" !text-slate-400 cursor-pointer hover:!text-[#EA580C] transition-all"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
