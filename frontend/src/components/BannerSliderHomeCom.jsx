'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiChevronRight } from 'react-icons/fi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import AxiosInstance from "@/components/AxiosInstance";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publiccategorywise?category=BannerImageSlider');
        if (res?.data?.result?.data) {
          setBanners(res.data.result.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error fetching images:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  

  const renderArrowPrev = (clickHandler, hasPrev, label) => (
    <button 
      onClick={clickHandler}
      className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-r-lg"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <IoIosArrowBack size={24} />
    </button>
  );

  const renderArrowNext = (clickHandler, hasNext, label) => (
    <button 
      onClick={clickHandler}
      className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-l-lg"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <IoIosArrowForward size={24} />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-black text-white p-6 md:hidden">
          <div className="space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none w-full"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="hover:text-gray-300 transition">New Arrivals</a>
              <a href="#" className="hover:text-gray-300 transition">Collections</a>
              <a href="#" className="hover:text-gray-300 transition">Shop</a>
              <a href="#" className="hover:text-gray-300 transition">Contact</a>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <div className="mb-12 relative">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
            className="overflow-hidden rounded-lg shadow-xl"
          >
            {banners.map((banner, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8000/${banner.image_path.replace(/\\/g, "/")}`}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-[70vh] object-cover mb-12"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white px-8 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Exclusive Collection {index + 1}</h2>
                    <p className="text-xl mb-6">Discover unparalleled craftsmanship and timeless elegance</p>
                    <Link href="/publicproducts">
                      <button className="bg-white text-black px-8 py-3 font-medium hover:bg-opacity-90 transition">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default HomePage;