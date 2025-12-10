import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import AppNavbar from "../components/Navbar";

// Data dummy
const DEPARTMENTS = ["Human Resources", "Finance", "Engineering", "Procurement"];

const EMPLOYEES_BY_DEPT = {
  "Human Resources": ["Alice Johnson", "Caroline Davis", "Charles Wilson"],
  Finance: ["Jackson Smith", "Emily Brown"],
  Engineering: ["Kevin Lee", "Sarah Chen"],
  Procurement: ["John Carter", "Mila Rogers"],
};

const REWARD_TYPES = [
  "Best Employee",
  "Team Player",
  "Innovation Award",
  "Extra Mile",
];

export default function Reward() {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    department: "",
    employee: "",
    type: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
      // kalau ganti departemen, reset employee
      ...(field === "department" ? { employee: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // di real project: kirim ke API
    console.log("Reward submitted: ", form);
    alert("Reward sent! (dummy)");
    setShowModal(false);
  };

  const employeesForSelectedDept =
    EMPLOYEES_BY_DEPT[form.department] || [];

  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Reward" />

      <Container fluid className="px-4 py-4">
        {/* HEADER + BUTTON */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="fs-4 fw-bold mb-1">Reward</h1>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Recognize and celebrate your achievements
            </p>
          </Col>
          <Col xs="auto">
            <Button
              className="fun-create-btn px-4"
              onClick={() => setShowModal(true)}
            >
              Give Reward
            </Button>
          </Col>
        </Row>

        {/* KONTEN DIBAWAH (dummy, biar ada background seperti Figma) */}
        <Row className="gy-4">
          <Col md={4}>
            <h6 className="fw-semibold mb-3">Reward Types</h6>
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body>
                <h6 className="fw-semibold mb-1">Best Employee</h6>
                <p className="small text-muted mb-0">
                  Recognizing the employee who consistently gives their best
                  results throughout the quarter.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <h6 className="fw-semibold mb-3">
              Recent Employees Have Been Awarded
            </h6>
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body>
                <p className="small text-muted mb-0">
                  (Dummy list) Reward history will appear here.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ===========================
          MODAL GIVE REWARD
      ============================ */}
      {showModal && (
        <div className="reward-backdrop">
          <div className="reward-modal-wrapper">
            <h5 className="fw-semibold mb-1">Give a Reward</h5>
            <p
              className="text-muted mb-4"
              style={{ fontSize: "0.85rem" }}
            >
              Recognize an employee outstanding contribution
            </p>

            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                {/* Department */}
                <Col xs={12}>
                  <label className="reward-label">
                    Select Department
                  </label>
                  <Form.Select
                    className="reward-input"
                    value={form.department}
                    onChange={handleChange("department")}
                    required
                  >
                    <option value="">Choose department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Employee */}
                <Col xs={12}>
                  <label className="reward-label">
                    Select Employee
                  </label>
                  <Form.Select
                    className="reward-input"
                    value={form.employee}
                    onChange={handleChange("employee")}
                    disabled={!form.department}
                    required
                  >
                    <option value="">
                      {form.department
                        ? "Choose employee"
                        : "Select department first"}
                    </option>
                    {employeesForSelectedDept.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Reward Type */}
                <Col xs={12}>
                  <label className="reward-label">Reward Type</label>
                  <Form.Select
                    className="reward-input"
                    value={form.type}
                    onChange={handleChange("type")}
                    required
                  >
                    <option value="">Choose reward type</option>
                    {REWARD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Message */}
                <Col xs={12}>
                  <label className="reward-label">
                    Message (Optional)
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="reward-input"
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Write a short appreciation message..."
                  />
                </Col>
              </Row>

              {/* BUTTONS */}
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  type="button"
                  className="reward-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="reward-btn-save">
                  Send Reward
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
