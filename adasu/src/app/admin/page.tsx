"use client";

import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [technical, setTechnical] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEnglish, setIsEnglish] = useState(false);

  const categories = {
    tr: [
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
    ],
    en: [
      'PHARMACEUTICAL PRODUCTION FACILITIES',
      'NUCLEAR MEDICINE',
      'RADIOLOGY',
      'RADIOTHERAPY',
      'NON-DESTRUCTIVE TESTING',
      'NUCLEAR RESEARCH FACILITIES',
      'CONSTRUCTION',
      'MARINE',
      'METAL AND MINING',
      'R&D'
    ]
  };

  const translations = {
    tr: {
      adminLogin: 'Yönetici Girişi',
      username: 'Kullanıcı Adı',
      password: 'Şifre',
      login: 'Giriş Yap',
      invalidCredentials: 'Geçersiz kullanıcı adı veya şifre',
      addProduct: 'Yeni Ürün Ekle',
      logout: 'Çıkış Yap',
      category: 'Kategori*',
      selectCategory: 'Kategori Seçin',
      productName: 'Ürün Adı*',
      summary: 'Özet',
      description: 'Açıklama',
      technical: 'Teknik Detaylar',
      addProductButton: 'Ürün Ekle',
      loading: 'Ekleniyor...',
      productRequired: 'Ürün adı gereklidir',
      categoryRequired: 'Kategori seçimi gereklidir',
      success: 'Ürün başarıyla eklendi!',
      error: 'Ürün ekleme sırasında bir hata oluştu'
    },
    en: {
      adminLogin: 'Admin Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      invalidCredentials: 'Invalid username or password',
      addProduct: 'Add New Product',
      logout: 'Logout',
      category: 'Category*',
      selectCategory: 'Select Category',
      productName: 'Product Name*',
      summary: 'Summary',
      description: 'Description',
      technical: 'Technical Details',
      addProductButton: 'Add Product',
      loading: 'Adding...',
      productRequired: 'Product name is required',
      categoryRequired: 'Category selection is required',
      success: 'Product added successfully!',
      error: 'An error occurred while adding the product'
    }
  };

  const t = translations[isEnglish ? 'en' : 'tr'];
  const currentCategories = categories[isEnglish ? 'en' : 'tr'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(t.invalidCredentials);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const convertToSlug = (text: string) => {
    // Convert Turkish characters to English equivalents
    const turkishChars: Record<string, string> = {
      'ğ': 'g', 'Ğ': 'G', 'ü': 'u', 'Ü': 'U', 'ş': 's', 'Ş': 'S',
      'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ç': 'c', 'Ç': 'C'
    };
    
    // Replace Turkish characters and convert to lowercase
    const normalizedText = text.toLowerCase().replace(
      /[ğĞüÜşŞıİöÖçÇ]/g, 
      match => turkishChars[match] || match
    );
    
    // Replace spaces with dashes and remove other special characters
    return normalizedText.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Handle text area key press to preserve line breaks
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const cursorPosition = target.selectionStart;
      const currentValue = target.value;
      
      // Insert actual newline character at cursor position
      const newValue = 
        currentValue.substring(0, cursorPosition) + 
        '\n' + 
        currentValue.substring(cursorPosition);
      
      // Update the corresponding state based on target id
      switch (target.id) {
        case 'summary':
          setSummary(newValue);
          break;
        case 'description':
          setDescription(newValue);
          break;
        case 'technical':
          setTechnical(newValue);
          break;
      }
      
      // Set cursor position after the inserted newline
      setTimeout(() => {
        target.selectionStart = cursorPosition + 1;
        target.selectionEnd = cursorPosition + 1;
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (!name.trim()) {
        throw new Error(t.productRequired);
      }

      if (!selectedCategory) {
        throw new Error(t.categoryRequired);
      }

      const slug = convertToSlug(name);
      
      // First, get the current products list from the category
      const categoryRef = doc(db, 'pages', selectedCategory);
      const categoryDoc = await getDoc(categoryRef);
      const currentProducts = categoryDoc.exists() ? categoryDoc.data().products || '' : '';
      
      // Add the new product to the list with escaped newline
      const updatedProducts = currentProducts + name + ' \\n';
      
      // Update the category document with the new products list
      await setDoc(categoryRef, {
        products: updatedProducts
      }, { merge: true });

      // Also store the product details in the products collection
      const productRef = doc(collection(db, 'products'), slug);
      await setDoc(productRef, {
        name,
        category: selectedCategory,
        description: description.replace(/\n/g, '\\n'),
        summary: summary.replace(/\n/g, '\\n'),
        technical: technical.replace(/\n/g, '\\n')
      });

      // Clear form fields
      setName('');
      setDescription('');
      setSummary('');
      setTechnical('');
      setSelectedCategory('');
      setMessage({ text: t.success, type: 'success' });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage({ 
        text: error instanceof Error ? error.message : t.error, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{t.adminLogin}</h1>
        <form onSubmit={handleLogin} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="username" className="block text-base font-semibold text-gray-800 mb-2">
              {t.username}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-gray-800 mb-2">
              {t.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {authError && (
            <div className="text-red-600 text-sm">{authError}</div>
          )}
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded font-semibold text-base hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t.login}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t.addProduct}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-gray-600 text-white rounded font-semibold text-sm hover:bg-gray-700 transition-colors"
          >
            {isEnglish ? 'TR' : 'EN'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            {t.logout}
          </button>
        </div>
      </div>
      
      {message.text && (
        <div className={`mb-4 p-4 rounded font-medium text-base ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-400' : 'bg-red-100 text-red-800 border border-red-400'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="category" className="block text-base font-semibold text-gray-800 mb-2">
            {t.category}
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">{t.selectCategory}</option>
            {currentCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="name" className="block text-base font-semibold text-gray-800 mb-2">
            {t.productName}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="summary" className="block text-base font-semibold text-gray-800 mb-2">
            {t.summary}
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={t.summary}
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-base font-semibold text-gray-800 mb-2">
            {t.description}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium h-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={t.description}
          />
        </div>
        
        <div>
          <label htmlFor="technical" className="block text-base font-semibold text-gray-800 mb-2">
            {t.technical}
          </label>
          <textarea
            id="technical"
            value={technical}
            onChange={(e) => setTechnical(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium h-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={t.technical}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded font-semibold text-base hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? t.loading : t.addProductButton}
        </button>
      </form>
    </div>
  );
} 