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
    url: "/about-us",
    label: "About us",
  },
  {
    url: "/privacy-statement",
    label: "Privacy Statement",
  },
  {
    url: "/term-conditions",
    label: "Terms & Conditions",
  },
  {
    url: "/news",
    label: "News",
  },
];

const Footer = () => {
  const [subscribeMail, setSubscribeMail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: (data: { email: string }) =>
      postRequest("/subscribe/create", data),
    onSuccess: (response) => {
      if (response.status === 422) {
        setSubscribeMail("");
        toast.info("Email already in subscription");
        return;
      }
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

    if (subscribeMail === "") {
      return;
    }

    subscribeMutation.mutateAsync({
      email: subscribeMail,
    });
  };

  return (
    <footer>
      <div className="sticky bottom-0 px-[20px] lg:px-[70px] py-5 bg-[#f1f2f3] grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0">
        <div>
          <div className=" flex items-center gap-5">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                width={100}
                height={100}
                id="GY_icon"
                className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] xl:w-[90px] xl:h-[90px] "
                alt="Picture of Golden Asia Expedition"
              />
            </Link>
          </div>

          <div className="w-full hover:text-[#1c94ad] mt-5">
            <Link href={"contact-us"} className="cursor-pointer ">
              <h1 className="text-lg font-semibold uppercase">Contact Us</h1>
            </Link>
          </div>
          {/* <div className="w-full mt-5 icon">
            <h1 className="w-full font-semibold md:text-lg mb-3 follow">
              Follow us
            </h1>
            <div className="social">
              <div className=" bg-blue-600 text-white iconus mr-4 rounded-lg p-[2px] flex items-center justify-center">
                <Link href="https://www.facebook.com">
                  <BiLogoFacebook size={30} />
                </Link>
              </div>

              <div className=" bg-[#C13584] text-white iconus mr-4 rounded-lg p-[2px] flex items-center justify-center">
                <Link href="https://www.facebook.com">
                  <BiLogoInstagram size={30} />
                </Link>
              </div>

              <div className=" bg-[#ff0000] text-white iconus mr-4 rounded-lg p-[2px] flex items-center justify-center">
                <a href="">
                  <BiLogoYoutube size={30} />
                </a>
              </div>
            </div>
          </div> */}
        </div>

        <div className=" text-gray-800">
          {FooterLinks.map((link) => {
            return (
              <Link
                key={link.label}
                href={link?.url}
                className="select-none hover:text-[#1c94ad] cursor-pointer"
              >
                <p className="my-4 text-lg font-semibold uppercase ">
                  {link?.label}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="my-5 text-gray-800">
          <h1 className=" text-lg font-semibold uppercase select-none">
            Contact Information
          </h1>

          <div className=" flex items-center gap-3 md:gap-5 mt-3">
            <HiOutlineMailOpen size={28} className=" text-[#1c94ad] min-w-7" />
            <a href="mailto:info@goldenyellowtravel.com">
              goldenasiaexpedition@gmail.com
            </a>
          </div>

          <div className=" flex items-center gap-3 md:gap-5 mt-3">
            <AiOutlinePhone size={28} className=" text-[#1c94ad] min-w-7" />
            <a href="tel:(+66) 081 839 2938">(+66) 081 839 2938</a>
          </div>

          <div className=" flex items-center gap-3 md:gap-5 mt-3">
            <MdOutlineNotificationsActive
              size={28}
              className=" text-[#1c94ad] min-w-7"
            />
            <form
              onSubmit={(e) => handleSubscribe(e)}
              className=" w-[300px] lg:w-full flex items-center shadow rounded"
            >
              <input
                type="text"
                value={subscribeMail}
                onChange={(e) => setSubscribeMail(e.target.value)}
                placeholder="Subscribe here"
                className=" w-full px-3 py-2 bg-slate-50 outline-none placeholder:text-sm lg:placeholder:text-base"
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
    </footer>
  );
};

export default Footer;
