import HeroSection from "@/components/HeroSection";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us",
  };
}

const page = () => {
  return (
    <>
      <HeroSection photo="/aboutus.jpg" />
      <div className="min-h-screen px-[20px] md:px-[70px] my-10 md:my-20 md:text-2xl text-lg open-sans">
        <div className="mb-5">
          <div>
            <p className=" mb-2">
              Established in 2010, Golden Asia Expedition is one of the leading
              travel companies in Indochina. We provide tours, hotel booking,
              flight booking and other travel services in Thailand & Vietnam
              with the <strong>Golden Asia Expedition Guarantee</strong>.
            </p>

            <p className=" mb-2">
              We selectively cooperate with trusted partners including
              hoteliers, cruise lines and local suppliers to provide a perfect
              trip in Indochina for travelers at the lowest cost.
            </p>

            <p className=" mb-2">
              Through Bestpricevn.com, we are committed to offer our customers{" "}
              <strong>reliable services</strong> and <strong>true value</strong>{" "}
              at the <strong>Golden Asia Expedition</strong>.
            </p>
          </div>
          <img
            // src="https://d13jio720g7qcs.cloudfront.net/assets/img/about_us/bestprice-team-2022.jpg"
            src="https://guide.en-vols.com/wp-content/uploads/aftg/2022/02/metaIDnameCITY-BKK-1.jpg"
            alt=""
            className=" w-full h-[60vh] "
          />
        </div>

        <div>
          <h1 className=" text-xl font-bold font-sans mb-2">Our Vision</h1>

          <p className=" mb-2">
            Our vision is to be a leading travel company in Asia which connects
            all local service providers in order to supply travelers with high
            quality and full-service touristic packages at Golden Asia
            Expedition, and benefiting all people around us:
          </p>

          <div className=" mb-5">
            <ul className=" ms-8 mb-2">
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Customers
                </h1>
                <p className=" mb-2">
                  We aim to keep on offering best travel services for our
                  clients in order to provide them unique unforgettable
                  experiences at the Golden Asia Expedition.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Employees
                </h1>
                <p className=" mb-2">
                  We want our employees to develop their potential fully and
                  freely. That is why Golden Asia Expedition provide a
                  comfortable and inspiring working environment.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Partners
                </h1>
                <p className=" mb-2">
                  Developing a networking in order to promote synergies, which
                  create common and true value.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Society
                </h1>
                <p className=" mb-2">
                  We create true value for our customers means create true value
                  for our society. By providing quality travel services, we
                  contribute to get a better world, since we help to build
                  bridges between countries and people.
                </p>
              </li>
            </ul>

            <p>
              Provides a cost-effective commission based model, a network of
              most leading travel companies in Vietnam. Joining with us, we can
              help you grow your revenue and promote your brand.
            </p>
          </div>
        </div>

        <div>
          <h1 className=" text-xl font-bold font-sans mb-2">Our Core Values</h1>

          <p className=" mb-2">
            The core values of Golden Asia Expedition, as a benchmark company in
            the touristic industry, are focused on offering very high
            added-value services to our clients guaranteeing the Golden Asia
            Expedition and quality. In this way, our customers will be totally
            satisfied by choosing our services. In order to match the
            expectations of the travelers, even exceed them, we are based on the
            following core values:
          </p>

          <div className=" mb-5">
            <ul className=" ms-8 mb-2">
              <li className=" list-item list-disc">
                <h1 className=" text-lg text-red-700 font-sans mb-2">
                  Golden Asia Expedition guaranteed
                </h1>
                <p className=" mb-2">
                  As our name states, the first commitment we have with our
                  clients is saving your money by offering a wide range of
                  packages, from standard to luxury, all of them at the best
                  price. Besides saving your money, we will save your time as
                  well, because you will not need to waste it looking for the
                  best price; since Golden Asia Expedition provides it for you.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg text-red-700 font-sans mb-2">
                  Quality guaranteed
                </h1>
                <p className=" mb-2">
                  Golden Asia Expedition is synonym of quality, because both,
                  our personnel and our partners, we strive to provide you high
                  quality services. We take very seriously the election of our
                  partners, since they will convert you trip in an unforgettable
                  experience. That is why,{" "}
                  <strong>we cooperate with the best companies</strong>,
                  including, hoteliers, cruisers and local suppliers in order to
                  guarantee high quality at the Golden Asia Expedition.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg text-red-700 font-sans mb-2">
                  Reliable service - True value
                </h1>
                <p className=" mb-2">
                  One of our main goals, is supplying our customers a better or
                  equal experience than they expect, in other words, we want our
                  clients to be fully satisfied. Golden Asia Expedition ensures,
                  by the selection of the best partners, that the services we
                  offer, provide you{" "}
                  <strong>TRUE VALUE, AT THE Golden Asia Expedition</strong>,
                  and being fully <strong>RELIABLE</strong> at the same time.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg text-red-700 font-sans mb-2">
                  24/7 on spot support
                </h1>
                <p className=" mb-2">
                  Please remember, we will available for you during your whole
                  trip (24 hours per day, 7 days per week), so you will not need
                  being worried of the details of the trip: we will take care
                  quickly and effectively. For anything you need, do not
                  hesitate to contact our personnel: we will assist you as
                  thoroughly as you require.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg text-red-700 font-sans mb-2">
                  Enthusiastic, professional Consultant
                </h1>
                <p className=" mb-2">
                  If you demand a tailored assistance, do not hesitate to
                  contact our English speaking personnel. In the case that you
                  are looking for the perfect holidays that best matches your
                  wishes, our staff will be delighted of advising and helping
                  you, in order to provide you an unforgettable and complete
                  experience.
                </p>
              </li>
            </ul>

            <p>
              You can trust us for booking your holidays in Indochina; we are
              backed for the positive reviews of the people who have already
              traveled with us in addition to Certificate of Excellence by
              Tripadvisor and our PATA (Pacific Asia Travel Association)
              membership.
            </p>
          </div>
        </div>

        <div>
          <h1 className=" text-xl font-bold font-sans mb-2">Our Services</h1>

          <div className=" mb-5">
            <ul className=" ms-8 mb-2">
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Tour Packages
                </h1>
                <div className=" mb-3">
                  <h1 className=" text-sm font-light font-sans">
                    Tailor-made Tours
                  </h1>
                  <p className=" mb-2">
                    We provide tailor-made tours in Indochina for both
                    individual and group with a wide range of tours, including
                    gastronomic and well-being tours, beach stays and home stays
                    width local people.
                  </p>
                </div>

                <div className="">
                  <h1 className=" text-sm font-light font-sans">
                    Small Group Tours
                  </h1>
                  <p className=" mb-2">
                    Based on a minimum of 2 people with full board
                    accommodation. The number of participants of our
                    seat-in-coach tours are limited in order to guarantee the
                    excellence in quality of services.
                  </p>
                </div>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Hotel Bookings
                </h1>
                <p className=" mb-2">
                  Offer various hotels in Vietnam, Lao, Cambodia, Thailand and
                  South-East Asia for online booking.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Cruise Packages
                </h1>
                <p className=" mb-2">
                  Offer various cruise packages from short cruises in Halong Bay
                  to cross country cruises in Mekong river of Vietnam, Lao,
                  Cambodia, Thailand and South-East Asia.
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Flight Reservations
                </h1>
                <p className=" mb-2">
                  Offer instant{" "}
                  <span className=" text-orange-500">
                    online reservation and payment
                  </span>{" "}
                  for flight tickets from domestic arline (Vietnam Airlines,
                  Jetstar Pacific, Vietjet Air) and international airlines
                  Vietnam (Thai Airways, Air Asia, Singapore Airline, Qatar
                  Airways American Airlines, Emirates...).
                </p>
              </li>
              <li className=" list-item list-disc">
                <h1 className=" text-lg font-semibold font-sans mb-2">
                  Visa, train tickets, transfer services
                </h1>
                <p className=" mb-2">
                  Offer various travel services quickly and reliably, BestPrice
                  commits to support our customers in every moment.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* <div>
        <h1 className=" text-xl font-bold font-sans mb-2">Achievements</h1>

        <div className=" flex justify-start mb-5">
          <div className=" w-[350px] flex justify-center flex-wrap">
            <img
              src="https://d13jio720g7qcs.cloudfront.net/assets/img/about_us/trip_about_us.jpg"
              className=" w-[240px] h-[163px] mb-2"
              alt=""
            />
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g293924-d4869921-Reviews-BestPrice_Travel-Hanoi.html"
              className=" text-center"
            >
              Certificate of Excellence by Tripadvisor
            </a>
          </div>

          <div className=" w-[350px] flex justify-center flex-wrap">
            <img
              src="https://d13jio720g7qcs.cloudfront.net/assets/img/about_us/operator_about_us.jpg"
              className=" w-[240px] h-[163px] mb-2"
              alt=""
            />
            <p className=" text-center">
              Authorization International Touristic Business
            </p>
          </div>
        </div>
      </div> */}

        <div className=" mt-10">
          <h1 className=" text-3xl font-bold font-sans mb-5">
            Company Registration
          </h1>

          <h2 className=" text-2xl font-bold font-sans mb-2">
            Name and Address
          </h2>

          <ul className=" mb-5">
            <li className=" list-item my-2">
              International Trading Name in English:{" "}
              <strong>Golden Asia Expedition., JSC</strong>
            </li>

            <li className=" list-item my-2">
              Company Name in English:{" "}
              <strong>Golden Asia Expedition COMPANY LIMITED</strong>
            </li>

            {/* <li className=" list-item my-2">
            Company Name in Vietnamese:{" "}
            <strong> CÔNG TY CỔ PHẦN CÔNG NGHỆ DU LỊCH BESTPRICE</strong>
          </li> */}

            <li className=" list-item my-2">
              Company Licence: 0104679428, issued by The Hanoi Department of
              Planning and Investment
            </li>

            {/* <li className=" list-item my-2">
            Tax Identification Number: 0104679428
          </li>

          <li className=" list-item my-2">
            International Tour Operator License No: 01-1794/2022/TCDL-GPL LHQT
            Issued by Vietnam National Administration of Tourism
          </li> */}
          </ul>

          {/* <div>
          <h1 className=" text-2xl font-bold font-sans mb-3">
            Tour Operator Licence
          </h1>

          <div className=" ms-10 flex justify-start gap-5">
            <img
              src="https://d13jio720g7qcs.cloudfront.net/assets/img/registration/international_tour_operator_licence_1.jpg"
              className=" w-[200px]"
            />

            <img
              src="https://d13jio720g7qcs.cloudfront.net/assets/img/registration/international_tour_operator_licence_3.jpg"
              className=" w-[200px]"
            />
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default page;
