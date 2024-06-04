"use client";

import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/services/api/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { BiSolidBook } from "react-icons/bi";
import Image from "next/image";
import { PuffLoader } from "react-spinners";
import { selectTours } from "@/services/redux/reducer/tourSlugSlice";
import { sendMail } from "@/actions/emailAction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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

const page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const tourSlug = useSelector(selectTours);

  const tour_id = tourSlug[params.slug.toString()];

  useEffect(() => {
    if (tour_id === null || tour_id === undefined) {
      router.push("/");
    }
  }, [tour_id]);

  const { data, isLoading } = useQuery({
    queryKey: ["bookTour", tour_id],
    queryFn: () => getRequest(`tour/show/${tour_id}`),
  });

  const tourData = {
    tourName: data?.data?.name,
    countryName: data?.data?.country_name,
    cityName: data?.data?.city_name,
    duration: data?.data?.duration,
    departure: data?.data?.departure,
    location: data?.data?.location,
    startDate: data?.data?.start_date,
    endDate: data?.data?.end_date,
    price: data?.data?.price,
    salePrice: data?.data?.sale_price,
  };

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
      router.push(`/tour/tour-detail/${params.slug.toString()}`);
    },
    onError: () => {
      toast.error("Booking Failed. Please try again later");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      tour_id.toString() === "" ||
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
      tour_id.toString() !== "" &&
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
        tour_id: tour_id.toString(),
        gender,
        full_name: fullName,
        email,
        phone,
        country,
        city,
        social_media: socialMedia,
      });
      const customerData = {
        tour_id,
        gender,
        fullName,
        email,
        phone,
        country,
        city,
        socialMedia,
      };

      sendMail(customerData, tourData);
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
        <h1 className=" text-center font-bold lg:text-4xl text-2xl text-[#17254e] tracking-wider mt-6">
          Your Booking Tour
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" bg-slate-50 pb-5 shadow rounded mt-20 mb-20 overflow-hidden relative"
        >
          <div className=" w-20 h-20 rounded-full bg-[#17254e] absolute -top-10 -right-10"></div>

          <div className=" grid grid-cols-2 gap-2">
            <div className=" col-start-1 col-span-2 lg:col-span-1">
              <Image
                width={1440}
                height={700}
                src={data?.data?.tour_photo}
                className="w-full h-[400px] rounded-tl-md object-cover"
                alt={tourData?.tourName}
              />
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-2 lg:col-span-1">
              <div className=" p-5">
                <h1 className=" text-[#17254e] font-semibold text-2xl mb-8">
                  {tourData?.tourName}
                </h1>

                {tourData?.countryName && (
                  <div className=" block md:flex items-center gap-5">
                    <p className=" text-slate-500 min-w-[150px]">
                      Country Name :
                    </p>
                    <p className="">{tourData?.countryName}</p>
                  </div>
                )}
                {tourData?.cityName && (
                  <div className=" block md:flex items-center gap-5 my-2">
                    <p className=" text-slate-500 min-w-[150px]">City Name :</p>
                    <p className="">{tourData?.cityName}</p>
                  </div>
                )}

                {tourData?.duration && (
                  <div className=" block md:flex items-center gap-5">
                    <p className=" text-slate-500 min-w-[150px]">Duration : </p>
                    <p className="">{tourData?.duration}</p>
                  </div>
                )}

                {tourData?.departure && (
                  <div className=" block md:flex gap-5 my-2">
                    <p className=" text-slate-500 min-w-[150px]">Departure :</p>
                    <p className="">{tourData?.departure}</p>
                  </div>
                )}

                {tourData?.location && (
                  <div className=" block md:flex items-start gap-5 my-2">
                    <p className=" text-slate-500 min-w-[150px]">Location : </p>
                    <p className="">{tourData?.location}</p>
                  </div>
                )}

                <div className=" grid grid-cols-2 gap-2 mt-6">
                  <div className=" col-start-1 col-span-1">
                    {tourData?.startDate && (
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Start Date : </p>
                        <p className="">{tourData?.startDate}</p>
                      </div>
                    )}
                  </div>
                  <div className=" col-start-1 lg:col-start-2 col-span-1">
                    {tourData?.endDate && (
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">End Date : </p>
                        <p className="">{tourData?.endDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-rows-1 lg:grid-cols-2 gap-2 lg:my-2">
                  {tourData?.price && (
                    <div className=" col-start-1 col-span-1">
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Price : </p>
                        <p className="">
                          <span className=" text-[#010E3B]">$</span>
                          {tourData?.price}
                        </p>
                      </div>
                    </div>
                  )}
                  {tourData?.salePrice && (
                    <div
                      className={`col-span-1 col-start-1 ${
                        tourData?.price ? "lg:col-start-2" : "lg:col-start-1"
                      }`}
                    >
                      <div className=" block lg:flex items-center gap-5">
                        <p className=" text-slate-500">Sale Price : </p>
                        <p className="">
                          <span className=" text-[#010E3B]">$</span>
                          {tourData?.salePrice}
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
                className="mb-2 font-semibold text-[#17254e]"
              >
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-[#17254e] px-3 py-2 rounded-lg "
                name="gender"
              >
                <option value="male">Mr.</option>
                <option value="female">Ms.</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-12 lg:col-span-1">
              <label className=" mb-2 font-semibold text-[#17254e]">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                name=""
                placeholder="Enter your full name"
                className=" w-full border border-[#17254e] px-3 py-2 rounded-lg"
                required
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 lg:col-span-1">
              <label className=" mb-2 font-semibold text-[#17254e]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                name=""
                required
                className=" w-full border border-[#17254e] px-3 py-2 rounded-lg"
              />
            </div>
            <div className=" col-start-1 lg:col-start-2 col-span-12 lg:col-span-1">
              <label className=" mb-2 font-semibold text-[#17254e]">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                name=""
                required
                className=" w-full border border-[#17254e] px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 md:col-span-1">
              <label className=" mb-2 font-semibold text-[#17254e]">
                Country
              </label>
              <input
                value={country}
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country name"
                name=""
                required
                className=" w-full border border-[#17254e] px-3 py-2 rounded-lg"
              />
            </div>
            <div className=" col-start-1 md:col-start-2 col-span-12 md:col-span-1">
              <label className=" mb-2 font-semibold text-[#17254e]">City</label>
              <input
                value={city}
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city name"
                name=""
                required
                className=" w-full border border-[#17254e] px-3 py-2 rounded-lg"
                // onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 px-3 py-2">
            <div className=" col-start-1 col-span-12 md:col-span-1">
              <label className=" mb-2 font-semibold text-[#17254e]">
                Where do you know us?
              </label>
              <select
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
                className="w-full border border-[#17254e] px-3 py-2 rounded-lg "
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
                  className=" px-3 py-2 bg-[#17254e] text-white rounded-lg flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all"
                >
                  {bookFormMutation?.isLoading ? (
                    <PuffLoader
                      color={"#010E3B"}
                      size={22}
                      aria-label="Loading Spinner"
                    />
                  ) : (
                    <>Submit</>
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
