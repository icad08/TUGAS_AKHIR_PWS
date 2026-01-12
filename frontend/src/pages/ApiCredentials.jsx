import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Key, Copy, AlertTriangle, CheckCircle, RefreshCw, ShieldAlert } from 'lucide-react';

const ApiCredentials = () => {
  const [apiKey, setApiKey] = useState(null);
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ambil Token dari LocalStorage (Nanti kita isi manual)
  const token = localStorage.getItem('token'); 

  // Config Header buat Axios (Biar lolos security backend)
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // 1. Cek Status Key saat halaman dibuka
  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    if (!token) {
      setError("Token tidak ditemukan. Silakan login ulang (Inject Token).");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/api-keys/status', authConfig);
      // Backend ngasih tau: { isActive: true, keyPrefix: "xyz..." }
      if (response.data.isActive) {
        setHasKey(true);
        setApiKey("**************************** (Hidden for Security)");
      } else {
        setHasKey(false);
      }
    } catch (err) {
      console.error("Gagal cek status:", err);
      // Kalau 404 artinya belum punya key
      if (err.response && err.response.status === 404) {
        setHasKey(false);
      } else {
        setError("Gagal memuat status API Key.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Generate Key Baru
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/api-keys/generate', {}, authConfig);
      // Backend mengembalikan FULL KEY cuma SEKALI ini aja
      setApiKey(response.data.apiKey); 
      setHasKey(true);
      setError(null);
      alert("Key berhasil dibuat! Simpan baik-baik karena tidak akan muncul lagi.");
    } catch (err) {
      console.error(err);
      setError("Gagal membuat API Key.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Fungsi Revoke (Matikan Key)
  const handleRevoke = async () => {
    if (!confirm("Yakin ingin mematikan Key ini? Aplikasi Anda yang pakai key ini bakal error!")) return;

    setLoading(true);
    try {
      await axios.put('http://localhost:3000/api/api-keys/revoke', {}, authConfig);
      setHasKey(false);
      setApiKey(null);
      alert("API Key berhasil dimatikan.");
    } catch (err) {
      console.error(err);
      setError("Gagal mematikan API Key.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Fungsi Copy ke Clipboard
  const copyToClipboard = () => {
    if (apiKey && !apiKey.includes("*")) {
      navigator.clipboard.writeText(apiKey);
      alert("Copied to clipboard!");
    } else {
      alert("Key yang tersembunyi tidak bisa dicopy. Generate ulang jika key hilang.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">API Credentials</h1>
          <p className="text-slate-500 mt-1">Kelola kunci rahasia untuk mengakses endpoint API.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3 border border-red-200">
            <AlertTriangle size={20} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-3xl">
          <div className="flex items-start gap-4 mb-6">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Key size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-slate-800">Secret API Key</h3>
               <p className="text-slate-500 text-sm mt-1">
                 Gunakan key ini di header <code className="bg-slate-100 px-2 py-0.5 rounded text-red-500 font-mono text-xs">x-api-key</code> setiap request.
               </p>
             </div>
          </div>

          {/* AREA INPUT KEY */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
            {loading ? (
               <div className="text-center text-slate-400 py-2">Loading...</div>
            ) : hasKey ? (
              // KONDISI: SUDAH PUNYA KEY
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Active Key</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={apiKey} 
                    readOnly 
                    className="flex-1 bg-white border border-slate-300 text-slate-600 text-sm rounded-lg px-4 py-3 font-mono focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <Copy size={18} /> Copy
                  </button>
                </div>
                {apiKey && !apiKey.includes("*") && (
                   <p className="text-green-600 text-xs mt-3 flex items-center gap-1">
                     <CheckCircle size={14} /> Key baru berhasil dibuat. Salin sekarang!
                   </p>
                )}
              </div>
            ) : (
              // KONDISI: BELUM PUNYA KEY
              <div className="text-center py-4">
                <ShieldAlert size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-500 text-sm mb-4">Anda belum memiliki API Key aktif.</p>
                <button 
                  onClick={handleGenerate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/30 transition-all"
                >
                  Generate New Key
                </button>
              </div>
            )}
          </div>

          {/* TOMBOL REVOKE (Hanya muncul kalau punya key) */}
          {hasKey && (
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-700 mb-2">Danger Zone</h4>
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-xs max-w-md">
                  Jika key Anda bocor, segera matikan (Revoke). Tindakan ini akan membuat aplikasi yang menggunakan key lama berhenti bekerja.
                </p>
                <button 
                  onClick={handleRevoke}
                  className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <RefreshCw size={16} /> Revoke & Regenerate
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ApiCredentials;