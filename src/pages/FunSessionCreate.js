import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function FunSessionCreate({ onClose }) {
  return (
    <div className="fun-create-backdrop">
      <div className="fun-create-wrapper">
        <h3 className="fw-bold mb-1">Create New Fun Session</h3>
        <p className="text-muted mb-4">Schedule new game for employees</p>

        {/* Session Title */}
        <label className="fun-label">Session Title</label>
        <Form.Control
          type="text"
          placeholder="Enter session title"
          className="fun-input mb-3"
        />

        {/* Department */}
        <label className="fun-label">Department</label>
        <Form.Control
          type="text"
          placeholder="Enter department"
          className="fun-input mb-3"
        />

        {/* Description */}
        <label className="fun-label">Description</label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Describe the session"
          className="fun-input mb-4"
        />

        {/* Date & Time + Duration */}
        <Row>
          <Col md={6}>
            <label className="fun-label">Date & Time</label>
            <Form.Control type="datetime-local" className="fun-input mb-3" />
          </Col>

          <Col md={6}>
            <label className="fun-label">Duration (min)</label>
            <Form.Control
              type="number"
              placeholder="e.g. 40"
              className="fun-input mb-3"
            />
          </Col>
        </Row>

        {/* Action buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            variant="outline-primary"
            className="fun-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button className="fun-btn-save" onClick={onClose}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
