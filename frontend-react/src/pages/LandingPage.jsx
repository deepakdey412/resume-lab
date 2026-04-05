import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { TypeAnimation } from 'react-type-animation';
import authService from '../api/services/authService';

const LandingPage = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleNavClick = (path) => {
    if (!user) {
      // If user is not logged in, redirect to login
      navigate('/login');
    } else {
      // If user is logged in, navigate to the page
      navigate(path);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Navbar */}
      <BootstrapNavbar expand="lg" style={{ backgroundColor: '#2563EB', padding: '1rem 0' }}>
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/" style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: 700, 
            fontSize: '1.5rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.75rem' }}>🧪</span>
            ResumeLab
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="landing-navbar-nav" />
          <BootstrapNavbar.Collapse id="landing-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                onClick={() => handleNavClick('/dashboard')}
                style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, cursor: 'pointer' }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link 
                onClick={() => handleNavClick('/upload')}
                style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, cursor: 'pointer' }}
              >
                Upload Resume
              </Nav.Link>
              <Nav.Link 
                onClick={() => handleNavClick('/jd-analysis')}
                style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, cursor: 'pointer' }}
              >
                JD Analysis
              </Nav.Link>
              <Nav.Link 
                onClick={() => handleNavClick('/resume-generator')}
                style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, cursor: 'pointer' }}
              >
                Resume Generator
              </Nav.Link>
              <Nav.Link 
                onClick={() => handleNavClick('/feedback')}
                style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, cursor: 'pointer' }}
              >
                Feedback
              </Nav.Link>
              <Nav.Link 
                href="#contact"
                style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}
              >
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <Link to="/dashboard">
                  <Button 
                    variant="light" 
                    size="sm"
                    style={{ 
                      fontWeight: 500,
                      borderRadius: '8px'
                    }}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      className="me-2"
                      style={{ 
                        fontWeight: 500,
                        borderRadius: '8px',
                        borderWidth: '2px'
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button 
                      variant="light" 
                      size="sm"
                      style={{ 
                        fontWeight: 500,
                        borderRadius: '8px'
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
        padding: '4rem 0',
        color: 'white'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 700, 
                  fontSize: '3.5rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: 'center',

                }}>
                  <span style={{ fontSize: '4rem' }}>🧪</span>
                  <TypeAnimation
                    sequence={[
                      'ResumeLab',
                      2000,
                      'Resume Lab',
                      2000,
                      'ResumeLab',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h1>
                <h2 style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 600, 
                  fontSize: '2rem',
                  marginBottom: '1.5rem',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}>
                  AI-Powered Resume Analysis Platform
                </h2>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '2rem',
                  lineHeight: '1.8'
                }}>
                  Transform your resume with intelligent AI analysis. Match your skills with job requirements, 
                  get personalized recommendations, and generate professional resumes in minutes.
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                  <Link to="/signup">
                    <Button 
                      size="lg" 
                      style={{ 
                        backgroundColor: 'white',
                        color: '#2563EB',
                        border: 'none',
                        padding: '0.875rem 2rem',
                        fontWeight: 600,
                        borderRadius: '10px',
                        fontSize: '1.1rem'
                      }}
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button 
                      size="lg" 
                      variant="outline-light"
                      style={{ 
                        padding: '0.875rem 2rem',
                        fontWeight: 600,
                        borderRadius: '10px',
                        fontSize: '1.1rem',
                        borderWidth: '2px'
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <DotLottieReact
                src="https://lottie.host/17ca0855-6ae4-4f1e-b65d-c61c03cd52d9/YkuyBURNdX.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '500px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container style={{ padding: '4rem 0' }}>
        <div className="text-center mb-5">
          <h2 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Powerful Features
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#6B7280' }}>
            Everything you need to create the perfect resume
          </p>
        </div>

        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card style={{ 
              height: '100%',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}>
              <Card.Body className="text-center p-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  Smart Analysis
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  AI-powered resume analysis that identifies strengths and areas for improvement
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card style={{ 
              height: '100%',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}>
              <Card.Body className="text-center p-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  Job Matching
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Match your resume against job descriptions and get compatibility scores
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card style={{ 
              height: '100%',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}>
              <Card.Body className="text-center p-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  Resume Generator
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Create professional resumes with AI assistance in minutes
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card style={{ 
              height: '100%',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}>
              <Card.Body className="text-center p-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  Smart Suggestions
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Get personalized recommendations to improve your resume
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <div style={{ background: 'white', padding: '4rem 0' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700,
              fontSize: '2.5rem',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6B7280' }}>
              Get started in three simple steps
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div style={{ 
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  margin: '0 auto 1.5rem',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  1
                </div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  Upload Resume
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Upload your existing resume in PDF or DOCX format
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="text-center">
                <div style={{ 
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  margin: '0 auto 1.5rem',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  2
                </div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  AI Analysis
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Our AI analyzes your resume and matches it with job requirements
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="text-center">
                <div style={{ 
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  margin: '0 auto 1.5rem',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  3
                </div>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>
                  Get Results
                </h4>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Receive detailed insights and actionable recommendations
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
        padding: '4rem 0',
        color: 'white'
      }}>
        <Container>
          <div className="text-center">
            <h2 style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700,
              fontSize: '2.5rem',
              marginBottom: '1.5rem'
            }}>
              Ready to Transform Your Resume?
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Join thousands of professionals who have improved their resumes with ResumeLab
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                style={{ 
                  backgroundColor: 'white',
                  color: '#2563EB',
                  border: 'none',
                  padding: '1rem 3rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  fontSize: '1.2rem'
                }}
              >
                Start Free Today
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <footer id="contact" style={{ 
        background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
        color: 'white',
        padding: '4rem 0 2rem'
      }}>
        <Container>
          <Row className="mb-5">
            <Col lg={4} className="mb-4 mb-lg-0">
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 700,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'white'
                }}>
                  <span style={{ fontSize: '2rem' }}>🧪</span> ResumeLab
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  marginBottom: '1rem',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  AI-Powered Resume Analysis Platform
                </p>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  Transform your resume with intelligent AI analysis. Match your skills with job requirements and get personalized recommendations.
                </p>
              </div>
            </Col>
            
            <Col lg={4} className="mb-4 mb-lg-0">
              <h5 style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Quick Links
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                  Home
                </Link>
                <Link to="/login" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                  Sign In
                </Link>
                <Link to="/signup" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                  Sign Up
                </Link>
                <a href="#contact" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                  Contact
                </a>
              </div>
            </Col>
            
            <Col lg={4}>
              <h5 style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Connect With Us
              </h5>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                Follow us on social media for updates and tips
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '1.5rem' }}>
                <a 
                  href="https://github.com/deepakdey412" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/deepakdey/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/deepax.dev?igsh=MWRlbmtxNHdoOWE0Mw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </Col>
          </Row>
          
          <hr style={{ 
            borderColor: 'rgba(255, 255, 255, 0.15)', 
            margin: '2rem 0 1.5rem',
            opacity: 0.5
          }} />
          
          <Row>
            <Col className="text-center">
              <p style={{ 
                margin: 0, 
                color: 'rgba(255, 255, 255, 0.5)', 
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                © 2024 ResumeLab. All rights reserved. | AI-Powered Resume Analysis Platform
              </p>
              <p style={{ 
                margin: '0.5rem 0 0', 
                color: 'rgba(255, 255, 255, 0.4)', 
                fontSize: '0.85rem'
              }}>
                Made with ❤️ for job seekers worldwide
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
