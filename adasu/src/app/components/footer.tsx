import React from 'react';
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">İletişim Bilgileri</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="mt-1 mr-3 text-blue-400">
                                    <FaMapMarkerAlt size={16} />
                                </div>
                                <p>AKSE MAHALLESİ 471.SOKAK NO:8 ÇAYIROVA /GEBZE / KOCAELİ</p>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaPhone size={16} />
                                </div>
                                <p>0262 643 91 96 - 0262 742 01 00</p>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaFax size={16} />
                                </div>
                                <p>0262 643 78 73</p>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaEnvelope size={16} />
                                </div>
                                <p>info@adarad.net</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Hakkımızda</h3>
                        <p className="mb-4">
                            Kaliteli hizmet ve müşteri memnuniyeti odaklı çalışmalarımızla sektörde öncü konumdayız.
                        </p>
                        <div className="mt-6">
                            <a
                                href="mailto:info@adarad.net"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                            >
                                Bize Ulaşın
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} ADARAD. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;