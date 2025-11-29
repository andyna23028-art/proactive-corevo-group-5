// ProfileIP.js

import React, { useState } from 'react';
import { Container, Button, Card, Row, Col, Form, Nav } from 'react-bootstrap';
import { Envelope, Phone, Calendar, GeoAlt, Briefcase, Person } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar'; // Pastikan path benar

// Data Dummy Profil (Sesuaikan dengan data yang Anda butuhkan)
const INITIAL_PROFILE_DATA = {
    name: 'Mina Muadi',
    title: 'Human Resource Staff',
    department: 'Human Resource',
    location: 'Surabaya',
    joinedDate: '10/02/2023',
    manager: 'Anna Horan',
    dateJoined: '10/02/2024',
    email: 'minamuadi@admin.com',
    phone: '081456789110',
    dateOfBirth: '1990-05-20', // Format YYYY-MM-DD untuk input date
    employeeId: 'EMP-2024-0156',
    bio: 'Passionate human resource development with 5+ years of experience in building environment. Love collaborating with teams and mentoring junior HR staff.',
    profilePicture: '/images/profile-mina.jpg', // Ganti dengan path gambar profil yang benar
};

export default function ProfileIP() {
    const [profileData, setProfileData] = useState(INITIAL_PROFILE_DATA);
    const [formData, setFormData] = useState(INITIAL_PROFILE_DATA);
    const [isEditing, setIsEditing] = useState(false); 
    const [activeTab, setActiveTab] = useState('personal'); 

    const handleEditClick = () => {
        setFormData(profileData); 
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false); 
        setFormData(profileData); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // --- LOGIKA SIMPAN KE API DI SINI ---
        // Contoh: api.put('/user/profile', formData);
        
        setProfileData(formData); 
        setIsEditing(false);
        // alert('Profil berhasil diperbarui!');
    };
    
    // --- Komponen Tampilan Utama Profil (Card Atas) ---
    const ProfileHeader = ({ data, handleEdit }) => (
        <Card className="shadow-sm rounded-4 p-4 mb-4" style={{ border: '1px solid #c2e0ff' }}>
            <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                    {/* Gambar Profil */}
                    <img 
                        src={data.profilePicture || 'placeholder.jpg'} // Gunakan placeholder jika tidak ada gambar
                        alt={data.name} 
                        className="rounded-circle me-4" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div>
                        <h2 className="fw-bold fs-4 mb-1">{data.name}</h2>
                        <p className="text-muted mb-1">{data.title}</p>
                        <div 
                            className="px-3 py-1 text-primary fw-bold" 
                            style={{ 
                                backgroundColor: '#dbeafe', 
                                borderRadius: '5px', 
                                fontSize: '0.8rem', 
                                display: 'inline-block' 
                            }}
                        >
                            {data.employeeId}
                        </div>
                    </div>
                </div>
                <Button variant="primary" onClick={handleEdit} className="fw-semibold" style={{ borderRadius: '10px' }}>
                    Edit Profile
                </Button>
            </div>
            
            <p className="mt-3">{data.bio}</p>

            <div className="d-flex flex-wrap gap-4 text-muted pt-3 border-top mt-3">
                <div className="d-flex align-items-center"><Briefcase size={16} className="me-2" />{data.department}</div>
                <div className="d-flex align-items-center"><GeoAlt size={16} className="me-2" />{data.location}</div>
                <div className="d-flex align-items-center"><Calendar size={16} className="me-2" />Joined {data.joinedDate}</div>
            </div>
        </Card>
    );

    // --- Komponen Tab Personal Info (View Mode) ---
    const PersonalInfoView = ({ data }) => (
        <Card className="p-4 rounded-4" style={{ border: '1px solid #c2e0ff' }}>
            <h3 className="fs-5 fw-semibold mb-3">Personal Information</h3>
            <Row>
                <Col md={6} className="mb-3">
                    <p className="text-muted mb-0 d-flex align-items-center"><Envelope size={18} className="me-2 text-primary" /> Email Address</p>
                    <p className="fw-medium">{data.email}</p>
                </Col>
                <Col md={6} className="mb-3">
                    <p className="text-muted mb-0 d-flex align-items-center"><Phone size={18} className="me-2 text-primary" /> Phone Number</p>
                    <p className="fw-medium">{data.phone}</p>
                </Col>
                <Col md={6}>
                    <p className="text-muted mb-0 d-flex align-items-center"><Calendar size={18} className="me-2 text-primary" /> Date of Birth</p>
                    <p className="fw-medium">{data.dateOfBirth}</p>
                </Col>
                <Col md={6}>
                    <p className="text-muted mb-0 d-flex align-items-center"><GeoAlt size={18} className="me-2 text-primary" /> Location</p>
                    <p className="fw-medium">{data.location}</p>
                </Col>
            </Row>
        </Card>
    );
    
    // --- Komponen Tab Work Details (View Mode) ---
    const WorkDetailsView = ({ data }) => (
        <Card className="p-4 rounded-4" style={{ border: '1px solid #c2e0ff' }}>
            <h3 className="fs-5 fw-semibold mb-3">Work Details</h3>
            <Row>
                <Col md={6} className="mb-3">
                    <p className="text-muted mb-0 d-flex align-items-center"><Briefcase size={18} className="me-2 text-primary" /> Job Title</p>
                    <p className="fw-medium">{data.title}</p>
                </Col>
                <Col md={6} className="mb-3">
                    <p className="text-muted mb-0 d-flex align-items-center"><Briefcase size={18} className="me-2 text-primary" /> Department</p>
                    <p className="fw-medium">{data.department}</p>
                </Col>
                <Col md={6}>
                    <p className="text-muted mb-0 d-flex align-items-center"><Person size={18} className="me-2 text-primary" /> Manager</p>
                    <p className="fw-medium">{data.manager}</p>
                </Col>
                <Col md={6}>
                    <p className="text-muted mb-0 d-flex align-items-center"><Calendar size={18} className="me-2 text-primary" /> Date Joined</p>
                    <p className="fw-medium">{data.dateJoined}</p>
                </Col>
            </Row>
        </Card>
    );

    // --- Komponen Formulir Edit (Edit Mode) ---
    const ProfileEditForm = ({ data, handleChange, handleSave, handleCancel }) => (
        <Form onSubmit={handleSave}>
            <Card className="shadow-sm rounded-4 p-4 mb-4" style={{ border: '1px solid #c2e0ff' }}>
                <h3 className="fs-5 fw-bold mb-4">Edit Profile Information</h3>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Nama Lengkap</Form.Label>
                            <Form.Control type="text" name="name" value={data.name} onChange={handleChange} required style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email Address</Form.Label>
                            <Form.Control type="email" name="email" value={data.email} onChange={handleChange} required style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Phone Number</Form.Label>
                            <Form.Control type="tel" name="phone" value={data.phone} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Date of Birth</Form.Label>
                            <Form.Control type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Location</Form.Label>
                            <Form.Control type="text" name="location" value={data.location} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Job Title</Form.Label>
                            <Form.Control type="text" name="title" value={data.title} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Department</Form.Label>
                            <Form.Control type="text" name="department" value={data.department} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Manager</Form.Label>
                            <Form.Control type="text" name="manager" value={data.manager} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} name="bio" value={data.bio} onChange={handleChange} style={{ borderRadius: '8px' }}/>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end mt-3">
                    <Button variant="outline-secondary" onClick={handleCancel} className="me-2" style={{ borderRadius: '10px' }}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" style={{ borderRadius: '10px' }}>
                        Save Changes
                    </Button>
                </div>
            </Card>
        </Form>
    );

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Profile" /> 

            <Container fluid className="mt-4 px-4">
                <h1 className="fw-bold fs-3 mb-1">My Profile</h1>
                <p className="text-muted mb-4">Manage your personal information and preferences</p>

                {isEditing ? (
                    // --- MODE EDIT ---
                    <ProfileEditForm 
                        data={formData} 
                        handleChange={handleInputChange} 
                        handleSave={handleSave} 
                        handleCancel={handleCancelClick} 
                    />
                ) : (
                    // --- MODE VIEW ---
                    <>
                        {/* Tombol Edit Profile ada di dalam ProfileHeader */}
                        <ProfileHeader data={profileData} handleEdit={handleEditClick} />
                        
                        {/* Nav Tabs */}
                        <Nav variant="pills" defaultActiveKey="personal" onSelect={(k) => setActiveTab(k)} className="mb-4">
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="personal" 
                                    className="fw-semibold px-3 py-2 me-2"
                                    style={{ 
                                        borderRadius: '10px', 
                                        backgroundColor: activeTab === 'personal' ? '#2563eb' : 'transparent',
                                        color: activeTab === 'personal' ? 'white' : 'black',
                                        border: activeTab === 'personal' ? 'none' : '1px solid #e5e7eb'
                                    }}
                                >
                                    Personal Info
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="work" 
                                    className="fw-semibold px-3 py-2"
                                    style={{ 
                                        borderRadius: '10px', 
                                        backgroundColor: activeTab === 'work' ? '#2563eb' : 'transparent',
                                        color: activeTab === 'work' ? 'white' : 'black',
                                        border: activeTab === 'work' ? 'none' : '1px solid #e5e7eb'
                                    }}
                                >
                                    Work Details
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        
                        {/* Content Berdasarkan Tab */}
                        {activeTab === 'personal' && <PersonalInfoView data={profileData} />}
                        {activeTab === 'work' && <WorkDetailsView data={profileData} />}
                    </>
                )}
            </Container>
        </>
    );
}