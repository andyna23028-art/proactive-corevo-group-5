import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { XLg, ChevronUp, ChevronDown } from 'react-bootstrap-icons'; 

// Data Karyawan Dummy
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

// 🌟 KONSTANTA: Batas maksimum nilai penilaian
const MAX_RATING = 5; 

export default function PerformanceModal({ show, handleClose, handleSubmit, initialData }) {
    
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    // 🌟 BARU: State untuk mengontrol pesan validasi
    const [validated, setValidated] = useState(false);

    // useEffect untuk mengisi form saat modal dibuka dalam mode Edit
    useEffect(() => {
        if (show) {
            setFormData(initialData || DEFAULT_FORM_DATA);
            setValidated(false); // Reset validasi saat modal dibuka
        }
    }, [show, initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'employeeName' ? value : parseInt(value) || 0 
        }));
        // Reset validasi saat input berubah
        setValidated(false); 
    };

    // 🌟 PERBAIKAN: Fungsi Spinner dengan batasan nilai 0 - 5
    const handleSpinnerChange = (name, delta) => {
        setFormData(prev => {
            const currentValue = parseInt(prev[name]) || 0;
            let newValue = currentValue + delta;
            
            // Batasi nilai minimum (0) dan maksimum (MAX_RATING = 5)
            newValue = Math.max(0, Math.min(MAX_RATING, newValue)); 

            return { ...prev, [name]: newValue };
        });
    };

    // 🌟 PERBAIKAN: Menggunakan validasi Form Bootstrap
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        // Cek validitas form native HTML5 (menggunakan atribut 'required')
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true); // Tampilkan feedback validasi
            return;
        }

        // Jika validasi sukses
        handleSubmit(formData);
        handleClose();
    };

    // Deteksi Mode dan Teks Tombol
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
        paddingRight: '40px', 
    };

    // Komponen Input dengan Spinner (sudah bagus)
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
                    // 🌟 BARU: Tambahkan required
                    required 
                    // 🌟 BARU: Batasi input langsung ke skala 0-5
                    min={0}
                    max={MAX_RATING}
                />
                <div 
                    className="position-absolute d-flex flex-column" 
                    style={{ 
                        right: '5px', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        zIndex: 100, 
                        pointerEvents: 'auto' 
                    }}>
                    
                    <ChevronUp 
                        size={20} 
                        className="text-primary cursor-pointer p-1" 
                        style={{ cursor: 'pointer', lineHeight: '1', height: '20px' }}
                        onClick={() => handleSpinnerChange(name, 1)} 
                    />
                    
                    <ChevronDown 
                        size={20} 
                        className="text-primary cursor-pointer p-1" 
                        style={{ cursor: 'pointer', lineHeight: '1', height: '20px', marginTop: '-15px' }}
                        onClick={() => handleSpinnerChange(name, -1)} 
                    />
                </div>
            </div>
             {/* 🌟 BARU: Feedback Validasi */}
             <Form.Control.Feedback type="invalid">
                Nilai harus di antara 0 dan {MAX_RATING}.
            </Form.Control.Feedback>
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
                    <Modal.Title className="fw-bold fs-4">{isEditMode ? 'Edit Performance' : 'Create New Performance'}</Modal.Title>
                    <Button variant="light" onClick={handleClose} className="rounded-circle p-1" style={{ width: '30px', height: '30px' }}>
                        <XLg size={20} />
                    </Button>
                </div>
            </Modal.Header>
            
            <Modal.Body style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
                <p className="text-muted mb-4">Employee performance is typically evaluated based on the following key categories</p>
                
                {/* 🌟 PERBAIKAN: Menggunakan Form Bootstrap Validasi */}
                <Form noValidate validated={validated} onSubmit={onSubmit}> 
                    
                    {/* Select Employee */}
                    <Form.Group className="mb-3" controlId="formEmployeeName">
                        <Form.Label className="fw-semibold text-dark">Select Employee</Form.Label>
                        <Form.Select 
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleInputChange}
                            required
                            disabled={isEditMode} 
                            style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem' }}
                        >
                            <option value="" disabled>Pilih Karyawan...</option>
                            {EMPLOYEE_OPTIONS.map(employee => (
                                <option key={employee.id} value={employee.name}>{employee.name}</option>
                            ))}
                        </Form.Select>
                        {/* 🌟 BARU: Feedback Validasi untuk Select */}
                        <Form.Control.Feedback type="invalid">
                            Mohon pilih karyawan terlebih dahulu.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Performance Metrics */}
                    <SpinnerInput 
                        label="Goal Achievement Value (0 - 5)" 
                        name="goalAchievement" 
                        value={formData.goalAchievement} 
                    />
                    <SpinnerInput 
                        label="Knowledge & Skill Value (0 - 5)" 
                        name="knowledgeSkills" 
                        value={formData.knowledgeSkills} 
                    />
                    <SpinnerInput 
                        label="Behavior & Work Ethic Value (0 - 5)" 
                        name="behaviorWorkEthic" 
                        value={formData.behaviorWorkEthic} 
                    />
                    <SpinnerInput 
                        label="Discipline & Reliability Value (0 - 5)" 
                        name="disciplineReliability" 
                        value={formData.disciplineReliability} 
                    />

                    {/* Button Submit (dipindahkan ke Footer, tapi onClick diarahkan ke Form) */}
                    <div style={{ display: 'none' }}>
                        <Button type="submit">Hidden Submit</Button>
                    </div>

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
                    // 🌟 PERBAIKAN: Arahkan ke form submit
                    onClick={onSubmit} 
                    style={{ borderRadius: '10px', padding: '0.5rem 1.5rem', fontWeight: 'bold' }}
                >
                    {saveButtonText} 
                </Button>
            </Modal.Footer>
        </Modal>
    );
}