"use client";

import {
  AiOutlineCheck,
  AiOutlineFlag,
  AiOutlineTag,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BsClock, BsFillCalendarDateFill } from "react-icons/bs";
import { FaMapMarkedAlt, FaMountain } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";

import { BiSolidMap } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/services/lib/store";
import { datetime } from "@/helper/DateFormat";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Duration = [
  { name: "1 Days", id: 1 },
  { name: "2 Days", id: 2 },
  { name: "3 Days", id: 3 },
  { name: "4 Days", id: 4 },
  // { name: "5 Days", },
  // { name: "6 Days", },
  // { name: "7 Days", },
  // { name: "8 Days", },
  // { name: "9 Days", },
  // { name: "10 Days", },
  // { name: "11 Days", },
  // { name: "12 Days", },
  // { name: "13 Days", },
  // { name: "14 Days", },
  // { name: "15 Days", },
  // { name: "16 Days", },
  // { name: "17 Days", },
  // { name: "18 Days", },
  // { name: "19 Days", },
  // { name: "20 Days", },
  // { name: "21 Days", },
  // { name: "22 Days", },
  // { name: "23 Days", },
  // { name: "24 Days", },
  // { name: "25 Days", },
  // { name: "26 Days", },
  // { name: "27 Days", },
  // { name: "28 Days", },
  // { name: "29 Days", },
  // { name: "30 Days", },
];

