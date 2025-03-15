'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/clientApp';
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

interface Product {
    id: string;
    name?: string;
    description?: string;
    technical?: string;
    summary?: string;
    imageUrl?: string;
}

export default function Product() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const params = useParams();
    const productId = params.productId as string;

    // Function to get array of image URLs from the imageUrl string
    const getImageUrls = (imageUrlString?: string): string[] => {
        if (!imageUrlString) return [];
        return imageUrlString.split('\\n').filter(url => url.trim() !== '');
    };

    // Navigate to the next image
    const nextImage = (imageUrls: string[], isModal = false) => {
        if (isModal) {
            setModalImageIndex((prevIndex) =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    // Navigate to the previous image
    const prevImage = (imageUrls: string[], isModal = false) => {
        if (isModal) {
            setModalImageIndex((prevIndex) =>
                prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
            );
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
            );
        }
    };

    // Open modal with the current image
    const openImageModal = (index: number) => {
        setModalImageIndex(index);
        setIsModalOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    // Close the modal
    const closeImageModal = () => {
        setIsModalOpen(false);
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    };

    // Handle modal click to prevent closing when clicking on the image
    const handleModalClick = (e: React.MouseEvent) => {
        // Only close if clicking on the backdrop (not the image)
        if (e.target === e.currentTarget) {
            closeImageModal();
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(`Fetching product with ID: ${productId}...`);
            try {
                // Debug: Check if db is properly initialized
                console.log("Firestore DB instance:", db);

                const productRef = doc(db, 'products', productId);
                console.log("Product document reference created:", productRef);

                const productSnapshot = await getDoc(productRef);
                console.log("Product snapshot received:", productSnapshot);

                if (productSnapshot.exists()) {
                    const data = productSnapshot.data();
                    console.log("Product data:", data);

                    const productData: Product = {
                        id: productSnapshot.id,
                        name: data.name || null,
                        description: data.description || null,
                        technical: data.technical || null,
                        summary: data.summary || null,
                        imageUrl: data.imageUrl || null,
                    };

                    console.log("Processed product data:", productData);
                    setProduct(productData);
                } else {
                    console.log("No product found with this ID");
                    setError(`Product with ID ${productId} not found`);
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
                setError(`Failed to fetch product: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            setError("Product ID is missing");
            setLoading(false);
        }
    }, [productId]);

    // Display error if there is one
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
                <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-8 shadow-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Ürün Yüklenirken Hata</h1>
                    <p className="text-red-500 mb-2">{error}</p>
                    <p className="text-gray-600">Daha fazla detay için konsolu kontrol edin.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
            <Navbar />
            <div className="max-w-5xl mx-auto  mt-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-8 border-b-2 border-blue-300 pb-2 drop-shadow-sm">
                    Ürün Detayları
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-blue-400 mb-4"></div>
                            <p className="text-blue-600 font-medium">Ürün yükleniyor...</p>
                        </div>
                    </div>
                ) : product ? (
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
                        <div className="p-6 pb-3">
                            <h2 className="text-3xl font-semibold text-gray-800 tracking-tight mb-2">
                                {product.name || 'İsimsiz Ürün'}
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 rounded mb-6"></div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left column - Product details */}
                                <div className="flex-1">
                                    {product.description && (
                                        <div className="mb-8 p-5 rounded-lg border border-blue-200 shadow-sm">
                                            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                                <span className="mr-2"></span>Açıklama
                                            </h3>
                                            {product.description && (
                                                <div className="mb-6">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {product.description?.split('\\n').map((line, index, array) => (
                                                            <span key={index}>
                                                                {line}
                                                                {index < array.length - 1 && <br />}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {product.technical && (
                                        <div className="mb-8 bg-slate-50 p-5 rounded-lg shadow-sm border border-slate-200">
                                            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                                <span className="mr-2"></span>Teknik Detaylar
                                            </h3>
                                            <p className="text-gray-700 font-mono text-sm bg-white p-4 rounded border border-slate-100">
                                                {product.technical?.split('\\n').map((line, index, array) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index < array.length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}

                                    {product.summary && (
                                        <div className="mb-8 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400 shadow-sm">
                                            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                                <span className="mr-2"></span>Özet
                                            </h3>
                                            <div className="text-gray-700 prose">
                                                {product.summary?.split('\\n').map((line, index, array) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index < array.length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right column - Product image */}
                                <div className="md:w-1/3 flex flex-col">
                                    <div className="sticky top-6 bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                                        {product.imageUrl ? (
                                            <>
                                                {(() => {
                                                    const imageUrls = getImageUrls(product.imageUrl);
                                                    return imageUrls.length > 0 ? (
                                                        <div className="relative">
                                                            <div
                                                                className="aspect-square overflow-hidden rounded-lg mb-4 cursor-pointer"
                                                                onClick={() => openImageModal(currentImageIndex)}
                                                            >
                                                                <img
                                                                    src={imageUrls[currentImageIndex]}
                                                                    alt={`${product.name || 'Ürün görseli'} ${currentImageIndex + 1}`}
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>

                                                            {imageUrls.length > 1 && (
                                                                <>
                                                                    {/* Image navigation controls */}
                                                                    <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2">
                                                                        <button
                                                                            onClick={() => prevImage(imageUrls)}
                                                                            className="bg-white/80 hover:bg-white text-blue-600 rounded-full p-1 shadow-md transition-all"
                                                                            aria-label="Önceki görsel"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => nextImage(imageUrls)}
                                                                            className="bg-white/80 hover:bg-white text-blue-600 rounded-full p-1 shadow-md transition-all"
                                                                            aria-label="Sonraki görsel"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>

                                                                    {/* Image indicator dots */}
                                                                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
                                                                        {imageUrls.map((_, index) => (
                                                                            <button
                                                                                key={index}
                                                                                onClick={() => setCurrentImageIndex(index)}
                                                                                className={`h-2 w-2 rounded-full transition-all ${currentImageIndex === index
                                                                                    ? 'bg-blue-600 scale-125'
                                                                                    : 'bg-gray-300 hover:bg-gray-400'
                                                                                    }`}
                                                                                aria-label={`Görsel ${index + 1}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                                            <p className="text-gray-400 text-sm">Görsel bulunamadı</p>
                                                        </div>
                                                    );
                                                })()}

                                                {/* Thumbnail gallery for multiple images */}
                                                {(() => {
                                                    const imageUrls = getImageUrls(product.imageUrl);
                                                    return imageUrls.length > 1 && (
                                                        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                                                            {imageUrls.map((url, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => setCurrentImageIndex(index)}
                                                                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${currentImageIndex === index
                                                                        ? 'border-blue-500 shadow-md'
                                                                        : 'border-transparent hover:border-blue-300'
                                                                        }`}
                                                                >
                                                                    <img
                                                                        src={url}
                                                                        alt={`Küçük görsel ${index + 1}`}
                                                                        className="w-full h-full object-cover cursor-pointer"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent triggering the button's onClick
                                                                            openImageModal(index);
                                                                        }}
                                                                    />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                            </>
                                        ) : (
                                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                                <p className="text-gray-400 text-sm">Görsel bulunamadı</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end">
                                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium">
                                    Ürünlere Dön
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center shadow-md">
                        <p className="text-blue-800 font-medium">
                            Ürün bulunamadı. Lütfen ürünün Firestore veritabanında olup olmadığını kontrol edin.
                        </p>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {isModalOpen && product?.imageUrl && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={handleModalClick}
                >
                    <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
                        {/* Close button */}
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-blue-300 z-10"
                            onClick={closeImageModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image container */}
                        <div className="bg-white/10 rounded-lg overflow-hidden">
                            {(() => {
                                const imageUrls = getImageUrls(product.imageUrl);
                                return (
                                    <div className="relative">
                                        <img
                                            src={imageUrls[modalImageIndex]}
                                            alt={`${product.name || 'Ürün görseli'} ${modalImageIndex + 1} (büyük görünüm)`}
                                            className="w-full h-auto max-h-[80vh] object-contain"
                                        />

                                        {imageUrls.length > 1 && (
                                            <>
                                                {/* Modal navigation controls */}
                                                <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            prevImage(imageUrls, true);
                                                        }}
                                                        className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-md transition-all"
                                                        aria-label="Önceki görsel"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            nextImage(imageUrls, true);
                                                        }}
                                                        className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-md transition-all"
                                                        aria-label="Sonraki görsel"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Modal image counter */}
                        <div className="text-center text-white mt-4">
                            {(() => {
                                const imageUrls = getImageUrls(product.imageUrl);
                                return imageUrls.length > 1 ? (
                                    <p className="font-medium">
                                        {modalImageIndex + 1} / {imageUrls.length}
                                    </p>
                                ) : null;
                            })()}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
