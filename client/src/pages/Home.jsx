import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error); // Corrected from log(error) to console.error(error)
      }
    };

    fetchOfferListings();
  }, []);
  return (
    <div className="bg-[#ced2d6]">
      {/* Top Section */}
      <div
        className="flex flex-col gap-6 p-12 sm:p-24 px-3 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D")',
          height: 40 + "rem",
          width: "full",
        }}
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-indigo-800 leading-tight font-serif">
          You are not buying <span className="text-blue-500">a house,</span>
          <br />
          you are buying a lifestyle.
        </h1>
        <div className="text-gray-700 text-sm sm:text-base mt-4 font-sans">
          Real estate is an imperishable asset, ever increasing in value.
          <br />
          It is the most solid security that human ingenuity has devised.
        </div>
        <Link
          to={"/search"}
          className="text-sm sm:text-base text-indigo-600 font-semibold hover:underline mt-6"
        >
          Get started...
        </Link>
      </div>
      {/* Swiper Section */}
      <Swiper navigation>
        {offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[500px]"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Listing Results Section */}
      <div className="max-w-6xl mx-auto p-4 lg:p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Offers */}
        {offerListings && offerListings.length > 0 && (
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="grid gap-4 p-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Places for Rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 shadow-lg border border-indigo-100">
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              aria-hidden
            >
              <div className="absolute -left-10 top-4 h-24 w-24 rounded-full bg-indigo-200 blur-3xl"></div>
              <div className="absolute right-0 -bottom-6 h-28 w-28 rounded-full bg-sky-200 blur-3xl"></div>
            </div>

            <div className="relative flex flex-col gap-2 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <p className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-800">
                  Fresh picks
                </p>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Recent Places for Rent
                </h2>
                <p className="text-sm text-gray-600">
                  Curated rentals added this week. Explore flexible leases and
                  move-in ready homes.
                </p>
              </div>
              <Link
                to={"/search?type=rent"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg"
              >
                Browse rentals
                <span aria-hidden className="text-base">
                  →
                </span>
              </Link>
            </div>

            <div className="relative grid gap-4 p-4 sm:grid-cols-2">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Places for Sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Recent Places for Sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid gap-4 p-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
