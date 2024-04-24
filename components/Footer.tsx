"use client";

import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoPinterestAlt,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";
import React, { useEffect, useState } from "react";

import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";
import { postRequest } from "@/services/api/apiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

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
type payload = {
  email: string;
};

const Footer = () => {
  const [sub, setSub] = useState("");
  const [payload, setPayload] = useState<payload | any>({
    email: "",
  });

  const mutation = useMutation((newTodo) => {
    return postRequest("/subscribe/create", newTodo);
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Success subscription", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPayload("");
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    setPayload({
      email: sub,
    });
  }, [sub]);

  return (
    <div>
      <div className="sticky bottom-0 px-[20px] lg:px-[40px] py-5 bg-[#f1f2f3] grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0">
        <div>
          <div className=" flex items-center gap-5">
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              id="GY_icon"
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[65px] xl:h-[65px] "
              alt="Picture of Golden Yellow Travel"
            />

            {/* <img src="/logo.png" className=' w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[65px] xl:h-[65px]' alt="" /> */}
            {/* <h1 className=' text-orange-500 font-bold text-2xl'>Golden Yellow Travel</h1> */}
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
            <div className=" w-[300px] lg:w-full flex items-center shadow rounded">
              <input
                type="text"
                onChange={(e) => setSub(e.target.value)}
                placeholder="Enter yout email for subscription"
                className=" w-full px-3 py-2 bg-slate-50 outline-none"
              />
              <div
                className=" bg-slate-300 px-2 py-[7px]"
                onClick={() => {
                  // if(payload !== "" || payload !== null) {
                  mutation.mutate(payload);
                  // }
                }}
              >
                <RiMailSendFill size={30} className=" !text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
