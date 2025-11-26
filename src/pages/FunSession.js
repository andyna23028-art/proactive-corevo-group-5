import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Clock, People, CalendarCheck } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';

// Data Dummy Sesi
const SESSIONS = [
    {
        id: 1,
        title: 'Mind Stretch',
        description: 'Take a short break to clear your mind and boost your creativity.',
        time: 'Today, 3:00 PM',
        duration: '40 min',
        participants: 30,
        host: 'Admin',
        type: 'upcoming', // Key untuk filter
    },
    {
        id: 2,
        title: 'Echo Room',
        description: 'A safe space to express your thoughts and everything else.',
        time: 'Today, 3:05 PM',
        duration: '40 min',
        participants: 30,
        host: 'Admin',
        type: 'upcoming',
    },
    {
        id: 3,
        title: 'Reflect & Grow',
        description: 'Review the week and set goals for the next one.',
        time: 'Yesterday, 10:00 AM',
        duration: '60 min',
        participants: 25,
        host: 'Team Lead',
        type: 'past',
    },
];

// Komponen Card Sesi
const SessionCard = ({ session, isUpcoming }) => {
    const iconColor = isUpcoming ? '#3b82f6' : '#6c757d'; // Warna biru untuk Upcoming
    const bgColor = isUpcoming ? '#eff6ff' : '#f8f9fa';

    return (
        <div className="mb-4 p-4 rounded-3 shadow-sm" style={{ border: `2px solid ${iconColor}`, backgroundColor: bgColor }}>
            <div className="d-flex align-items-center mb-2">
                <CalendarCheck size={24} className="me-3" style={{ color: iconColor }} />
                <div>
                    <h5 className="fw-bold mb-0">{session.title}</h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{session.description}</p>
                </div>
            </div>
            
            <div className="ms-5 ps-1 mt-3 d-flex gap-4 text-muted" style={{ fontSize: '0.9rem' }}>
                <div className="d-flex align-items-center">
                    <Clock size={16} className="me-1" /> {session.time}
                </div>
                <div className="d-flex align-items-center">
                    <Clock size={16} className="me-1" /> {session.duration}
                </div>
                <div className="d-flex align-items-center">
                    <People size={16} className="me-1" /> {session.participants} participants
                </div>
            </div>
            
            <div className="ms-5 ps-1 mt-3 d-flex justify-content-between align-items-center">
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Hosted by {session.host}</span>
                {isUpcoming ? (
                    <Button variant="warning" size="sm" style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: 'black' }}>
                        Start Session
                    </Button>
                ) : (
                    <Button variant="outline-primary" size="sm">
                        View Details
                    </Button>
                )}
            </div>
        </div>
    );
};

export default function FunSession() {
    const [filter, setFilter] = useState('upcoming'); // State untuk filter: 'upcoming' atau 'past'

    const filteredSessions = SESSIONS.filter(session => session.type === filter);
    
    // Perbaikan: Tambahkan logic untuk tombol "Create New" yang hanya muncul di Upcoming.
    const showCreateNew = filter === 'upcoming'; 
    
    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Fun Session" />
            <Container fluid className="mt-4 px-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="fw-bold fs-3">Fun Session</h1>
                        <p className="text-muted">Engage with your team through games and discussions</p>
                    </div>
                    {showCreateNew && (
                        <Button variant="primary" as={Link} to="/funsession/create">
                            Create New
                        </Button>
                    )}
                </div>

                {/* Tombol Filter */}
                <div className="mb-4 d-flex gap-2">
                    <Button 
                        variant={filter === 'upcoming' ? 'primary' : 'outline-primary'}
                        onClick={() => setFilter('upcoming')}
                        className="fw-semibold"
                    >
                        Upcoming
                    </Button>
                    <Button 
                        variant={filter === 'past' ? 'primary' : 'outline-primary'}
                        onClick={() => setFilter('past')}
                        className="fw-semibold"
                    >
                        Past Session
                    </Button>
                </div>

                {/* Daftar Sesi */}
                {filteredSessions.length > 0 ? (
                    filteredSessions.map(session => (
                        <SessionCard 
                            key={session.id} 
                            session={session} 
                            isUpcoming={session.type === 'upcoming'} 
                        />
                    ))
                ) : (
                    <p className="text-center text-muted mt-5">No {filter} sessions found.</p>
                )}
            </Container>
        </>
    );
}