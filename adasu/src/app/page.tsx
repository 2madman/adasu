'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from '@/app/components/navbar';
import Footer from "./components/footer";
import WorldMap from "./components/map";

export default function Home() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [productsAnimationClass, setProductsAnimationClass] = useState("opacity-0 -translate-y-4");
  const [servicesAnimationClass, setServicesAnimationClass] = useState("opacity-0 -translate-y-4");

  useEffect(() => {
    if (isProductsOpen) {
      setProductsAnimationClass("opacity-0 -translate-y-4");
      setTimeout(() => {
        setProductsAnimationClass("opacity-100 translate-y-0");
      }, 50);
    } else {
      setProductsAnimationClass("opacity-0 -translate-y-4");
      setTimeout(() => {
        setIsProductsOpen(false);
      }, 300); // Match this duration with your CSS transition duration
    }
  }, [isProductsOpen]);

  useEffect(() => {
    if (isServicesOpen) {
      setServicesAnimationClass("opacity-0 -translate-y-4");
      setTimeout(() => {
        setServicesAnimationClass("opacity-100 translate-y-0");
      }, 50);
    } else {
      setServicesAnimationClass("opacity-0 -translate-y-4");
      setTimeout(() => {
        setIsServicesOpen(false);
      }, 300); // Match this duration with your CSS transition duration
    }
  }, [isServicesOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gray-200 min-h-screen flex items-center justify-center pt-28">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              Tıp, Araştırma, Endüstri ve Nükleer güvenlik alanları için radyasyon koruma çözümleri geliştiriyor, tasarlıyor ve üretiyoruz.
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              20 yılı aşkın deneyimine dayanan bu zorlu meslekte kapsamlı uzmanlığa sahibiz.
            </p>
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-6">
              "TASARLA, ÜRET, UYGULA"
            </div>
            <div className="inline-block border-2 border-blue-500 px-6 py-3 text-lg font-bold text-gray-800">
              %100 MADE IN TÜRKİYE
            </div>
          </div>
        </div>
      </div>
      <WorldMap />
      <Footer />
    </div>
  );
}