import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

export default function Recommendations() {
  const [tours, setTours] = React.useState([]);
  const [seasonIndex, setSeasonIndex] = React.useState(0);
  const seasons = ["summer", "winter", "rainy"];
  const season = seasons[seasonIndex];
  const [seasonChange, setSeasonChange] = React.useState(false);
  const [tourChange, setTourChange] = React.useState(false);

  const handleForwardArrowClick = () => {
    setSeasonIndex((prevIndex) => (prevIndex + 1) % seasons.length);
    setSeasonChange(true);
  };

  const handleReverseArrowClick = () => {
    setSeasonIndex((prevIndex) =>
      prevIndex === 0 ? seasons.length - 1 : prevIndex - 1
    );
    setSeasonChange(true);
  };

  const handleItemClick = (index: any) => {
    const clickedItem = tours[index];
    // Remove the clicked item from the array
    const updatedItems = tours.filter((_, i) => i !== index);
    // Unshift the clicked item back to the beginning of the array
    updatedItems.unshift(clickedItem);
    // Update the state with the modified array
    setTours(updatedItems);
    setTourChange(true);
    setSeasonChange(false);
  };

  const {
    data: Tours,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => getRequest(`tour/list?page=1&per_page=1000`),
  });
  // useEffect(() => {
  //   setTours(Tours?.data?.data);
  // }, [Tours]);
  useEffect(() => {
    const filteredTours = Tours?.data?.data.filter(
      (tour: { recommend: string }) => tour.recommend === season
    );
    setTours(filteredTours);
  }, [Tours, season]);

  // console.log("Recommendations >>> ", tours);
  // console.log("tours", Tours);
  // console.log("filteredTours", tours);
  // console.log("season", season);
  // console.log("tour.length", tours?.length);
  // console.log("seasonChange", seasonChange);
  // console.log("toruChange", tourChange);

  return (
    <div className="pt-[270px] md:pt-[200px] lg:pt-[120px] xl:pt-[100px] pb-10 md:pb-20 bg-[#f2f2f2]">
      <span className="block tracking-widest text-2xl md:text-3xl text-center font-bold">
        Recommendation Places
      </span>
      <div className="flex justify-center items-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
          className="block cursor-pointer"
          onClick={handleReverseArrowClick}
        >
          <path
            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
            fill="#9C9C9C"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="w-[300px] select-none mx-10 pt-4 md:py-7 block tracking-widest text-[50px] md:text-[60px] text-center capitalize font-bold text-[#ff7b00] ">
          {season}
        </span>
        <svg
          width="50"
          height="50"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
          className="block cursor-pointer"
          onClick={handleForwardArrowClick}
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="#9C9C9C"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      {/* card container */}
      <div className="flex w-full justify-center px-5 lg:px-[190px]">
        <div className="w-full md:w-[90%] h-full ">
          {tours?.map((tour: any, index: number) => {
            if (index === 0) {
              return (
                <Link
                  key={tour?.id}
                  href={{
                    pathname: "/tour/tour-detail",
                    query: {
                      tourDetail: tour?.id,
                    },
                  }}
                  // as={`https://localhost:3000/tour/tour-detail?tourDetail=${tour?.id}`}
                  // as={`https://goldenyellowtravel.com/tour/tour-detail?tourDetail=${tour?.id}`}
                >
                  <div
                    className={`w-full h-auto md:h-[600px] xl:h-[500px] 2xl:h-[650px] shadow-lg relative ${
                      seasonChange || tourChange ? "animate-fadeIn" : ""
                    }`}
                  >
                    <Image
                      width={900}
                      height={500}
                      src={`${tour?.tour_photo}`}
                      alt="hero-icon"
                      className="w-full h-full object-cover"
                    />
                    {/* text over picture */}
                    <div className="select-none p-3 md:p-8 relative md:absolute bottom-0 w-full h-1/2 4xl:h-[40%] bg-white bg-opacity-50 ">
                      <span className="text-xl md:text-2xl xl:text-3xl text-[#224466] font-bold block pb-5">
                        {tour?.name?.length > 54
                          ? tour?.name.substring(0, 45) + "..."
                          : tour?.name}
                      </span>
                      <span className="text-md md:text-xl xl:text-2xl block">
                        {tour?.overview?.length > 100
                          ? tour?.overview?.substring(0, 250) + "..."
                          : tour?.overview}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
          {/* inner */}

          {/* main picture */}

          {/* sub pictures */}
          <div
            className={`pt-5 md:pt-9 flex justify-between gap-3 md:gap-5 xl:gap-8 w-full h-[90px] md:h-[180px] lg:h-[180px] xl:h-[230px] 2xl:h-[250px] ${
              tours?.length >= 2 ? "block" : "hidden"
            }`}
          >
            {tours?.length >= 2 &&
              tours?.map((tour: any, index: number) => {
                if (index > 0 && index < 5) {
                  return (
                    <div
                      key={tour?.id}
                      onClick={() => handleItemClick(index)}
                      className={`w-[29.5%] md:w-[31.5%] lg:w-[30%] xl:w-1/3 h-full shadow-lg object-cover cursor-pointer ${
                        seasonChange ? "animate-slowFadeIn" : ""
                      }`}
                    >
                      <Image
                        width={900}
                        height={500}
                        src={`${tour?.tour_photo}`}
                        alt="hero-icon"
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
