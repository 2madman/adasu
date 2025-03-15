'use client';

import { useState, useEffect } from "react";

// Define interfaces for dropdown props
interface DropdownProps {
    isOpen: boolean;
    animationClass: string;
    onMouseLeave: () => void;
}

// Dropdown menu component for Products
const ProductsDropdown = ({ isOpen, animationClass, onMouseLeave }: DropdownProps) => (
    <div
        className={`fixed top-20 left-0 right-0 bg-white/95 shadow-lg z-40 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass}`}
        onMouseLeave={onMouseLeave}
    >
        <div className="container mx-auto px-4 py-8 flex">
            <div className="w-2/3 pl-8 border-l border-gray-200">
                <div className="grid grid-cols-1 gap-3">
                    {[
                        'RADYAFARMASÖTİK ÜRETİM TESİSLERİ',
                        'NÜKLEER TIP',
                        'RADYOLOJİ',
                        'RADYOTERAPİ',
                        'NDT',
                        'NÜKLEER VE ARAŞTIRMA TESİSLERİ',
                        'İNŞAAT',
                        'DENİZCİLİK',
                        'METAL VE MADEN',
                        'AR-GE'
                    ].map((product) => (
                        <a key={product} href="#" className="flex items-center py-4 text-gray-800 hover:text-blue-500 transition-colors font-semibold text-2xl">
                            <span>{product}</span>
                            <svg className="ml-2 w-8 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    ))}
                </div>
                <div className="mt-6">
                    <a href="#" className="text-blue-500 font-bold flex items-center">
                        ALL PRODUCTS
                    </a>
                </div>
            </div>
        </div>
    </div>
);

// Dropdown menu component for Services
const ServicesDropdown = ({ isOpen, animationClass, onMouseLeave }: DropdownProps) => (
    <div
        className={`fixed top-20 left-0 right-0 bg-white/95 shadow-lg z-40 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass}`}
        onMouseLeave={onMouseLeave}
    >
        <div className="container mx-auto px-4 py-8 flex">
            <div className="w-2/3 pl-8 border-l border-gray-200">
                <div className="grid grid-cols-1 gap-3">
                    {[
                        'NDK PROJE DESTEĞİ',
                        'NDK ÖN LİSANS DESTEĞİ',
                        'NÜKLEER TIP PROJELENDİRME',
                        'RADYOLOJİ PROJELENDİRME',
                        'RADYOTERAPİ PROJELENDİRME',
                        'MİMARİ TASARIM'
                    ].map((service) => (
                        <a key={service} href="#" className="flex items-center py-4 text-gray-800 hover:text-blue-500 transition-colors font-semibold text-2xl">
                            <span>{service}</span>
                            <svg className="ml-2 w-8 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function Navbar() {
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
        <header className="w-full">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-md">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center pl-8">
                            <a href="/" className="text-4xl font-bold">
                                <span className="text-blue-800">ADA</span>
                                <span className="text-blue-500">SU</span>
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-10">
                            {/* Products dropdown */}
                            <div className="relative">
                                <a
                                    href="#"
                                    className="text-lg text-gray-700 hover:text-blue-500 font-bold flex items-center"
                                    onMouseEnter={() => {
                                        setIsProductsOpen(true);
                                        setIsServicesOpen(false);
                                    }}
                                >
                                    PRODUCTS
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </a>
                            </div>

                            {/* Services dropdown */}
                            <div className="relative">
                                <a
                                    href="#"
                                    className="text-lg text-gray-700 hover:text-blue-500 font-bold flex items-center"
                                    onMouseEnter={() => {
                                        setIsServicesOpen(true);
                                        setIsProductsOpen(false);
                                    }}
                                >
                                    SERVICES
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </a>
                            </div>

                            <a href="/about" className="text-lg text-gray-700 hover:text-blue-500 font-bold">ABOUT US</a>
                            <a href="/contact" className="text-lg text-gray-700 hover:text-blue-500 font-bold">CONTACT</a>

                            {/* Language selector */}
                            <div className="ml-6 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 512 512"
                                    className="hover:opacity-80"
                                >
                                    <mask id="a">
                                        <circle cx="256" cy="256" r="256" fill="#fff" />
                                    </mask>
                                    <g mask="url(#a)">
                                        <path fill="#d80027" d="M0 0h512v512H0z" />
                                        <g fill="#f0f0f0">
                                            <path d="M245.5 209.2l21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11.1z" />
                                            <path d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dropdown menus */}
            <ProductsDropdown
                isOpen={isProductsOpen}
                animationClass={productsAnimationClass}
                onMouseLeave={() => setIsProductsOpen(false)}
            />

            <ServicesDropdown
                isOpen={isServicesOpen}
                animationClass={servicesAnimationClass}
                onMouseLeave={() => setIsServicesOpen(false)}
            />
        </header>
    );
}
