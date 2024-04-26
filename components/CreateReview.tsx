import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState } from "react";

import BadWordsFilter from "bad-words"; // Import bad-words library
import { PuffLoader } from "react-spinners";
import { postRequest } from "@/services/api/apiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const CreateReview = ({ refetchReviews }: { refetchReviews?: () => void }) => {
  const params = useSearchParams();
  const filter = new BadWordsFilter();

  const tour_id = params.get("tourDetail");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const createReviewMutation = useMutation({
    mutationFn: (data: {
      tour_id: string | null;
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

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">Create Review</h1>
      <p>Fill out the form below to create a review.</p>
      <form
        onSubmit={(e) => {
          if (rating === 0) {
            toast.error("Please Select a Rating");
            e.preventDefault();
            return;
          }

          if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
          }

          if (filter.isProfane(name) || filter.isProfane(review)) {
            toast.warning("Name or review contains inappropriate words");
            return;
          }

          if (rating > 0 || tour_id === null || !name.trim()) {
            e.preventDefault();
            createReviewMutation.mutateAsync({
              tour_id,
              name,
              review,
              rating: rating.toString(),
            });
          }
        }}
        className="flex flex-col gap-y-4"
      >
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
