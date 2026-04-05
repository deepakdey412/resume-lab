import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import authService from '../api/services/authService';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Call signup API
      const response = await authService.signup(
        formData.fullName,
        formData.email,
        formData.password
      );

      // Store token and user info in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.email,
        fullName: response.fullName,
      }));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Signup failed. Please try again.'
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
                  Create Your Account
                </h3>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label style={{ fontWeight: 500 }}>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      style={{ padding: '0.75rem', borderRadius: '10px' }}
                    />
                  </Form.Group>

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

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label style={{ fontWeight: 500 }}>Password</Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password (min 6 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
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

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label style={{ fontWeight: 500 }}>Confirm Password</Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.75rem', paddingRight: '3rem', borderRadius: '10px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
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
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <div className="text-center">
                    <span style={{ color: '#6B7280' }}>Already have an account? </span>
                    <Link to="/login" style={{ color: '#2563EB', fontWeight: 500, textDecoration: 'none' }}>
                      Login
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
