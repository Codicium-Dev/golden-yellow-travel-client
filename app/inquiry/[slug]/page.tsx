import InquirySection from "@/components/InquirySection";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  console.log("params.slug >> ", params.slug);
  return (
    <div className="">
      <InquirySection params={params} />
    </div>
  );
}

export default page;
