import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [apiKey, setApiKey] = useState('');
  const [keyStatus, setKeyStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Cek Token & Ambil Data saat halaman dibuka
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Tendang kalau gak ada token
      return;
    }

    fetchKeyStatus(token);
    // Kita ambil data user dari token (decoding sederhana atau panggil API profile kalau ada)
    // Untuk simpelnya, kita anggap user sudah login valid.
  }, []);

  // 2. Fungsi Cek Status Key (Aktif/Tidak)
  const fetchKeyStatus = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3000/api/api-keys/status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKeyStatus(response.data);
    } catch (err) {
      console.error("Gagal ambil status key", err);
    }
  };

  // 3. Fungsi Generate Key Baru
  const handleGenerate = async () => {
    const confirm = window.confirm("Generate Key baru akan mematikan Key lama. Lanjut?");
    if (!confirm) return;

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/api/api-keys/generate', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApiKey(response.data.apiKey); // Tampilkan Key Baru
      fetchKeyStatus(token!); // Refresh status
      alert("API Key berhasil dibuat! Simpan baik-baik.");
    } catch (err) {
      alert("Gagal generate key");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-blue-600">☕ Kopi API Developer</span>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard API Key</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Kelola akses API project kamu di sini.</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {/* Status Section */}
            <div className="mb-6">
              <span className="block text-sm font-medium text-gray-700">Status Key Saat Ini:</span>
              {keyStatus ? (
                <div className="mt-2 flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${keyStatus.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {keyStatus.isActive ? 'AKTIF' : 'NON-AKTIF'}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">Prefix: {keyStatus.prefix}****************</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400 italic">Belum ada API Key.</span>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Generate New API Key'}
            </button>

            {/* RESULT BOX (PENTING) */}
            {apiKey && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h4 className="text-sm font-bold text-yellow-800 mb-2">⚠ PERHATIAN: COPY API KEY INI SEKARANG!</h4>
                <p className="text-xs text-yellow-700 mb-2">Key ini tidak akan muncul lagi setelah halaman di-refresh.</p>
                <div className="flex items-center bg-white border border-gray-300 rounded p-2">
                  <code className="text-sm text-gray-800 font-mono break-all select-all">{apiKey}</code>
                </div>
              </div>
            )}
          </div>
          
          {/* Documentation Link */}
          <div className="px-4 py-4 sm:px-6 bg-gray-50">
            <p className="text-sm text-gray-500">
              Gunakan key di atas pada Header <b>x-api-key</b>. 
              <br />
              Dokumentasi API lengkap bisa dilihat di <a href="http://localhost:3000/api/docs" target="_blank"className="text-blue-600 hover:underline">(klik disini)</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;