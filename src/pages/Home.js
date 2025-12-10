// src/pages/Home.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Whatsapp, Envelope, GeoAlt } from "react-bootstrap-icons"; // House & Clock dihapus
import AppNavbar from "../components/Navbar";

// Card utama (Manage Performance, Training Report, Unlock Their Wins, Upcoming Fun Session)
const PrimaryCard = ({ children, className = "", ...rest }) => (
  <Card
    className={`shadow-sm border-0 home-primary-card ${className}`}
    {...rest}
  >
    <Card.Body>{children}</Card.Body>
  </Card>
);

// Tombol gradien besar (View More, See All Rewards)
const GradientButton = ({ children, as = Button, ...rest }) => (
  <Button as={as} {...rest} className="home-gradient-btn w-100 fw-semibold">
    {children}
  </Button>
);

// Card kecil untuk “Let’s Chat”
const ChatCard = ({ icon, title, description }) => (
  <Card className="shadow-sm border-0 home-chat-card mb-3">
    <Card.Body className="d-flex align-items-center">
      <div className="home-chat-icon me-3 d-flex align-items-center justify-content-center">
        {icon}
      </div>
      <div>
        <h6 className="mb-1 fw-semibold">{title}</h6>
        <p className="mb-0 text-muted small">{description}</p>
      </div>
    </Card.Body>
  </Card>
);

export default function Home() {
  return (
    <>
      {/* NAVBAR COREVO */}
      <AppNavbar isLoggedIn activePage="Home" />

      {/* WRAPPER KONTEN (supaya konsisten dengan halaman Profile) */}
      <main className="corevo-page">
        <Container fluid className="mt-4 px-4 pb-5">
          {/* HEADER */}
          <header className="mb-4">
            <h1 className="fw-bold home-greeting-title">
              Good Morning, Mina
            </h1>
            <p className="text-muted mb-0">Plan your day with us!</p>
          </header>

          {/* ROW 1 : MANAGE PERFORMANCE + TRAINING REPORT */}
          <Row className="g-4 mb-4">
            {/* Manage Performance */}
            <Col lg={7}>
              <PrimaryCard>
                <h5 className="fw-bold mb-2">Manage Performance</h5>
                <p className="text-muted small mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>

                <GradientButton as={Link} to="/performance">
                  View More
                </GradientButton>
              </PrimaryCard>
            </Col>

            {/* Manage Training Reports */}
            <Col lg={5}>
              <PrimaryCard>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold mb-0">Manage Training Reports</h5>
                  <Button
                    as={Link}
                    to="/training-report"
                    variant="link"
                    className="p-0 small text-primary"
                  >
                    See all
                  </Button>
                </div>

                <div className="mb-2">
                  <div className="fw-semibold small">Work Ethics Training</div>
                  <div className="text-muted small">1 Month</div>
                </div>

                <hr className="my-3" />

                <p className="text-muted small mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>

                <div className="d-flex align-items-center text-muted small">
                  <GeoAlt size={14} className="me-1" />
                  <span className="me-2">Surabaya</span>
                  <span className="mx-1">|</span>
                  <span>3 months ago</span>
                </div>
              </PrimaryCard>
            </Col>
          </Row>

          {/* ROW 2 : LET'S CHAT + UNLOCK THEIR WINS + UPCOMING FUN SESSION */}
          <Row className="g-4">
            {/* LET'S CHAT */}
            <Col lg={4}>
              <h5 className="fw-bold mb-3">Let&apos;s Chat</h5>

              <ChatCard
                icon={<Whatsapp size={22} color="#25D366" />}
                title="Whatsapp Chat"
                description="See if employees approach you by Whatsapp Chat"
              />

              <ChatCard
                icon={<Envelope size={22} color="#F27573" />}
                title="By Email"
                description="See if employees approach you by Email"
              />
            </Col>

            {/* UNLOCK THEIR WINS */}
            <Col lg={4}>
              <PrimaryCard>
                <h5 className="fw-bold mb-2">Unlock Their Wins</h5>
                <p className="text-muted small mb-4">
                  Give badges, points, and exclusive perks as they hit their
                  productivity goals.
                </p>

                <GradientButton as={Link} to="/reward">
                  See All Rewards
                </GradientButton>
              </PrimaryCard>
            </Col>

            {/* UPCOMING FUN SESSION */}
            <Col lg={4}>
              <PrimaryCard>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Upcoming Fun Session</h5>
                  <Button
                    as={Link}
                    to="/funsession"
                    variant="link"
                    className="p-0 small text-primary"
                  >
                    See all
                  </Button>
                </div>

                <Card className="border-1 home-session-inner-card">
                  <Card.Body>
                    <div className="d-flex align-items-start mb-2">
                      <div className="me-3 mt-1 home-session-checkbox" />
                      <div>
                        <div className="fw-semibold small mb-1">
                          Mind Stretch
                        </div>
                        <p className="text-muted small mb-2">
                          Take a short break to clear your mind and boost your
                          creativity.
                        </p>
                      </div>
                    </div>

                    <hr className="my-3" />

                    <div className="d-flex justify-content-end">
                      <Button
                        as={Link}
                        to="/funsession/1"
                        size="sm"
                        className="home-session-start-btn fw-semibold"
                      >
                        Start
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </PrimaryCard>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
