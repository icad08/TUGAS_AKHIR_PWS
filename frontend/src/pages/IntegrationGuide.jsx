import React from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, Terminal, Globe, ShieldCheck, Server } from 'lucide-react';

const IntegrationGuide = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Dokumentasi API</h1>
          <p className="text-slate-500 mt-1">Panduan lengkap integrasi data kopi ke aplikasi pihak ketiga.</p>
        </div>

        <div className="max-w-4xl space-y-8">
          
          {/* 1. OTENTIKASI */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">1. Otentikasi</h2>
            </div>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Setiap request ke endpoint publik harus menyertakan header <code className="text-red-500 font-mono bg-red-50 px-1 rounded">x-api-key</code>.
              Key ini bisa Anda dapatkan di menu <b>API Credentials</b>.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ Penting: Jangan pernah membagikan API Key Anda di client-side code (seperti HTML/JS biasa). Gunakan hanya di server-side.
              </p>
            </div>
          </section>

          {/* 2. BASE URL */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Globe size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">2. Base URL</h2>
            </div>
            <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm flex items-center gap-3">
              <Server size={16} />
              <span>http://localhost:3000/api</span>
            </div>
          </section>

          {/* 3. ENDPOINT REFERENCE */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <Terminal size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">3. Endpoint: List Coffee Shops</h2>
            </div>

            {/* HTTP Method Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded text-sm">GET</span>
              <code className="text-slate-700 font-mono text-sm">/coffee-shops</code>
            </div>

            <p className="text-slate-600 text-sm mb-6">
              Mengambil daftar semua mitra coffee shop beserta menu andalannya.
            </p>

            {/* Grid Contoh Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Request Example */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Contoh Request (cURL)</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono leading-relaxed">
{`curl -X GET http://localhost:3000/api/coffee-shops \\
  -H "x-api-key: YOUR_SECRET_KEY"`}
                  </pre>
                </div>
              </div>

              {/* Response Example */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Contoh Response (JSON)</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto h-48 custom-scrollbar">
                  <pre className="text-xs text-blue-300 font-mono leading-relaxed">
{`[
  {
    "id": 1,
    "name": "Kopi Kenangan Mantan",
    "address": "Jl. Malioboro No. 99",
    "products": [
      {
        "id": 101,
        "name": "Es Kopi Susu",
        "price": 22000
      }
    ]
  },
  ...
]`}
                  </pre>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default IntegrationGuide;