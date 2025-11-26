import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Form, Table, Modal, Toast, ToastContainer, Popover, OverlayTrigger } from 'react-bootstrap';
// Impor ikon yang diperlukan
import { Bell, Search, PencilSquare, Trash, CheckCircleFill, CameraFill, XCircleFill, DashCircleFill, FileEarmarkPdfFill } from 'react-bootstrap-icons'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// --- DATA DUMMY ---
const EMPLOYEES = [
    { id: 1, name: "Rayn Reynolds", role: "Product Manager", image: "https://i.pravatar.cc/150?u=1", hasData: false },
    { id: 2, name: "John Doe", role: "Software Engineer", image: "https://i.pravatar.cc/150?u=2", hasData: false },
    { id: 3, name: "Lily Aminah", role: "UX Designer", image: "https://i.pravatar.cc/150?u=3", hasData: false },
    { id: 4, name: "Alice Johnson", role: "Product Designer", image: "https://i.pravatar.cc/150?u=4", hasData: false },
    { id: 5, name: "Carolina Davis", role: "HR Specialist", image: "https://i.pravatar.cc/150?u=5", hasData: false },
    { id: 6, name: "Jackson Smith", role: "Data Analyst", image: "https://i.pravatar.cc/130?u=6", hasData: false },
    { id: 7, name: "Charles Wilson", role: "DevOps Engineer", image: "https://i.pravatar.cc/130?u=7", hasData: false },
    { id: 8, name: "Thomas Herve", role: "Marketing Lead", image: "https://i.pravatar.cc/130?u=8", hasData: false },
];

const safeValue = (value) => value || '';

// Daftar semua item navigasi internal (dari LandingPage)
const navItems = ['Home', 'Fun Session', 'Performance', 'Reward', 'Report'];

