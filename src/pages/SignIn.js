import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import corevoLogo from '../images/corevo.png';
import googleIcon from '../images/google.png';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handler form login manual
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    // TODO: request ke backend untuk validasi login
    // Simpan token (dummy untuk sekarang)
    localStorage.setItem('token', 'dummy-token');

    // Redirect ke Home
    navigate('/home');
  };

  // Handler login dengan Google
  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Container fluid>
        <Row className="min-vh-100">
          {/* Kiri: Branding */}
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center text-white px-5"
            style={{ background: 'linear-gradient(to right, #007bff, #00bfff)' }}
          >
            <div className="text-center">
              <img
                src={corevoLogo}
                alt="Corevo Logo"
                style={{ maxWidth: '300px', marginBottom: '45px' }}
              />
              <h2 className="fw-bold mb-3">Welcome Back</h2>
              <h6 className="text-white text-center">
                Your Online Hub for Productivity & Focus
              </h6>
            </div>
          </Col>

          {/* Kanan: Form */}
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center bg-white px-4 py-5"
          >
            <div style={{ width: '100%', maxWidth: '420px' }}>
              <h4 className="fw-bold mb-4 text-center">Sign in with your account</h4>

              {/* Tombol Google */}
              <Button
                variant="outline-dark"
                className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                onClick={handleGoogleSignIn}
              >
                <img src={googleIcon} alt="Google" width="20" />
                Sign in with Google
              </Button>

              {/* Form manual */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </Form.Group>

                <Form.Group className="mb-4 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Keep me logged in"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fw-bold">
                  SIGN IN
                </Button>
              </Form>

              {/* Link ke Sign Up */}
              <div className="text-center mt-3">
                <span className="text-muted">Need an account? </span>
                <Link to="/signup" className="text-decoration-none text-primary fw-semibold">
                  Create one
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}