import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <div
      className="flex md:flex-row flex-col items-center justify-center gap-4 md:gap-40 w-full md:h-[300px] bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${"/services_bg.png"})`,
      }}
    >
      <div className="money flex flex-col md:w-[250px] text-center tracking-wider items-center align-middle justify-center">
        <Image
          width={35}
          height={35}
          src={"/money.png"}
          alt="money back guaranteed"
          className="img"
        />
        <p className="open-sans text-xl leading-10">Money Back Guarantee</p>
      </div>

      <div className="money flex flex-col md:w-[250px] text-center tracking-wider items-center align-middle justify-center">
        <Image
          width={35}
          height={35}
          src={"/search.png"}
          alt="best price guaranteed"
          className="img"
        />
        <p className="open-sans text-xl leading-10">Best Price Guaranteed</p>
      </div>

      <div className="money flex flex-col md:w-[250px] text-center tracking-wider items-center align-middle justify-center">
        <Image
          width={35}
          height={35}
          src={"/correct.png"}
          alt="customizable by local experts"
          className="img"
        />
        <p className="open-sans text-xl leading-10">
          Customizable by Local Experts
        </p>
      </div>
    </div>
  );
};

export default Services;
