"use client";

import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/services/api/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { BiSolidBook } from "react-icons/bi";
import Image from "next/image";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

type payload = {
  gender: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  social_media: string;
  tour_id: string;
};

const page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const tour_id = params.get("tourCode");

  const { data, isLoading } = useQuery({
    queryKey: ["bookTour", params.get("tourCode")],
    queryFn: () => getRequest(`tour/show/${params.get("tourCode")}`),
  });

  const bookFormMutation = useMutation({
    mutationFn: (data: {
      tour_id: string | null;
      gender: string;
      full_name: string;
      email: string;
      phone: string;
      country: string;
      city: string;
      social_media: string;
    }) => postRequest("/book-form/create", data),
    onSuccess: () => {
      setGender("");
      setFullName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setCity("");
      setSocialMedia("");
      toast.success("Booking Successful");
      router.push(`tour/tour-detail?tourDetail=${tour_id}`);
    },
    onError: () => {
      toast.error("Booking Failed. Please try again later");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      tour_id === "" ||
      tour_id === null ||
      gender === "" ||
      fullName === "" ||
      email === "" ||
      phone === "" ||
      country === "" ||
      city === "" ||
      socialMedia === ""
    ) {
      toast.error("Please fill all the fields for booking");
    }

    if (
      tour_id !== "" &&
      tour_id !== null &&
      gender !== "" &&
      fullName !== "" &&
      email !== "" &&
      phone !== "" &&
      country !== "" &&
      city !== "" &&
      socialMedia !== ""
    ) {
      bookFormMutation.mutateAsync({
        tour_id,
        gender,
        full_name: fullName,
        email,
        phone,
        country,
        city,
        social_media: socialMedia,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[90px] md:pt-[120px] bg-[#E2F3FF] open-sans">
      <div className="px-6 pb-8 lg:px-20 lg:pb-12">
        <h1 className=" text-center font-bold lg:text-4xl text-2xl text-orange-600 tracking-wider mt-6">
          Your Booking Tour
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" bg-slate-50 pb-5 shadow rounded mt-20 mb-20 overflow-hidden relative"
        >
          <div className=" w-20 h-20 rounded-full bg-orange-500 absolute -top-10 -right-10"></div>

          <div className=" grid grid-cols-2 gap-2">
            <div className=" col-start-1 col-span-2 lg:col-span-1">
              <Image
                width={1440}
                height={700}
                src={data?.data?.tour_photo}
                className="w-full h-[400px] rounded-tl-md object-cover"
                alt={data?.data?.name}
              />
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-2 lg:col-span-1">
              <div className=" p-5">
                <h1 className=" text-orange-500 font-semibold text-2xl mb-8">
                  {data?.data?.name}
                </h1>

                {data?.data?.country_name && (
                  <div className=" block md:flex items-center gap-5">
                    <p className=" text-slate-500 min-w-[150px]">
                      Country Name :{" "}
                    </p>
                    <p className="">{data?.data?.country_name}</p>
                  </div>
                )}

                {data?.data?.city_name && (
                  <div className=" block md:flex items-center gap-5 my-2">
                    <p className=" text-slate-500 min-w-[150px]">
                      City Name :{" "}
                    </p>
                    <p className="">{data?.data?.city_name}</p>
                  </div>
                )}

                {data?.data?.duration && (
                  <div className=" block md:flex items-center gap-5">
                    <p className=" text-slate-500 min-w-[150px]">Duration : </p>
                    <p className="">{data?.data?.duration}</p>
                  </div>
                )}

                {data?.data?.departure && (
                  <div className=" block md:flex gap-5 my-2">
                    <p className=" text-slate-500 min-w-[150px]">
                      Departure :{" "}
                    </p>
                    <p className="">{data?.data?.departure}</p>
                  </div>
                )}

                {data?.data?.location && (
                  <div className=" block md:flex items-start gap-5 my-2">
                    <p className=" text-slate-500 min-w-[150px]">Location : </p>
                    <p className="">{data?.data?.location}</p>
                  </div>
                )}

                <div className=" grid grid-cols-2 gap-2 mt-6">
                  <div className=" col-start-1 col-span-1">
                    {data?.data?.start_date && (
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Start Date : </p>
                        <p className="">{data?.data?.start_date}</p>
                      </div>
                    )}
                  </div>
                  <div className=" col-start-1 lg:col-start-2 col-span-1">
                    {data?.data?.end_date && (
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">End Date : </p>
                        <p className="">{data?.data?.end_date}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" grid grid-rows-1 lg:grid-cols-2 gap-2 lg:my-2">
                  {data?.data?.price && (
                    <div className=" col-start-1 col-span-1">
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Price : </p>
                        <p className="">
                          <span className=" text-[#010E3B]">$</span>
                          {data?.data?.price}{" "}
                        </p>
                      </div>
                    </div>
                  )}
                  {data?.data?.sale_price && (
                    <div className=" col-start-1 lg:col-start-2 col-span-1">
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Sale Price : </p>
                        <p className="">
                          <span className=" text-[#010E3B]">$</span>
                          {data?.data?.sale_price}{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 lg:col-span-1">
              <label
                htmlFor="gender"
                className="mb-2 font-semibold text-orange-600"
              >
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-orange-600 px-3 py-2 rounded-lg "
                name="gender"
              >
                <option value="male">Mr.</option>
                <option value="female">Ms.</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-12 lg:col-span-1">
              <label className=" mb-2 font-semibold text-orange-600">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                name=""
                placeholder="Enter your full name"
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                required
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 lg:col-span-1">
              <label className=" mb-2 font-semibold text-orange-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                name=""
                required
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
              />
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-12 lg:col-span-1">
              <label className=" mb-2 font-semibold text-orange-600">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                name=""
                required
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 md:col-span-1">
              <label className=" mb-2 font-semibold text-orange-600">
                Country
              </label>
              <input
                value={country}
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country name"
                name=""
                required
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
              />
            </div>
            <div className=" col-start-1 md:col-start-2 col-span-12 md:col-span-1">
              <label className=" mb-2 font-semibold text-orange-600">
                City
              </label>
              <input
                value={city}
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city name"
                name=""
                required
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 md:col-span-1">
              <label className=" mb-2 font-semibold text-orange-600">
                Where do you know us?
              </label>
              <select
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
                className="w-full border border-orange-600 px-3 py-2 rounded-lg "
                name="social_media"
              >
                <option value="" selected>
                  ---
                </option>
                <option value="facebook">Facebook</option>
                <option value="internet">Internet</option>
                <option value="friends">Friends</option>
                <option value="ads">Ads</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className=" col-start-1 md:col-start-2 col-span-12 md:col-span-1">
              <div className=" h-full flex items-end justify-end">
                <button
                  type="submit"
                  disabled={bookFormMutation?.isLoading}
                  className=" px-3 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all"
                >
                  {bookFormMutation?.isLoading ? (
                    <PuffLoader
                      color={"#010E3B"}
                      size={22}
                      aria-label="Loading Spinner"
                    />
                  ) : (
                    <>
                      Submit
                      <BiSolidBook />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
