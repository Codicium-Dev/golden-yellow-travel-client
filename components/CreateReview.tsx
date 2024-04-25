import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState } from "react";

import { postRequest } from "@/services/api/apiService";
import { useMutation } from "@tanstack/react-query";

const CreateReview = ({ tourId }: { tourId: string | null }) => {
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
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setRating(0);
  //   setName("");
  //   setReview("");
  // };

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
      {createReviewMutation.isError && <p className="text-red-500">Error</p>}
      {createReviewMutation.isSuccess && (
        <p className="text-green-500">Success</p>
      )}
      <h1 className="text-xl font-bold">Create Review</h1>
      <p>Fill out the form below to create a review.</p>
      <form
        onSubmit={(e) => {
          if (rating > 0) {
            e.preventDefault();
            createReviewMutation.mutateAsync({
              tour_id: tourId,
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
            required
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-center cursor-pointer"
        >
          {createReviewMutation.isLoading ? (
            <span className="spinner-border spinner-border-sm"></span>
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
