// File: src/components/PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Fungsi untuk mengecek status login.
const useAuth = () => {
    // Pastikan kunci yang diambil sama dengan kunci yang disimpan di SignIn.js.
    // DI SignIn.js Anda menggunakan 'token', jadi kita gunakan 'token' di sini.
    const userToken = localStorage.getItem('token');
    
    // Jika token ada, pengguna dianggap sudah login (authenticated).
    return userToken ? true : false; 
};

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useAuth();
    
    // Konfigurasi Anda di App.js menggunakan PrivateRoute sebagai wrapper:
    // <Route path="/training-report" element={<PrivateRoute><TrainingReport /></PrivateRoute>} />
    // Oleh karena itu, kita hanya perlu bagian `if (children)`.
    
    // Logic: Jika terotentikasi, tampilkan children (TrainingReport). Jika tidak, redirect ke /signin.
    return isAuthenticated ? children : <Navigate to="/signin" replace />;
    
    // Catatan: Karena Anda menggunakan 'children' di App.js, Anda bisa menghapus logic <Outlet />
    // kecuali Anda berencana menggunakan PrivateRoute sebagai layout.
};

export default PrivateRoute;