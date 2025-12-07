import React, { useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Clock, People, CalendarCheck } from "react-bootstrap-icons";
import AppNavbar from "../components/Navbar";

// Data dummy – disesuaikan agar hanya 1 sesi upcoming seperti di Figma
const SESSIONS = [
  {
    id: 1,
    title: "Mind Stretch",
    description:
      "Take a short break to clear your mind and boost your creativity.",
    time: "Today, 3:00 PM",
    duration: "40 min",
    participants: 30,
    host: "Admin",
    type: "upcoming",
  },
  {
    id: 2,
    title: "Echo Room",
    description: "A safe space to express your thoughts and everything else.",
    time: "Yesterday, 3:05 PM",
    duration: "40 min",
    participants: 30,
    host: "Admin",
    type: "past",
  },
  {
    id: 3,
    title: "Reflect & Grow",
    description: "Review the week and set goals for the next one.",
    time: "Last week, 10:00 AM",
    duration: "60 min",
    participants: 25,
    host: "Team Lead",
    type: "past",
  },
];

const SessionCard = ({ session }) => {
  return (
    <Card className="shadow-sm border-0 fun-card">
      <Card.Body className="p-4">
        <Row>
          {/* Icon bulat biru di kiri */}
          <Col xs="auto" className="pe-0">
            <div className="fun-card-icon-circle">
              <CalendarCheck size={24} />
            </div>
          </Col>

          {/* Info utama */}
          <Col>
            <h6 className="fw-semibold mb-1">{session.title}</h6>
            <p className="text-muted small mb-3">
              {session.description}
            </p>

            <div className="d-flex flex-wrap gap-3 text-muted small">
              <div className="d-flex align-items-center">
                <CalendarCheck size={14} className="me-1" />
                {session.time}
              </div>
              <div className="d-flex align-items-center">
                <Clock size={14} className="me-1" />
                {session.duration}
              </div>
              <div className="d-flex align-items-center">
                <People size={14} className="me-1" />
                {session.participants} participants
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-3" />

        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted small">Hosted by {session.host}</span>

          <Button
            as={Link}
            to={`/funsession/${session.id}`}
            size="sm"
            className="fun-start-btn fw-semibold"
          >
            Start Session
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default function FunSession() {
  const [filter, setFilter] = useState("upcoming");

  const filteredSessions = SESSIONS.filter(
    (session) => session.type === filter
  );

  const showCreateNew = filter === "upcoming";

  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Fun Session" />

      <Container fluid className="mt-4 px-4 pb-5 fun-session-container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold fs-3 mb-1">Fun Session</h1>
            <p className="text-muted mb-0">
              Engage with your team through games and discussions
            </p>
          </div>

          {showCreateNew && (
            <Button
              variant="primary"
              as={Link}
              to="/funsession/create"
              className="fun-create-btn px-4"
            >
              Create New
            </Button>
          )}
        </div>

        {/* TAB FILTER */}
        <div className="mb-4 d-flex gap-2">
          <Button
            className={`fun-tab-btn ${
              filter === "upcoming" ? "active" : ""
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            className={`fun-tab-btn ${filter === "past" ? "active" : ""}`}
            onClick={() => setFilter("past")}
          >
            Past Session
          </Button>
        </div>

        {/* LIST SESI – dibungkus untuk lebar mirip Figma */}
        <div className="fun-card-wrapper">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div key={session.id} className="mb-4">
                <SessionCard session={session} />
              </div>
            ))
          ) : (
            <p className="text-muted mt-5 text-center">
              No {filter} sessions found.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
