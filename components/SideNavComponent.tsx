"use client";

import React, { useEffect, useState } from "react";
import {
  mobileIsClose,
  mobileIsOpen,
} from "@/services/redux/reducer/mobileSlice";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import type { RootState } from "@/services/lib/store";
import { getRequest } from "@/services/api/apiService";
import { setMainSearch } from "@/services/redux/reducer/mainSearchSlice";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const SideNavComponent = () => {
  const [dropC, setDropC] = useState(false);
  const [dropCity, setDropCity] = useState(false);
  const [activeCity, setActiveCity] = useState("");
  const [selectCountry, setSelectCountry] = useState(null);
  const [activeCountry, setActiveCountry] = useState("");
  const [prevId, setPrevId] = useState("");
  const mobile = useSelector((state: RootState) => state.mobile.isOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: countries } = useQuery({
    queryKey: ["dropCounty"],
    queryFn: () => getRequest("/country/list"),
  });
  const { data: cities, refetch } = useQuery({
    queryKey: ["cities", selectCountry],
    queryFn: () =>
      getRequest(
        `/city/list?columns=country_id&search=${
          selectCountry !== null ? selectCountry : ""
        }`
      ),
  });

  // console.log(cities);

  const handleSearch = (e: any) => {
    console.log(e.target.value);

    // e.preventDefault();
    if (e.charCode == 13) {
      dispatch(setMainSearch(e.target.value));
      router.push("/search");
      dispatch(mobileIsClose());
    }
  };
  // console.log(cities);
  useEffect(() => {
    if (selectCountry !== null) {
      refetch();
    }
  }, [selectCountry]);
  return (
    <>
      {mobile && (
        <div
          className={` ${
            mobile
              ? " animate-[sideNavIn_.3s_linear]"
              : " animate-[sideNavOut_.3s_linear]"
          } 
                w-[77%] md:w-1/2 h-screen fixed top-0 left-0 z-50 bg-stone-100 shadow-md px-3 py-5`}
        >
          <div className=" font-bold text-[#010e3b] md:text-lg">
            Golden Yellow Travel
          </div>

          {/* <form> */}
          <div className="py-5 w-full">
            {/* search input */}
            <label
              htmlFor="default-search"
              className="mb-2 text-xs font-medium  text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="default-search"
                className="block w-full h-[40px] pl-5 text-xs border border-gray-200 text-black rounded-sm bg-stone-200 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 outline-none"
                placeholder="Search..."
                required
                onKeyPress={(e) => handleSearch(e)}
              />
            </div>
            {/* <div className="absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400"
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
              </div> */}

            <div className="mt-5 bg-stone-200 rounded-md overflow-hidden">
              <div
                id="dropdownDelayButton"
                onClick={() => setDropC(!dropC)}
                data-dropdown-toggle="dropdown"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className="text-black w-full focus:ring-4 focus:outline-none focus:ring-[#f97316] shadow font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center align-middle justify-between "
                // type="button"
              >
                <div>Destinations</div>

                <svg
                  className="w-3 h-3 text-stone-700 "
                  aria-hidden="true"
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                  style={{ lineHeight: "20px" }}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>

              <div
                id="dropdown"
                className={`${
                  dropC
                    ? "z-10  divide-y divide-gray-100 rounded-sm w-full max-h-[300px] overflow-y-scroll "
                    : "hidden"
                }`}
              >
                <ul
                  className="p-2 text-sm h-fit"
                  aria-labelledby="dropdownDelayButton"
                >
                  {countries?.data?.data?.map((country: any) => {
                    const isCountryActive = activeCountry === country?.id;

                    return (
                      <li
                        key={country?.id}
                        onClick={() => {
                          setSelectCountry(country?.id),
                            isCountryActive
                              ? setDropCity(!dropCity)
                              : setDropCity(true),
                            setActiveCountry(country?.id);
                        }}
                      >
                        <div className="block hover:bg-stone-100 dark:hover:text-white">
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
                            <div
                              id="dropdownDelayButton"
                              data-dropdown-toggle="dropdown"
                              data-dropdown-delay="500"
                              data-dropdown-trigger="hover"
                              className="w-full text-black focus:ring-4 focus:outline-none focus:ring-[#f97316] font-medium rounded-md text-sm inline-flex justify-center items-center hover:border-2 border-orange-500 py-2"
                              // type="button"
                            >
                              {country?.name}
                            </div>
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      )}
    </>
  );
};
export default SideNavComponent;
