'use client';

import React, { useState } from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would typically send the form data to your backend
            // For now, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Contact Header */}
            <div className="bg-gray-200 py-20 mt-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800">İletişim</h1>
                    <p className="text-xl text-center text-gray-600 mt-4">
                        Sorularınız veya talepleriniz için bizimle iletişime geçin
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgilerimiz</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Adres</h3>
                                    <p className="text-gray-600">AKSE MAHALLESİ 471.SOKAK NO:8 ÇAYIROVA /GEBZE / KOCAELİ</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Telefon</h3>
                                    <p className="text-gray-600">0262 643 91 96 - 0262 742 01 00</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaFax size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Faks</h3>
                                    <p className="text-gray-600">0262 643 78 73</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">E-posta</h3>
                                    <p className="text-gray-600">info@adarad.net</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Çalışma Saatleri</h3>
                            <div className="space-y-2">
                                <p className="text-gray-600">Pazartesi - Cuma: 08:30 - 17:30</p>
                                <p className="text-gray-600">Cumartesi - Pazar: Kapalı</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Mesaj Gönderin</h2>

                        {submitStatus === 'success' && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                                Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Ad Soyad</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-posta</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefon</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Konu</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Genel Bilgi">Genel Bilgi</option>
                                    <option value="Ürün Bilgisi">Ürün Bilgisi</option>
                                    <option value="Teknik Destek">Teknik Destek</option>
                                    <option value="İş Birliği">İş Birliği</option>
                                    <option value="Diğer">Diğer</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mesajınız</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Bize Ulaşın</h2>
                    <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.0523456456456!2d29.123456789012345!3d40.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzM0LjQiTiAyOcKwMDcnMzQuNCJF!5e0!3m2!1str!2str!4v1615123456789!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
