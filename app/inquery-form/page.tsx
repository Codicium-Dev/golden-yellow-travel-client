"use client";

import React, { useState } from "react";

import { PuffLoader } from "react-spinners";
import { postRequest } from "@/services/api/apiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const page = () => {
  const months = [
    "Choose Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const destination = ["Choose Country", "Vietnam", "Thailand"];

  const interests = [
    "Not Required",
    "Economy (3 Stars Hotel)",
    "Deluxe (4 Stars Hotel)",
    "Luxury (5 Stars Hotel)",
  ];

  const years = new Array(3)
    .fill(0)
    .map((_, index) => index + new Date().getFullYear());

  const accommodation = [
    "Not Required",
    "Economy (3 Stars Hotel)",
    "Deluxe (4 Stars Hotel)",
    "Luxury (5 Stars Hotel)",
  ];

  const howUknow = [
    "Search Engine Results",
    "Friends / Family",
    "Social Media",
    "Online Ads",
    "Trip Advertiser",
    "Magazines",
    "Website / Blogs",
    "Others",
  ];

  const [travelMonth, setTravelMonth] = useState("");
  const [travelYear, setTravelYear] = useState("");
  const [stayDays, setStayDays] = useState("");
  const [budget, setBudget] = useState("");
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [interest, setInterest] = useState("");
  const [destinations, setDestinations] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accommo, setAccommo] = useState("");
  const [country, setCountry] = useState("");
  const [how, setHow] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [special, setSpecial] = useState("");

  const queryFormMutation = useMutation({
    mutationFn: (data: any) => postRequest("form/create", data),
    onSuccess: () => {
      setTravelMonth("");
      setTravelYear("");
      setStayDays("");
      setBudget("");
      setAdult("");
      setChild("");
      setInterest("");
      setDestinations("");
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setAccommo("");
      setCountry("");
      setHow("");
      setOtherInfo("");
      setSpecial("");
      toast.success("Inquiry Successful");
    },
    onError: () => {
      toast.error("Inquiry Fail! Please try again");
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (travelMonth === "Choose Months") {
      toast.warning("Please select all required fields");
      return;
    }

    queryFormMutation.mutateAsync({
      travel_month: travelMonth,
      travel_year: travelYear,
      stay_days: stayDays,
      budget: budget,
      adult_count: adult,
      child_count: child,
      interest: interest,
      destinations: destinations,
      f_name: fName,
      l_name: lName,
      email: email,
      phone: phone,
      own_country: country,
      accommodation: accommo,
      how_u_know: how,
      other_information: otherInfo,
      special_note: special,
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="pt-[110px] md:pt-[140px] pb-[40px] bg-[#E2F3FF] open-sans"
      >
        <h1 className=" font-serif text-[#f69320] lg:text-6xl text-4xl text-center mb-8">
          Customized Tour
        </h1>
        <p className="lg:text-xl text-base lg:px-24 px-6 text-center mx-auto mb-10">
          Experience tailor-made trips since 2013 designed to delight our
          esteemed guests. Share your preferences, interests, and trip details
          with us, and in as little as 24 hours, our team of experts will
          meticulously craft exceptional adventures tailored just for you. Your
          perfect travel experience awaits with our exclusive customized tour
          packages in South-East Asia, Thailand and Vietnam. Let us create
          unforgettable memories together!
        </p>

        <h1 className=" my-5 text-2xl font-semibold tracking-widest text-[#464646] text-center">
          TOUR INFORMATION
        </h1>

        <div className="w-full px-5 md:px-10 lg:px-[70px] mx-auto mb-10">
          <div className=" grid grid-cols-4 gap-3">
            <div className=" col-start-1 col-span-4 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Travel Month *
              </h1>
              <select
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2 cursor-pointer"
                value={travelMonth}
                onChange={(e) => setTravelMonth(e.target.value)}
              >
                {months.map((month) => {
                  return <option value={month}>{month}</option>;
                })}
              </select>
            </div>

            <div className=" col-start-1 md:col-start-2 col-span-4 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Travel Year *
              </h1>
              <select
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                value={travelYear}
                onChange={(e) => setTravelYear(e.target.value)}
              >
                {years.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div className=" col-start-1 md:col-start-3 col-span-4 md:col-span-2">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Duration of Stay (No. of Days) *
              </h1>
              <input
                type="number"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={stayDays}
                onChange={(e) => setStayDays(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-5">
            <div className=" col-start-1 col-span-4 md:col-span-2">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Estimate Budget (USD) *
              </h1>
              <input
                type="number"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className=" col-start-1 col-span-4 md:col-start-3 md:col-span-2">
              <h1 className=" mb-1 font-semibold text-orange-600">
                No. of Adults (12+) *
              </h1>
              <input
                type="number"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={adult}
                onChange={(e) => setAdult(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-5">
            <div className=" col-start-1 col-span-4 md:col-span-2 md:col-start-1">
              <h1 className=" mb-1 font-semibold text-orange-600">
                No of Children (2~12 years old)
              </h1>
              <input
                type="number"
                placeholder="How may children joining the tour?"
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={child}
                onChange={(e) => setChild(e.target.value)}
              />
            </div>

            <div className=" col-start-1 col-span-4 md:col-span-2">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Travel Interest
              </h1>
              <select
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2 cursor-pointer"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                {interests.map((interests) => {
                  return <option value={interests}>{interests}</option>;
                })}
                {/* <option value={interest}>{interest}</option>; */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-5">
            <div className="col-start-1 col-span-4">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Select Which Destinations Do You Want To Enjoy
              </h1>
              <select
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2 cursor-pointer"
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
              >
                {destination.map((destination) => {
                  return <option value={destination}>{destination}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full px-5 md:px-10 lg:px-[70px] mx-auto mb-10">
          <h1 className="my-5 text-2xl font-semibold tracking-widest text-[#464646] text-center">
            PERSONAL INFORMATION
          </h1>
          <div className="grid grid-cols-2 gap-3 ">
            <div className=" col-start-1 col-span-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">
                First Name
              </h1>
              <input
                type="text"
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={fName}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className=" col-start-1 col-span-2 md:col-start-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">Last Name</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={lName}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className=" col-start-1 col-span-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">Country</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className=" col-start-1 col-span-2 md:col-start-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Phone Number
              </h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <h1 className=" mb-1 font-semibold text-orange-600">Email</h1>
            <input
              type="text"
              name=""
              id=""
              className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <h1 className=" my-5 text-2xl font-semibold tracking-widest text-[#464646] text-center">
          OTHER INFORMATION
        </h1>
        <div className="w-full px-5 md:px-10 lg:px-[70px] mx-auto mb-10">
          <div className="grid grid-cols-2 gap-3">
            <div className=" col-start-1 col-span-2 md:col-span-1 gap-3">
              <h1 className=" mb-1 font-semibold text-orange-600">
                Please select your accommodation style
                {/* below and we'll pick a hotel that best suits your needs.*/}
              </h1>

              <select
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2 cursor-pointer"
                value={accommo}
                onChange={(e) => setAccommo(e.target.value)}
              >
                {accommodation.map((accommodation) => {
                  return <option value={accommodation}>{accommodation}</option>;
                })}
              </select>
            </div>

            <div className=" col-start-1 col-span-2 md:col-start-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-orange-600">
                How do you know us?
              </h1>

              <select
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2 cursor-pointer"
                value={how}
                onChange={(e) => setHow(e.target.value)}
              >
                {howUknow.map((how) => {
                  return <option value={how}>{how}</option>;
                })}
              </select>
            </div>

            <div className="col-start-1 col-span-2 mt-3">
              <h1 className=" mb-1 font-semibold text-orange-600">
                If you choose other in above, please write here
              </h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[38px] text-sm border border-orange-600 rounded-lg p-2"
                required
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <h1 className=" mb-1 font-semibold text-orange-600 row-start-1 row-span-1">
              Special requests?
            </h1>
            <textarea
              placeholder="If you've got special needs such as non-smoking rooms, dietary plans or have additional places to visit, please let us know."
              name=""
              id=""
              className="h-[100px] text-sm w-full border border-orange-600 rounded-lg p-2"
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
            />
          </div>
        </div>

        <div className=" flex justify-center">
          <button
            disabled={queryFormMutation.isLoading}
            type="submit"
            className=" md:w-1/6 w-2/5 rounded-lg bg-[#f69320] flex justify-center align-middle items-center p-3 cursor-pointer hover:opacity-90 transition-all"
          >
            {queryFormMutation.isLoading ? (
              <PuffLoader
                color={"#010E3B"}
                size={25}
                aria-label="Loading Spinner"
              />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
