import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Whatsapp, Envelope, House, CalendarCheck, Clock, People } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';

// Card untuk Performance, Training, Fun Session, dll.
const DashboardCard = ({ title, content, link, linkText, style, icon }) => (
    <Card className="shadow-sm border-0 h-100">
        <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
                <h5 className="card-title fw-bold">{title}</h5>
                {link === '/training-report' && <Link to={link} className="text-primary text-decoration-none">See all</Link>}
            </div>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>{content}</p>
            {icon && <div className="mb-3">{icon}</div>}
            {linkText && (
                <Button as={Link} to={link} variant="link" className="p-0 text-white" style={style}>
                    {linkText}
                </Button>
            )}
        </Card.Body>
    </Card>
);

// Card kecil untuk 'Let's Chat'
const ContactCard = ({ icon, title, description }) => (
    <Card className="shadow-sm border-0 mb-3" style={{ borderLeft: '4px solid #4CAF50' }}>
        <Card.Body className="d-flex align-items-center">
            <div className="me-3" style={{ color: '#4CAF50' }}>{icon}</div>
            <div>
                <h6 className="mb-0 fw-semibold">{title}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>{description}</p>
            </div>
        </Card.Body>
    </Card>
);

// Card Fun Session (Small)
const FunSessionCard = () => (
    <Card className="shadow-sm border-0 h-100">
        <Card.Body>
            <h5 className="card-title fw-bold mb-3">Upcoming Fun Session</h5>
            <div className="p-3 rounded-3" style={{ borderLeft: '4px solid #3b82f6', backgroundColor: '#eff6ff' }}>
                <div className="d-flex align-items-center mb-2">
                    <CalendarCheck size={20} className="me-2 text-primary" />
                    <span className="fw-semibold">Mind Stretch</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                    Take a short break to clear your mind and boost your creativity.
                </p>
                <div className="text-end">
                    <Button as={Link} to="/funsession" variant="warning" size="sm" style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: 'black' }}>
                        Start
                    </Button>
                </div>
            </div>
        </Card.Body>
    </Card>
);


export default function Home() {
    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Home" />
            <Container fluid className="mt-4 px-4">
                {/* Header */}
                <h1 className="fw-bold fs-3 text-primary">Good Morning, Mina</h1>
                <p className="text-muted">Plan your day with us!</p>

                <Row className="mb-4">
                    {/* Kolom Kiri - 60% */}
                    <Col lg={7}>
                        {/* 1. Manage Performance */}
                        <div className="mb-4">
                            <DashboardCard
                                title="Manage Performance"
                                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                                link="/performance"
                                linkText="View More"
                                style={{ 
                                    background: 'linear-gradient(to right, #007bff, #00bfff)', 
                                    border: 'none', 
                                    padding: '10px 20px', 
                                    borderRadius: '5px', 
                                    fontWeight: 'bold' 
                                }}
                            />
                        </div>

                        {/* 2. Let's Chat */}
                        <h4 className="fw-bold mb-3">Let's Chat</h4>
                        <Row>
                            <Col md={6}>
                                <ContactCard 
                                    icon={<Whatsapp size={24} />} 
                                    title="Whatsapp Chat" 
                                    description="See if employees approach you by Whatsapp Chat"
                                />
                            </Col>
                            <Col md={6}>
                                <ContactCard 
                                    icon={<Envelope size={24} />} 
                                    title="By Email" 
                                    description="See if employees approach you by Email"
                                />
                            </Col>
                        </Row>
                    </Col>

                    {/* Kolom Kanan - 40% */}
                    <Col lg={5}>
                        {/* 3. Manage Training Reports */}
                        <div className="mb-4">
                            <DashboardCard
                                title="Manage Training Reports"
                                content={
                                    <>
                                        <h6 className="fw-semibold">Work Ethics Training</h6>
                                        <p className="text-muted mb-1">1 Month</p>
                                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                        <div className="d-flex align-items-center text-muted" style={{ fontSize: '0.8rem' }}>
                                            <House size={12} className="me-1" />
                                            Surabaya | 3 months ago
                                        </div>
                                    </>
                                }
                                link="/training-report"
                                linkText="See all" // Ini akan di-render di bagian atas
                            />
                        </div>
                        
                        {/* 4. Unlock Their Wins */}
                        <div className="mb-4">
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Body>
                                    <h5 className="card-title fw-bold">Unlock Their Wins</h5>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>Give badges, points, and exclusive perks as they hit their productivity goals.</p>
                                    <Button as={Link} to="/reward" variant="primary" className="fw-bold">
                                        See All Rewards
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                        
                        {/* 5. Upcoming Fun Session */}
                        <FunSessionCard />
                    </Col>
                </Row>
            </Container>
        </>
    );
}