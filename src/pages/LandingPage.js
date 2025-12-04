import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import landingImage from '../images/landing-page.jpeg';

export default function LandingPage() {

    const styles = {
        wrapper: {
            background: 'white',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        },
        // --- Styles untuk Tombol Sign In / Sign Up ---
        btnAuth: {
            background: 'white',
            color: '#0d6efd',
            border: '2px solid #0d6efd',
            padding: '0.4rem 1.2rem',
            fontWeight: 500,
            transition: '0.25s ease-in-out'
        },
        // --- Styles untuk Hero Section ---
        heroTitle: {
            fontSize: '4rem',
            fontWeight: 700,
            lineHeight: 1.2,
            animation: 'fadeUp 0.8s ease forwards'
        },
        heroSubtitle: {
            fontSize: '1.2rem',
            color: '#6c757d',
            fontWeight: 500,
            marginBottom: '2.5rem',
            animation: 'fadeUp 1s ease forwards'
        },
        // BASE STYLE START BUTTON: **TRANSISI DITAMBAHKAN**
        btnStart: {
            background: 'linear-gradient(to right, #007bff, #00bfff)',
            border: 'none',
            padding: '0.8rem 3rem',
            fontWeight: 600,
            color: 'white',
            // **PENTING:** Transisi untuk background, transform, dan shadow
            transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease', 
            animation: 'fadeUp 1.2s ease forwards'
        },
        heroImage: {
            maxHeight: '450px',
            width: 'auto',
            objectFit: 'contain',
            animation: 'fadeIn 1.2s ease forwards'
        }
    };

    // Daftar semua item navigasi internal: **DIKEMBALIKAN KE ARRAY STRING**
    const navItems = ['Home', 'Fun Session', 'Performance', 'Reward', 'Report'];

    // Style umum untuk Nav.Link internal agar seragam
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

    return (
        <div style={styles.wrapper}>

            {/* --- HEADER SECTION (Navbar Pra-Login Seragam) --- */}
            <Navbar bg="white" className="border-bottom py-3 sticky-top">
                <Container fluid className="px-4">
                    
                    {/* Logo Corevo */}
                    <Navbar.Brand 
                        as={Link} 
                        to="/" 
                        className="fw-bold fs-3 me-5" 
                        style={{ color: '#1e3a8a' }}
                    >
                        Corevo
                    </Navbar.Brand>
                    
                    {/* Tautan Navigasi Internal - LOGIKA ASLI DIKEMBALIKAN */}
                    <Nav className="me-auto gap-3 d-none d-lg-flex align-items-center">
                        
                        {/* Semua Tautan Menggunakan Style Seragam dan Otomatis Path */}
                        {navItems.map((item) => (
                            <Nav.Link 
                                key={item} 
                                as={Link} 
                                // LOGIKA PATH OTOMATIS ANDA YANG ASLI
                                to={`/${item.toLowerCase().replace(' ', '-')}`} 
                                className="nav-link-base" 
                                style={commonNavLinkStyle}
                            >
                                {item}
                            </Nav.Link>
                        ))}
                        
                    </Nav>

                    {/* Tombol Sign In / Sign Up */}
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            as={Link}
                            to="/signin"
                            className="rounded-pill"
                            style={styles.btnAuth}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#0d6efd';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'white';
                                e.target.style.color = '#0d6efd';
                            }}
                        >
                            Sign In
                        </Button>

                        <Button
                            as={Link}
                            to="/signup"
                            className="rounded-pill"
                            style={styles.btnAuth}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#0d6efd';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'white';
                                e.target.style.color = '#0d6efd';
                            }}
                        >
                            Sign Up
                        </Button>
                    </div>

                </Container>
            </Navbar>

            {/* HERO SECTION */}
            <Container className="flex-grow-1 d-flex align-items-center py-5">
                <Row className="w-100 align-items-center">

                    <Col md={6} className="text-center text-md-start pe-md-5">
                        <h1 style={styles.heroTitle}>
                            Get <span className="text-primary">Focus</span>
                        </h1>
                        <h1 style={styles.heroTitle}>Less Stress.</h1>

                        <p style={styles.heroSubtitle}>
                            Grow from the Core
                        </p>

                        <Button
                            as={Link}
                            to="/signup"
                            size="lg"
                            className="rounded-pill btn-start-style" // **GUNAKAN CLASS UNTUK HOVER**
                            style={styles.btnStart}
                            // **HAPUS onMouseEnter/onMouseLeave INLINE**
                        >
                            Start
                        </Button>
                    </Col>

                    <Col md={6} className="text-center mt-5 mt-md-0 d-none d-md-block">
                        <img
                            src={landingImage}
                            alt="Landing Illustration"
                            style={styles.heroImage}
                        />
                    </Col>

                </Row>
            </Container>

            {/* ANIMASI KEYFRAMES & OVERRIDE CSS */}
            <style>
                {`
                    /* NAV LINK: Menonaktifkan efek hover Nav.Link standar */
                    .navbar .nav-link.nav-link-base:hover, 
                    .navbar .nav-link.nav-link-base:focus {
                        color: #212529 !important; 
                        background-color: transparent !important; 
                        text-decoration: none !important; 
                    }
                    
                    /* BUTTON START: Hover Style */
                    .btn-start-style:hover,
                    .btn-start-style:focus {
                        /* Efek Transform & Shadow */
                        transform: scale(1.05) !important;
                        box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4) !important;
                        /* Perubahan Warna: Ganti gradient dengan warna solid biru yang sedikit lebih tua */
                        background: #0056b3 !important; 
                    }

                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}
            </style>

        </div>
    );
}