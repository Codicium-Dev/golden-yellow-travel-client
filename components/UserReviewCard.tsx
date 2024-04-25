"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const UserReviewCard = ({ review }: { review: any }) => {
  return (
    <div>
      <h2 className="lg:text-xl text-md font-semibold">{review?.name}</h2>
      <div className="flex flex-row gap-x-1 text-yellow-400">
        {[...Array(review?.rating)].map((_, index) => (
          <FaStar key={index} className="w-6 h-6" />
        ))}
      </div>
      <p className="lg:text-md text-sm mt-2">{review?.review}</p>
    </div>
  );
};

export default UserReviewCard;
