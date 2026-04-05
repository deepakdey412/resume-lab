import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import authService from '../api/services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isAdmin = user?.email === 'admin@gmail.com';

  const handleLogout = () => {
    authService.logout();
    // Force page reload to clear all state
    window.location.href = '/login';
  };

  return (
    <BootstrapNavbar expand="lg" className="mb-4" style={{ backgroundColor: '#2563EB' }}>
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
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAdmin ? (
              // Admin only sees Admin Dashboard
              <Nav.Link as={Link} to="/admin" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                Admin Dashboard
              </Nav.Link>
            ) : (
              // Regular users see all features
              <>
                <Nav.Link as={Link} to="/dashboard" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/upload" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                  Upload Resume
                </Nav.Link>
                <Nav.Link as={Link} to="/jd-analysis" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                  JD Analysis
                </Nav.Link>
                <Nav.Link as={Link} to="/resume-generator" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                  Resume Generator
                </Nav.Link>
                <Nav.Link as={Link} to="/feedback" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                  Feedback
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <BootstrapNavbar.Text className="me-3" style={{ color: 'white' }}>
              Welcome, {user?.fullName || 'User'}
              {isAdmin && <Badge bg="danger" className="ms-2">Admin</Badge>}
            </BootstrapNavbar.Text>
            <Button 
              variant="light" 
              size="sm" 
              onClick={handleLogout}
              style={{ 
                fontWeight: 500,
                borderRadius: '8px'
              }}
            >
              Logout
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
