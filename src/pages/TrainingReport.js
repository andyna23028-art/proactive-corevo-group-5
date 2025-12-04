import React, { useState } from 'react';
import { Container, Button, Table, Modal, ToastContainer, Toast, Popover, OverlayTrigger } from 'react-bootstrap';
import { PencilSquare, Trash, CheckCircleFill, DashCircleFill } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// Arahkan ke folder components:
import ReportModal from '../components/ReportModal.js';

// --- DATA DUMMY (Tetap di sini) ---
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

// 🔔 KOMPONEN ACTION TOAST (POSISI KANAN BAWAH) 🔔
const ActionToast = ({ show, handleClose, title, message, icon: IconComponent, variant }) => {
    let bgColor, iconColor, borderColor;

    switch (variant) {
        case 'added':
            bgColor = '#e6f7ff';
            iconColor = '#1890ff';
            borderColor = '#91d5ff';
            break;
        case 'updated':
            bgColor = '#fffbe6';
            iconColor = '#faad14';
            borderColor = '#ffe58f';
            break;
        case 'deleted':
            bgColor = '#fff1f0';
            iconColor = '#f5222d';
            borderColor = '#ffa39e';
            break;
        default:
            bgColor = '#e6f7ff';
            iconColor = '#1890ff';
            borderColor = '#91d5ff';
    }

    return (
        <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1080 }}>
            <Toast
                onClose={handleClose}
                show={show}
                delay={3000}
                autohide
                className="shadow-lg border-0"
                style={{
                    backgroundColor: bgColor,
                    border: `1px solid ${borderColor}`,
                    color: '#000',
                    borderRadius: '8px',
                    width: '350px',
                }}
            >
                <Toast.Body className="d-flex align-items-start p-3">
                    {IconComponent && (
                        <IconComponent size={20} className="me-3 mt-1" style={{ color: iconColor }} />
                    )}

                    <div>
                        <p className="mb-1 fw-bold" style={{ fontSize: '0.9rem' }}>
                            {title}
                        </p>
                        <small style={{ fontSize: '0.8rem' }}>
                            {message}
                        </small>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};


const TrainingReport = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [reports, setReports] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingReportId, setEditingReportId] = useState(null);

    // --- STATE UNTUK NOTIFIKASI TOAST ---
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState(null); // Menyimpan komponen Icon
    const [toastVariant, setToastVariant] = useState('added'); // added, updated, deleted

    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // Initial state untuk form, akan dikirim ke ReportModal
    const [formData, setFormData] = useState({
        courseName: '', provider: '', date: '', status: '', score: '', duration: '', certificateId: '', uploadedFile: null, uploadedFileName: ''
    });

    // Fungsi untuk menampilkan Toast
    const triggerToast = (title, message, icon, variant) => {
        setToastTitle(title);
        setToastMessage(message);
        setToastIcon(() => icon);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleCloseToast = () => setShowToast(false);
    
    // LOGIC Hapus Image/File (Dibutuhkan ReportModal, tapi state-nya di sini)
    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setFormData({ ...formData, uploadedFile: null, uploadedFileName: '' });
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.value = ''; // Reset input file
        }
    };

    // LOGIC Upload Image/File (Dibutuhkan ReportModal, tapi state-nya di sini)
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/') || file.type === 'application/pdf') {
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
        // Konversi DD/MM/YYYY menjadi YYYY-MM-DD untuk input type="date"
        const dateForInput = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : '';

        setFormData({
            courseName: safeValue(report.course),
            provider: safeValue(report.provider),
            date: dateForInput,
            status: statusValue,
            score: safeValue(report.score).replace('%', ''),
            duration: safeValue(report.duration),
            certificateId: safeValue(report.certId),
            uploadedFile: report.uploadedFile || null,
            uploadedFileName: report.uploadedFileName || ''
        });
        setShowModal(true);
    }

    // Fungsi ini akan dipanggil dari ReportModal (prop onSave)
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
                displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // Convert to DD/MM/YYYY
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
            setReports(reports.map(r => r.id === editingReportId ? newReportData : r));
            triggerToast("Training Report Updated", "Your changes have been saved.", PencilSquare, 'updated');
        }
        else {
            setReports([newReportData, ...reports]);
            triggerToast("New Training Report Added", "The new report has been successfully created.", CheckCircleFill, 'added');
        }

        setShowModal(false);
        setEditingReportId(null);
    };

    const handleDelete = (id) => {
        setReports(reports.filter(r => r.id !== id));
        setDeleteConfirmId(null);
        triggerToast("Training Report Deleted", "The selected report has been permanently removed.", DashCircleFill, 'deleted');
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


    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
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

            {/* --- MODAL KOMPONEN BARU (ReportModal) --- */}
            <ReportModal
                showModal={showModal}
                setShowModal={setShowModal}
                isEditMode={isEditMode}
                selectedEmployee={selectedEmployee}
                formData={formData}
                setFormData={setFormData}
                handleSaveReport={handleSaveReport} // Pass the main save logic
                handleImageUpload={handleImageUpload} // Pass file handling
                handleRemoveImage={handleRemoveImage} // Pass file handling
            />

            {/* --- TOAST NOTIFICATION (DI KANAN BAWAH) --- */}
            <ActionToast
                show={showToast}
                handleClose={handleCloseToast}
                title={toastTitle}
                message={toastMessage}
                icon={toastIcon}
                variant={toastVariant}
            />
        </div>
    );
}

export default TrainingReport;