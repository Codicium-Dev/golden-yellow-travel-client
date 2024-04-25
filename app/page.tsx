"use client";

import "react-datepicker/dist/react-datepicker.css";

import React, { useCallback, useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";
import MostPopularDestinations from "@/components/MostPopularDestinations";
import Recommendations from "@/components/Recommendations";
import { RootState } from "@/services/lib/store";
import Services from "@/components/Services";
import TourCard from "@/components/TourCard";
import { datetime } from "@/helper/DateFormat";
import { getRequest } from "../services/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Duration = [
  { name: "1 Days", id: 1 },
  { name: "2 Days", id: 2 },
  { name: "3 Days", id: 3 },
  { name: "4 Days", id: 4 },
  { name: "5 Days", id: 5 },
  { name: "6 Days", id: 6 },
  { name: "7 Days", id: 7 },
  { name: "8 Days", id: 8 },
  { name: "9 Days", id: 9 },
  { name: "10 Days", id: 10 },
  { name: "11 Days", id: 11 },
  { name: "12 Days", id: 12 },
  { name: "13 Days", id: 13 },
  { name: "14 Days", id: 14 },
  { name: "15 Days", id: 15 },
  { name: "16 Days", id: 16 },
  { name: "17 Days", id: 17 },
  { name: "18 Days", id: 18 },
  { name: "19 Days", id: 19 },
  { name: "20 Days", id: 20 },
  { name: "21 Days", id: 21 },
  { name: "22 Days", id: 22 },
  { name: "23 Days", id: 23 },
  { name: "24 Days", id: 24 },
  { name: "25 Days", id: 25 },
  { name: "26 Days", id: 26 },
  { name: "27 Days", id: 27 },
  { name: "28 Days", id: 28 },
  { name: "29 Days", id: 29 },
  { name: "30 Days", id: 30 },
];

