// PerformanceModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { XLg, ChevronUp, ChevronDown } from 'react-bootstrap-icons'; // Import ikon untuk Spinner

// DUMMY EMPLOYEE LIST
const EMPLOYEE_OPTIONS = [
    { id: 1, name: 'Rayn Reynolds' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Lily Aminah' },
    { id: 4, name: 'Alice Johnson' },
    { id: 5, name: 'Carolina Davis' },
    { id: 6, name: 'Jackson Smith' },
    { id: 7, name: 'Charles Wilson' },
    { id: 8, name: 'Thomas Herve' },
];

// Data Default untuk mode Create
const DEFAULT_FORM_DATA = {
    employeeName: '',
    goalAchievement: 0,
    knowledgeSkills: 0,
    behaviorWorkEthic: 0,
    disciplineReliability: 0,
};

export default function PerformanceModal({ show, handleClose, handleSubmit, initialData }) {
    
    // V PENTING: Gunakan initialData atau DEFAULT_FORM_DATA
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    // V PENTING: useEffect untuk mengisi form saat modal dibuka dalam mode Edit
    useEffect(() => {
        if (show) {
            setFormData(initialData || DEFAULT_FORM_DATA);
        }
    }, [show, initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'employeeName' ? value : parseInt(value) || 0 }));
    };

    const handleSpinnerChange = (name, delta) => {
        setFormData(prev => {
            // Ambil nilai saat ini, pastikan itu angka (default 0 jika bukan)
            const currentValue = parseInt(prev[name]) || 0;
            const newValue = Math.max(0, currentValue + delta); // Batasi minimum 0
            return { ...prev, [name]: newValue };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.employeeName) {
            handleSubmit(formData);
            handleClose();
        } else {
            alert("Mohon pilih karyawan terlebih dahulu.");
        }
    };

    // 🌟 PERUBAHAN UTAMA: Deteksi Mode dan Teks Tombol
    const isEditMode = !!initialData;
    const saveButtonText = isEditMode ? 'Save Changes' : 'Save';

    // Style kustom untuk input yang ada spinner-nya
    const customInputStyle = {
        backgroundColor: '#eff6ff', 
        borderRadius: '10px', 
        border: 'none', 
        height: '43px',
        fontSize: '1rem',
        fontWeight: '500',
        paddingRight: '40px', // Ruang untuk spinner
    };

    // Komponen Input dengan Spinner (sesuai gambar)
    const SpinnerInput = ({ label, name, value }) => (
        <Form.Group className="mb-3" controlId={`form${name}`}>
            <Form.Label className="fw-semibold text-dark">{label}</Form.Label>
            <div className="position-relative">
                <Form.Control
                    type="number"
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    style={customInputStyle}
                />
                {/* Spinner Buttons Container*/}
                <div 
                    className="position-absolute d-flex flex-column" 
                    style={{ 
                        right: '5px', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        zIndex: 100, 
                        pointerEvents: 'auto' 
                        }}>
                    {/* Tombol UP */}
                    <ChevronUp 
                        size={20} 
                        className="text-primary cursor-pointer p-1" 
                        style={{ cursor: 'pointer', lineHeight: '1', height: '20px' }}
                        onClick={() => handleSpinnerChange(name, 1)} 
                    />
                    {/* Tombol DOWN */}
                    <ChevronDown 
                        size={20} 
                        className="text-primary cursor-pointer p-1" 
                        style={{ cursor: 'pointer', lineHeight: '1', height: '20px', marginTop: '-15px' }}
                        onClick={() => handleSpinnerChange(name, -1)} 
                    />
                </div>
            </div>
        </Form.Group>
    );


    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            contentClassName="rounded-4"
            dialogClassName="modal-lg"
        >
            <Modal.Header 
                style={{ borderBottom: 'none', padding: '1.5rem 1.5rem 0.5rem 1.5rem' }}
                closeButton={false}
            >
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Modal.Title className="fw-bold fs-4">Manage Performance</Modal.Title>
                    {/* Tombol Close Kustom */}
                    <Button variant="light" onClick={handleClose} className="rounded-circle p-1" style={{ width: '30px', height: '30px' }}>
                        <XLg size={20} />
                    </Button>
                </div>
            </Modal.Header>
            
            <Modal.Body style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
                <p className="text-muted mb-4">Employee performance is typically evaluated based on the following key categories</p>
                
                <Form onSubmit={onSubmit}>
                    
                    {/* Select Employee */}
                    <Form.Group className="mb-3" controlId="formEmployeeName">
                        <Form.Label className="fw-semibold text-dark">Select Employee</Form.Label>
                        <Form.Select 
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleInputChange}
                            required
                            disabled={isEditMode} // Disabled saat mode Edit agar nama karyawan tidak diubah
                            style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem' }}
                        >
                            <option value="" disabled>Pilih Karyawan...</option>
                            {EMPLOYEE_OPTIONS.map(employee => (
                                <option key={employee.id} value={employee.name}>{employee.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Performance Metrics */}
                    <SpinnerInput 
                        label="Goal Achievement Value" 
                        name="goalAchievement" 
                        value={formData.goalAchievement} 
                    />
                    <SpinnerInput 
                        label="Knowledge & Skill Value" 
                        name="knowledgeSkills" 
                        value={formData.knowledgeSkills} 
                    />
                    <SpinnerInput 
                        label="Behavior & Work Ethic Value" 
                        name="behaviorWorkEthic" 
                        value={formData.behaviorWorkEthic} 
                    />
                    <SpinnerInput 
                        label="Discipline & Reliability Value" 
                        name="disciplineReliability" 
                        value={formData.disciplineReliability} 
                    />

                </Form>
            </Modal.Body>
            
            <Modal.Footer style={{ borderTop: 'none', padding: '0 1.5rem 1.5rem 1.5rem' }}>
                <Button 
                    variant="light" 
                    onClick={handleClose} 
                    style={{ borderRadius: '10px', color: '#2563eb', border: '1px solid #dbeafe', padding: '0.5rem 1.5rem' }}
                    >
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={onSubmit} 
                    style={{ borderRadius: '10px', padding: '0.5rem 1.5rem', fontWeight: 'bold' }}
                    >
                    {/* Menggunakan teks tombol kondisional */}
                    {saveButtonText} </Button>
            </Modal.Footer>
        </Modal>
    );
}