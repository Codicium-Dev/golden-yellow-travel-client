"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PuffLoader } from "react-spinners";
import { getRequest } from "@/services/api/apiService";
import { postRequest } from "@/services/api/apiService";
import { selectTours } from "@/services/redux/reducer/tourSlugSlice";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const InquirySection = ({ params }: { params: { slug: string } }) => {
  const tourSlug = useSelector(selectTours);
  const dispatch = useDispatch();
  const router = useRouter();

  const tourId = tourSlug[params.slug.toString()];
  // console.log("tourId >> ", tourId);

  useEffect(() => {
    if (tourId === null || tourId === undefined) {
      router.push("/");
    }
  }, [tourId]);

  const { data: tours, isLoading: tourLoading } = useQuery({
    queryKey: ["tour-detail", tourId],
    queryFn: () => getRequest(`tour/show/${tourId}`),
  });
  console.log("test 2 >> ", tours);
  console.log("test 3 >> ", tours?.data);
  console.log("test 2 >> ", tours?.data?.name);
  console.log("test 2 >> ", tours?.data?.duration);
  console.log("test 2 >> ", tours?.data?.location);

  //? old
  const months = [
    "Choose Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const destination = ["Choose Country", "Vietnam", "Thailand"];

  const interests = [
    "Not Required",
    "Economy (3 Stars Hotel)",
    "Deluxe (4 Stars Hotel)",
    "Luxury (5 Stars Hotel)",
  ];

  const years = new Array(3)
    .fill(0)
    .map((_, index) => index + new Date().getFullYear());

  const accommodation = [
    "Not Required",
    "Economy (3 Stars Hotel)",
    "Deluxe (4 Stars Hotel)",
    "Luxury (5 Stars Hotel)",
  ];

  const howUknow = [
    "Search Engine Results",
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
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [tourType, setTourType] = useState("");
  const [accommo, setAccommo] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [travelYear, setTravelYear] = useState("");
  const [stayDays, setStayDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [destinations, setDestinations] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [how, setHow] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [special, setSpecial] = useState("");

  const queryFormMutation = useMutation({
    mutationFn: (data: any) => postRequest("form/create", data),
    onSuccess: () => {
      setTravelMonth("");
      setTravelYear("");
      setStayDays("");
      setBudget("");
      setAdults(1);
      setChildrens(0);
      setInfants(0);
      setInterest("");
      setDestinations("");
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setAccommo("");
      setCountry("");
      setHow("");
      setOtherInfo("");
      setSpecial("");
      toast.success("Inquiry Successful");
    },
    onError: () => {
      toast.error("Inquiry Fail! Please try again");
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (travelMonth === "Choose Months") {
      toast.warning("Please select all required fields");
      return;
    }

    queryFormMutation.mutateAsync({
      travel_month: travelMonth,
      travel_year: travelYear,
      stay_days: stayDays,
      budget: budget,
      adult_count: adults,
      child_count: childrens,
      interest: interest,
      destinations: destinations,
      f_name: fName,
      l_name: lName,
      email: email,
      phone: phone,
      own_country: country,
      accommodation: accommo,
      how_u_know: how,
      other_information: otherInfo,
      special_note: special,
    });
  };
  // old

  return (
    <div>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="pt-[110px] md:pt-[140px] pb-[40px] bg-[#efefef] open-sans"
      >
        <h1 className="pb-5 text-3xl font-semibold tracking-widest text-[#464646] text-center">
          TOUR INQUIRING
        </h1>

        {/* Torr Information */}
        <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-10  mx-auto mb-10">
          <div className="pb-3 md:flex items-center gap-5">
            <p className=" text-slate-500 text-lg min-w-[150px] w-[20%]">
              Tour Name:
            </p>
            <p className="w-[80%] text-lg text-gray-700 ">
              {tours?.data?.name}
            </p>
          </div>

          <div className="pb-3 md:flex items-center gap-5">
            <p className=" text-slate-500 text-lg min-w-[150px] w-[20%]">
              Duration:
            </p>
            <p className="w-[80%] text-lg text-gray-700 ">
              {tours?.data?.duration}
            </p>
          </div>

          <div className=" md:flex items-center gap-5">
            <p className=" text-slate-500 text-lg min-w-[150px] w-[20%]">
              Destinations:
            </p>
            <p className="w-[80%] text-lg text-gray-700 ">
              {tours?.data?.location}
            </p>
          </div>
        </div>
        {/* full_name email phone country city how_know_us gender */}
        <div className="bg-[#f6f6f6] shadow-lg py-7 rounded-lg w-full max-w-[1000px] px-5 md:px-10  mx-auto mb-10">
          <h1 className="pb-5 text-2xl font-semibold tracking-widest text-[#464646]">
            Your travel information
          </h1>
          <div className="pb-3 md:flex items-center gap-5">
            <div className="w-[20%] ">
              <p className=" text-slate-500 text-lg min-w-[150px]">
                No. of travellers:
              </p>
            </div>
            {/* No. of travellers */}
            <div className="w-[80%] flex gap-5  ">
              {/* adults */}
              <div className="w-1/3 flex items-center">
                <p className=" text-gray-700 w-[50%] text-lg">Adults:</p>
                <input
                  type="number"
                  name="adults"
                  min={1}
                  id="adults"
                  className="w-[50%] h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                  required
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                />
              </div>
              {/* childrens */}
              <div className="w-1/3 flex items-center">
                <p className="  text-gray-700 w-[50%] text-lg">
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
                  className="w-[50%] h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                  required
                  value={childrens}
                  onChange={(e) => setChildrens(parseInt(e.target.value))}
                />
              </div>
              {/* infants */}
              <div className="w-1/3 flex items-center">
                <p className=" text-gray-700 w-[50%] text-lg">
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
                  className="w-[50%] h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                  required
                  value={infants}
                  onChange={(e) => setInfants(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="pb-3 md:flex items-center gap-5 red">
            <div className="w-[20%] text-slate-500 text-lg blue ">
              Date of Arrival:
            </div>
            <div className="w-[80%] text-slate-500 text-lg green">
              <input
                type="datetime-local"
                name="arrivalDate"
                id="arrivalDate"
                className="w-[32%] h-[34px] mr-10 text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>
          </div>

          <div className="pb-3 md:flex items-center gap-5 red">
            <div className="w-[20%] text-slate-500 text-lg blue ">
              Arrival airport:
            </div>
            <div className="w-[80%] text-slate-500 text-lg green">
              <input
                type="text"
                name=""
                id=""
                className="w-[32%] h-[34px] mr-10 text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={arrivalAirport}
                onChange={(e) => setArrivalAirport(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1000px] px-5 md:px-10  mx-auto mb-10">
          <h1 className="my-5 text-2xl font-semibold tracking-widest text-[#464646] text-center">
            PERSONAL INFORMATION
          </h1>
          <div className="grid grid-cols-2 gap-3 ">
            <div className=" col-start-1 col-span-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">First Name</h1>
              <input
                type="text"
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={fName}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className=" col-start-1 col-span-2 md:col-start-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">Last Name</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={lName}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className=" col-start-1 col-span-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">Country</h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className=" col-start-1 col-span-2 md:col-start-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">
                Phone Number
              </h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <h1 className=" mb-1 font-semibold text-[#010e3b]">Email</h1>
            <input
              type="text"
              name=""
              id=""
              className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <h1 className=" my-5 text-2xl font-semibold tracking-widest text-[#464646] text-center">
          OTHER INFORMATION
        </h1>
        <div className="w-full max-w-[1000px] px-5 md:px-10  mx-auto mb-10">
          <div className="grid grid-cols-2 gap-3">
            <div className=" col-start-1 col-span-2 md:col-span-1 gap-3">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">
                Please select your accommodation style
                {/* below and we'll pick a hotel that best suits your needs.*/}
              </h1>

              <select
                name=""
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2 cursor-pointer"
                value={accommo}
                onChange={(e) => setAccommo(e.target.value)}
              >
                {accommodation.map((accommodation) => {
                  return <option value={accommodation}>{accommodation}</option>;
                })}
              </select>
            </div>

            <div className=" col-start-1 col-span-2 md:col-start-2 md:col-span-1">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">
                How do you know us?
              </h1>

              <select
                name=""
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2 cursor-pointer"
                value={how}
                onChange={(e) => setHow(e.target.value)}
              >
                {howUknow.map((how) => {
                  return <option value={how}>{how}</option>;
                })}
              </select>
            </div>

            <div className="col-start-1 col-span-2 mt-3">
              <h1 className=" mb-1 font-semibold text-[#010e3b]">
                If you choose other in above, please write here
              </h1>
              <input
                type="text"
                name=""
                id=""
                className=" w-full h-[34px] text-sm border border-[#010e3b] rounded-lg p-2"
                required
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <h1 className=" mb-1 font-semibold text-[#010e3b] row-start-1 row-span-1">
              Special requests?
            </h1>
            <textarea
              placeholder="If you've got special needs such as non-smoking rooms, dietary plans or have additional places to visit, please let us know."
              name=""
              id=""
              className="h-[100px] text-sm w-full border border-[#010e3b] rounded-lg p-2"
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
            />
          </div>
        </div>

        <div className=" flex justify-center">
          <button
            disabled={queryFormMutation.isLoading}
            type="submit"
            className=" md:w-1/6 w-2/5 rounded-lg bg-[#010e3b] text-white font-semibold flex justify-center align-middle items-center p-3 cursor-pointer hover:opacity-90 transition-all"
          >
            {queryFormMutation.isLoading ? (
              <PuffLoader
                color={"#010e3b"}
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

export default InquirySection;
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
}