const page = () => {
  const [cityId, setCityId] = useState("");
  const [selectModal, setSelectModal] = useState(false);
  const [selectStyle, setSelectStyle] = useState(false);
  const [selectCan, setSelectCan] = useState(false);
  const [selectCountry, setSelectCountry] = useState(false);
  const [cityIsSuccess, setCitySuccess] = useState(false);
  const [date, setDate] = useState<string>("");
  const [value, onChange] = useState<Value>(new Date());
  const [params, setParams] = useState<string>("");
  const [tourLists, setTourLists] = useState<any>();
  const [countryId, setCountryId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");

  const searchParams = useSearchParams();
  console.log(searchParams);

  const navigate = useSelector((state: RootState) => state.navigate);

  const {
    data: cities,
    isLoading: isCityLoading,
    refetch: cityRefetch,
  } = useQuery({
    queryKey: ["city"],
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
    queryKey: ["countrys"],
    queryFn: () => getRequest("/country/list"),
  });

  if (countryId !== "") {
    cityRefetch();
  }

  const loadingData = async () => {
    const Tour = await fetch(
      `https://newapi.goldenyellowtravel.com/api/v1/city/list?columns=name&search=${searchParams.get(
        "navTag"
      )}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return fetch(
          `https://newapi.goldenyellowtravel.com/api/v1/tour/list?columns=city_id&search=${data?.data.data[0]?.id}`
        );
      })
      .then((secondApiResponse) => {
        return secondApiResponse.json();
      })
      .then((tour) => {
        console.log(tour);

        return tour;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return setTourLists(Tour);
  };

  useEffect(() => {
    loadingData();
  }, [searchParams.get("navTag")]);

  console.log(tourLists);

  // search form

  const handleSearchForm = (e: any) => {
    e.preventDefault();
  };

  const tileDisabled = ({ activeStartDate, date, view }: any) => {
    return date < new Date().getDay() + 1;
  };

  const handleCalendar = useCallback(() => {
    setDate(datetime(value));
    setSelectCan(selectCan);
  }, [value]);

  console.log(tourLists);

  return (
    <div className=" min-h-screen">
      <div
        className=" h-[400px] relative"
        style={{
          backgroundImage: `url(${"https://d13jio720g7qcs.cloudfront.net/images/slide/origin/61bc461d30c02.jpg"})`,
        }}
      >
        <div className=" hero-section h-[400px]"></div>
        <h1 className=" text-[2rem] font-bold text-white absolute top-[60%] left-[50%] -translate-x-[50%] z-50">
          Discover South-East Asia by your own way!
        </h1>

        {/* search form */}
        <div className=" w-[70%] md:w-[80%] h-[250px] md:h-[50px] absolute -bottom-[50%] md:-bottom-[6%] left-[50%] -translate-x-[50%] bg-white shadow-lg z-50">
          <form
            className=" h-[50px] md:h-full w-full md:flex items-center"
            onSubmit={handleSearchForm}
          >
            {/* start country */}
            <div className=" h-full w-full md:w-[30%] border-orange-500 border-r-2 relative">
              <button
                className=" h-full px-3 flex justify-between items-center gap-3"
                onClick={() => setSelectCountry(!selectCountry)}
              >
                <AiOutlineFlag className={" text-orange-500"} />
                <h1>Choose country</h1>
              </button>

              {selectCountry && (
                <div className=" bg-slate-50 shadow-lg">
                  <ul className="">
                    {countries?.data?.data?.map((country: any) => {
                      return (
                        <li
                          onClick={() => {
                            setCountryId(country.id),
                              setSelectCountry(!selectCountry);
                          }}
                          key={country?.id}
                          className=" border-orange-500 border-b-2"
                        >
                          <div className=" p-5 flex justify-between items-center">
                            <p>{country?.name}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            {/* end country */}

            {/* start city */}
            <div className=" h-full w-full md:w-[30%] border-orange-500 border-r-2 relative">
              <button
                className=" h-full px-3 flex justify-between items-center gap-3"
                onClick={() => setSelectStyle(!selectStyle)}
              >
                <AiOutlineTag className={" text-orange-500"} />
                <h1>Choose City</h1>
              </button>

              {selectStyle && countryId !== "" && (
                <div className=" min-h-[200px] bg-slate-50 shadow-lg overflow-y-auto">
                  <ul className="">
                    {cities?.data?.data?.map((city: any) => {
                      return (
                        <li
                          onClick={() => {
                            setCityId(city?.id), setSelectStyle(!selectStyle);
                          }}
                          key={city?.id}
                          className=" border-orange-500 border-b-2"
                        >
                          <div className=" p-5 flex justify-between items-center">
                            <p>{city?.name}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            {/* end city */}

            {/* start duration */}
            <div className=" h-full w-full md:w-[30%] border-orange-500 border-r-2 relative">
              <button
                className=" h-full px-3 flex justify-between items-center gap-3"
                onClick={() => setSelectModal(!selectModal)}
              >
                <BsClock className={" text-orange-500"} />
                <h1>Choose Duration</h1>
              </button>

              {selectModal && (
                <div className=" max-h-[200px] bg-slate-50 shadow-lg overflow-y-auto">
                  <ul className="">
                    {Duration?.map((d: any) => {
                      return (
                        <li
                          key={d?.id}
                          onClick={() => {
                            setDuration(d?.id), setSelectModal(!selectModal);
                          }}
                          className=" border-orange-500 border-b-2"
                        >
                          <div className=" p-5 flex justify-between items-center">
                            <p>{d?.name}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            {/* end duration */}

            {/* start date */}
            <div className=" h-full w-full md:w-[20%] border-orange-500 border-r-2 relative gap-3 px-3 flex items-center">
              <AiTwotoneCalendar className="text-orange-500 mt-1" />
              <DatePicker
                className="md:w-[95px]"
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
              />
            </div>
            {/* end date */}

            <Link
              className=" h-full w-full md:w-[20%] bg-orange-500 text-white font-semibold flex items-center justify-between gap-3 px-3"
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
              <div className="flex gap-[0.75rem]">
                <div className="pt-[4px]">
                  <FiSearch />
                </div>
                <p>Search</p>
              </div>
            </Link>
          </form>
        </div>
      </div>

      <div className=" md:flex items-center justify-between px-10 md:px-20  md:my-20 popular">
        <div className="money flex items-center align-middle">
          <Image
            width={55}
            height={55}
            src={"/money-back-guarantee.png"}
            alt="money back guaranteed"
            className="img"
          />
          <p>MONEY BACK GUARANTEE</p>
        </div>

        <div className="money flex items-center align-middle">
          <Image
            width={55}
            height={55}
            src={"/best-price-guaranteed.png"}
            alt="best price guaranteed"
            className="img"
          />
          <p>BEST PRICE GUARANTEED</p>
        </div>

        <div className="money flex items-center align-middle">
          <Image
            width={55}
            height={55}
            src={"/customizable-by-local-experts.png"}
            alt="customizable by local experts"
            className="img"
          />
          <p className=" text-xs md:text-base">CUSTOMIZABLE BY LOCAL EXPERTS</p>
        </div>
      </div>

      <div>
        <h1 className=" text-center text-xl font-bold">
          {tourLists?.data?.data?.length} Best Tours in{" "}
          {searchParams.get("navTag")} {new Date().getFullYear()}
        </h1>

        <div className="px-[20px] md:px-[130px]  my-10 gap-8   flex flex-wrap  justify-center">
          {tourLists?.data?.data?.map((tour: any) => {
            return (
              <div
                key={tour?.id}
                className=" shadow-lg lg:w-[400px] w-full overflow-hidden "
              >
                <div className=" overflow-hidden lg:w-[400px] max-h-[200px]">
                  <img
                    src={`${tour?.tour_photo}`}
                    className=" md:w-full overflow-hidden lg:w-[400px] max-h-[200px]  hover:scale-[1.1] duration-75"
                  />
                </div>

                <div className=" p-5">
                  <Link href={"/"} className=" text-xl font-bold">
                    {tour?.name?.length > 25
                      ? tour?.name?.substring(0, 25) + "..."
                      : tour?.name}
                  </Link>
                </div>

                <div className=" flex items-center justify-start gap-5 px-5 pb-5">
                  <div className=" text-white font-bold px-2 py-1 rounded-md bg-green-500">
                    9.3
                  </div>

                  <p className=" text-lg text-green-500 font-bold">
                    {tour?.overview?.length > 25
                      ? tour?.overview?.substring(0, 25) + "..."
                      : tour?.overview}
                  </p>

                  {/* <p className=" text-slate-400"> - 14 reviews</p> */}
                </div>

                <div className=" text-slate-600 flex items-center justify-start gap-3 px-5">
                  <BiSolidMap />
                  <Link href={"/"} className=" text-sm ">
                    {tour?.location?.length > 25
                      ? tour?.location?.substring(0, 25) + "..."
                      : tour?.location}
                  </Link>
                </div>

                <div className=" p-5 flex items-center justify-between">
                  <div className=" flex items-center justify-start">
                    <p className=" text-sm text-slate-400 font-semibold line-through">
                      ${" "}
                      {tour?.sale_price?.length > 5
                        ? tour?.sale_price?.substring(0, 5) + "..."
                        : tour?.sale_price}
                    </p>
                    <p className=" text-red-600 text-xl font-bold px-2">
                      ${" "}
                      {tour?.price?.length > 4
                        ? tour?.price?.substring(0, 4) + "..."
                        : tour?.price}
                    </p>
                    <p className=" text-sm text-slate-400">/pax</p>
                  </div>

                  <Link
                    href={{
                      pathname: "/tour-detail",
                      query: {
                        tourDetail: tour?.id,
                      },
                    }}
                    // as={`localhost:3000/tour/tour-detail?tourDetail=${tour?.id}`}
                    // as={`https://goldenyellowtravel.com/tour/tour-detail?tourDetail=${tour?.id}`}
                  >
                    <button className=" px-3 py-2 bg-orange-500 text-white font-bold rounded-lg">
                      View Tour
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
