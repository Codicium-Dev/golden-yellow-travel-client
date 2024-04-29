"use client";

import {
  AiOutlineCar,
  AiOutlineCheck,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaBed, FaMapMarkedAlt, FaMountain } from "react-icons/fa";
import { useEffect, useState } from "react";

import { BiCategory } from "react-icons/bi";
import CreateReview from "@/components/CreateReview";
import { GiForkKnifeSpoon } from "react-icons/gi";
import HeroSection from "@/components/HeroSection";
import { HiUserGroup } from "react-icons/hi";
import Image from "next/image";
import ItineraryNavLink from "@/components/ItineraryNavLink";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import RedixAccordion from "@/components/RedixAccordion";
import Reviews from "@/components/Reviews";
import { SiYourtraveldottv } from "react-icons/si";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const NavLinks = [
  {
    title: "Overview",
    href: "overview",
  },
  {
    title: "Reviews",
    href: "reviews",
  },
];

type Tour = {
  message: string;
  data: [
    {
      id: number;
      name: string;
      start_date: string;
      end_date: string;
      country_name: string;
      city_name: string;
      city_id: number;
      overview: string;
      price: string;
      sale_price: string;
      location: string;
      departure: string;
      theme: string;
      duration: string;
      rating: string;
      type: string;
      style: string;
      for_whom: string;
      tour_photo: string;
      created_at: string;
      updated_at: string;
    }
  ];
};

interface inclusion {}

