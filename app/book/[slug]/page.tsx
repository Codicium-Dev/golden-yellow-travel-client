import BookingSection from "@/components/BookingSection";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  console.log("params.slug >> ", params.slug);
  return (
    <div className="w-full">
      <BookingSection params={params} />
    </div>
  );
}

export default page;
