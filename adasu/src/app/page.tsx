'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from '@/app/components/navbar';
import Footer from "./components/footer";
import { useLanguage } from "./context/LanguageContext";

export default function Anasayfa() {
  const { t } = useLanguage();
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
              {t('home.hero.title')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              {t('home.hero.subtitle')}
            </p>
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-6">
              {t('home.hero.motto')}
            </div>
            <div className="inline-block border-2 border-blue-500 px-6 py-3 text-lg font-bold text-gray-800">
              {t('home.hero.made')}
            </div>
          </div>
        </div>
      </div>
      {/* World Map Section */}
      <div className="w-full py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            {t('home.map.title')}
          </h2>
          <div className="relative w-full h-[600px] mb-12">
            <Image
              src="/images/world_map.jpg"
              alt="Dünya Haritası"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'country.france',
              'country.canada',
              'country.saudi',
              'country.jordan',
              'country.georgia',
              'country.azerbaijan',
              'country.algeria',
              'country.iraq',
              'country.kosovo',
              'country.macedonia',
              'country.libya'
            ].map((countryKey, index) => (
              <div
                key={index}
                className="bg-white border-2 border-blue-500 px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-center"
              >
                <span className="text-blue-600 font-bold text-xl">{t(countryKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}