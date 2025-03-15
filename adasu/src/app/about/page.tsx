'use client';

import React from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <div className="pt-28 pb-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Hakkımızda</h1>

                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Nükleer ve radyasyon</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Tıp, Araştırma, Endüstri ve Nükleer güvenlik alanları için radyasyon koruma çözümleri geliştiriyor, tasarlıyor ve üretiyoruz. 20 yılı aşkın deneyimine dayanan bu zorlu meslekte kapsamlı uzmanlığa sahibiz. Korumak için uzman bilgisine ihtiyacınız var, bu yüzden 20 yılı aşkın süredir sürekli olarak yenilik yapıyor, araştırıyor, tasarlıyor ve en iyi çözümleri üretiyoruz, ayrıca ürünlerimizi ve hizmetlerimizi kuruyor, dağıtıyor ve kullanıcıları eğitiyoruz.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                En büyük önceliğimiz: mükemmellik. Hayatı, doktorların ve mühendislerin, teknisyenlerin ve araştırmacıların hayatlarını ve sizin hayatınızı korumak için mükemmellik istiyoruz.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Ada grup, Türkiye merkezli radyasyon koruma çözümleri tasarımcısı ve üreticisidir. Radyasyon koruması alanında küresel bir inovasyon lideri olarak, Türkiye'de yenilikçi ve sürdürülebilir ekonominin itici gücüyüz. En büyük önceliğimiz uzmanlığımızı insanlar ve çevre için kullanmak.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Denizcilik</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Deniz hayranları, Tekne, yat üreticileri ve sahipleri ! Ada grup kuvvetli rüzgarlara teknenizi su üstünde tutmak ve denge sağlamak için her zaman yanınızda, bunun için özel kurşun ağırlıklar üretiyoruz.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">İnşaat</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Ada grup ülkemizde ve farklı coğrafyalarda oluşan doğal depremin etkilerini en aza indiren sismik izolatörlerin kurşun çekirdeklerini üreterek güvenlik anlamında sismik izolatör üreticilerini destek sağlıyoruz. Hastanelerin Nükleer tıp, radyoloji, radyoterapi ve Radyonuklid tedavi ünitelerini IAEA ve TAEK standartlarına uygun, ergonomi, estetik ve en önemlisi güvenliğe önem veren anahtar teslim mimari projeler tasarlıyor, üretiyor ve uyguluyoruz.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
