"use client";
import React from "react";

import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

import UserReviewCard from "./UserReviewCard";

const UserReviews = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await fetch("https://jsonplaceholder.typicode.com/users/1/posts").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="flex flex-col gap-y-6 mt-4 overflow-auto">
      {users?.map((user: any) => (
        <UserReviewCard user={user} />
      ))}
    </div>
  );
};

export default UserReviews;
