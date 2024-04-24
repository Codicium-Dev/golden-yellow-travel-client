import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

export default function Recommendations() {
  const [tours, setTours] = React.useState([]);

  const handleItemClick = (index: any) => {
    const clickedItem = tours[index];
    // Remove the clicked item from the array
    const updatedItems = tours.filter((_, i) => i !== index);
    // Unshift the clicked item back to the beginning of the array
    updatedItems.unshift(clickedItem);
    // Update the state with the modified array
    setTours(updatedItems);
  };

  const {
    data: Tours,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => getRequest(`tour/list?page=1&per_page=4`),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    setTours(Tours?.data?.data);
  }, [Tours]);
  console.log(">>> ", tours);

  return (
    <div className="pt-[270px] md:pt-[200px] lg:pt-[120px] xl:pt-[100px] pb-10 md:pb-20 bg-[#f2f2f2]">
      <span className="block tracking-widest text-2xl md:text-3xl text-center font-bold">
        Recommendation Places
      </span>
      <span className="pt-4 md:pt-7 pb-5 block tracking-widest text-[50px] md:text-[60px] text-center font-bold text-[#ff7b00] ">
        Summer
      </span>

      {/* card container */}
      <div className="flex w-full justify-center px-5 lg:px-[190px] ">
        <div className="w-full md:w-[90%] h-full ">
          {tours?.map((tour: any, index: number) => {
            if (index === 0) {
              return (
                <Link
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
                    key={tour?.id}
                    className="w-full h-auto md:h-[600px] xl:h-[500px] 2xl:h-[650px] shadow-lg relative"
                  >
                    <Image
                      width={900}
                      height={500}
                      src={`${tour?.tour_photo}`}
                      alt="hero-icon"
                      className="w-full h-full object-cover"
                    />
                    {/* text over picture */}
                    <div className="p-3 md:p-8 relative md:absolute bottom-0 w-full h-1/2 4xl:h-[40%] bg-white bg-opacity-50 ">
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
          <div className="pt-5 md:pt-9 flex justify-between gap-3 md:gap-5 xl:gap-8 w-full h-[90px] md:h-[180px] lg:h-[180px] xl:h-[230px] 2xl:h-[250px] ">
            {tours?.map((tour: any, index: number) => {
              if (index > 0) {
                return (
                  <div
                    key={tour?.id}
                    onClick={() => handleItemClick(index)}
                    className="w-[29.5%] md:w-[31.5%] lg:w-[30%] xl:w-1/3 h-full shadow-lg object-cover cursor-pointer"
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
