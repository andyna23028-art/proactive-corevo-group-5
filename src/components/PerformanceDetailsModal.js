import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';

// Data Kinerja (TELAH DITAMBAHKAN ITEM BARU AGAR MODAL PENUH KE BAWAH)
const PERFORMANCE_DETAILS = [
    { 
        category: 'Goal Achievement', 
        score: 5, 
        description: 'Consistently exceeds targets and contributes to team goals. You successfully led multiple campaigns that contributed significantly to brand visibility and client engagement' 
    },
    { 
        category: 'Knowledge & Skills', 
        score: 5, 
        description: 'Demonstrates strong understanding of job requirements. You applies industry best practices effectively.' 
    },
    { 
        category: 'Behavior & Work Ethic', 
        score: 4, 
        description: 'Reliable, cooperative, and maintains a positive attitude. You maintains a positive and cooperative attitude in the workplace. He takes initiative in solving problems and supports his teammates during high-pressure situations.' 
    },
    { 
        category: 'Discipline & Reliability', 
        score: 4, 
        description: 'Demonstrates exceptional punctuality and reliability. You completes all assigned tasks ahead of schedule and ensures all reports are submitted on time.' 
    },
    // --- ITEM TAMBAHAN AGAR TABEL PENUH ---
    { 
        category: 'Adaptability', 
        score: 5, 
        description: 'Quickly adapts to new tools and sudden project changes without issue.' 
    },
    { 
        category: 'Communication', 
        score: 4, 
        description: 'Clearly articulates ideas and provides concise updates in team meetings.' 
    },
    { 
        category: 'Initiative', 
        score: 5, 
        description: 'Actively seeks opportunities for improvement and takes ownership of complex problems.' 
    },
    { 
        category: 'Problem Solving', 
        score: 4, 
        description: 'Offers creative and practical solutions to roadblocks encountered during projects.' 
    },
    { 
        category: 'Teamwork', 
        score: 5, 
        description: 'A valuable team player who consistently supports colleagues and shares knowledge.' 
    },
    { 
        category: 'Project Management', 
        score: 4, 
        description: 'Manages time and resources effectively to deliver projects on schedule.' 
    },
];

// --- STYLING INLINE CSS ---

// KUNCI 1: Style untuk ukuran Modal Persegi Panjang Lebar dan TINGGI MAKSIMAL
const dialogStyle = {
    // LEBAR ABSOLUT (Sangat lebar)
    maxWidth: '1000px', 
    width: '95%',      
    
    // ✅ TINGGI SANGAT MAKSIMAL (85% dari tinggi layar)
    maxHeight: '85vh', 
    
    zIndex: 10000, 
};

// KUNCI 2: Class untuk backdrop yang sangat gelap (Membutuhkan CSS global)
const backdropClassName = "custom-modal-backdrop"; 
/*
   PERHATIAN PENTING: Untuk penutupan sempurna dan backdrop gelap,
   pastikan kode CSS berikut ditambahkan ke file CSS GLOBAL Anda:
   .custom-modal-backdrop { z-index: 9999 !important; background-color: rgba(0, 0, 0, 0.8) !important; }
*/

const style = {
    // Modal Body: Mengatur tinggi isi yang dapat di-scroll
    modalBody: {
        // ✅ TINGGI ISI (Diperbesar agar konten penuh)
        maxHeight: '70vh', 
        overflowY: 'auto',
        padding: 0, 
    },
    // HEADER: Garis Biru TEBAL di Bawah Judul
    headerWrapper: {
        padding: '20px 24px 10px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        borderBottom: '3px solid #007bff', 
        marginBottom: '5px',
    },
    title: {
        color: '#007bff',
        fontSize: '1.25rem',
        fontWeight: 500,
    },
    closeButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        color: '#6c757d',
        opacity: 0.8,
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0.5rem',
    },
    descriptionCell: {
        fontSize: '0.9rem',
        color: '#555',
        lineHeight: 1.4,
    },
    dataCell: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e5e7eb',
    },
    headerCell: {
        fontSize: '0.9rem',
        fontWeight: 600,
        paddingBottom: '0.75rem',
        borderBottom: 'none', 
    },
    scrollbarMock: {
        position: 'absolute', 
        top: '50%', 
        right: '5px',
        transform: 'translateY(-50%)',
        width: '8px',
        height: '60px', 
        backgroundColor: '#adb5bd',
        borderRadius: '5px',
        opacity: '0.3', 
        pointerEvents: 'none', 
    }
};

const contentStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '0.3rem', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
    position: 'relative', 
    maxHeight: 'inherit',
    overflow: 'hidden'
};


export default function PerformanceDetailsModal({ show, handleClose }) {
    return (
        <Modal 
            show={show}
            onHide={handleClose}
            centered         
            backdrop={true}  
            
            // ✅ KUNCI UKURAN: Menggunakan modal-xl dan style kustom
            dialogClassName="modal-xl" 
            dialogStyle={dialogStyle}
            
            backdropClassName={backdropClassName}
            contentStyle={contentStyle}
        >
            {/* Wrapper Header: GARIS BIRU TEBAL di BAWAH JUDUL */}
            <div style={style.headerWrapper}>
                <h5 style={style.title}>
                    Read your performance
                </h5>

                {/* Tombol Close */}
                <Button 
                    variant="link" 
                    onClick={handleClose} 
                    style={style.closeButton}
                >
                    <XLg size={16} />
                </Button>
            </div>
            
            {/* Modal.Body (Isi) */}
            <Modal.Body style={style.modalBody}>
                {/* Konten Tabel di dalam padding */}
                <div className="px-4 pb-4">
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th style={style.headerCell} className="text-muted" >Category</th>
                                <th style={style.headerCell} className="text-muted text-start" >Score</th> 
                                <th style={style.headerCell} className="text-muted" >Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PERFORMANCE_DETAILS.map((item, index) => (
                                <tr key={index}>
                                    {(() => {
                                        const isLast = index === PERFORMANCE_DETAILS.length - 1;
                                        const cellStyle = isLast 
                                            ? { ...style.dataCell, borderBottom: 'none' } 
                                            : style.dataCell;

                                        return (
                                            <>
                                                {/* Category */}
                                                <td 
                                                    className="align-top fw-medium" 
                                                    style={cellStyle}
                                                >
                                                    {item.category}
                                                </td>
                                                
                                                {/* Score */}
                                                <td 
                                                    className="align-top text-start" 
                                                    style={{ ...cellStyle, fontWeight: 'bold' }}
                                                >
                                                    {item.score}
                                                </td>
                                                
                                                {/* Description */}
                                                <td 
                                                    className="align-top" 
                                                    style={{ ...cellStyle, ...style.descriptionCell }}
                                                >
                                                    {item.description}
                                                </td>
                                            </>
                                        );
                                    })()}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            
            {/* Mockup Scrollbar Indicator */}
            <div style={style.scrollbarMock} />

        </Modal>
    );
}