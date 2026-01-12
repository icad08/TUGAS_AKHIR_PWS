import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { MapPin, Coffee, ShoppingBag, AlertCircle } from 'lucide-react';

const BrowseCoffee = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        console.log("Mencoba mengambil data dari backend..."); // Cek Console
        const response = await axios.get('http://localhost:3000/api/coffee-shops');
        
        console.log("Data diterima:", response.data); // Cek Console: Isinya Array atau Object?

        // VALIDASI: Pastikan data yang diterima itu ARRAY (Daftar), bukan Object error
        if (Array.isArray(response.data)) {
          setShops(response.data);
        } else {
          // Kalau backend balikin object aneh, anggap kosong biar gak crash
          console.error("Format data salah! Harusnya Array, tapi dapet:", response.data);
          setShops([]); 
        }
      } catch (err) {
        console.error("Error Fetching:", err);
        setError("Gagal konek ke Backend (Cek apakah server nyala & CORS aktif?)");
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Browse Coffee Shops</h1>
          <p className="text-slate-500 mt-1">Temukan mitra coffee shop terbaik.</p>
        </div>

        {/* State: Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
            <p className="font-bold flex items-center gap-2"><AlertCircle size={20}/> Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* State: Loading */}
        {loading && <p className="text-slate-500">Sedang memuat data...</p>}

        {/* State: Data Kosong */}
        {!loading && !error && shops.length === 0 && (
          <div className="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center">
            <Coffee size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">Belum ada data toko. Coba input lewat Swagger dulu!</p>
          </div>
        )}

        {/* Grid Card Toko */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <div key={shop.id || Math.random()} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
              
              <div className="h-24 bg-slate-800 relative">
                 <div className="absolute -bottom-6 left-6 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white border-2 border-white shadow-lg">
                    <Coffee size={24} />
                 </div>
              </div>

              <div className="pt-8 px-6 pb-6">
                {/* Pakai Optional Chaining (?.) biar kalau datanya null gak crash */}
                <h3 className="text-xl font-bold text-slate-800 mb-1">{shop?.name || "Tanpa Nama"}</h3>
                <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                  <MapPin size={16}/> {shop?.address || "Alamat tidak tersedia"}
                </p>

                {/* List Menu */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <ShoppingBag size={14}/> Menu
                  </h4>
                  
                  {/* Cek apakah products ada isinya */}
                  {shop?.products?.length > 0 ? (
                    <div className="space-y-2">
                      {shop.products.map((product) => (
                        <div key={product.id} className="flex justify-between text-sm bg-slate-50 p-2 rounded">
                          <span className="text-slate-700">{product.name}</span>
                          <span className="font-bold text-blue-600">Rp {product.price?.toLocaleString() || 0}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada menu.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCoffee;