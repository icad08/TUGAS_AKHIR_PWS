import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrowseCoffee from './pages/BrowseCoffee';
import ApiCredentials from './pages/ApiCredentials';
import IntegrationGuide from './pages/IntegrationGuide';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Route Public (Bisa diakses tanpa login) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. AREA TERLARANG (Diproteksi PrivateRoute) */}
        <Route element={<PrivateRoute />}>
          {/* Kalau user buka root '/', otomatis lempar ke dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Daftar Menu Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<BrowseCoffee />} />
          <Route path="/credentials" element={<ApiCredentials />} />
          <Route path="/docs" element={<IntegrationGuide />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;