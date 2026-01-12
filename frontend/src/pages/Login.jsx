import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Tembak API Login Backend
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password
      });

      // DEBUG: Cek apa isi respon dari backend di Console Browser (F12)
      console.log("Respon dari Backend:", response.data);

      // 2. AMBIL TOKEN (Cek dua kemungkinan format nama: camelCase atau snake_case)
      const token = response.data.accessToken || response.data.access_token;

      // Validasi: Kalau token kosong/undefined, jangan lanjut!
      if (!token) {
        throw new Error("Token tidak ditemukan! Cek console untuk detail respon.");
      }

      // 3. Simpan Token Valid ke LocalStorage
      localStorage.setItem('token', token);

      // 4. Redirect ke Dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error("Login Error:", err);
      
      // Tangkap pesan error dari backend jika ada
      if (err.response && err.response.data && err.response.data.message) {
        const msg = Array.isArray(err.response.data.message) 
          ? err.response.data.message[0] 
          : err.response.data.message;
        setError(msg);
      } else if (err.response && err.response.status === 401) {
        setError("Email atau password salah.");
      } else {
        setError(err.message || "Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header Biru */}
        <div className="bg-blue-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Coffee size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
          <p className="text-blue-100 text-sm mt-1">Masuk untuk mengelola data kopi Anda.</p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="admin@kopi.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Processing...' : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          {/* --- 2. TAMBAHAN BUTTON REGISTER --- */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline hover:text-blue-700 transition-colors">
              Daftar Sekarang
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;