'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';

import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import ContentpageHome from "@/components/ContentpageHome";
import AdModal from "@/components/AdModal";
import BannerSliderHomeCom from "@/components/BannerSliderHomeCom";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from FastAPI backend
    fetch("http://localhost:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("FastAPI Error:", err));
  }, []);

  return (
    <div className="bg-gray-50">
      <AdModal />
      <TopNavbarCom />
      <NavbarCom />
      <BannerSliderHomeCom />

      {/* ✅ Show response from FastAPI here */}
      {message && (
        <div className="text-center text-lg font-semibold text-blue-600 my-4">
          {message}
        </div>
      )}

      
      <FooterCom />
    </div>
  );
}
