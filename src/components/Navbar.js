import React from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bell, Search } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const commonNavLinkStyle = {
  color: "#212529",
  backgroundColor: "transparent",
  borderRadius: 0,
  padding: "0.5rem 1rem",
  fontSize: "0.9rem",
  fontWeight: 400,
  transition: "none",
  lineHeight: 1.5,
};

const activeNavLinkStyle = {
  ...commonNavLinkStyle,
  color: "#2563eb",
  fontWeight: 600,
  backgroundColor: "#eff6ff",
  borderRadius: "9999px",
  padding: "0.5rem 1rem",
  borderBottom: "none",
};

const internalRoutes = [
  { name: "Home", path: "/home" },
  { name: "Fun Session", path: "/funsession" },
  { name: "Performance", path: "/performance" },
  { name: "Reward", path: "/reward" },
  { name: "Report", path: "/training-report" },
];

const AppNavbar = ({ isLoggedIn = false, activePage }) => {
  const publicRoutes = [
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom py-3 sticky-top shadow-sm mobile-divider"
    >
      <Container fluid className="px-4">
        {/* LOGO */}
        <Navbar.Brand
          as={Link}
          to={isLoggedIn ? "/home" : "/"}
          className="fw-bold fs-3 me-5"
          style={{ color: "#111827" }}
        >
          Corevo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* MENU KIRI */}
          <Nav className="me-auto gap-2 align-items-start">
            {isLoggedIn
              ? internalRoutes.map((item) => (
                  <Nav.Link
                    key={item.name}
                    as={Link}
                    to={item.path}
                    className="no-link-hover"
                    style={
                      item.name === activePage
                        ? activeNavLinkStyle
                        : commonNavLinkStyle
                    }
                  >
                    {item.name}
                  </Nav.Link>
                ))
              : publicRoutes.map((item) => (
                  <Nav.Link
                    key={item.name}
                    as={Link}
                    to={item.path}
                    style={
                      item.name === activePage
                        ? activeNavLinkStyle
                        : commonNavLinkStyle
                    }
                  >
                    {item.name}
                  </Nav.Link>
                ))}
          </Nav>

          {/* BAGIAN KANAN */}
          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
            {isLoggedIn && (
              <>
                {/* Search bar */}
                <div className="position-relative w-100 w-lg-auto">
                  <Search
                    className="position-absolute text-muted"
                    style={{
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    size={14}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Enter your search request..."
                    className="ps-5 border-secondary-subtle"
                    style={{
                      width: "100%",
                      maxWidth: "380px",
                      height: "43px",
                      fontSize: "0.9rem",
                      borderRadius: "9999px",
                      lineHeight: "29px",
                    }}
                  />
                </div>

                {/* Bell icon */}
                <Bell size={20} className="text-dark cursor-pointer" />
              </>
            )}

            {/* Avatar buka profile */}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/profile" className="p-0">
                <img
                  src="https://i.pravatar.cc/150?u=user"
                  alt="Profile"
                  className="rounded-circle border"
                  width="40"
                  height="40"
                  style={{ objectFit: "cover" }}
                />
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
