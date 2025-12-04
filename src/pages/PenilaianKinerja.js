import React, { useState } from 'react';
import {
    Container,
    Form,
    Button,
    Table,
    Toast,
    ToastContainer,
    OverlayTrigger, // Diperlukan untuk Popover
    Popover,        // Diperlukan untuk Popover
} from 'react-bootstrap';
import {
    Search,
    PencilSquare,
    TrashFill,
    CheckCircleFill,
    DashCircleFill,
    PencilSquare as IconPencil
} from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';
import PerformanceModal from '../components/PerformanceModal.js';
import PerformanceDetailsModal from '../components/PerformanceDetailsModal.js';

// Data Dummy Awal
const INITIAL_PERFORMANCE_DATA = [
    { id: 1, employeeName: 'Rayn Reynolds', goalAchievement: 5, knowledgeSkills: 4, behaviorWorkEthic: 4, disciplineReliability: 5 },
    { id: 2, employeeName: 'John Doe', goalAchievement: 4, knowledgeSkills: 5, behaviorWorkEthic: 5, disciplineReliability: 5 },
    { id: 3, employeeName: 'Lily Aminah', goalAchievement: 5, knowledgeSkills: 5, behaviorWorkEthic: 3, disciplineReliability: 4 },
    { id: 4, employeeName: 'Alice Johnson', goalAchievement: 4, knowledgeSkills: 4, behaviorWorkEthic: 4, disciplineReliability: 5 },
    { id: 5, employeeName: 'Carolina Davis', goalAchievement: 3, knowledgeSkills: 4, behaviorWorkEthic: 5, disciplineReliability: 4 },
    { id: 6, employeeName: 'Jackson Smith', goalAchievement: 5, knowledgeSkills: 3, behaviorWorkEthic: 4, disciplineReliability: 5 },
    { id: 7, employeeName: 'Charles Wilson', goalAchievement: 4, knowledgeSkills: 5, behaviorWorkEthic: 4, disciplineReliability: 4 },
    { id: 8, employeeName: 'Thomas Herve', goalAchievement: 5, knowledgeSkills: 4, behaviorWorkEthic: 5, disciplineReliability: 5 },
];

// Catatan: Komponen DeleteConfirmationModal telah dihapus

