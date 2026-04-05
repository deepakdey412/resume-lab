import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Spinner, Badge, Tabs, Tab } from 'react-bootstrap';
import adminService from '../api/services/adminService';
import authService from '../api/services/authService';

const AdminPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const user = authService.getCurrentUser();
  const isAdmin = user?.email === 'admin@gmail.com';

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'dashboard') {
        fetchDashboard();
      } else if (activeTab === 'feedback') {
        fetchFeedback();
      }
    }
  }, [isAdmin, activeTab]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAdminDashboard();
      setDashboardData(data);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard data. Please ensure you are logged in as admin.');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllFeedback();
      setFeedbackList(data);
      setError('');
    } catch (err) {
      setError('Failed to load feedback data.');
      console.error('Feedback error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      await adminService.deleteFeedback(feedbackId);
      // Refresh feedback list after deletion
      setFeedbackList(feedbackList.filter(feedback => feedback.id !== feedbackId));
      alert('Feedback deleted successfully');
    } catch (err) {
      alert('Failed to delete feedback. Please try again.');
      console.error('Delete feedback error:', err);
    }
  };

  if (!isAdmin) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <h5>Access Denied</h5>
          <p>This page is only accessible to administrators.</p>
          <p>
            <strong>Admin Credentials:</strong>
            <br />
            Email: admin@gmail.com
            <br />
            Password: admin123
          </p>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Admin Dashboard</h2>
          <p className="text-muted">Manage users and view feedback</p>
        </div>
        <Badge bg="danger" className="p-2" style={{ fontSize: '0.875rem' }}>
          Admin Access
        </Badge>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="dashboard" title="User Dashboard">
          {dashboardData && (
            <>
              <Row className="mb-4">
                <Col md={4}>
                  <Card className="text-center shadow-sm" style={{ borderRadius: '12px' }}>
                    <Card.Body>
                      <Card.Title className="text-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Total Users</Card.Title>
                      <h1 className="display-4" style={{ color: '#2563EB', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{dashboardData.totalUsers}</h1>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center shadow-sm" style={{ borderRadius: '12px' }}>
                    <Card.Body>
                      <Card.Title className="text-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Total Resumes</Card.Title>
                      <h1 className="display-4" style={{ color: '#22C55E', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                        {dashboardData.users.reduce((sum, user) => sum + user.resumeCount, 0)}
                      </h1>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center shadow-sm" style={{ borderRadius: '12px' }}>
                    <Card.Body>
                      <Card.Title className="text-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Active Users</Card.Title>
                      <h1 className="display-4" style={{ color: '#2563EB', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                        {dashboardData.users.filter(user => user.resumeCount > 0).length}
                      </h1>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="shadow-sm" style={{ borderRadius: '12px' }}>
                <Card.Header style={{ backgroundColor: '#2563EB', color: 'white', borderRadius: '12px 12px 0 0' }}>
                  <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>User List & Resume Count</h5>
                </Card.Header>
                <Card.Body>
                  {dashboardData.users.length === 0 ? (
                    <Alert variant="info">No users found</Alert>
                  ) : (
                    <Table striped bordered hover responsive>
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Email</th>
                          <th>Full Name</th>
                          <th className="text-center">Resumes Uploaded</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.users.map((user, index) => (
                          <tr key={user.userId}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.fullName}</td>
                            <td className="text-center">
                              <Badge bg={user.resumeCount > 0 ? 'success' : 'secondary'} pill>
                                {user.resumeCount}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
                {dashboardData.users.length > 0 && (
                  <Card.Footer className="text-muted">
                    Showing all {dashboardData.totalUsers} registered users
                  </Card.Footer>
                )}
              </Card>
            </>
          )}
        </Tab>

        <Tab eventKey="feedback" title="User Feedback">
          <Card className="shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Header style={{ backgroundColor: '#2563EB', color: 'white', borderRadius: '12px 12px 0 0' }}>
              <h5 className="mb-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>User Feedback</h5>
            </Card.Header>
            <Card.Body>
              {feedbackList.length === 0 ? (
                <Alert variant="info">No feedback submitted yet</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Submitted At</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackList.map((feedback, index) => (
                      <tr key={feedback.id}>
                        <td>{index + 1}</td>
                        <td>{feedback.name}</td>
                        <td>
                          <a href={`mailto:${feedback.email}`}>{feedback.email}</a>
                        </td>
                        <td>
                          <div style={{ maxWidth: '400px', whiteSpace: 'pre-wrap' }}>
                            {feedback.message}
                          </div>
                        </td>
                        <td>
                          {feedback.createdAt
                            ? new Date(feedback.createdAt).toLocaleString()
                            : 'N/A'}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteFeedback(feedback.id)}
                            style={{ borderRadius: '8px' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
            {feedbackList.length > 0 && (
              <Card.Footer className="text-muted">
                Total Feedback: <Badge bg="info">{feedbackList.length}</Badge>
              </Card.Footer>
            )}
          </Card>
        </Tab>
      </Tabs>

      <Card className="mt-4 shadow-sm" style={{ borderRadius: '12px' }}>
        <Card.Header style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
          <h5>Admin Information</h5>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Logged in as:</strong> {user?.fullName} ({user?.email})
          </p>
          <p>
            <strong>Role:</strong> <Badge bg="danger">Administrator</Badge>
          </p>
          <Alert variant="info" className="mb-0" style={{ borderRadius: '10px' }}>
            <strong>Note:</strong> As an administrator, you can view all users, their resume upload statistics, and user feedback. 
            Regular user features (Upload Resume, JD Analysis, Resume Generator) are not available in admin mode.
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminPage;
