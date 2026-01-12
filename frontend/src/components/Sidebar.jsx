import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Coffee, Key, BookOpen, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // <--- Import Decoder

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('GUEST'); // Default sebelum load

  // --- LOGIC BACA TOKEN ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // Ambil ROLE dari token backend
      } catch (error) {
        console.error("Gagal decode token", error);
      }
    }
  }, []);

  const menus = [
    { title: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { title: 'Browse Coffee', path: '/browse', icon: <Coffee size={20} /> },
    { title: 'API Credentials', path: '/credentials', icon: <Key size={20} /> },
    { title: 'Integration Guide', path: '/docs', icon: <BookOpen size={20} /> },
  ];

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="h-screen w-64 bg-[#0f172a] text-white fixed left-0 top-0 flex flex-col border-r border-slate-800">
      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Coffee size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide">Kopi API</h1>
      </div>

      {/* --- DYNAMIC ROLE BADGE --- */}
      <div className="px-6 py-6">
        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Role Active</div>
        
        {/* Logic Warna: Admin (Merah/Oranye), User (Biru) */}
        <div className={`text-xs font-bold px-3 py-1.5 rounded-md border inline-flex items-center gap-2 ${
          userRole === 'ADMIN' 
            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
             userRole === 'ADMIN' ? 'bg-orange-500' : 'bg-blue-500'
          }`}></div>
          {userRole} ACCOUNT {/* <--- Tampil disini */}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menus.map((menu, index) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={index}
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}>
                {menu.icon}
              </span>
              <span className="text-sm font-medium">{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;