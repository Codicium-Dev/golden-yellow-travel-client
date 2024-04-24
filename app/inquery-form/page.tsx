"use client";

import React, { useEffect, useState } from "react";

import { postRequest } from "@/services/api/apiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

type payload = {
  travel_month: string;
  travel_year: string;
  stay_days: string;
  budget: string;
  adult_count: string;
  child_count: string;
  interest: string;
  destinations: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  accommodation: string;
  how_u_know: string;
  other_information: string;
  special_note: string;
};

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

  const years = [
    "Choose years",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
  ];

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

  const [mainPayload, setMainPayload] = useState<payload | any>({
    travel_month: "",
    travel_year: "",
    stay_days: "",
    budget: "",
    adult_count: "",
    child_count: "",
    interest: "",
    destinations: "",
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    accommodation: "",
    how_u_know: "",
    other_information: "",
    special_note: "",
  });

  useEffect(() => {
    setMainPayload({
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
  }, [
    travelMonth,
    travelYear,
    stayDays,
    budget,
    adult,
    child,
    interest,
    destinations,
    fName,
    lName,
    email,
    phone,
    accommo,
    how,
    otherInfo,
    special,
  ]);

  const mutation = useMutation((newTodo) => {
    return postRequest("/form/create", newTodo);
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Success inquery", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [mutation]);

  return (
    <>
      <div className="pt-[110px] md:pt-[140px] pb-[40px] bg-[#E2F3FF] open-sans">
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

        <div className=" grid grid-rows-4 w-4/5 mx-auto gap-5 mb-12">
          {/* <h1 className=" row-start-1 row-span-1 text-2xl font-semibold tracking-widest text-[#464646] text-center">
            TOUR INFORMATION
          </h1> */}
          <div className=" row-start-1 row-span-1 grid grid-cols-4 gap-3 ">
            <div className=" col-start-1 col-span-12 md:col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Travel Month *
              </h1>
              <select
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setTravelMonth(e.target.value)}
              >
                {months.map((month) => {
                  return <option value={month}>{month}</option>;
                })}
              </select>
            </div>

            <div className=" col-start-1 md:col-start-2 col-span-12 md:col-span-1 px-4">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Travel Year *
              </h1>
              <select
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setTravelYear(e.target.value)}
              >
                {years.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div className=" col-start-1 md:col-start-3 col-span-12 md:col-span-2 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Duration of Stay (No. of Days) *
              </h1>
              <input
                type="number"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setStayDays(e.target.value)}
              />
            </div>
          </div>

          <div className=" row-start-2 row-span-1 grid grid-cols-2 gap-3">
            <div className=" col-start-1 col-span-12 md:col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Estimate Budget ( in USD ) *
              </h1>
              <input
                type="number"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className=" md:col-start-2 col-start-1 col-span-12 md:col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                No. of Adults (12+) *
              </h1>
              <input
                type="number"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setAdult(e.target.value)}
              />
            </div>
          </div>

          <div className="row-start-3 md:grid-cols-2 row-span-1 grid grid-cols-12 gap-3">
            <div className=" col-start-1 col-span-12 md:col-span-1 md:col-start-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                No of Children (2~12 years old)
              </h1>
              <input
                type="number"
                placeholder="How may children joining the tour?"
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setChild(e.target.value)}
              />
            </div>

            <div className=" col-start-1  col-span-12 md:col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Travel Interest
              </h1>
              <select
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setInterest(e.target.value)}
              >
                {interests.map((interests) => {
                  return <option value={interests}>{interests}</option>;
                })}
                {/* <option value={interest}>{interest}</option>; */}
              </select>
            </div>
          </div>

          <div className="row-start-4 row-span-1 grid grid-cols-1">
            <div className=" col-start-1 col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Select Which Destinations Do You Want To Enjoy
              </h1>
              <select
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setDestinations(e.target.value)}
              >
                {destination.map((destination) => {
                  return <option value={destination}>{destination}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className=" grid grid-rows-4 w-4/5 mx-auto gap-1 mb-14">
          <h1 className=" row-start-1 row-span-1 text-2xl font-semibold tracking-widest text-[#464646] text-center">
            PERSONAL INFORMATION
          </h1>
          <div className=" row-start-2 row-span-1 grid grid-cols-2 gap-3">
            <div className=" col-start-1 col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                First Name
              </h1>
              <input
                type="text"
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className=" col-start-2 col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">Last Name</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <div className=" row-start-3 row-span-1 grid grid-cols-2">
            <div className=" col-start-1 col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">Email</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className=" col-start-2 col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">
                Phone Number
              </h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className=" row-start-4 row-span-1 grid grid-cols-1">
            <div className=" col-start-1 col-span-1 px-3">
              <h1 className=" mb-2 font-semibold text-orange-600">Country</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h1 className=" my-5 text-2xl font-semibold tracking-widest text-[#464646] text-center">
          OTHER INFORMATION
        </h1>
        <div className=" grid grid-rows-3 w-4/5 mx-auto gap-5 mb-14">
          <div className=" row-start-1 row-span-3  grid md:grid-cols-2 grid-cols-12 gap-3">
            <div className=" col-start-1 col-span-12 md:col-span-1 px-3 grid grid-rows-3 gap-3">
              <div className=" md:row-start-1 md:row-span-1  row-start-1 ">
                <h1 className=" mb-2 font-semibold text-orange-600">
                  Please select your accommodation style below and we'll pick a
                  hotel that best suits your needs.
                </h1>

                <select
                  name=""
                  id=""
                  className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                  onChange={(e) => setAccommo(e.target.value)}
                >
                  {accommodation.map((accommodation) => {
                    return (
                      <option value={accommodation}>{accommodation}</option>
                    );
                  })}
                </select>
              </div>

              <div className=" row-start-2 row-span-1">
                <h1 className=" mb-2 font-semibold text-orange-600">
                  How do you know about Pro Niti Travel?
                </h1>

                <select
                  name=""
                  id=""
                  className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                  onChange={(e) => setHow(e.target.value)}
                >
                  {howUknow.map((how) => {
                    return <option value={how}>{how}</option>;
                  })}
                </select>
              </div>

              <div className=" row-start-3 row-span-1">
                <h1 className=" mb-2 font-semibold text-orange-600">
                  If you choose other in above, please write here
                </h1>
                <input
                  type="text"
                  name=""
                  id=""
                  className=" w-full border border-orange-600 px-3 py-2 rounded-lg"
                  onChange={(e) => setOtherInfo(e.target.value)}
                />
              </div>
            </div>

            <div className=" md:col-start-2 md:col-span-1  col-start-1 col-span-12 px-3 grid grid-rows-6">
              <h1 className=" mb-2 font-semibold text-orange-600 row-start-1 row-span-1">
                Special requests?
              </h1>
              <textarea
                placeholder="If you've got special needs such as non-smoking rooms, dietary plans or have additional places to visit, please let us know."
                name=""
                id=""
                className=" w-full border border-orange-600 px-3 py-2 rounded-lg row-start-2 row-span-5 h-5/6"
                onChange={(e) => setSpecial(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className=" flex justify-center">
          <button
            disabled={mutation?.isLoading}
            onClick={() => {
              mutation.mutate(mainPayload);
            }}
            className=" md:w-1/6 w-2/5 rounded-lg bg-[#f69320] py-2"
          >
            <div className=" flex justify-center align-middle items-center gap-1">
              <p>Send</p>
              {mutation?.isLoading && (
                <img src={"/loading.svg"} className=" w-5 h-5" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
