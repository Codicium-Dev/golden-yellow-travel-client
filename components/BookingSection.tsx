"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PhoneInput from "react-phone-number-input";
import { PuffLoader } from "react-spinners";
import { checkoutTour } from "@/actions/checkoutAction";
import { getRequest } from "@/services/api/apiService";
import { loadStripe } from "@stripe/stripe-js";
import { postRequest } from "@/services/api/apiService";
import { selectTours } from "@/services/redux/reducer/tourSlugSlice";
import { sendMail } from "@/actions/emailAction";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const BookingSection = ({ params }: { params: { slug: string } }) => {
  const tourSlug = useSelector(selectTours);
  const dispatch = useDispatch();
  const router = useRouter();

  const tourId = tourSlug[params.slug.toString()];

  useEffect(() => {
    if (tourId === null || tourId === undefined) {
      router.push("/");
    }
  }, [tourId]);

  const { data: tours, isLoading: tourLoading } = useQuery({
    queryKey: ["tour-detail", tourId],
    queryFn: () => getRequest(`tour/show/${tourId}`),
  });

  const tourData = {
    id: tourId,
    tourPhoto: tours?.data?.tour_photo,
    tourName: tours?.data?.name,
    countryName: tours?.data?.country_name,
    cityName: tours?.data?.city_name,
    duration: tours?.data?.duration,
    departure: tours?.data?.departure,
    location: tours?.data?.location,
    startDate: tours?.data?.start_date,
    endDate: tours?.data?.end_date,
    price: tours?.data?.price,
    salePrice: tours?.data?.sale_price,
  };

  const destination = ["Please choose country", "Vietnam", "Thailand"];

  const years = new Array(3)
    .fill(0)
    .map((_, index) => index + new Date().getFullYear());

  const accommodation = [
    "Please select accomodation",
    "Not Required",
    "Economy (3 Stars Hotel)",
    "Deluxe (4 Stars Hotel)",
    "Luxury (5 Stars Hotel)",
  ];

  const howUknow = [
    "Please select how you found us",
    "Search engine results",
    "Friends / Family",
    "Social Media",
    "Online Ads",
    "Trip Advertiser",
    "Magazines",
    "Website / Blogs",
    "Others",
  ];

  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);
  const [infants, setInfants] = useState(0);
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("default");
  const [tourType, setTourType] = useState("Private Tour");
  const [accommo, setAccommo] = useState("Please select accomodation");
  const [destinations, setDestinations] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone]: any = useState("");
  const [language, setLanguage] = useState("");
  const [how, setHow] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [special, setSpecial] = useState("");

  // date varification
  const today = new Date();
  const sevenDaysFromNow = new Date();

  const getFormattedDateTime = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  sevenDaysFromNow.setDate(today.getDate() + 7);
  const minDateTime = getFormattedDateTime(sevenDaysFromNow);
  // datetime end
  const getFormattedDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // const maxDate = getFormattedDateTime();
  // date varification end

  const bookingFormMutation = useMutation({
    mutationFn: (data: any) => postRequest("form/create", data),
    // form cleaning
    onSuccess: () => {
      setAdults(1);
      setChildrens(0);
      setInfants(0);
      setDestinations("");
      setFullName("");
      setEmail("");
      setPhone("");
      setAccommo("");
      setLanguage("");
      setHow("");
      setOtherInfo("");
      setSpecial("");
      toast.success("Inquiry Success");
    },
    onError: () => {
      toast.error("Inquiry Fail! Please try again");
    },
  });

  const getSessionId = async () => {
    try {
      const result: any = await checkoutTour(
        tourData,
        `http://localhost:3000/book/${params.slug.toString()}`
      );

      if (!result || !result.id) {
        throw new Error("Failed to create checkout session.");
      }

      return result.id;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // date
    const selectedDateTime = new Date(arrivalDate);
    const dateTimeToDate = new Date(
      selectedDateTime.toISOString().split("T")[0]
    );

    if (selectedDateTime < sevenDaysFromNow) {
      toast.error(
        "Selected arrival date must at least the next 7 days from today."
      );
    }

    // date
    // validation
    if (arrivalAirport === "default") {
      toast.error("Please fill your arrival airport.");
    }
    if (accommo === "Please select accomodation") {
      toast.error("Please fill accomodation field.");
    }
    if (how === "Please select how you found us") {
      toast.error("Please fill how you found us.");
    }
    if (how === "Others") {
      if (otherInfo === "") {
        toast.warning("Please fill how you found us.");
      }
    }
    if (
      tourType !== "" &&
      arrivalDate !== "" &&
      selectedDateTime > sevenDaysFromNow &&
      arrivalAirport !== "" &&
      accommo !== "" &&
      fullName !== "" &&
      email !== "" &&
      phone !== "" &&
      language !== "" &&
      how !== "" &&
      accommo !== "Please select accomodation" &&
      arrivalAirport !== "default" &&
      how !== "Please select how you found us"
    ) {
      bookingFormMutation.mutateAsync({
        tour_id: tourId.toString(),
        adults: adults,
        children: childrens,
        infants: infants,
        destinations: tours?.data?.location,
        tour_type: tourType,
        arrival_date: arrivalDate,
        arrival_airport: arrivalAirport,
        accommodation: accommo,
        full_name: fullName,
        email: email,
        phone: phone,
        language,
        how_u_know: how,
        other_information: otherInfo,
        special_note: special,
      });

      const customerData = {
        adults,
        childrens,
        infants,
        destinations,
        tourType,
        arrivalDate,
        arrivalAirport,
        accommo,
        fullName,
        email,
        phone,
        language,
        how,
        otherInfo,
        special,
      };
      const customerEmail = email;
      // const sessionId = await getSessionId();
      // const resumePaymentLink =
      //   WEBSITE_URL +
      //   `/book/${params.slug.toString()}/checkout?session_id=${sessionId}`;
      sendMail(customerData, tourData, customerEmail); //resumePaymentLink
      router.push("/");
      // handleCheckout(sessionId);
    }
  };

  const handleCheckout = async (sessionId: any) => {
    try {
      const stripe = await stripePromise;
      await stripe!.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  function toSentenceCase(str: string) {
    if (!str) return str; // Return if the string is empty
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
  // deployment

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="w-full p-5 pt-[110px] md:pt-[140px] pb-[40px] bg-[#efefef] open-sans "
      >
        <h1 className="pb-5 text-2xl lg:text-3xl font-semibold tracking-widest text-[#464646] text-center ">
          TOUR INQUIRING
        </h1>

        {/* Tour Information */}
        <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-6 lg:px-10 mx-auto mb-10">
          <div className="pb-5 md:flex items-center gap-5">
            <p className="text-slate-700 text-base lg:text-lg min-w-[150px] w-[20%]">
              Tour Name:
            </p>
            <p className="w-[80%] text-base lg:text-lg text-gray-500 ">
              {tours?.data?.name}
            </p>
          </div>
          <div className="pb-5 md:flex items-center gap-5">
            <p className=" text-slate-800 text-base lg:text-lg min-w-[150px] w-[20%]">
              Duration:
            </p>
            <p className="w-[80%] text-base lg:text-lg text-gray-500 ">
              {tours?.data?.duration}
            </p>
          </div>

          <div className=" md:flex items-center gap-5">
            <p className=" text-slate-700 text-base lg:text-lg min-w-[150px] w-[20%]">
              Destinations:
            </p>
            <p className="w-[80%] text-base lg:text-lg text-gray-500 ">
              {tours?.data?.location}
            </p>
          </div>
        </div>

        {/* Travel Information */}
        <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-6 lg:px-10 mx-auto mb-10">
          <h1 className="md:pb-5 text-xl lg:text-2xl font-semibold tracking-widest text-[#464646] mb-5">
            Travel information
          </h1>
          <div className="md:pb-5 flex-col md:flex-row items-center gap-5">
            <div className="w-full lg:w-[20%] ">
              <p className=" text-slate-700 text-base lg:text-lg min-w-[150px] pb-3 md:pb-0">
                No. of travellers:
              </p>
            </div>
            {/* No. of travellers */}
            <div className="w-full flex-col md:flex md:flex-row gap-5 justify-between">
              {/* adults */}
              <div className="w-full md:w-[30%] flex items-center justify-between pb-5 md:pb-0">
                <p className=" text-gray-700 w-[40%] md:w-1/2 flex-col md:flex-row justify-between text-base lg:text-lg">
                  Adults:
                </p>
                <input
                  type="number"
                  name="adults"
                  min={1}
                  id="adults"
                  className="block w-[60%] md:w-[50%] h-[34px] text-end text-sm border border-[#010e3b] rounded-lg p-2"
                  required
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                />
              </div>
              {/* childrens */}
              <div className="w-full md:w-[30%] flex items-center justify-between pb-4 md:pb-0">
                <p className=" text-gray-700 w-[40%] md:w-1/2 flex-col md:block justify-between text-base lg:text-lg">
                  Childrens:
                  <br />
                  <span className="text-sm text-gray-500">
                    &#x28;1-10&#x29;
                  </span>
                </p>
                <input
                  type="number"
                  name="childrens"
                  min={0}
                  max={10}
                  id="childrens"
                  className="block w-[60%] md:w-[50%] h-[34px] text-end text-sm border border-[#010e3b] rounded-lg p-2"
                  required
                  value={childrens}
                  onChange={(e) => setChildrens(parseInt(e.target.value))}
                />
              </div>
              {/* infants */}
              <div className="w-full md:w-[30%] flex items-center justify-between pb-4 md:pb-0">
                <p className=" text-gray-700 w-[40%] md:w-1/2 flex-col md:block justify-between text-base lg:text-lg">
                  Infants:
                  <br />
                  <span className="text-sm text-gray-500">&#x28;1-4&#x29;</span>
                </p>
                <input
                  type="number"
                  name="infants"
                  min={0}
                  max={4}
                  id="infants"
                  className="block w-[60%] md:w-[50%] h-[34px] text-end text-sm border border-[#010e3b] rounded-lg p-2"
                  required
                  value={infants}
                  onChange={(e) => setInfants(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Tour type */}
          <div className=" w-full flex items-center justify-between pb-5">
            <div className=" text-gray-700 md:w-1/2 justify-between text-base lg:text-lg">
              Tour type:
            </div>
            <div className="w-[50%] flex justify-end text-slate-800 text-base lg:text-lg">
              <input
                disabled
                type="text"
                name="tourType"
                id="tourType"
                className="w-full md:w-[170px] h-[34px] text-sm bg-[#828282] font-semibold text-white text-center border-[#010e3b] p-2 rounded-3xl"
                required
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
              />
            </div>
          </div>

          {/* Date of Arrival */}
          <div className="pb-5 w-full flex-col md:flex md:flex-row items-center justify-between gap-5 md:gap-0">
            <div className="w-full md:w-[65%] flex-col text-slate-700 text-base lg:text-lg ">
              Date of Arrival:
              <p className="text-sm text-gray-500">
                &#x28;Customer's arrival date and local time in
                {toSentenceCase(tours?.data?.country_name)}&#x29;
              </p>
            </div>
            <div className="w-full md:w-[35%] text-slate-800 text-base lg:text-lg pt-2 md:pt-0">
              <input
                className="w-full h-[34px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg px-2"
                type="datetime-local"
                name="arrivalDate"
                id="arrivalDate"
                min={minDateTime}
                // max={maxDate}
                required
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>
          </div>

          {/* Arrival airport */}
          <div className="pb-5 w-full flex-col md:flex md:flex-row items-center justify-between gap-5 md:gap-0">
            <div className="w-full md:w-[65%] flex-col text-slate-700 text-base lg:text-lg ">
              Arrival airport:
            </div>
            <div className="w-full md:w-[35%] text-slate-800 text-base lg:text-lg pt-2 md:pt-0">
              <div className="custom-select-wrapper w-full ">
                <select
                  required
                  name="arrivalAirport"
                  id="arrival-airport"
                  className="w-full h-[34px] mr-10 text-sm border border-[#010e3b] rounded-lg px-2 custom-select"
                  value={arrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                >
                  <optgroup label="Thailand">
                    <option value="default">Please select an airport</option>
                    <option value="Bangkok">Bangkok airport</option>
                    <option value="Chiang Mai">Chiang Mai airport</option>
                  </optgroup>
                  <optgroup label="Vietnam">
                    <option value="Hanoi">Hanoi airport</option>
                    <option value="Ho Chi Minh">
                      Ho Chi Minh City airport
                    </option>
                    <option value="Danang">Danang airport</option>
                  </optgroup>
                  <optgroup label="Cambodia">
                    <option value="Siem Reap">Siem Reap airport</option>
                    <option value="Phnom Penh">Phnom Penh airport</option>
                  </optgroup>
                </select>
                <span className="custom-select-arrow">&#9662;</span>
              </div>
            </div>
          </div>

          {/* Accomodations */}
          <div className="w-full flex-col md:flex md:flex-row items-center justify-between gap-5 md:gap-0">
            <div className="w-full md:w-[65%] flex-col text-slate-700 text-base lg:text-lg ">
              Accomodations:
            </div>
            <div className="w-full md:w-[35%] text-slate-800 text-base lg:text-lg pt-2 md:pt-0">
              <div className="custom-select-wrapper w-full ">
                <select
                  required
                  name="arrivalAirport"
                  id="arrival-airport"
                  className="w-full h-[34px] mr-10 text-sm border border-[#010e3b] rounded-lg px-2 custom-select"
                  value={accommo}
                  onChange={(e) => setAccommo(e.target.value)}
                >
                  {accommodation.map((accommodation, index) => {
                    return (
                      <option key={index} value={accommodation}>
                        {accommodation}
                      </option>
                    );
                  })}
                </select>
                <span className="custom-select-arrow">&#9662;</span>
              </div>
            </div>
          </div>
        </div>

        {/* contact information */}
        <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-6 lg:px-10  mx-auto mb-10">
          <h1 className="pb-5 text-xl lg:text-2xl font-semibold tracking-widest text-[#464646] ">
            Contact information
          </h1>
          {/* Full Name */}
          <div className="pb-5 md:flex items-center gap-5">
            <div className="w-full md:w-[20%] text-slate-700 text-base lg:text-lg">
              Full Name:
            </div>
            <div className="w-full md:w-[80%] text-slate-800 text-base lg:text-lg">
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="w-full md:w-[50%] h-[34px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2 mt-2 md:mt-0"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          {/* Email */}
          <div className="pb-5 md:flex items-center gap-5">
            <div className="w-full md:w-[20%] text-slate-700 text-base lg:text-lg">
              Email:
            </div>
            <div className="w-full md:w-[80%] text-slate-800 text-base lg:text-lg">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full md:w-[50%] h-[34px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2 mt-2 md:mt-0"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Phone*/}
          <div className="pb-5 md:flex items-center gap-5">
            <div className="w-full md:w-[20%] text-slate-700 text-base lg:text-lg">
              Phone:
            </div>
            <div className="w-full md:w-[80%] text-slate-800 text-base lg:text-lg flex items-center">
              <div className="w-full md:w-[50%] h-[45px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2 mt-2 md:mt-0">
                <PhoneInput
                  placeholder="Enter phone number"
                  withCountryCallingCode={true}
                  international={true}
                  countryCallingCodeEditable={false}
                  value={phone}
                  onChange={setPhone}
                  className="input-phone custom-phone-input"
                />
              </div>
            </div>
          </div>
          {/* Language */}
          <div className="pb-5 md:flex items-center gap-5">
            <div className="w-full md:w-[20%] text-slate-700 text-base lg:text-lg">
              Language:
            </div>
            <div className="w-full md:w-[80%] text-slate-800 text-base lg:text-lg">
              <input
                type="text"
                name="language"
                id="language"
                className="w-full md:w-[50%] h-[34px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2 mt-2 md:mt-0"
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
          </div>
          {/* How know us? */}
          <div className="pb-0 md:pb-3 md:flex items-center gap-5">
            <div className="w-full md:w-[20%] text-slate-700 text-base lg:text-lg">
              Find Us By:
            </div>
            <div className="w-full md:w-[80%] text-slate-800 text-base lg:text-lg pt-2 md:pt-0 ">
              <div className="custom-select-wrapper w-full md:w-1/2">
                <select
                  required
                  name="how"
                  id="arrival-airport"
                  className="w-full h-[34px] mr-10 text-sm border border-[#010e3b] rounded-lg px-2 custom-select"
                  value={how}
                  onChange={(e) => setHow(e.target.value)}
                >
                  {howUknow.map((how, index) => {
                    return (
                      <option key={index} value={how}>
                        {how}
                      </option>
                    );
                  })}
                </select>
                <span className="custom-select-arrow">&#9662;</span>
              </div>
            </div>
          </div>
          {/* Other info */}
          {how === "Others" ? (
            <div className="pb-5 md:flex items-center gap-5">
              <div className="w-full md:w-[20%] "></div>
              <div className="w-full md:w-[80%] text-slate-700 text-base lg:text-lg">
                <div className="text-slate-800 text-sm mb-2">
                  Please fill how you found us:
                </div>
                <input
                  type="text"
                  name="otherInfo"
                  id="otherInfo"
                  className="w-full md:w-[50%] h-[34px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2 "
                  required
                  value={otherInfo}
                  onChange={(e) => setOtherInfo(e.target.value)}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* special requirement */}
        <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-6 lg:px-10 mx-auto mb-5">
          <h1 className="pb-5 text-xl lg:text-2xl font-semibold tracking-widest text-[#464646] ">
            Special requirement
          </h1>
          {/* Special Requirement */}
          <div className=" md:flex items-center gap-5">
            <div className="w-full text-slate-800 text-base lg:text-lg">
              <textarea
                name="special"
                id="special"
                className="w-full h-[100px] mr-10 text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2"
                value={special}
                onChange={(e) => setSpecial(e.target.value)}
                placeholder="Any must-have in your idea itinerary, prefer accommodations, any
                special food request..."
              ></textarea>
            </div>
          </div>
        </div>

        <p className="mb-5 text-center text-slate-700">
          <span className="text-red-600">*</span> If you don't receive our
          confirmation email after 1 working day, please check your spam
          mailbox.
        </p>

        <div className=" flex justify-center">
          <button
            disabled={bookingFormMutation.isLoading}
            type="submit"
            className=" md:w-1/6 w-2/5 rounded-lg bg-[#010e3b] text-white font-semibold flex justify-center align-middle items-center p-3 cursor-pointer hover:opacity-90 transition-all"
          >
            {bookingFormMutation.isLoading ? (
              <PuffLoader
                color={"#fff"}
                size={25}
                aria-label="Loading Spinner"
              />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingSection;

{
  /* <p className="lg:text-xl text-base lg:px-24 px-6 text-center mx-auto mb-10">
Experience tailor-made trips since 2013 designed to delight our
esteemed guests. Share your preferences, interests, and trip details
with us, and in as little as 24 hours, our team of experts will
meticulously craft exceptional adventures tailored just for you. Your
perfect travel experience awaits with our exclusive customized tour
packages in South-East Asia, Thailand and Vietnam. Let us create
unforgettable memories together!
</p> */
  /* If you've got special needs such as non-smoking rooms, dietary plans or have additional places to visit, please let us know. */
}
