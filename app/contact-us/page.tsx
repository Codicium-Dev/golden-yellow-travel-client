"use client";

import React, { useState } from "react";

import PhoneInput from "react-phone-number-input";
import { PuffLoader } from "react-spinners";
import TextInput from "@/components/TextInput";
import { postRequest } from "@/services/api/apiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type payload = {
  full_name: string;
  email: string;
  phone: string;
  message: string;
};
const ContactUs = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone]: any = useState();
  const [message, setMessage] = useState("");

  const contactFormMutation = useMutation({
    mutationFn: (data: any) => postRequest("/contacts", data),
    // form cleaning
    onSuccess: () => {
      setFullName("");
      setEmail("");
      setMessage("");
      toast.success("Message successfully sent!");
    },
    onError: () => {
      toast.error("Sending message fail! Please try again");
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fullName !== "" && email !== "" && phone !== null && message !== null) {
      contactFormMutation.mutateAsync({
        full_name: fullName,
        email,
        phone,
        message,
      });
      router.push("/");
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="w-full p-5 pt-[110px] md:pt-[120px] pb-[40px] bg-[#efefef] open-sans"
        >
          <h1 className="mb-10 pb-5 text-2xl lg:text-3xl font-semibold tracking-widest uppercase text-[#464646] text-center">
            Get In Touch
          </h1>

          <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-6 lg:px-10 mx-auto mb-10">
            <h1 className="pb-8 text-xl lg:text-2xl text-center md:text-start font-semibold tracking-widest text-[#464646] underline underline-offset-8">
              Personal information
            </h1>

            {/* full name */}
            <TextInput
              alignment=""
              type="text"
              orientation=""
              label="Full Name"
              placeholder="Please fill your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* email */}
            <TextInput
              alignment=""
              type="text"
              orientation=""
              label="Email"
              placeholder="Please fill your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* phone */}
            <div className="flex flex-col md:flex-row pb-2 items-center mb-5 gap:0 md:gap-5">
              <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
                Phone
              </div>

              <div className="md:flex items-center gap-5 w-full">
                <div className="w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 flex items-center pl-3">
                  <PhoneInput
                    placeholder="Enter phone number"
                    withCountryCallingCode={true}
                    international={true}
                    countryCallingCodeEditable={false}
                    value={phone}
                    onChange={setPhone}
                    className="input-phone custom-phone-input"
                  />
                </div>
              </div>
            </div>

            {/* message */}
            <TextInput
              alignment=""
              orientation=""
              type="textarea"
              label="Travel idea"
              value={message}
              placeholder="Please let us know your travel's idea"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className=" flex justify-center mt-8">
            <button
              disabled={contactFormMutation.isLoading}
              type="submit"
              className=" md:w-1/6 w-2/5 rounded-lg bg-[#010e3b] text-white font-semibold flex justify-center align-middle items-center p-3 cursor-pointer hover:opacity-90 transition-all"
            >
              {contactFormMutation.isLoading ? (
                <PuffLoader
                  color={"#fff"}
                  size={25}
                  aria-label="Loading Spinner"
                />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
