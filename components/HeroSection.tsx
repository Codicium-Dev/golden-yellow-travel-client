import Image from "next/image";
import React from "react";

interface Value {
  photo: string;
  overlayTitle?: string;
  title?: string | null;
  subTitle?: string;
}

export default function HeroSection({
  photo,
  overlayTitle = "East Asia",
  title,
  subTitle,
}: Value) {
  return (
    <div>
      <Image
        priority
        src={photo}
        alt="hero"
        width={2000}
        height={2000}
        className="w-full h-[380px] md:h-[700px] object-cover"
      />
      <div className="absolute top-[40%] left-1/2 -translate-x-[50%] w-full open-sans text-white text-center font-bold">
        <div className="relative w-full">
          <span
            className={`w-full absolute -top-[90px] xl:-top-[80px] left-1/2 -translate-x-1/2 tracking-widest text-center opacity-30 leading-tight xl:leading-normal ${
              overlayTitle
                ? "text-[80px] xl:text-[150px]"
                : "text-[80px] xl:text-[170px]"
            }`}
          >
            {overlayTitle}
          </span>
          <span
            className={`w-full absolute left-1/2 -translate-x-1/2 text-[32px] xl:text-[60px] tracking-widest text-center font-extrabold ${
              subTitle ? "-top-[20px]" : "top-0"
            }`}
          >
            {title}
          </span>
          {subTitle && (
            <span className="w-full absolute top-[60px] left-1/2 -translate-x-1/2 text-[23px] xl:text-[35px] tracking-wider text-center ">
              {subTitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