// 🔔 KOMPONEN ACTION TOAST (POSISI KANAN BAWAH) 🔔
const ActionToast = ({ show, handleClose, title, subtitle, icon: IconComponent, variant }) => {
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
                delay={4000}
                autohide
                className="shadow-lg"
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
                            {subtitle}
                        </small>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

// --- KOMPONEN UTAMA PenilaianKinerja ---
export default function PenilaianKinerja() {
    const [showModal, setShowModal] = useState(false);
    const [performanceData, setPerformanceData] = useState(INITIAL_PERFORMANCE_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataToEdit, setDataToEdit] = useState(null);

    // State untuk Popover Hapus (Menyimpan ID yang sedang aktif)
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // State untuk Toast Notifikasi
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastSubtitle, setToastSubtitle] = useState('');
    const [toastIcon, setToastIcon] = useState(null);
    const [toastVariant, setToastVariant] = useState('added');

    // State untuk mengontrol PerformanceDetailsModal (Pop-up Awal)
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    // Fungsi untuk menutup Modal Detail Kinerja
    const handleCloseWelcomeModal = () => {
        setShowWelcomeModal(false);
    };

    // Fungsi untuk menampilkan Toast
    const triggerToast = (title, subtitle, icon, variant) => {
        setToastTitle(title);
        setToastSubtitle(subtitle);
        setToastIcon(() => icon);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleCloseToast = () => setShowToast(false);

    const handleCloseModal = () => {
        setShowModal(false);
        setDataToEdit(null);
    };

    const handleShowCreate = () => {
        setDataToEdit(null);
        setShowModal(true);
    };

    const handleEdit = (data) => {
        setDataToEdit(data);
        setShowModal(true);
    };

    // --- LOGIKA CREATE/EDIT SAVE ---
    const handleSavePerformance = (newData) => {
        let actionMessageTitle = '';
        let actionMessageSubtitle = '';
        let actionVariant = '';
        let actionIcon = CheckCircleFill;

        if (dataToEdit) {
            // Mode Edit: Update data yang sudah ada
            setPerformanceData(prev => prev.map(item =>
                item.id === dataToEdit.id ? { ...newData, id: item.id } : item
            ));
            actionMessageTitle = 'Employee Performance Updated';
            actionMessageSubtitle = `Performance record for ${newData.employeeName} has been saved.`;
            actionVariant = 'updated';
            actionIcon = IconPencil;
        } else {
            // Mode Create: Tambahkan data baru
            const maxId = performanceData.length > 0 ? Math.max(...performanceData.map(item => item.id)) : 0;
            const newId = maxId + 1;
            setPerformanceData(prev => [...prev, { ...newData, id: newId }]);
            actionMessageTitle = 'New Employee Performance Added';
            actionMessageSubtitle = `A new record for ${newData.employeeName} has been created.`;
            actionVariant = 'added';
            actionIcon = CheckCircleFill;
        }

        handleCloseModal();
        triggerToast(actionMessageTitle, actionMessageSubtitle, actionIcon, actionVariant);
    };

    // --- LOGIKA HAPUS (DARI Popover) ---
    const handleDelete = (id) => {
        const deletedEmployee = performanceData.find(item => item.id === id)?.employeeName || 'Selected Employee';

        if (id) {
            setPerformanceData(prev => prev.filter(item => item.id !== id));
        }

        // Tutup Popover
        setDeleteConfirmId(null);

        // Tampilkan notifikasi Delete
        triggerToast(
            'Employee Performance Deleted',
            `The record for ${deletedEmployee} has been permanently removed.`,
            DashCircleFill,
            'deleted'
        );
    };


    // Filter data berdasarkan search term
    const filteredData = performanceData.filter(employee =>
        employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // SORTING DATA TERBARU DI ATAS (Berdasarkan ID terbesar)
    const sortedData = [...filteredData].sort((a, b) => b.id - a.id);

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Performance" />

            {/* Modal Detail Kinerja */}
            <PerformanceDetailsModal
                show={showWelcomeModal}
                handleClose={handleCloseWelcomeModal}
            />

            <Container fluid className="mt-4 px-4">
                <h1 className="fw-bold fs-3">Manage Performance</h1>
                <p className="text-muted">Engage with your team through games and discussions</p>

                <div className="card shadow-sm rounded-4"
                    style={{ borderRadius: '20px', border: '1px solid #c2e0ff', padding: '1.5rem' }}>

                    {/* Search Bar dan Tombol Create */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="position-relative">
                            <Search className="position-absolute text-muted" style={{ left: '15px', top: '15px' }} size={14} />
                            <Form.Control
                                type="search"
                                placeholder="Search employee performance..."
                                className="rounded-3 ps-5 border-secondary-subtle"
                                style={{
                                    width: '380px',
                                    height: '43px',
                                    fontSize: '0.9rem',
                                    borderRadius: '10px'
                                }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Button
                            variant="primary"
                            className="fw-semibold"
                            onClick={handleShowCreate}
                            style={{
                                fontSize: '0.9rem',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            + Create New
                        </Button>
                    </div>

                    {/* Tabel Data Penilaian Kinerja */}
                    <Table responsive hover className="mb-0">
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <th className="fw-semibold pb-3">Employee Name</th>
                                <th className="fw-semibold pb-3" style={{ textAlign: 'center' }}>Goal Achievement</th>
                                <th className="fw-semibold pb-3" style={{ textAlign: 'center' }}>Knowledge & Skills</th>
                                <th className="fw-semibold pb-3" style={{ textAlign: 'center' }}>Behavior & Work Ethic</th>
                                <th className="fw-semibold pb-3" style={{ textAlign: 'center' }}>Discipline & Reliability</th>
                                <th className="fw-semibold pb-3" style={{ textAlign: 'center', width: '100px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="align-middle">{employee.employeeName}</td>
                                    <td className="align-middle" style={{ textAlign: 'center' }}>{employee.goalAchievement}</td>
                                    <td className="align-middle" style={{ textAlign: 'center' }}>{employee.knowledgeSkills}</td>
                                    <td className="align-middle" style={{ textAlign: 'center' }}>{employee.behaviorWorkEthic}</td>
                                    <td className="align-middle" style={{ textAlign: 'center' }}>{employee.disciplineReliability}</td>
                                    <td className="d-flex align-items-center justify-content-center pt-3">

                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2 text-white"
                                            style={{ backgroundColor: '#fcd34d', border: 'none', borderRadius: '10px', width: '35px', height: '35px' }}
                                            onClick={() => handleEdit(employee)}
                                        >
                                            <PencilSquare size={16} />
                                        </Button>

                                        {/* ⭐️ POPUP DELETE MENGGUNAKAN OVERLAYTRIGGER DAN POPOVER ⭐️ */}
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="left"
                                            rootClose
                                            show={deleteConfirmId === employee.id}
                                            onToggle={(next) => setDeleteConfirmId(next ? employee.id : null)}
                                            overlay={
                                                <Popover id={`popover-delete-${employee.id}`} className="shadow border-0">
                                                    <Popover.Body className="text-center p-3">
                                                        <p className="small fw-bold mb-3 text-dark">Are you sure you<br />want to delete it?</p>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-secondary"
                                                                className="px-3 rounded-pill"
                                                                onClick={() => setDeleteConfirmId(null)} // Tutup Popover
                                                            >
                                                                No
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                className="px-3 rounded-pill"
                                                                onClick={() => handleDelete(employee.id)} // Lakukan penghapusan
                                                            >
                                                                Yes
                                                            </Button>
                                                        </div>
                                                    </Popover.Body>
                                                </Popover>
                                            }
                                        >
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                style={{ backgroundColor: '#f87171', border: 'none', borderRadius: '10px', width: '35px', height: '35px' }}
                                                // Tidak perlu onClick karena OverlayTrigger akan mengurus trigger 'click'
                                            >
                                                <TrashFill size={16} />
                                            </Button>
                                        </OverlayTrigger>
                                        {/* ⭐️ AKHIR POPUP DELETE ⭐️ */}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {filteredData.length === 0 && (
                        <div className="text-center py-4 text-muted">No matching performance data found.</div>
                    )}
                </div>
            </Container>

            {/* Modal Create/Edit */}
            <PerformanceModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleSavePerformance}
                initialData={dataToEdit}
            />

            {/* Catatan: DeleteConfirmationModal telah dihapus */}

            {/* Komponen Notifikasi Toast (Di Kanan Bawah) */}
            <ActionToast
                show={showToast}
                handleClose={handleCloseToast}
                title={toastTitle}
                subtitle={toastSubtitle}
                icon={toastIcon}
                variant={toastVariant}
            />
        </>
    );
}