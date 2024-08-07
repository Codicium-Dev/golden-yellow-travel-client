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
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("");
  // const [countryId, setCountryId] = useState(0);
  // const [search, setSearch] = useState("");
  const pathname = usePathname();

  const router = useRouter();
  const ref = useRef<any>();

  const mobile = useSelector((state: RootState) => state.mobile.isOpen);
  const dispatch = useDispatch();

  const {
    data: countries,
    isLoading: countryisLoaing,
    isError: countryIsError,
    error: countryError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getRequest("/country/list"),
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
    e.preventDefault();
    dispatch(setMainSearch(search));
    router.push("/search");
    setSearch("");
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
  // console.log("path name > ", pathname);

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
            "/inquire",
            "/news/news-detail",
            "/term-conditions",
            "/privacy-statement",
            "/sign-in",
            "/sign-up",
            "/book",
            "/contact-us",
          ].some((route) => pathname.startsWith(route))
            ? "bg-[#010e3b]"
            : bgColor
        } `}
      >
        <div className="w-full px-[20px] lg:px-[70px] relative flex justify-between items-center h-[70px] md:h-[100px] ">
          <Link href={"/"}>
            <div className="flex justify-start align-middle items-center gap-3 md:gap-4 lg:gap-5">
              <Image
                src={Logo}
                width={100}
                height={100}
                id="GY_icon"
                className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] xl:w-[90px] xl:h-[90px] "
                alt="Picture of Golden Asia Expedition"
              />
              <span className="hidden xl:block text-gray-100 text-base md:text-2xl lg:text-2xl font-bold tracking-widest monda">
                Golden Asia Expedition
              </span>
            </div>
          </Link>

          {/* nav items */}
          <div className=" hidden lg:flex items-center justify-between gap-10 ">
            <div className="min-w-[260px] relative">
              <ul className=" flex items-center justify-end gap-10 relative ">
                <li
                  className="text-gray-100 font-bold tracking-widest cursor-pointer select-none open-sans"
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
                    <ul className=" flex flex-col bg-gray-100 min-h-fit shadow-md rounded-sm overflow-hidden">
                      {countries?.data?.data?.map((country: any) => {
                        const isActive = activeCountry === country.name; // Assuming activeCountry is the state holding the active country name

                        return (
                          <Link
                            key={country.id}
                            href={{
                              pathname: `/country/${country?.name.toLowerCase()}`,
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
                </div>

                <li className="text-gray-100 font-bold tracking-widest cursor-pointer open-sans">
                  <Link
                    href={"/about-us"}
                    // as={`https://goldenyellowtravel.com/about-us.html`}
                  >
                    About Us
                  </Link>
                </li>

                <li className="text-gray-100 font-bold tracking-widest cursor-pointer open-sans">
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
            <form onSubmit={(e) => handleSearch(e)}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-md sr-only text-gray-100"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="default-search"
                  value={search}
                  className="block lg:w-[220px] h-[34px] pl-[10px] rounded-sm border-white bg-[#f1f2f3] bg-opacity-65 focus:ring-white focus:border-white outline-none text-sm border placeholder-gray-700 open-sans"
                  placeholder="Search tour here..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* lens icon */}
                <div className="absolute inset-y-0 right-[10px] flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-100"
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
            </form>

            <Link
              href={"/inquire"}
              className="border border-white rounded-sm overflow-hidden"
            >
              <button className="py-[2px] bg-[#010e3b] text-gray-100 shadow px-3 h-[30px] w-fit text-base font-bold text-center open-sans">
                Inquiry
              </button>
            </Link>
          </div>

          {/* mobile button fixed top-[17px] right-[20px] lg:hidden */}
          <div className="lg:hidden border border-white rounded-sm">
            <button
              onClick={() => dispatch(mobileToggle())}
              className=" lg:hidden p-2 bg-[#010e3b] shadow-sm rounded-sm cursor-pointer"
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
