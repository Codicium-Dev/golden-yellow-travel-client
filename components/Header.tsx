"use client";

import React, { useEffect, useRef, useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import ModalComponent from "./ModalComponent";
import { RootState } from "@/services/lib/store";
import SideNavComponent from "./SideNavComponent";
import { getRequest } from "@/services/api/apiService";
import { mobileToggle } from "@/services/redux/reducer/mobileSlice";
import { navigate } from "@/services/redux/reducer/navigateSlice";
import { packNav } from "@/services/redux/reducer/packageSlice";
import { setMainSearch } from "@/services/redux/reducer/mainSearchSlice";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const [active, setActive] = useState(false);
  const [activeCountry, setActiveCountry] = useState("");
  // const [countryId, setCountryId] = useState(0);
  // const [search, setSearch] = useState("");
  const pathname = usePathname();

  const router = useRouter();
  const ref = useRef<any>();

  const mobile = useSelector((state: RootState) => state.mobile.isOpen);
  const dispatch = useDispatch();

  // const {
  //   data: Cities,
  //   refetch: cityRefetch,
  //   isLoading: cityLoading,
  //   isError: cityIsError,
  //   error: cityError,
  // } = useQuery({
  //   queryKey: ["cities"],
  //   queryFn: () =>
  //     getRequest(
  //       `/city/list?columns=country_id&search=${countryId ? countryId : "333085282644933"
  //       }`
  //     ),
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  // });

  const {
    data: countries,
    isLoading: countryisLoaing,
    isError: countryIsError,
    error: countryError,
  } = useQuery({
    queryKey: ["country"],
    queryFn: () => getRequest("/country/list"),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleDes = () => {
    setActive(!active);
  };

  const handleNavLink = (e: any) => {
    dispatch(navigate(e));
  };

  const handlePackLink = (e: any) => {
    dispatch(packNav(e));
  };

  const handleModalActive = (e: any) => {
    setActiveCountry(e);
  };

  const handleSearch = (e: any) => {
    // e.preventDefault();
    if (e.charCode == 13) {
      dispatch(setMainSearch(e.target.value));
      router.push("/search");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [active]);

  // useEffect(() => {
  //   cityRefetch();
  // }, [activeCountry]);

  // console.log("Current route path:", pathname);

  // Change Background Color of Navbar
  const [bgColor, setBgColor] = useState("bg-[#010e3b]");
  console.log("path name > ", pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setBgColor("bg-[#010e3b]");
      } else {
        setBgColor("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed flex top-0 z-50 w-full transition-all duration-700 bg-opacity-90 ${
          [
            "/search",
            "/custom-search",
            "/inquery-form",
            "/news/news-detail",
            "/term-conditions",
            "/privacy-statement",
          ].includes(pathname)
            ? "bg-[#010e3b]"
            : bgColor
        } `}
      >
        <div className="w-full px-[20px] lg:px-[70px] relative flex justify-between items-center h-[70px] md:h-[100px] ">
          <Link href={"/"}>
            <div className="flex justify-start align-middle items-center gap-3 md:gap-4 lg:gap-5">
              <Image
                src={Logo}
                width={60}
                height={60}
                id="GY_icon"
                className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[65px] xl:h-[65px] "
                alt="Picture of Golden Yellow Travel"
              />
              <span className="hidden xl:block text-white text-base md:text-2xl lg:text-2xl font-bold tracking-widest monda">
                Golden Yellow Travel
              </span>
            </div>
          </Link>

          {/* nav items */}
          <div className=" hidden lg:flex items-center justify-between gap-10 ">
            <div className="min-w-[260px] relative">
              <ul className=" flex items-center justify-end gap-10 relative ">
                <li
                  className="text-white font-bold tracking-widest cursor-pointer select-none open-sans"
                  onClick={handleDes}
                >
                  Destinations
                </li>
                <div
                  ref={ref}
                  className={
                    active
                      ? "min-w-[170px] sub-menu-des open text-center "
                      : "sub-menu-des"
                  }
                >
                  {/* <div className=" flex items-center"> */}
                  <div className="">
                    <ul className=" flex flex-col bg-stone-100 min-h-fit shadow-md rounded-sm overflow-hidden">
                      {countries?.data?.data?.map((country: any) => {
                        const isActive = activeCountry === country.name; // Assuming activeCountry is the state holding the active country name

                        return (
                          <Link
                            key={country.id}
                            href={{
                              pathname: "/country",
                              query: {
                                countryName: country?.name,
                              },
                            }}
                            // as={`https://goldenyellowtravel.com/country?countryName=${country?.name}`}
                          >
                            <li
                              key={country?.id}
                              // onClick={() => {
                              //   handleModalActive(country?.name),
                              //     setCountryId(country?.id);
                              // }}
                              className={`min-w-[150px] px-5 py-2 ${
                                country?.name
                              } cursor-pointer ${
                                isActive ? "modalActive" : ""
                              }`}
                            >
                              {country?.name}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>

                  {/* <div className=" min-w-[400px] min-h-[240px]">
                      <h1 className=" text-gray-800 text-lg xl:px-[100px] xl:py-0  font-semibold my-3">
                        {activeCountry} City Tour
                      </h1>
                      <div className=" text-[#f97316] xl:px-10 xl:font-bold grid grid-cols-3 gap-3">
                        {Cities?.data?.data?.map((city: any) => {
                          return (
                            <div key={city?.id} className=" text-sm rounded-full px-3 py-2 shadow flex items-center justify-center">
                              <Link
                                href={{
                                  pathname: "/tour",
                                  query: {
                                    navTag: city?.name,
                                  },
                                }}
                                onClick={() => {
                                  handleNavLink(city?.id), handleDes();
                                }}
                              >
                                {city?.name?.length > 5 ? `${city?.name?.substring(0,8)}...` : city?.name}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div> */}
                </div>

                <li className="text-white font-bold tracking-widest cursor-pointer open-sans">
                  <Link
                    href={"/about-us"}
                    // as={`https://goldenyellowtravel.com/about-us.html`}
                  >
                    About Us
                  </Link>
                </li>

                <li className="text-white font-bold tracking-widest cursor-pointer open-sans">
                  <Link
                    href={"/news"}
                    // as={`https://goldenyellowtravel.com/news.html`}
                  >
                    News
                  </Link>
                </li>
              </ul>
            </div>

            {/* search box */}
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-md sr-only text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="default-search"
                className="block lg:w-[200px] h-[34px] pl-[10px] rounded-sm border-white bg-transparent focus:ring-white focus:border-white outline-none
                text-sm border text-white placeholder-white open-sans"
                placeholder="Search..."
                required
                onKeyPress={(e) => handleSearch(e)}
              />
              {/* lens icon */}
              <div className="absolute inset-y-0 right-[10px] flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>

            <Link
              href={"/inquery-form"}
              // as={`https://goldenyellowtravel.com/inquery-form`}
              className="border border-white rounded-sm overflow-hidden"
            >
              <button className="py-[2px] bg-[#010e3b] text-stone-100 shadow px-3 h-[30px] w-fit text-base font-bold text-center open-sans">
                Inquery Now
              </button>
            </Link>
          </div>

          {/* mobile button fixed top-[17px] right-[20px] lg:hidden */}
          <div className="lg:hidden border border-white rounded-sm">
            <button
              onClick={() => dispatch(mobileToggle())}
              className=" lg:hidden p-2 bg-[#010e3b] shadow-sm rounded-sm"
            >
              {mobile ? (
                <RxCross1 size={20} color="white" />
              ) : (
                <RxHamburgerMenu size={20} color="white" />
              )}
            </button>
          </div>
        </div>

        {/* side nav */}
        <SideNavComponent />
      </div>
    </>
  );
};

export default Header;