export default function tours() {
  const params = useSearchParams();
  const [activeNav, setActiveNav] = useState("Overview");
  // const [inclusion, setInclusion] = useState<any | inclusion>();
  // const [similarTour, setSimilarTour] = useState<any>();

  //
  const { data: tours, isLoading: tourLoading } = useQuery({
    queryKey: ["tour-detail", params.get("tourDetail")],
    queryFn: () => getRequest(`tour/show/${params.get("tourDetail")}`),
  });

  console.log(tours, "Tours >> ");
  const { data: inclusions, isLoading: inclusionLoading } = useQuery({
    queryKey: ["inclusions", params.get("tourDetail")],
    queryFn: () =>
      getRequest(
        `inclusion/list?columns=tour_id&search=${params.get("tourDetail")}`
      ),
    enabled: !!tours,
  });
  const { data: similarTours, isLoading: similarToursLoading } = useQuery({
    queryKey: ["similar_tours", tours?.data?.city_id],
    queryFn: () =>
      getRequest(
        `tour/list?columns=city_id&page=1&per_page=4&search=${tours?.data?.city_id}`
      ),
    enabled: !!inclusions,
  });

  let titleRendered = false; // Variable to track if title has been rendered

  // console.log("Tours >>", tours);
  // console.log("Inclusions >> ", inclusions);
  // console.log("Similar >> ", similarTours);
  // console.log("Similar >> ", similarTours?.data?.data);
  if (tourLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <>
      <HeroSection photo="/summer1.png" />
      {/* content over hero section */}
      <div className="absolute flex flex-col lg:flex-row gap-5 top-[150px] md:top-[200px] lg:top-[300px] h-fit md:h-[400px] w-full max-w-[1200px] left-1/2 -translate-x-1/2 px-5 lg:px-0 ">
        {/* country name & cross */}
        <div className="w-full lg:w-[10%] lg:pb-0 flex flex-row-reverse lg:flex-col justify-between ">
          <Link href={"/"}>
            <div className="block text-lg font-bold text-[30px] w-fit ">
              <Image
                src="/cross-icon.png"
                width={60}
                height={60}
                alt="Tour Photo"
                className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px] object-cover cursor-pointer"
              />
            </div>
          </Link>
          <div className="relative">
            <span className="lg:absolute block lg:-left-[190px] lg:bottom-[200px] lg:w-[400px] lg:-rotate-90 uppercase leading-[30px] tracking-widest text-[#e1f9ff] lg:text-[#224466] text-[30px] font-bold open-sans ">
              {tours?.data?.country_name}
            </span>
          </div>
        </div>

        {/* tour specifications */}
        <div className="w-full lg:w-[30%] h-fit lg:h-[400px]  ">
          <div className="flex flex-col h-full justify-between bg-[#e1f9ff] rounded-md overflow-hidden p-5">
            <h1 className=" text-[#444444] text-lg md:text-3xl font-bold mb-8">
              {tours?.data?.name}
            </h1>

            <div className=" grid grid-cols-7 mb-5">
              <div className="mb-3 col-start-1 col-span-7 md:col-span-3 flex flex-row items-center align-middle gap-3">
                <AiOutlineClockCircle
                  size={45}
                  color={"#828282"}
                  className="w-[30px] h-[30px]"
                />
                <div className=" flex-col align-middle items-center justify-center">
                  <h1 className=" text-[#828282] mb-1 font-sans">DURATION</h1>
                  <p className=" font-semibold">{tours?.data?.duration}</p>
                </div>
              </div>
              <div className=" col-start-1 md:col-start-4 col-span-7 md:col-span-4 lg:border lg:border-l-[#828282] border-b-0 border-t-0 border-r-0">
                <div className=" flex gap-3 align-middle items-center lg:px-5">
                  <span className="px-2 py-1 w-[30px] h-[32px] bg-green-500 text-white text-center border-green-500 rounded-md ">
                    {tours?.data?.rating}
                  </span>
                  <div className=" flex gap-2">
                    <div className=" flex flex-col">
                      <h1 className=" text-[#828282] mb-1 font-sans">
                        TRIP RATING
                      </h1>
                      <p className=" text-green-500 font-semibold">Excellent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" border border-r-0 border-l-0 border-t-[#828282]  border-b-[#828282] py-3 gap-2 flex justify-between align-bottom items-baseline">
              <p className=" text-[#828282] ">FROM</p>

              {tours?.data?.price && (
                <del className="text-red-500 ">US ${tours?.data?.price}</del>
              )}
              {tours?.data?.sale_price && (
                <p className=" text-xl text-[#828282] font-bold">
                  {" "}
                  US ${tours?.data?.sale_price}
                </p>
              )}
            </div>

            <div className=" mt-10 ">
              <Link
                href={{
                  pathname: "/book-form",
                  query: {
                    tourCode: tours?.data?.id,
                  },
                }}
                // as={`https://goldenyellowtravel.com/book-form?tourCode=${tours?.data?.id}`}
              >
                <button className=" w-full py-3 text-center bg-[#1c94ad] rounded-md text-white font-bold text-base hover:bg-[#68e6ff] transition-colors">
                  {" "}
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* tour photo */}
        <div className="w-full h-[190px] lg:w-[30%] lg:h-full">
          <Image
            src={tours?.data?.tour_photo ? tours?.data?.tour_photo : ""}
            width={600}
            height={600}
            alt="Tour Photo"
            className=" w-full h-full object-cover rounded-md overflow-hidden shadow-xl"
          />
        </div>

        {/* similar tours */}
        <div className="w-full p-5 lg:w-[30%] h-[100px] lg:min-h-[50%] lg:h-fit bg-[#ffefe5]">
          <span className="block">See next place &gt;</span>

          {similarTours?.data?.map((tour: any, index: number) => {
            if (!titleRendered && tour.id !== tours?.data?.id) {
              // Check if title hasn't been rendered and ID is not the same as current tour's ID
              titleRendered = true; // Set titleRendered to true to prevent rendering additional titles
              return (
                <p
                  key={index}
                  className="text-[#444444] text-lg md:text-2xl font-bold pt-7"
                >
                  {tour?.name}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* body */}
      <div className=" min-h-screen mt-[600px] md:mt-20">
        <div className=" px-[20px] md:px-[70px] lg:px-[130px] mb-10">
          {/* <div className="  grid grid-cols-1 lg:grid-cols-5 gap-10 red"> */}
          {/* <div className=""> */}
          <div className=" col-span-3 mt-5">
            {/* specifications */}
            <div className=" grid grid-cols-2 gap-3 ">
              <div className=" col-start-1 col-span-2 md:col-span-1">
                <div className=" flex items-center gap-5">
                  <FaMapMarkedAlt className={"text-orange-500"} size={30} />
                  <p className=" max-w-[200px] text-sm font-semibold">
                    <span>Location :</span>{" "}
                    <span className=" text-gray-600">
                      {tours?.data?.location}
                    </span>
                  </p>
                </div>
              </div>

              <div className=" col-start-1 md:col-start-2 col-span-2 md:col-span-1">
                <div className=" flex items-center gap-5">
                  <MdOutlineDateRange className={"text-orange-500"} size={30} />
                  <p className=" text-sm">
                    <span>Departure :</span>{" "}
                    <span className=" text-gray-600">
                      {tours?.data?.departure}
                    </span>
                  </p>
                </div>
              </div>

              <div className=" col-start-1">
                <div className=" flex items-center gap-5">
                  <HiUserGroup className={"text-orange-500"} size={30} />
                  <p className=" text-sm">
                    <span>Category :</span>{" "}
                    <span className=" text-gray-600">{tours?.data?.style}</span>
                  </p>
                </div>
              </div>
              <div className=" col-start-1 md:col-start-2 col-span-2 md:col-span-1">
                <div className=" flex items-center gap-5">
                  <FaMountain className={"text-orange-500"} size={30} />
                  <p className=" text-sm">
                    <span>Theme :</span>{" "}
                    <span className=" text-gray-600">{tours?.data?.theme}</span>
                  </p>
                </div>
              </div>

              <div className=" col-start-1 col-span-2 md:col-span-1">
                <div className=" flex items-center gap-5">
                  <AiOutlineCheck className={"text-orange-500"} size={30} />
                  <p className=" text-sm">
                    <span>Suitable :</span>{" "}
                    <span className=" text-gray-600">
                      {tours?.data?.for_whom}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" col-start-1 md:col-start-2 col-span-2 md:col-span-1">
                <div className=" flex items-center gap-5">
                  <BiCategory className={"text-orange-500"} size={30} />
                  <p className=" text-sm">
                    <span>Type :</span>{" "}
                    <span className=" text-gray-600">{tours?.data?.type}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-3 mt-5">
              <ItineraryNavLink
                NavLinks={NavLinks}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
              />
              {/* Conditionally render Overview or Reviews based on activeNav */}
              {activeNav === "Overview" && (
                <>
                  <div className=" mt-5">
                    <p className=" text-gray-700 text-lg break-words">
                      {tours?.data?.overview}
                    </p>
                  </div>

                  <div className="">
                    <div className="col-span-5 md:col-span-3 mt-5">
                      <div id="itinerary" className="h-fit mb-5">
                        <h1 className=" font-bold text-orange-500 text-xl">
                          Itinerary
                        </h1>

                        <RedixAccordion id={params.get("tourDetail")} />
                      </div>
                    </div>

                    <div className=" col-start-4 col-span-2"></div>
                  </div>

                  <h1 className=" font-bold text-xl">Inclusion</h1>

                  <div className=" flex items-start gap-5 mt-5">
                    <GiForkKnifeSpoon size={20} />
                    <div>
                      <h3 className=" font-bold text-lg">Meals</h3>
                      <div>{inclusions?.data?.data[0]?.meals}</div>
                    </div>
                  </div>

                  <div className=" flex items-start gap-5 mt-5">
                    <AiOutlineCar size={20} />
                    <div>
                      <h3 className=" font-bold text-lg">Transport</h3>
                      <p>{inclusions?.data?.data[0]?.transport}</p>
                    </div>
                  </div>

                  <div className=" flex items-center gap-5 mt-5">
                    <FaBed size={20} />
                    <div>
                      <h3 className=" font-bold text-lg">Accommodation</h3>
                      <p>{inclusions?.data?.data[0]?.accommodation}</p>
                    </div>
                  </div>

                  <div className=" flex items-center gap-5 mt-5">
                    <SiYourtraveldottv size={20} />
                    <div>
                      <h3 className=" font-bold text-lg">
                        Included activities
                      </h3>
                      <p>{inclusions?.data?.data[0]?.included_activities}</p>
                    </div>
                  </div>

                  <div className=" flex items-center gap-5 mt-5">
                    <CreateReview />
                  </div>
                </>
              )}
              {activeNav === "Reviews" && (
                <div className=" mt-5">
                  <Reviews />
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>

        <div className=" min-h-[400px] bg-gray-200">
          <div className=" px-[20px] md:px-[130px]">
            <h1 className=" text-2xl font-bold py-10">
              Similar {tours?.data?.country_name} Tours{" "}
            </h1>
          </div>
          {/* similar tours */}
          <div className=" px-[20px] md:px-[130px] flex flex-wrap gap-10 pb-5">
            {similarTours?.data?.map((tour: any, index: number) => {
              if (tour.id !== tours?.data?.id) {
                return (
                  <div
                    key={index}
                    className=" shadow bg-white rounded w-full md:w-full lg:w-[300px]"
                  >
                    <Link
                      href={{
                        pathname: "tour/tour-detail",
                        query: {
                          tourDetail: tour?.id,
                        },
                      }}
                      // as={`https://localhost:3000/tour/tour-detail?tourDetail=${tour?.id}`}
                      // as={`https://goldenyellowtravel.com/tour/tour-detail?tourDetail=${tour?.id}`}
                    >
                      <div className=" overflow-hidden">
                        <Image
                          src={`${tour?.tour_photo}`}
                          className=" w-full md:w-full lg:min-w-full max-h-[150px] md:max-h-[250px] hover:scale-[1.3] duration-75"
                          width={400}
                          height={200}
                          loading="lazy"
                          alt="card"
                        />
                      </div>
                      <div className=" px-5 mt-3">
                        <h1 className=" font-bold">
                          {tour?.name?.length > 25
                            ? tour?.name?.substring(0, 25) + "..."
                            : tour?.name}
                        </h1>

                        <div className=" flex items-center justify-between">
                          <div>{tour?.package_name}</div>
                          <div>
                            <div className=" flex justify-start align-middle items-center gap-1">
                              <span className=" px-2 py-1 bg-green-500 text-white border-green-500 rounded-md ">
                                {tour?.rating}
                              </span>
                              <p className=" text-green-500 font-semibold">
                                Excellent
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className=" flex items-center justify-start pb-5">
                          {tour?.sale_price && (
                            <p className=" text-sm text-slate-500 font-semibold">
                              ${" "}
                              {tour?.sale_price?.length > 5
                                ? tour?.sale_price?.substring(0, 5) + "..."
                                : tour?.sale_price}
                            </p>
                          )}
                          {tour?.price && (
                            <p className=" text-red-600 text-xl font-bold px-2">
                              ${" "}
                              {tour?.price?.length > 4
                                ? tour?.price?.substring(0, 4) + "..."
                                : tour?.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
