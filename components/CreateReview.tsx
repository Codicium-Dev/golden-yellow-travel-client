import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState } from "react";
import { SignIn, SignOutButton, useAuth, useSession } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

import BadWordsFilter from "bad-words"; // Import bad-words library
import { PuffLoader } from "react-spinners";
import { postRequest } from "@/services/api/apiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const CreateReview = ({
  refetchReviews,
  tourId,
}: {
  refetchReviews?: () => void;
  tourId: string;
}) => {
  const { userId } = useAuth();
  const session = useSession();

  console.log("userId", userId);
  console.log("session", session);

  const router = useRouter();
  console.log(userId);
  const params = useSearchParams();
  const filter = new BadWordsFilter(); // Create an instance of bad-words filter

  filter.addWords(
    "lee",
    "chee",
    "nga",
    "loe",
    "sapat",
    "spat",
    "လီး",
    "လိုး",
    "စက်",
    "ပတ်",
    "စပ",
    "ခွေး",
    "စပတ်",
    "စပက်",
    "စောက်",
    "သောက်"
  );

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const createReviewMutation = useMutation({
    mutationFn: (data: {
      tour_id: string | null;
      user_id: string | null;
      name: string;
      review: string;
      rating: string;
    }) => postRequest("/review/create", data),
    onSuccess: () => {
      setRating(0);
      setName("");
      setReview("");
      if (refetchReviews !== undefined) {
        refetchReviews(); // Refetch reviews after successful mutation
      }
      toast.success("Review Created Successfully");
    },
    onError: () => {
      toast.error("Failed to Create Review. Please try again later.");
    },
  });

  const handleRatingChange = (value: number) => {
    // Toggle the rating if the clicked star is already filled
    if (rating === value) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !session || !session.session) {
      router.push(
        "/sign-in?redirect_url=http://localhost:3000/tour/tour-detail?tourDetail=" +
          tourId
      );
      return;
    }

    if (session?.session?.expireAt < new Date()) {
      toast.error("Your session has expired. Please sign in again.");
      router.push(
        "/sign-in?redirect_url=http://localhost:3000/tour/tour-detail?tourDetail=" +
          tourId
      );
      return;
    }

    if (rating === 0) {
      toast.error("Please Select a Rating");
      return;
    }

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (filter.isProfane(name.trim()) || filter.isProfane(review.trim())) {
      // Check if name or review contains profanity
      toast.warning("Name or review contains inappropriate words");
      return;
    }

    if (rating > 0 && tourId !== null && userId !== null) {
      createReviewMutation.mutateAsync({
        tour_id: tourId,
        user_id: userId,
        name,
        review,
        rating: rating.toString(),
      });
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-y-3">
      <h1 className="text-xl font-bold">Create Review</h1>
      <span className="text-gray-600">
        Fill out the form below to create a review.
      </span>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="review" className="font-semibold">
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex gap-x-2 items-center">
          <label htmlFor="rating" className="font-semibold">
            Rating
          </label>
          {[...Array(5)].map((_, index) => (
            <StarButton
              key={index}
              filled={index < rating}
              onClick={() => handleRatingChange(index + 1)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 flex justify-center items-center text-center cursor-pointer"
        >
          {createReviewMutation.isLoading ? (
            <PuffLoader
              color={"#010E3B"}
              size={25}
              aria-label="Loading Spinner"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

const StarButton = ({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`focus:outline-none cursor-pointer hover:text-yellow-400 ${
        filled ? "text-yellow-400" : "text-gray-300"
      }`}
    >
      {filled ? (
        <FaStar className="w-6 h-6" />
      ) : (
        <FaRegStar className="w-6 h-6" />
      )}
    </button>
  );
};

export default CreateReview;
