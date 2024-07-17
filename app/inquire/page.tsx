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
  language: string;
  travel_month: string;
  travel_year: string;
  budget: string;
  duration: number;
  interest: string;
  destinations: string;
  accommodation: string;
  how_know: string;
  other_information: string;
  adults: number;
  children: number;
  infants: number;
  idea: string;
};

const InquiryForm = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone]: any = useState();
  const [language, setLanguage] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [travelYear, setTravelYear] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState(2);
  const [interest, setInterest] = useState("");
  const [destinations, setDestinations] = useState("");
  const [Accommodation, setAccommodation] = useState("");
  const [how, setHow] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [idea, setIdea] = useState("");
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
  const interests = [
    "Not Required",
    "Economy (3 Stars Hotel)",
    "Deluxe (4 Stars Hotel)",
    "Luxury (5 Stars Hotel)",
  ];
  const currentYear = new Date().getFullYear();
  const yearsArray = ["Choose year"];
  for (let i = 0; i < 3; i++) {
    yearsArray.push(String(currentYear + i));
  }
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
  const [travelDateValid, setTravelDateValid] = useState(false);

  const Destinations = ["Choose Country", "Vietnam", "Thailand"];

  const inquiryFormMutation = useMutation({
    mutationFn: (data: any) => postRequest("inquiry/create", data),
    // form cleaning
    onSuccess: () => {
      setFullName("");
      setEmail("");
      setLanguage("");
      setTravelMonth("");
      setTravelYear("");
      setBudget("");
      setDuration(2);
      setInterest("");
      setDestinations("");
      setAccommodation("");
      setHow("");
      setOtherInfo("");
      setAdults(1);
      setChildren(0);
      setInfants(0);
      setIdea("");
      toast.success("Inquiry Success");
    },
    onError: () => {
      toast.error("Inquiry Fail! Please try again");
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    function monthNameToNumber(monthName: any) {
      const monthNames = [
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
      return monthNames.indexOf(monthName) + 1; // indexOf returns 0-based index, so add 1
    }

    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    // Convert state values to appropriate types
    const selectedMonth = monthNameToNumber(travelMonth);
    const selectedYear = parseInt(travelYear, 10); // Convert year string to integer

    // Compare state date with current date
    if (
      selectedYear > currentYear ||
      (selectedYear === currentYear && selectedMonth >= currentMonth)
    ) {
      setTravelDateValid(true);
    } else {
      setTravelDateValid(false);
    }
    console.log("Date Valid? >> ", travelDateValid);
    if (Accommodation === "Please select accomodation") {
      toast.error("Please fill accomodation field.");
    }
    if (how === "Please select how you found us") {
      toast.error("Please fill how you found us.");
    }
    if (travelDateValid === false) {
      toast.error("Please fill a valid date to travel.");
    }
    if (how === "Others") {
      if (otherInfo === "") {
        toast.warning("Please fill how you found us.");
      }
    }
    if (
      fullName !== "" &&
      email !== "" &&
      phone !== null &&
      duration >= 2 &&
      Accommodation !== "" &&
      Accommodation !== "Please select accomodation" &&
      travelDateValid === true &&
      language !== "" &&
      how !== "" &&
      how !== "Please select how you found us"
    ) {
      inquiryFormMutation.mutateAsync({
        full_name: fullName,
        email,
        phone,
        language,
        travel_month: travelMonth,
        travel_year: travelYear,
        budget,
        duration,
        interest,
        destinations,
        accommodation: Accommodation,
        how_know: how,
        other_information: otherInfo,
        adults,
        children,
        infants,
        trip_idea: idea,
      });

      router.push("/");
    }
  };
  return (
    <>
      <div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="w-full p-5 pt-[110px] md:pt-[140px] pb-[40px] bg-[#efefef] open-sans"
        >
          <h1 className="pb-5 text-2xl lg:text-3xl font-semibold tracking-widest uppercase text-[#464646] text-center ">
            Customize Your Tour
          </h1>
          <p className="text-base lg:text-lg text-gray-500 text-justify md:text-center mx-auto mb-10">
            Experience tailor-made trips since 2013 designed to delight our
            esteemed guests. Share your preferences, interests, and trip details
            with us, and in as little as 24 hours, our team of experts will
            meticulously craft exceptional adventures tailored just for you.
            Your perfect travel experience awaits with our exclusive customized
            tour packages in South-East Asia, Thailand and Vietnam. Let us
            create unforgettable memories together!
          </p>

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

            {/* language */}
            <TextInput
              alignment=""
              type="text"
              orientation=""
              label="Language"
              placeholder="Please fill your language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            {/* How know us? */}
            <div className="flex flex-col md:flex-row pb-2 mb-5 items-center gap:0 md:gap-5">
              <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
                Find Us By
              </div>

              <div className="md:flex items-center gap-5 w-full">
                <div className="w-full text-slate-800 text-sm md:text-base lg:text-lg">
                  <select
                    required
                    name="how"
                    id="arrival-airport"
                    className="w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    value={how}
                    onChange={(e) => setHow(e.target.value)}
                  >
                    {howUknow.map((how, index) => {
                      return (
                        <option key={index} value={how} className="text-center">
                          {how}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            {/* Other info */}
            {how === "Others" ? (
              <div className="flex flex-col md:flex-row pb-2 mb-5 items-center gap:0 md:gap-5">
                <div className="w-full md:w-[30%] "></div>

                <div className="flex flex-col gap-2 w-full">
                  <div className="text-slate-700 text-sm md:text-base lg:text-lg">
                    Please fill how you found us:
                  </div>
                  <TextInput
                    alignment=""
                    type="text"
                    orientation="vertical"
                    label=""
                    placeholder="Please fill how do you know us?"
                    value={otherInfo}
                    onChange={(e) => setOtherInfo(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Tour information */}
          <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-6 lg:px-10 mx-auto">
            <h1 className="pb-8 text-xl lg:text-2xl text-center md:text-start font-semibold tracking-widest text-[#464646] underline underline-offset-8">
              Tour information
            </h1>

            {/* destination */}
            <div className="flex flex-col md:flex-row pb-2 items-center mb-5 gap:0 md:gap-5">
              <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
                Destination
              </div>

              <div className="md:flex items-center gap-5 w-full">
                <div className="w-full text-slate-800 text-sm md:text-base lg:text-lg">
                  <select
                    required
                    name="destination"
                    id="destination"
                    className="w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    value={destinations}
                    onChange={(e) => setDestinations(e.target.value)}
                  >
                    {Destinations.map((interest, index) => {
                      return (
                        <option
                          key={index}
                          value={interest}
                          className="text-center"
                        >
                          {interest}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div className="flex flex-col md:flex-row pb-2 items-center mb-5 gap:0 md:gap-5">
              <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
                Accommodation
              </div>

              <div className="md:flex items-center gap-5 w-full">
                <div className="w-full text-slate-800 text-base lg:text-lg">
                  <select
                    required
                    name="how"
                    id="arrival-airport"
                    className="w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    value={Accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                  >
                    {accommodation.map((how, index) => {
                      return (
                        <option key={index} value={how} className="text-center">
                          {how}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* travelMonth */}
            <div className="flex flex-col md:flex-row pb-2 items-center mb-5 gap:0 md:gap-5">
              <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
                Travel Month
              </div>

              <div className="md:flex items-center gap-5 w-full">
                <div className="w-full text-slate-800 text-sm md:text-base lg:text-lg">
                  <select
                    required
                    name="travel-month"
                    id="travel-month"
                    className="w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                  >
                    {months.map((interest, index) => {
                      return (
                        <option
                          key={index}
                          value={interest}
                          className="text-center"
                        >
                          {interest}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* travel year */}
            <div className="flex flex-col md:flex-row pb-2 items-center mb-5 gap:0 md:gap-5">
              <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
                Travel Year
              </div>

              <div className="md:flex items-center gap-5 w-full">
                <div className="w-full text-slate-800 text-sm md:text-base lg:text-lg">
                  <select
                    required
                    name="travel-year"
                    id="travel-year"
                    className="w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    value={travelYear}
                    onChange={(e) => setTravelYear(e.target.value)}
                  >
                    {yearsArray.map((year, index) => {
                      return (
                        <option
                          key={index}
                          value={year}
                          className="text-center"
                        >
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* budget */}
            <TextInput
              alignment="text-center"
              type="text"
              orientation=""
              label="Budget"
              placeholder="Please fill planned budget for your trip"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            {/* duration */}
            <TextInput
              type="number"
              orientation=""
              label="Duration"
              placeholder="Please fill your trip's duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              alignment="text-center"
            />

            {/* idea */}
            <TextInput
              alignment=""
              orientation=""
              type="textarea"
              label="Travel idea"
              value={idea}
              placeholder="Please let us know your travel's idea"
              onChange={(e) => setIdea(e.target.value)}
            />

            {/* No of traveller */}
            <div className="md:pb-5 flex-col md:flex-row items-center gap-5">
              <div className="w-full lg:w-[20%] ">
                <p className=" text-slate-700 text-sm md:text-base lg:text-lg min-w-[150px] pb-3 md:pb-0">
                  No. of travellers
                </p>
              </div>
              {/* No. of travellers */}
              <div className="w-full flex-col md:flex md:flex-row gap-5 justify-between">
                {/* adults */}
                <div className="w-full md:w-[30%] flex items-center justify-between pb-5 md:pb-0">
                  <p className=" text-gray-700 w-[40%] md:w-1/2 flex-col md:flex-row justify-between text-sm md:text-base lg:text-lg">
                    Adults:
                  </p>
                  <input
                    type="number"
                    name="adults"
                    min={1}
                    id="adults"
                    className="block w-[50%] text-center border-white py-2 h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    required
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  />
                </div>
                {/* childrens */}
                <div className="w-full md:w-[30%] flex items-center justify-between pb-4 md:pb-0">
                  <p className=" text-gray-700 w-[40%] md:w-1/2 flex-col md:block justify-between text-sm md:text-base lg:text-lg">
                    Children:
                    <br />
                    <span className="text-sm text-gray-500">
                      &#x28;1-10&#x29;
                    </span>
                  </p>
                  <input
                    type="number"
                    name="childrens"
                    min={0}
                    max={10}
                    id="childrens"
                    className="block w-[50%] text-center border-white py-2 h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    required
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  />
                </div>
                {/* infants */}
                <div className="w-full md:w-[30%] flex items-center justify-between pb-4 md:pb-0">
                  <p className=" text-gray-700 w-[40%] md:w-1/2 flex-col md:block justify-between text-sm md:text-base lg:text-lg">
                    Infants:
                    <br />
                    <span className="text-sm text-gray-500">
                      &#x28;1-4&#x29;
                    </span>
                  </p>
                  <input
                    type="number"
                    name="infants"
                    min={0}
                    max={4}
                    id="infants"
                    className="block w-[50%] text-center border-white py-2 h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
                    required
                    value={infants}
                    onChange={(e) => setInfants(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Send button */}
          <div className=" flex justify-center mt-10">
            <button
              disabled={inquiryFormMutation.isLoading}
              type="submit"
              className=" md:w-1/6 w-2/5 rounded-lg bg-[#010e3b] text-white font-semibold flex justify-center align-middle items-center p-3 cursor-pointer hover:opacity-90 transition-all"
            >
              {inquiryFormMutation.isLoading ? (
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

export default InquiryForm;
