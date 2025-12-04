import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { CameraFill, FileEarmarkPdfFill, XCircleFill } from 'react-bootstrap-icons';

// Definisikan komponen Modal sebagai fungsi
const ReportModal = ({
    showModal,
    setShowModal,
    isEditMode,
    selectedEmployee,
    formData,
    setFormData,
    handleSaveReport,
    handleImageUpload,
    handleRemoveImage
}) => {
    return (
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            size="lg" 
            centered 
            backdrop="static"
            contentClassName="rounded-4" 
            dialogClassName="p-3"
        >
            <Modal.Body className="p-5">
                <h4 className="fw-bold mb-1">{isEditMode ? 'Edit Training Report' : 'Add A Training Report'}</h4>
                <p className="text-muted mb-4 small">
                    Manage an employee training reports for <span className="fw-bold">{selectedEmployee?.name || 'Selected Employee'}</span>
                </p>

                <Form onSubmit={(e) => { e.preventDefault(); handleSaveReport(); }}>

                    {/* 1. Course Name (Paling Atas) */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold" style={{fontSize: '0.8rem'}}>Course Name</Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-light border-0 py-2"
                            value={formData.courseName}
                            onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                            
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
    );
}

export default ReportModal;