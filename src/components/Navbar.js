// AppNavbar.js
import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bell, Search } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan CSS Bootstrap diimpor

// --- DEFINISI STYLE DARI FILE SEBELUMNYA (DIPERLUKAN DI SINI) ---

const commonNavLinkStyle = {
    color: '#212529',
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    fontWeight: 400,
    transition: 'none',
    lineHeight: 1.5
};

// Style untuk link yang sedang aktif (misalnya 'Report')
const activeReportLinkStyle = {
    ...commonNavLinkStyle,
    color: '#2563eb',
    fontWeight: 600, 
    backgroundColor: '#eff6ff', 
    // Perubahan Corner Radius di sini
    borderRadius: '9999px', // Corner Radius 15px
    padding: '0.5rem 1rem', 
    borderBottom: 'none', 
    paddingBottom: '0.5rem', 
    
};

// --- DAFTAR RUTE INTERNAL ---
const internalRoutes = [
    { name: 'Home', path: '/home' },
    { name: 'Fun Session', path: '/funsession' },
    { name: 'Performance', path: '/performance' },
    { name: 'Reward', path: '/reward' },
    { name: 'Report', path: '/training-report' }
];

const AppNavbar = ({ isLoggedIn, activePage }) => {

    // Rute yang ditampilkan jika pengguna BELUM login
    const publicRoutes = [
        { name: 'Sign In', path: '/signin' },
        { name: 'Sign Up', path: '/signup' }
    ];

    return (
        <Navbar bg="white" className="border-bottom py-3 sticky-top shadow-sm">
            <Container fluid className="px-4">

                {/* Brand selalu ke root / */}
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 me-5" style={{ color: '#1e3a8a' }}>
                    Corevo
                </Navbar.Brand>

                <Nav className="me-auto gap-3 d-none d-lg-flex align-items-center">
                    {isLoggedIn ? (
                        // Menampilkan Rute Internal jika sudah Login
                        internalRoutes.map((item) => (
                            <Nav.Link
                                key={item.name}
                                as={Link}
                                to={item.path}
                                className="no-link-hover"
                                // Menggunakan activePage untuk menentukan style aktif
                                style={item.name === activePage ? activeReportLinkStyle : commonNavLinkStyle}
                            >
                                {item.name}
                            </Nav.Link>
                        ))
                    ) : (
                        // Menampilkan Rute Publik (Sign In/Up) jika belum Login
                        publicRoutes.map((item) => (
                            <Nav.Link
                                key={item.name}
                                as={Link}
                                to={item.path}
                                style={commonNavLinkStyle}
                            >
                                {item.name}
                            </Nav.Link>
                        ))
                    )}
                </Nav>

                {/* Bagian Kanan Navbar */}
                <div className="d-flex align-items-center gap-4">

                    {isLoggedIn && (
                        // Hanya tampilkan Search dan Bell jika sudah Login
                        <>
                            {/* SEARCH BAR */}
                            <div className="d-none d-lg-block position-relative">
                                <Search className="position-absolute text-muted" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }} size={14} />
                                <Form.Control 
                                type="search" 
                                placeholder="Enter your search request..." 
                                className="ps-5 border-secondary-subtle" 
                                style={{ 
                                    width: '380px', // Lebar 380px
                                    height: '43px', // Tinggi 43px
                                    fontSize: '0.9rem',
                                    borderRadius: '15px', // Corner Radius 15px
                                    lineHeight: '29px' // Membantu meratakan teks placeholder vertikal
                                    }} />
                            </div>
                            
                            {/* NOTIFICATION BELL */}
                            <Bell size={20} className="text-dark cursor-pointer" />
                        </>
                    )}

                    {/* AVATAR PROFIL jika sudah login */}
                    {isLoggedIn ? (
                        <Nav.Link as={Link} to="/profileip" className="p-0">
                            <img src="https://i.pravatar.cc/150?u=user" alt="Profile" className="rounded-circle border" width="40" height="40" style={{ objectFit: 'cover' }} />
                        </Nav.Link>
                    ) : (
                        // Jika belum login, tampilkan Sign In/Up (sudah ada di Nav utama, jadi ini null)
                        null
                    )}
                </div>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;