const Index = () => {
  const [cityId, setCityId] = useState("");
  const [selectModal, setSelectModal] = useState(false);
  const [selectStyle, setSelectStyle] = useState(false);
  const [selectCountry, setSelectCountry] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [durationName, setDurationName] = useState("");

  const countryRef = useRef<any>();
  const cityRef = useRef<any>();
  const durationRef = useRef<any>();

  const mainSearch = useSelector((state: RootState) => state.mainSearch);

  const {
    data: Tours,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getRequest(`tour/list?page=1&per_page=6`),
  });

  const {
    data: cities,
    isLoading: isCityLoading,
    refetch: cityRefetch,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      getRequest(
        `city/list?columns=country_id&search=${countryId ? countryId : ""}`
      ),
    // enabled : isCountry
  });

  const {
    data: countries,
    isLoading: countryLoading,
    isError: countryIsError,
    error: countryError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getRequest("/country/list"),
  });

  const { data: cityTour, isLoading: cityTourLoading } = useQuery({
    queryKey: ["cityTour"],
    queryFn: () => getRequest("/city/list?page=1&per_page=6"),
  });

  useEffect(() => {
    refetch();
  }, [mainSearch]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (countryRef.current && !countryRef.current?.contains(event.target)) {
        setSelectCountry(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [selectCountry]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (cityRef.current && !cityRef.current?.contains(event.target)) {
        setSelectStyle(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [selectStyle]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (durationRef.current && !durationRef.current?.contains(event.target)) {
        setSelectModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [selectModal]);

  // search form

  const handleSearchForm = (e: any) => {
    e.preventDefault();
  };

  if (isError) return "An error has occurred: " + error;

  if (isLoading) return <Loading />;

  // useEffect(() => {
  //   // if(countryId){
  //     cityRefetch();
  //   // }
  // } ,[countryId])
  if (countryId !== "") {
    cityRefetch();
  }

  return (
    <div className=" min-h-screen overflow-x-hidden">
      <div className="relative">
        <div>
          <HeroSection
            photo="/hero.png"
            title="Explore Asia"
            subTitle="Discover South-East Asia by Your Own Way"
          />
        </div>

        {/* search form container */}
        <div className="w-[80%] md:w-[50%] lg:w-[95%] xl:w-[80%] h-fit flex items-center absolute -bottom-[240px] md:-bottom-[160px] lg:-bottom-[60px] left-[50%] -translate-x-[50%] bg-white shadow-lg z-40 text-sm">
          <form
            className=" w-full h-fit md:h-full lg:h-[100px] xl:h-[120px] md:flex-col lg:flex lg:flex-row items-center"
            onSubmit={handleSearchForm}
          >
            {/* select country */}
            <div className="w-full flex lg:w-[30%] cursor-pointer relative items-center lg:ml-3">
              <button
                className=" w-full h-full pl-[25px] lg:pl-0 flex justify-start items-center gap-[10px]"
                onClick={() => {
                  setSelectCountry(!selectCountry),
                    setSelectModal(false),
                    setSelectStyle(false);
                }}
              >
                <Image
                  width={60}
                  height={60}
                  src={"/hero-icon-1.png"}
                  alt="hero-icon"
                  className="hero-icon"
                />
                <span className="font-bold tracking-wider text-[16px] xl:text-xl">
                  {countryName !== "" ? countryName : " Choose Country"}
                </span>
              </button>
              <div className="hidden lg:block border-r border-r-gray-500 h-[60px]"></div>

              {selectCountry && (
                <div
                  ref={countryRef}
                  className=" bg-slate-50 shadow-lg absolute top-[50px] left-0 w-full z-40"
                >
                  <ul className="">
                    {countries?.data?.data?.map((country: any) => {
                      return (
                        <li
                          onClick={() => {
                            setCountryId(country.id),
                              setSelectCountry(!selectCountry),
                              setCountryName(country?.name);
                          }}
                          key={country?.id}
                          className=" border-b-[#010e3a] border-b-2"
                        >
                          <div className=" p-5 flex justify-center items-center">
                            <span>{country?.name}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className="my-7 md:border-[#8698ab] md:border-r-2"></div>
            </div>

            {/* start city */}
            <div className=" h-full w-full flex lg:w-[30%] cursor-pointer lg:ml-5 items-center relative">
              <button
                className=" w-full h-full pl-[25px] lg:pl-0 flex justify-start items-center gap-[10px]"
                onClick={() => {
                  setSelectStyle(!selectStyle),
                    setSelectCountry(false),
                    setSelectModal(false);
                }}
                disabled={isCityLoading}
              >
                <Image
                  width={60}
                  height={60}
                  src={"/hero-icon-2.png"}
                  alt="hero-icon"
                  className="hero-icon"
                />
                <span className="font-bold tracking-wider text-[16px] xl:text-xl">
                  {" "}
                  {cityName !== "" ? cityName : "Choose City"}
                </span>
              </button>
              <div className="hidden lg:block border-r border-r-gray-500 h-[60px]"></div>

              {selectStyle && countryId !== "" && (
                <div
                  ref={cityRef}
                  className=" min-h-[200px] bg-slate-50 shadow-lg overflow-y-auto absolute top-[50px] left-0 w-full z-40"
                >
                  <ul className="">
                    {cities?.data?.data?.map((city: any) => {
                      return (
                        <li
                          onClick={() => {
                            setCityId(city?.id),
                              setSelectStyle(!selectStyle),
                              setCityName(city?.name);
                          }}
                          key={city?.id}
                          className=" border-b-[#010e3a] border-b-2"
                        >
                          <div className=" p-5 flex justify-center items-center">
                            <span>{city?.name}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className="my-7 md:border-[#8698ab] md:border-r-2"></div>
            </div>
            {/* end city */}

            {/* start duration */}
            <div className=" h-full w-full flex lg:w-[30%] cursor-pointer lg:ml-5 items-center relative">
              <button
                className=" w-full h-full pl-[25px] lg:pl-0 flex justify-start items-center gap-[10px]"
                onClick={() => {
                  setSelectModal(!selectModal),
                    setSelectCountry(false),
                    setSelectStyle(false);
                }}
              >
                <Image
                  width={60}
                  height={60}
                  src={"/hero-icon-3.png"}
                  alt="hero-icon"
                  className="hero-icon"
                />
                <span className="font-bold tracking-wider text-[16px] xl:text-xl">
                  {" "}
                  {durationName !== "" ? durationName : "Duration"}
                </span>
              </button>
              <div className="hidden lg:block border-r border-r-gray-500 h-[60px]"></div>

              {selectModal && (
                <div
                  ref={durationRef}
                  className=" max-h-[200px] bg-slate-50 shadow-lg overflow-y-auto absolute top-[50px] left-0 w-full z-40"
                >
                  <ul className="">
                    {Duration?.map((d: any) => {
                      return (
                        <li
                          key={d?.id}
                          onClick={() => {
                            setDuration(d?.id),
                              setSelectModal(!selectModal),
                              setDurationName(d?.name);
                          }}
                          className=" border-b-[#010e3a] border-b-2"
                        >
                          <div className=" p-5 flex justify-center items-center">
                            <span>{d?.name}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className="my-7 md:border-[#8698ab] md:border-r-2"></div>
            </div>
            {/* end duration */}

            {/* select date */}
            <div className=" h-[56px] w-full flex lg:w-[30%] cursor-pointer lg:ml-5 items-center relative pl-[25px] lg:pl-0">
              <Image
                width={60}
                height={60}
                src={"/hero-icon-4.png"}
                alt="hero-icon"
                className="hero-icon"
              />
              <DatePicker
                className="w-full flex outline-none font-bold tracking-wider text-[16px] xl:text-xl pl-[10px]"
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
              />
            </div>
            {/* select date end */}

            {/* tour searchbox */}
            <Link
              className="pl-[25px] lg:pl-5 h-[56px] lg:h-full w-full lg:w-[30%] bg-[#010e3b] text-white font-semibold flex items-center justify-between gap-3 px-3"
              href={{
                pathname: "/custom-search",
                query: {
                  cityId: cityId,
                  duration: duration,
                  startDate: datetime(startDate),
                },
              }}
              // as={`https://goldenyellowtravel.com/custom-search?cityId=${cityId}&duration=${duration}&startDate=${datetime(
              //   startDate
              // )}`}
            >
              <div className="flex items-center gap-[0.75rem]">
                <div className="pt-[4px]">
                  <Image
                    width={60}
                    height={60}
                    src={"/hero-icon-5.png"}
                    alt="hero-icon"
                    className="hero-icon"
                  />
                </div>
                <span className="font-bold tracking-wider text-[16px] xl:text-xl">
                  Search
                </span>
              </div>
            </Link>
            {/* tour searchbox end */}
          </form>
        </div>
      </div>

      {/* recommendation places */}
      <Recommendations />

      {/* Most popular & best adventures */}

      <div className="bg-[#fff] py-12">
        <h1 className="open-sans text-center text-3xl font-bold ">
          Our most popular & best adventures
        </h1>

        <div className="my-10 gap-8 flex flex-col px-6 md:px-16 justify-center items-center">
          {Tours?.data?.data?.map((tour: any, index: number) => {
            return (
              <TourCard key={index} tour={tour} reverse={index % 2 !== 0} />
            );
          })}
        </div>
      </div>

      <Services />

      <div className="px-6 lg:px-16">
        <MostPopularDestinations cityTour={cityTour} />
      </div>
    </div>
  );
};

export default Index;

// master error solving
