import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  
  // 1. STATE BUAT NYIMPAN STATISTIK
  const [stats, setStats] = useState({
    totalRequest: 0,
    growth: '0%',
    totalShops: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Logic Ambil Nama User
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || 'User');
        
        // 2. TEMBAK API STATISTIK
        fetchStats(token); 
      } catch (error) {
        console.error("Token invalid");
      }
    }
  }, []);

  // Fungsi Fetch ke Backend
  const fetchStats = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data); // Simpan data dari backend ke State
    } catch (err) {
      console.error("Gagal ambil statistik:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Developer Console</h1>
            <p className="text-slate-500 mt-1 text-sm">Monitor penggunaan API dan status server Anda.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-slate-700">Halo, {userName.toUpperCase()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* CARD 1: TOTAL REQUEST (DINAMIS) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Total Data Entities</div>
            <div className="flex justify-between items-end">
              {/* TAMPILKAN ANGKA DARI STATE */}
              <h2 className="text-4xl font-bold text-slate-800">{stats.totalRequest}</h2>
              <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-xs font-bold border border-blue-100">
                {stats.growth} Growth
              </span>
            </div>
          </div>

          {/* CARD 2: PAKET API */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Paket API</div>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-blue-600">Free Tier</h2>
                <p className="text-xs text-slate-400 mt-1">Limit: 100 hit / hari</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">👑</span>
              </div>
            </div>
          </div>

          {/* CARD 3: STATUS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Server Status</div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-500">Operational</h2>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-600">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Promo */}
        <div className="bg-[#0f172a] rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded mb-3 inline-block uppercase tracking-wider">Recommended Plan</span>
            <h3 className="text-2xl font-bold mb-3">Unlock Unlimited Possibilities</h3>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">Dapatkan akses tanpa batas ke semua endpoint kopi premium, prioritas support 24/7, dan limit request hingga 50.000 hit per bulan.</p>
            <button className="bg-white text-slate-900 hover:bg-blue-50 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg">Upgrade ke Pro Plan ⚡</button>
          </div>
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute right-20 bottom-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;