import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error); // Corrected from log(error) to console.error(error)
      }
    };
    
    fetchOfferListings();
    }, []);
  return (
    <div className='bg-[#ced2d6]'>
  {/* Top Section */}
  <div className="flex flex-col gap-6 p-12 sm:p-24 px-3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("")' }}>
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
  <Link to={'/search'} className="text-sm sm:text-base text-indigo-600 font-semibold hover:underline mt-6">
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
            backgroundSize: 'cover',
          }}
          className='h-[500px]'
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Offers</h2>
          <Link to={'/search?offer=true'} className="text-sm text-blue-800 hover:underline">
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
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Places for Rent</h2>
          <Link to={'/search?type=rent'} className="text-sm text-blue-800 hover:underline">
            Show more places for rent
          </Link>
        </div>
        <div className="grid gap-4 p-4">
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Places for Sale</h2>
          <Link to={'/search?type=sale'} className="text-sm text-blue-800 hover:underline">
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
  )}