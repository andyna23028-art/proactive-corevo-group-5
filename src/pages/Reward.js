import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { HandThumbsUp, PersonSquare } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';

// Data Dummy Riwayat Penghargaan
const RECENT_AWARDS = [
    {
        id: 1,
        name: 'Lily Aminah',
        award: 'Best Employee',
        reason: 'Thank you for giving outstanding work on the new feature launch!',
        time: 'Just now',
        avatar: 'https://i.pravatar.cc/150?u=lilyaminah',
    },
    {
        id: 2,
        name: 'John Doe',
        award: 'Most Active Employee',
        reason: 'Thank you for always willing to help teammates succeed.',
        time: '3 months ago',
        avatar: 'https://i.pravatar.cc/150?u=johndoe',
    },
    {
        id: 3,
        name: 'Thomas Herve',
        award: 'Best Employee',
        reason: 'Thanks for your brilliant solution to the customer feedback system!',
        time: '3 months ago',
        avatar: 'https://i.pravatar.cc/150?u=thomasherve',
    },
];

// Komponen Card Jenis Penghargaan
const RewardTypeCard = ({ icon, title, description }) => (
    <Card className="shadow-sm border-0 h-100">
        <Card.Body className="d-flex align-items-start">
            <div className="me-3 p-3 rounded-3" style={{ backgroundColor: '#eff6ff' }}>
                {icon}
            </div>
            <div>
                <h5 className="fw-bold">{title}</h5>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{description}</p>
            </div>
        </Card.Body>
    </Card>
);

// Komponen Riwayat Penghargaan
const RecentAwardItem = ({ award }) => (
    <div className="d-flex align-items-start p-3 border-bottom">
        <img src={award.avatar} alt={award.name} className="rounded-circle me-3 border" width="50" height="50" style={{ objectFit: 'cover' }} />
        <div>
            <p className="mb-1">
                <span className="fw-bold">{award.name}</span> received <span className="fw-semibold text-primary">{award.award}</span>
            </p>
            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{award.reason}</p>
            <small className="text-secondary">{award.time}</small>
        </div>
    </div>
);


export default function Reward() {
    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Reward" />
            <Container fluid className="mt-4 px-4">
                
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-bold fs-3">Reward</h1>
                        <p className="text-muted">Recognize and celebrate your achievements</p>
                    </div>
                    <Button variant="primary" className="fw-bold">
                        Give Reward
                    </Button>
                </div>

                {/* Reward Types */}
                <h4 className="fw-bold mb-3">Reward Types</h4>
                <Row className="mb-5">
                    <Col md={6}>
                        <RewardTypeCard
                            icon={<HandThumbsUp size={24} className="text-primary" />}
                            title="Best Employee"
                            description="Recognizing the employee with outstanding performance and exceptional results throughout the quarter."
                        />
                    </Col>
                    <Col md={6}>
                        <RewardTypeCard
                            icon={<PersonSquare size={24} className="text-primary" />}
                            title="Most Active Employee"
                            description="Awarded to the employee who shows the highest level of engagement, participation, and enthusiasm during the period."
                        />
                    </Col>
                </Row>

                {/* Recent Awards */}
                <h4 className="fw-bold mb-3">Recent Employees Have Been Awarded</h4>
                <Card className="shadow border-0">
                    <Card.Body className="p-0">
                        {RECENT_AWARDS.map(award => (
                            <RecentAwardItem key={award.id} award={award} />
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}