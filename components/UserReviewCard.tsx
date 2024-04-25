"use client";

import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const UserReviewCard = ({ user }: { user: any }) => {
  // console.log(user);
  const { data: userData } = useQuery({
    queryKey: ["User", user?.id],
    queryFn: async () =>
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${user?.id}`
      ).then((res) => res.json()),
  });

  // console.log(userData);
  return (
    <div className="grid grid-flow-col items-start gap-4">
      <Image
        src={`${user?.id % 2 !== 0 ? "/sampleUser1.jpg" : "/sampleUser2.jpg"}`}
        alt="user avatar"
        width={200}
        height={200}
        className="object-cover w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full"
      />

      <div className="flex flex-col gap-[2px] justify-start items-start open-sans">
        <h1 className="text-[#224466] font-bold text-lg md:text-xl">
          {userData?.name}
        </h1>
        <p className="text-sm md:text-base font-normal text-[#706C6C]">
          6 months ago
        </p>
        <div className="flex items-center w-full gap-x-[2px]">
          <Image
            width={28}
            height={29}
            alt="full star"
            src="/fullStar.png"
            className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] object-cover"
          />
          <Image
            width={28}
            height={29}
            alt="full star"
            src="/fullStar.png"
            className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]  object-cover"
          />
          <Image
            width={28}
            height={29}
            alt="full star"
            src="/fullStar.png"
            className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]  object-cover"
          />
          <Image
            width={28}
            height={29}
            alt="full star"
            src="/fullStar.png"
            className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]  object-cover"
          />
          <Image
            width={12}
            height={24}
            alt="full star"
            src="/halfStar.png"
            className="w-[8px] md:w-[9px] md:h-full object-cover"
          />
        </div>
        <p className="text-base md:text-lg font-normal text-[#010E3B] leading-6 pr-6">
          {user.body}
        </p>
      </div>
    </div>
  );
};

export default UserReviewCard;
