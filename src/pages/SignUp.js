import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../images/google.png';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/signin');
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5} className="bg-white p-4 rounded shadow-sm">
            <h4 className="fw-bold mb-4 text-center">
              Start A Productive Journey and Unlock Your Full Potential
            </h4>

            <Button
              variant="outline-dark"
              className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGoogleSignUp}
            >
              <img src={googleIcon} alt="Google" width="20" />
              Sign up with Google
            </Button>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3 position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

              <Form.Group className="mb-4 position-relative">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 fw-bold">
                SIGN UP
              </Button>
            </Form>

            <div className="text-center mt-3">
              <span className="text-muted">Own an Account? </span>
              <Link to="/signin" className="text-decoration-none text-primary fw-semibold">
                JUMP RIGHT IN
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}