import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import googleIcon from '../images/google.png';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    localStorage.setItem('token', 'dummy-token');
    navigate('/home');
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5} className="bg-white p-4 rounded shadow-sm">
            <h4 className="fw-bold mb-4 text-center">
              <span className="text-dark">Welcome </span>
              <span className="text-primary">Back</span>
            </h4>

            <Button
              variant="outline-dark"
              className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGoogleSignIn}
            >
              <img src={googleIcon} alt="Google" width="20" />
              Sign in with Google
            </Button>

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

            <div className="text-center mt-3">
              <span className="text-muted">Need an account? </span>
              <Link to="/signup" className="text-decoration-none text-primary fw-semibold">
                CREATE ONE
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}