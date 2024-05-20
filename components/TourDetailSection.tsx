"use client";

import {
  AiOutlineCar,
  AiOutlineCheck,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaBed, FaMapMarkedAlt, FaMountain } from "react-icons/fa";
import {
  addTour,
  removeTour,
  selectTours,
} from "@/services/redux/reducer/tourSlugSlice";
import { createSlug, createSlugObject } from "@/helper/slugify";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BiCategory } from "react-icons/bi";
import CreateReview from "@/components/CreateReview";
import { GiForkKnifeSpoon } from "react-icons/gi";
import HeroSection from "@/components/HeroSection";
import { HiUserGroup } from "react-icons/hi";
import Image from "next/image";
import ItineraryNavLink from "@/components/ItineraryNavLink";
import Link from "next/link";
import { LuActivity } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import RedixAccordion from "@/components/RedixAccordion";
import Reviews from "@/components/Reviews";
import { SiYourtraveldottv } from "react-icons/si";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

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

export default function TourDetailSection({ params }: any) {
  const router = useRouter();
  const pathname = usePathname();
  // const params = useSearchParams();
  const [activeNav, setActiveNav] = useState("Overview");

  const tourSlug = useSelector(selectTours);
  const dispatch = useDispatch();

  const tourId = tourSlug[params.slug.toString()];

  // const updateTourId = useCallback(() => {
  //   const updatedTourSlug = tourSlug;
  //   tourId = updatedTourSlug[params.slug];
  //   console.log("from callback", tourId);
  // }, [tourId, tourSlug, params.slug, router]);

  // useEffect(() => {
  //   updateTourId();
  // }, [updateTourId]);

  // useEffect(() => {
  //   const cleanup = () => {
  //     // Remove the tour object only if the user navigates away from the current page
  //     if (pathname !== `/tour/${params.slug}`) {
  //       dispatch(removeTour({ slug: params.slug }));
  //     }
  //   };

  //   // Cleanup function will execute when the component unmounts or when the slug changes
  //   return cleanup;
  // }, []);
  // useEffect(() => {
  //   if (tourId === "" || tourId === undefined) {
  //     tourSlug = useSelector(selectTours);
  //     tourId = tourSlug[params.slug];
  //   }
  // });

  const { data: tours, isLoading: tourLoading } = useQuery({
    queryKey: ["tour-detail", tourId],
    queryFn: () => getRequest(`tour/show/${tourId}`),
  });

  const { data: inclusions, isLoading: inclusionLoading } = useQuery({
    queryKey: ["inclusions", tourId],
    queryFn: () =>
      getRequest(`inclusion/list?columns=tour_id&search=${tourId}`),
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

  const { data: Itinerary } = useQuery({
    queryKey: ["itinerary", tourId],
    queryFn: () =>
      getRequest(
        `itinerary/list?page=1&per_page=100&columns=tour_id&search=${tourId}&order=created_at&sort=ASC`
      ),
  });

  let titleRendered = false; // Variable to track if title has been rendered

  // useEffect(() => {
  //   if (!tourId || tourId === undefined) {
  //     router.push("/");
  //   }
  // }, [tourId]);

  if (tourLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  // console.log("similarTours", similarTours);

  return (
    <>
      <HeroSection photo="/summer1.png" />
      {/* content over hero section */}
      <div className="absolute top-[150px] md:top-[200px] lg:top-[250px] h-fit md:h-[445px] w-full max-w-[1200px] left-1/2 -translate-x-1/2 lg:px-10 ">
        <div className="w-full h-full p-5 lg:p-0 flex flex-col lg:flex-row gap-5 ">
          {/* country name & cross */}
          <div className="relative w-full lg:w-[10%] lg:h-full lg:pb-0 flex justify-between lg:flex-col-reverse">
            <div className=" lg:-rotate-90 origin-center lg:-translate-x-[30px] lg:-translate-y-12">
              <span className=" uppercase leading-[30px] tracking-widest text-[#224466] text-[1.5rem] md:text-[32px] font-bold open-sans ">
                {tours?.data?.country_name}
              </span>
            </div>

            <Link
              href={"/"}
              className="w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] "
            >
              <Image
                src="/cross-icon.png"
                width={40}
                height={40}
                alt="Tour Photo"
                className="object-cover"
              />
            </Link>
          </div>

          {/* tour specifications */}
          <div className="w-full lg:w-[30%] h-fit lg:h-full">
            <div className="flex flex-col h-full justify-between bg-[#e1f9ff] rounded-md overflow-hidden p-5">
              <h1 className=" text-[#444444] text-lg md:text-3xl font-bold mb-8 lg:mb-4">
                {tours?.data?.name}
              </h1>

              <div className=" grid grid-cols-8 mb-5">
                <div className="mb-3 col-start-1 col-span-8 md:col-span-4 flex flex-row lg:flex-col lg:justify-center items-center align-middle gap-3 ">
                  <AiOutlineClockCircle
                    size={45}
                    color={"#"}
                    className="w-[30px] h-[30px] shrink-0"
                  />
                  <div className=" flex-col align-middle items-center justify-center ">
                    <h1 className=" text-[#828282] mb-1 font-sans">DURATION</h1>
                    <p className=" font-semibold lg:text-center">
                      {tours?.data?.duration}
                    </p>
                  </div>
                </div>

                <div className=" col-start-1 md:col-start-5 col-span-8 md:col-span-4 lg:border-l lg:border-l-[#828282] border-b-0 border-t-0 border-r-0">
                  <div className=" flex lg:flex-col lg:justify-center gap-3 align-middle items-center">
                    <span className="px-2 py-1 w-[30px] h-[30px] bg-green-500 text-white text-center border-green-500 rounded-md ">
                      {tours?.data?.rating}
                    </span>
                    <div className=" flex gap-2">
                      <div className=" flex flex-col">
                        <h1 className=" text-[#828282] mb-1 text-center font-sans">
                          TRIP RATING
                        </h1>
                        <p className=" text-green-500 font-semibold lg:text-center">
                          Excellent
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" border border-r-0 border-l-0 border-t-[#828282]  border-b-[#828282] py-3 gap-2 flex justify-between align-bottom items-baseline lg:mb-2 ">
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

              <div className=" ">
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
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* tour photo */}
          <div className="w-full h-[190px] md:h-[300px] lg:w-[30%] lg:h-full">
            <Image
              src={tours?.data?.tour_photo ? tours?.data?.tour_photo : ""}
              width={600}
              height={600}
              alt="Tour Photo"
              className=" w-full h-full object-cover rounded-md overflow-hidden shadow-xl "
            />
          </div>

          {/* similar tours */}
          <div className="p-5 pb-8 w-full flex flex-col justify-between lg:w-[30%] lg:min-h-[50%] lg:h-fit bg-[#ffefe5] rounded-md ">
            <span className="block text-sm md:text-base text-gray-600">
              See next place &gt;
            </span>

            {similarTours?.data?.map((tour: any, index: number) => {
              if (!titleRendered && tour.id !== tours?.data?.id) {
                const slug = createSlug(tour?.name);
                const tourObject = createSlugObject(slug, tour?.id);
                const dispatch = useDispatch();

                dispatch(addTour(tourObject));
                titleRendered = true; // Set titleRendered to true to prevent rendering additional titles
                return (
                  <Link
                    key={index}
                    className="text-[#444444] text-lg md:text-xl font-bold pt-7"
                    href={{
                      pathname: `/tour/tour-detail/${slug.toString()}`,
                    }}
                    // as={`localhost:3000/tour/tour-detail?tourDetail=${tour?.id}`}
                    // as={`https://goldenyellowtravel.com/tour/tour-detail?tourDetail=${tour?.id}`}
                  >
                    {tour?.name.length > 41
                      ? tour?.name.substring(0, 40) + "..."
                      : tour?.name}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* body */}
      <div className=" min-h-screen mt-[570px] md:mt-[340px] lg:mt-[30px]">
        <div className=" px-[20px] md:px-[40px] lg:px-[70px] mb-10">
          <div className=" col-span-3">
            {/* specifications */}
            <div className=" grid grid-cols-2 gap-3 ">
              <div className=" col-start-1 col-span-2 md:col-span-1">
                <div className=" flex items-start gap-5">
                  <BiCategory className={"text-[#1c94ad]"} size={30} />
                  <p className=" text-sm">
                    <span>Type :</span>{" "}
                    <span className=" text-gray-600">{tours?.data?.type}</span>
                  </p>
                </div>
              </div>

              <div className=" col-start-1 md:col-start-2 col-span-2 md:col-span-1">
                <div className=" flex items-start gap-5">
                  <HiUserGroup className={"text-[#1c94ad]"} size={30} />
                  <p className=" text-sm">
                    <span>Category :</span>
                    <span className=" text-gray-600">{tours?.data?.style}</span>
                  </p>
                </div>
              </div>

              <div className=" col-start-1">
                <div className=" flex items-start gap-5">
                  <AiOutlineCheck className={"text-[#1c94ad]"} size={30} />
                  <p className=" text-sm">
                    <span>Suitable :</span>{" "}
                    <span className=" text-gray-600">
                      {tours?.data?.for_whom}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" col-start-1 md:col-start-2 col-span-2 md:col-span-1">
                <div className=" flex items-start gap-5">
                  <FaMountain className={"text-[#1c94ad]"} size={30} />
                  <p className=" text-sm">
                    <span>Theme :</span>{" "}
                    <span className=" text-gray-600">{tours?.data?.theme}</span>
                  </p>
                </div>
              </div>

              <div className=" col-start-1 col-span-2 md:col-span-1">
                <div className=" flex items-start gap-5">
                  <FaMapMarkedAlt className={"text-[#1c94ad]"} size={30} />
                  <p className=" max-w-[200px] text-sm font-semibold">
                    <span>Location :</span>{" "}
                    <span className=" text-gray-600">
                      {tours?.data?.location}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" col-start-1 md:col-start-2 col-span-2 md:col-span-1">
                <div className=" flex items-start gap-5">
                  <MdOutlineDateRange className={"text-[#1c94ad]"} size={30} />
                  <p className=" text-sm">
                    <span>Departure :</span>{" "}
                    <span className=" text-gray-600">
                      {tours?.data?.departure}
                    </span>
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
              {activeNav === "Overview" && (
                <>
                  <p className=" text-gray-700 text-base md:text-lg break-words mt-3">
                    {tours?.data?.overview}
                  </p>

                  <div id="itinerary" className="h-fit mt-5 mb-3">
                    {Itinerary?.data?.data.length !== 0 && (
                      <>
                        <span className="font-bold text-[#1c94ad] text-xl">
                          Itinerary
                        </span>
                        <RedixAccordion Itinerary={Itinerary} />
                      </>
                    )}
                  </div>

                  <h1 className="mt-5 font-bold text-xl">Inclusion</h1>

                  <div className=" flex items-center gap-5 mt-3">
                    <GiForkKnifeSpoon
                      size={20}
                      color="#1c94ad"
                      className="w-[40px] block shrink-0 "
                    />
                    <div>
                      <h3 className=" font-bold text-lg">Meals</h3>
                      <div>{inclusions?.data?.data[0]?.meals}</div>
                    </div>
                  </div>

                  <div className=" flex items-center gap-5 mt-5">
                    <AiOutlineCar
                      size={25}
                      color="#1c94ad"
                      className="w-[40px] block shrink-0 "
                    />
                    <div>
                      <h3 className=" font-bold text-lg">Transport</h3>
                      <p>{inclusions?.data?.data[0]?.transport}</p>
                    </div>
                  </div>

                  <div className=" flex items-center gap-5 mt-5">
                    <FaBed
                      color="#1c94ad"
                      size={20}
                      className="w-[40px] block shrink-0 "
                    />
                    <div>
                      <h3 className=" font-bold text-lg">Accommodation</h3>
                      <p>{inclusions?.data?.data[0]?.accommodation}</p>
                    </div>
                  </div>

                  <div className=" flex items-center gap-5 mt-5">
                    <LuActivity
                      size={25}
                      color="#1c94ad"
                      className="w-[40px] block shrink-0 "
                    />
                    <div>
                      Included activities
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
        </div>

        {/* similar tours */}
        <div
          className={`min-h-[400px] bg-gray-200 ${
            similarTours?.data?.length > 1 ? "block" : "hidden"
          }`}
        >
          <div className=" px-[20px] lg:px-[70px]">
            <h1 className=" text-2xl md:text-center lg:text-start font-bold pt-10 pb-5">
              Similar {tours?.data?.country_name} Tours
            </h1>
          </div>

          <div className=" px-[20px] md:px-[100px] lg:px-[70px] flex flex-col md:flex-row flex-wrap lg:justify-center gap-5 md:gap-7 lg:gap-3 xl:gap-5 pb-5">
            {similarTours?.data?.map((tour: any, index: number) => {
              const slug = createSlug(tour?.name);
              const tourObject = createSlugObject(slug, tour?.id);
              const dispatch = useDispatch();

              dispatch(addTour(tourObject));
              if (tour.id !== tours?.data?.id) {
                return (
                  <div
                    key={index}
                    className=" shadow bg-white rounded w-full md:w-full lg:w-[32%]"
                  >
                    <Link
                      href={{
                        pathname: `/tour/tour-detail/${slug.toString()}`,
                      }}
                      // as={`https://localhost:3000/tour/tour-detail?tourDetail=${tour?.id}`}
                      // as={`https://goldenyellowtravel.com/tour/tour-detail?tourDetail=${tour?.id}`}
                    >
                      <div className=" overflow-hidden">
                        <Image
                          src={`${tour?.tour_photo}`}
                          className=" w-full md:w-full lg:min-w-full max-h-[150px] md:max-h-[250px] transition-all hover:scale-[1.1] duration-500"
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
                              {tour?.sale_price?.length > 5
                                ? tour?.sale_price?.substring(0, 5) + "..."
                                : tour?.sale_price}
                            </p>
                          )}
                          {tour?.price && (
                            <p className=" text-red-600 text-xl font-bold px-2">
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