const TrainingReport = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    // Dummy initial reports (dihapus setelah seleksi employee)
    const [reports, setReports] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingReportId, setEditingReportId] = useState(null);
    
    // --- STATE BARU UNTUK NOTIFIKASI TOAST YANG LEBIH SPESIFIK ---
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastIconColor, setToastIconColor] = useState('text-primary'); // text-primary (blue/new), text-warning (yellow/edit), text-danger (red/delete)
    
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const [formData, setFormData] = useState({
        courseName: '', provider: '', date: '', status: '', score: '', duration: '', certificateId: '', uploadedFile: null, uploadedFileName: ''
    });
    
    // LOGIC Hapus Image/File
    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setFormData({ ...formData, uploadedFile: null, uploadedFileName: '' });
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.value = ''; // Reset input file
        }
    };
    
    // LOGIC Upload Image/File
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                // Batasi ukuran file hingga 5MB
                if (file.size > 5 * 1024 * 1024) { 
                    alert("File terlalu besar. Maksimal 5MB.");
                    event.target.value = null;
                    setFormData({...formData, uploadedFile: null, uploadedFileName: ''});
                    return;
                }
                const fileUrl = URL.createObjectURL(file);
                setFormData({...formData, uploadedFile: fileUrl, uploadedFileName: file.name});
            } else {
                alert("File yang diunggah harus berupa gambar atau PDF.");
                event.target.value = null;
                setFormData({...formData, uploadedFile: null, uploadedFileName: ''});
            }
        }
    };
    
    const handleSelectEmployee = (emp) => {
        setSelectedEmployee(emp);
        setShowDropdown(false);
        // Reset reports to empty list for a newly selected employee (per dummy data logic)
        setReports([]);
    };

    const handleOpenAddModal = () => {
        setIsEditMode(false);
        setEditingReportId(null);
        setFormData({ 
            courseName: '', provider: '', date: '', status: '', score: '', duration: '', 
            certificateId: '', uploadedFile: null, uploadedFileName: '' 
        });
        setShowModal(true);
    }

    const handleOpenEditModal = (report) => {
        setIsEditMode(true);
        setEditingReportId(report.id);

        const statusValue = safeValue(report.status);
        const dateParts = safeValue(report.date).split('/');
        // Konversi DD/MM/YYYY ke YYYY-MM-DD untuk input type="date"
        const dateForInput = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : '';

        setFormData({
            courseName: safeValue(report.course),
            provider: safeValue(report.provider),
            date: dateForInput,
            status: statusValue,
            score: safeValue(report.score).replace('%', ''),
            duration: safeValue(report.duration),
            certificateId: safeValue(report.certId),
            uploadedFile: report.uploadedFile || null, // Ambil file URL/path
            uploadedFileName: report.uploadedFileName || '' // Ambil nama file
        });
        setShowModal(true);
    }

    const handleSaveReport = () => {
        if (!formData.status) {
            alert("Please select a status for the training report.");
            return;
        }

        const dateValue = formData.date;
        let displayDate = 'N/A';

        if (dateValue) {
            const parts = dateValue.split('-'); // YYYY-MM-DD
            if (parts.length === 3) {
                // Konversi kembali ke DD/MM/YYYY untuk tampilan
                displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`; 
            } else {
                displayDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');
            }
        }

        const newReportData = {
            id: isEditMode ? editingReportId : Date.now(),
            course: formData.courseName || "New Training Course",
            provider: formData.provider || "Unknown Provider",
            date: displayDate,
            score: formData.score ? formData.score + "%" : (formData.status === "Completed" ? "N/A" : ""),
            status: formData.status,
            duration: formData.duration || "N/A",
            certId: formData.certificateId || `CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
            uploadedFile: formData.uploadedFile,
            uploadedFileName: formData.uploadedFileName
        };

        if (isEditMode) {
            // --- LOGIC TOAST UNTUK EDIT ---
            setReports(reports.map(r => r.id === editingReportId ? newReportData : r));
            setToastTitle("Training Report Updated");
            setToastMessage("Your changes have been saved.");
            setToastIconColor('text-warning'); // Ganti warna ikon untuk edit (kuning)
        } 
         else {
            // --- LOGIC TOAST UNTUK TAMBAH BARU ---
            // UBAH BARIS DI BAWAH INI: Masukkan newReportData sebelum array reports
            setReports([newReportData, ...reports]); // <--- INI PERUBAHANNYA
            
            setToastTitle("New Training Report Added");
            setToastMessage("The new report has been successfully created."); 
            setToastIconColor('text-primary'); 
             
        }

        setShowModal(false);
        setShowToast(true);
        setEditingReportId(null);
    };

    const handleDelete = (id) => {
        // --- LOGIC TOAST UNTUK HAPUS ---
        setReports(reports.filter(r => r.id !== id));
        setDeleteConfirmId(null);
        setToastTitle("Training Report Deleted");
        setToastMessage("The selected report has been permanently removed.");
        setToastIconColor('text-danger'); // Warna ikon merah untuk hapus
        setShowToast(true);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed':
                return { backgroundColor: '#d1fae5', color: '#047857' };
            case 'In Progress':
            return { backgroundColor: '#fef3c7', color: '#b45309' };
            case 'Planned':
                return { backgroundColor: '#e0f2f1', color: '#0f766e' };
            default:
                return { backgroundColor: '#f1f5f9', color: '#64748b' };
        }
    };

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

    const activeReportLinkStyle = {
    // Mempertahankan properti dasar dari commonNavLinkStyle
    ...commonNavLinkStyle, 
    
    // Properti untuk tampilan badge/tombol aktif
    color: '#2563eb',           
    fontWeight: 600,            
    backgroundColor: '#eff6ff',  
    borderRadius: '0.5rem',     
    padding: '0.5rem 1rem',     
    
    // Menghapus garis bawah lama dan padding terkait
    borderBottom: 'none',       
    paddingBottom: '0.5rem',    
};

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

            {/* --- HEADER SECTION (Dikommentari) --- */}
            {/* ... */}

            {/* --- MAIN CONTENT SECTION --- */}
            <Container className="mt-5 pb-5">
                <h2 className="fw-bold mb-1">Training Report Management</h2>
                <p className="text-muted mb-4 small">Manage employee training records and certification</p>

                {/* 1. SELECTION CARD */}
                <div className="card shadow-sm rounded-4 mb-4" style={{border: '1px solid #c2e0ff'}}>
                    <div className="card-body p-4">
                        <h6 className="fw-bold mb-3 small" style={{ color: '#1e3a8a' }}>Select Employee to Manage Training Reports</h6>

                        <div className="position-relative">
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="d-flex align-items-center px-3 rounded-3"
                                style={{ backgroundColor: '#eff6ff', height: '60px', cursor: 'pointer', border: showDropdown ? '2px solid #3b82f6' : '1px solid #c2e0ff' }}
                            >
                                {selectedEmployee ? (
                                    <div className="d-flex align-items-center gap-3 w-100">
                                        <img src={selectedEmployee.image} alt="User" className="rounded-circle" width="36" height="36" style={{ objectFit: 'cover' }} />
                                        <div className="flex-grow-1">
                                            <div className="fw-bold text-dark small">{selectedEmployee.name}</div>
                                            <div className="text-muted" style={{fontSize: '0.75rem'}}>{selectedEmployee.role}</div>
                                        </div>
                                        <span className="text-primary fw-medium small">{reports.length} Training Report{reports.length !== 1 ? 's' : ''}</span>
                                    </div>
                                ) : (
                                    <span className="text-muted small w-100">Select an employee...</span>
                                )}
                            </div>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="position-absolute w-100 bg-white shadow-lg rounded-3 mt-2 py-2 z-3 border" style={{ top: '100%', maxHeight: '300px', overflowY: 'auto' }}>
                                    {EMPLOYEES.map(emp => (
                                        <div
                                            key={emp.id}
                                            className="d-flex align-items-center gap-3 px-3 py-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSelectEmployee(emp)}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            <img src={emp.image} alt={emp.name} className="rounded-circle" width="30" height="30" style={{ objectFit: 'cover' }} />
                                            <span className="small fw-medium text-dark">{emp.name} <span className='text-muted' style={{fontSize: '0.75rem'}}>({emp.role})</span></span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. REPORT LIST CARD */}
                {selectedEmployee && (
                    <div className="card shadow-sm rounded-4" style={{ minHeight: '400px', border: '1px solid #c2e0ff' }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="fw-bold m-0 small" style={{ color: '#1e3a8a' }}>Training Reports for {selectedEmployee.name}</h6>
                                <Button variant="primary" className="rounded-pill px-4 py-2 fw-medium text-white" style={{fontSize: '0.85rem'}} onClick={handleOpenAddModal}>
                                    + Add Reports
                                </Button>
                            </div>

                            {reports.length === 0 ? (
                                /* EMPTY STATE */
                                <div className="d-flex flex-column align-items-center justify-content-center pt-5 mt-4 text-center" style={{minHeight: '250px'}}>
                                    <div className="text-muted mb-1 small fw-bold">No training reports found for this employee</div>
                                    <div className="text-muted small">Click "+ Add Reports" to create a new report</div>
                                </div>
                            ) : (
                                /* TABLE STATE */
                                <div className="table-responsive">
                                    <Table hover className="align-middle mb-0">
                                        <thead className="text-muted" style={{ backgroundColor: '#eff6ff' }}>
                                            <tr style={{fontSize: '0.8rem'}}>
                                                <th className="py-3 ps-3 border-bottom-0 text-uppercase fw-normal">Course Name</th>
                                                <th className="border-bottom-0 text-uppercase fw-normal">Provider</th>
                                                <th className="border-bottom-0 text-uppercase fw-normal">Completion Date</th>
                                                <th className="border-bottom-0 text-uppercase fw-normal">Score</th>
                                                <th className="border-bottom-0 text-uppercase fw-normal">Status</th>
                                                <th className="text-end pe-3 border-bottom-0 text-uppercase fw-normal">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((report) => {
                                                const statusStyle = getStatusStyle(report.status);
                                                return (
                                                <tr key={report.id} className="border-bottom">
                                                    <td className="ps-3 py-3">
                                                        <div className="fw-bold small text-dark">{report.course}</div>
                                                        <div className="text-muted text-uppercase" style={{fontSize: '0.7rem'}}>ID: {report.certId}</div>
                                                    </td>
                                                    <td className="small text-muted">{report.provider}</td>
                                                    <td className="small text-dark">{report.date}</td>
                                                    <td className="fw-bold small text-primary">{report.score}</td>
                                                    <td>
                                                        <span
                                                            className="small fw-medium rounded-pill px-3 py-1"
                                                            style={{ ...statusStyle, fontSize: '0.75rem' }}
                                                        >
                                                            {report.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-end pe-3">
                                                        {/* BUTTON EDIT */}
                                                        <Button variant="warning" size="sm" className="me-2 text-white rounded-2" style={{width: '32px', height: '32px', padding: 0}}
                                                            onClick={() => handleOpenEditModal(report)}>
                                                            <PencilSquare size={14} />
                                                        </Button>

                                                        {/* POPUP DELETE */}
                                                        <OverlayTrigger
                                                            trigger="click"
                                                            placement="left"
                                                            rootClose
                                                            show={deleteConfirmId === report.id}
                                                            onToggle={(next) => setDeleteConfirmId(next ? report.id : null)}
                                                            overlay={
                                                                <Popover id={`popover-delete-${report.id}`} className="shadow border-0">
                                                                    <Popover.Body className="text-center p-3">
                                                                        <p className="small fw-bold mb-3 text-dark">Are you sure you<br/>want to delete it?</p>
                                                                        <div className="d-flex justify-content-center gap-2">
                                                                            <Button size="sm" variant="outline-secondary" className="px-3 rounded-pill" onClick={() => setDeleteConfirmId(null)}>No</Button>
                                                                            <Button size="sm" variant="danger" className="px-3 rounded-pill" onClick={() => handleDelete(report.id)}>Yes</Button>
                                                                        </div>
                                                                    </Popover.Body>
                                                                </Popover>
                                                            }
                                                        >
                                                            <Button variant="danger" size="sm" className="rounded-2" style={{width: '32px', height: '32px', padding: 0}}>
                                                                <Trash size={14} />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>
                                                )})}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Container>

            {/* --- MODAL FORM --- */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered backdrop="static"
                contentClassName="rounded-4" dialogClassName="p-3"
            >
                <Modal.Body className="p-5">
                    <h4 className="fw-bold mb-1">{isEditMode ? 'Edit Training Report' : 'Add A Training Report'}</h4>
                    <p className="text-muted mb-4 small">Manage an employee training reports for <span className="fw-bold">{selectedEmployee?.name || 'Selected Employee'}</span></p>

                    <Form onSubmit={(e) => { e.preventDefault(); handleSaveReport(); }}>

                        {/* 1. Course Name (Paling Atas) */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="bg-light border-0 py-2"
                                value={formData.courseName}
                                onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                                required
                                />
                        </Form.Group>

                        {/* ROW 1: Completion Date & Provider */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Completion Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className="bg-light border-0 py-2"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Provider</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="bg-light border-0 py-2"
                                        value={formData.provider}
                                        onChange={(e) => setFormData({...formData, provider: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* ROW 2: Status & Score */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Status</Form.Label>
                                    <Form.Select
                                        className="bg-light border-0 py-2"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        required
                                    >
                                        <option value="" disabled>Select status</option>
                                        <option value="Completed">Completed</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Planned">Planned</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Score (%) (Optional)</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            max="100"
                                            className="bg-light border-0 py-2"
                                            value={formData.score}
                                            onChange={(e) => setFormData({...formData, score: e.target.value})}
                                        />
                                        <span className="input-group-text bg-light border-0">%</span>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* ROW 3: Duration & Certificate ID */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="bg-light border-0 py-2"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Certificate ID (Optional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="bg-light border-0 py-2"
                                        value={formData.certificateId}
                                        onChange={(e) => setFormData({...formData, certificateId: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* ROW 4: Upload an Image (Lanjutan) */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Upload Image / PDF Certificate</Form.Label>
                            
                            {formData.uploadedFile ? (
                                <div 
                                    className="position-relative p-0 rounded-3" 
                                    style={{ 
                                        height: '180px', 
                                        overflow: 'hidden', 
                                        cursor: 'pointer',
                                        backgroundColor: '#e9ecef',
                                        border: formData.uploadedFileName.endsWith('.pdf') ? '2px solid #dc3545' : 'none'
                                    }}
                                    onClick={() => document.getElementById('file-upload').click()}
                                >
                                    {formData.uploadedFileName.toLowerCase().endsWith('.pdf') ? (
                                        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 text-center">
                                            <FileEarmarkPdfFill size={48} className="text-danger mb-2" />
                                            <div className="small fw-bold text-dark">{formData.uploadedFileName}</div>
                                            <div className="text-muted small">Click to change PDF</div>
                                        </div>
                                    ) : (
                                        <>
                                            <img 
                                                src={formData.uploadedFile} 
                                                alt="Image Preview" 
                                                className="w-100 h-100 rounded-3" 
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <CameraFill 
                                                size={32} 
                                                className="text-white position-absolute bg-primary rounded-circle p-1 shadow" 
                                                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 1 }} 
                                            />
                                        </>
                                    )}
                                    
                                    <Button 
                                        variant="light" 
                                        size="sm" 
                                        className="position-absolute rounded-circle p-1" 
                                        style={{ top: '10px', right: '10px', width: '30px', height: '30px', zIndex: 10 }}
                                        onClick={handleRemoveImage}
                                    >
                                        <XCircleFill size={18} className="text-danger" />
                                    </Button>
                                </div>
                            ) : (
                                <div 
                                    className="d-flex flex-column align-items-center justify-content-center p-4 rounded-3 text-muted" 
                                    style={{ border: '2px dashed #ccc', height: '180px', cursor: 'pointer', backgroundColor: '#f1f5f9' }}
                                    onClick={() => document.getElementById('file-upload').click()}
                                >
                                    <CameraFill size={28} className="mb-2" />
                                    <div className="small fw-medium">Upload Image or PDF</div>
                                    <div style={{fontSize: '0.7rem'}}>Max file size 5MB</div>
                                </div>
                            )}
                            <Form.Control 
                                type="file" 
                                id="file-upload"
                                accept="image/*, application/pdf"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }} 
                            />
                        </Form.Group>


                        {/* Modal Footer Buttons */}
                        <div className="d-flex justify-content-end gap-2 pt-3">
                            <Button 
                                variant="outline-secondary" 
                                className="rounded-pill px-4" 
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="primary" 
                                className="rounded-pill px-4 text-white" 
                                type="submit"
                            >
                                {isEditMode ? 'Save Changes' : 'Add Report'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>


            {/* --- TOAST NOTIFICATION (DI TENGAH) --- */}
            {/* Menggunakan position="middle-center" untuk menempatkan notifikasi di tengah layar */}
            <ToastContainer 
                position="middle-center" 
                style={{ zIndex: 1080 }} // Pastikan lebih tinggi dari modal
            >
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                    delay={3000} 
                    autohide
                    className={`shadow-lg border-0 rounded-3`}
                    style={{ maxWidth: '300px', backgroundColor: 
                                            toastIconColor === 'text-primary' ? '#e6f7ff' : // Biru (Add/Success)
                                            toastIconColor === 'text-warning' ? '#fffbe6' : // Kuning (Update/Warning)
                                            '#fff1f0' // Merah (Delete/Danger)
                                        }}
                >
                    <Toast.Body className="d-flex align-items-start p-3">
                        <div className={`me-3 mt-1 ${toastIconColor}`}>
                            {toastIconColor === 'text-primary' && <CheckCircleFill size={18} />}
                            {toastIconColor === 'text-warning' && <PencilSquare size={18} />}
                            {toastIconColor === 'text-danger' && <DashCircleFill size={18} />}
                        </div>
                        <div className="flex-grow-1">
                            <div className="fw-bold small mb-1 text-dark">{toastTitle}</div>
                            <div className="small text-muted">{toastMessage}</div>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>

        </div>
    );
}

export default TrainingReport;