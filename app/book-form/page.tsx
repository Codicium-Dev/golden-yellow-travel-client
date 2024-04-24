"use client";

import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/services/api/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";

import { BiSolidBook } from "react-icons/bi";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { PuffLoader } from "react-spinners";

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
  const [payload, setPayload] = useState<payload | any>({
    tour_id: "",
    gender: "",
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    social_media: "",
  });
  const [tourId, setTourId] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const params = useSearchParams();
  console.log(params.get("tourCode"));

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["bookTour"],
    queryFn: () => getRequest(`tour/show/${params.get("tourCode")}`),
    enabled: false,
    onSuccess: () => {
      setTourId(data?.data?.id);
    },
  });

  useEffect(() => {
    refetch();
  }, [params]);

  console.log(payload);

  const mutation = useMutation((newTodo) => {
    return postRequest("/book-form/create", newTodo);
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Success booking", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [mutation]);

  useEffect(() => {
    setPayload({
      tour_id: data?.data?.id,
      gender: gender,
      full_name: fullName,
      email: email,
      phone: phone,
      country: country,
      city: city,
      social_media: socialMedia,
    });
  }, [data, gender, fullName, email, phone, country, city, socialMedia]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      <div className=" px-[20px] md:px-[130px]">
        <h1 className=" text-center font-bold text-2xl text-orange-600 tracking-wider mt-10">
          Your Booking Tour
        </h1>

        <div className=" bg-slate-50 pb-5 shadow rounded mt-20 mb-20 overflow-hidden relative">
          <div className=" w-20 h-20 rounded-full bg-orange-500 absolute -top-10 -right-10"></div>

          <div className=" grid grid-cols-2 gap-2">
            <div className=" col-start-1 col-span-2 lg:col-span-1">
              <img
                src={data?.data?.tour_photo}
                className=" w-full h-[300px] rounded"
                alt=""
              />
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-2 lg:col-span-1">
              <div className=" p-5">
                <h1 className=" text-orange-500 font-semibold text-lg">
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
                  <div className=" block md:flex items-center gap-5 my-2">
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

                <div className=" grid grid-cols-2 gap-2 my-2">
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
                          {data?.data?.price}{" "}
                          <span className=" text-orange-500">$</span>
                        </p>
                      </div>
                    </div>
                  )}
                  {data?.data?.sale_price && (
                    <div className=" col-start-1 lg:col-start-2 col-span-1">
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Sale Price : </p>
                        <p className="">
                          {data?.data?.sale_price}{" "}
                          <span className=" text-orange-500">$</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 lg:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">Gender</h1>
              <select
                // onChange={handleChange}
                onChange={(e) => setGender(e.target.value)}
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                name=""
                id=""
              >
                <option value="male">Mr.</option>
                <option value="female">Ms.</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-12 lg:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">Full Name</h1>
              <input
                type="text"
                // value={payload.full_name}
                onChange={(e) => setFullName(e.target.value)}
                name=""
                id=""
                placeholder="Enter your full name"
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                required
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 lg:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">Email</h1>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                name=""
                id=""
                required
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-12 lg:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">Phone</h1>
              <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                name=""
                required
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 md:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">Country</h1>
              <input
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country name"
                name=""
                required
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className=" col-start-1 md:col-start-2 col-span-12 md:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">City</h1>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city name"
                name=""
                required
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 md:col-span-1">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Social Media
              </h1>
              <input
                type="text"
                onChange={(e) => setSocialMedia(e.target.value)}
                placeholder="Enter your social media"
                name=""
                required
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className=" col-start-1 md:col-start-2 col-span-12 md:col-span-1">
              <div className=" h-full flex items-end justify-end">
                <button
                  disabled={mutation?.isLoading}
                  onClick={() => {
                    mutation.mutate(payload);
                  }}
                  className=" px-3 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2"
                >
                  Submit
                  <BiSolidBook />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
