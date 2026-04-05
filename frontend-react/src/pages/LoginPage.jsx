import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import authService from '../api/services/authService';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      
      // Check if this is admin login
      if (formData.email === 'admin@gmail.com') {
        // Use admin login endpoint
        response = await authService.adminLogin(formData.email, formData.password);
      } else {
        // Use regular user login endpoint
        response = await authService.login(formData.email, formData.password);
      }
      
      // Store token and user info in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.email,
        fullName: response.fullName,
      }));

      // Force page reload to update App state
      if (formData.email === 'admin@gmail.com') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="text-center mb-4">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 700, 
                  color: 'white',
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '3rem' }}>🧪</span> ResumeLab
                </h1>
              </Link>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
                AI-Powered Resume Analysis Platform
              </p>
            </div>
            
            <Card style={{ 
              borderRadius: '12px', 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: 'none'
            }}>
              <Card.Body style={{ padding: '2rem' }}>
                <h3 className="text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Welcome Back
                </h3>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label style={{ fontWeight: 500 }}>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ padding: '0.75rem', borderRadius: '10px' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label style={{ fontWeight: 500 }}>Password</Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.75rem', paddingRight: '3rem', borderRadius: '10px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6B7280',
                          fontSize: '1.2rem',
                          padding: '0.25rem 0.5rem'
                        }}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                    style={{ 
                      padding: '0.75rem',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '10px',
                      backgroundColor: '#2563EB',
                      border: 'none'
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <span style={{ color: '#6B7280' }}>Don't have an account? </span>
                    <Link to="/signup" style={{ color: '#2563EB', fontWeight: 500, textDecoration: 'none' }}>
                      Sign Up
                    </Link>
                  </div>
                </Form>

                <div className="text-center mt-3">
                  <Link to="/">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      style={{ 
                        borderRadius: '8px',
                        fontWeight: 500
                      }}
                    >
                      ← Back to Home
                    </Button>
                  </Link>
                </div>

                <hr className="my-4" />

                <Alert variant="info" className="mb-0" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#EFF6FF' }}>
                  <div style={{ fontSize: '0.875rem', color: '#1E40AF' }}>
                    <strong>Admin Login (Testing Purpose):</strong><br />
                    Email: admin@gmail.com<br />
                    Password: admin123
                  </div>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
