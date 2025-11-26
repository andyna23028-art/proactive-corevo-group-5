import React from 'react';
import AppNavbar from './Navbar';
import TrainingReport from '../pages/TrainingReport';

const ReportLayout = () => {
    // Component ini memastikan Navbar selalu tahu bahwa halaman 'Report' sedang aktif
    // Nama "Report" harus match dengan nama item di internalRoutes di Navbar.js
    const ACTIVE_PAGE = "Report"; 

    return (
        <>
            {/* Mengirim prop activePage yang benar */}
            <AppNavbar isLoggedIn={true} activePage={ACTIVE_PAGE} />
            
            {/* Konten Halaman TrainingReport yang sudah ada */}
            <TrainingReport />
        </>
    );
};

export default ReportLayout;