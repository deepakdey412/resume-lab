import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dashboardService from '../api/services/dashboardService';
import authService from '../api/services/authService';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getCurrentUser();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getMyAnalyses();
      setDashboardData(data);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading dashboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!dashboardData) {
    return (
      <Container className="mt-4">
        <Alert variant="info">No data available</Alert>
      </Container>
    );
  }

  const { statistics, resumes } = dashboardData;

  // Prepare chart data for top matches across all resumes
  const topMatchesChartData = resumes
    .flatMap(resume => resume.topMatches || [])
    .slice(0, 5)
    .map(match => ({
      name: match.jobRoleName,
      matchPercentage: match.matchPercentage,
    }));

  // Prepare pie chart data for resume distribution
  const resumeDistributionData = resumes.map((resume, index) => ({
    name: resume.fileName,
    value: resume.totalAnalyses || 0,
  }));

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Dashboard</h2>
      <p className="text-muted">Welcome back, {user?.fullName}!</p>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{statistics?.totalResumes || 0}</h3>
              <Card.Text className="text-muted">Total Resumes</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{statistics?.totalAnalyses || 0}</h3>
              <Card.Text className="text-muted">Total Analyses</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">
                {statistics?.averageMatchScore ? `${statistics.averageMatchScore.toFixed(1)}%` : 'N/A'}
              </h3>
              <Card.Text className="text-muted">Avg Match Score</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">
                {statistics?.bestMatchScore ? `${statistics.bestMatchScore.toFixed(1)}%` : 'N/A'}
              </h3>
              <Card.Text className="text-muted">Best Match</Card.Text>
              {statistics?.bestMatchJobRole && (
                <small className="text-muted">{statistics.bestMatchJobRole}</small>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      {topMatchesChartData.length > 0 && (
        <Row className="mb-4">
          <Col md={8}>
            <Card>
              <Card.Header>
                <h5>Top Job Matches</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topMatchesChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="matchPercentage" fill="#0088FE" name="Match %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header>
                <h5>Resume Analysis Distribution</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={resumeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resumeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Resumes Table */}
      <Card>
        <Card.Header>
          <h5>My Resumes</h5>
        </Card.Header>
        <Card.Body>
          {resumes.length === 0 ? (
            <Alert variant="info">
              No resumes uploaded yet. Upload your first resume to get started!
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Uploaded At</th>
                  <th>Total Analyses</th>
                  <th>Top Matches</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume) => (
                  <tr key={resume.resumeId}>
                    <td>{resume.fileName}</td>
                    <td>{new Date(resume.uploadedAt).toLocaleDateString()}</td>
                    <td>
                      <Badge bg="primary">{resume.totalAnalyses || 0}</Badge>
                    </td>
                    <td>
                      {resume.topMatches && resume.topMatches.length > 0 ? (
                        <div>
                          {resume.topMatches.slice(0, 3).map((match, index) => (
                            <div key={index} className="mb-1">
                              <Badge bg="success" className="me-2">
                                {match.matchPercentage.toFixed(1)}%
                              </Badge>
                              <small>{match.jobRoleName}</small>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">No analyses yet</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Detailed Matches Section */}
      {resumes.some(r => r.topMatches && r.topMatches.length > 0) && (
        <Card className="mt-4">
          <Card.Header>
            <h5>Detailed Match Analysis</h5>
          </Card.Header>
          <Card.Body>
            {resumes.map((resume) => (
              resume.topMatches && resume.topMatches.length > 0 && (
                <div key={resume.resumeId} className="mb-4">
                  <h6 className="text-primary">{resume.fileName}</h6>
                  <Row>
                    {resume.topMatches.map((match, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <Card>
                          <Card.Body>
                            <h6>{match.jobRoleName}</h6>
                            <p className="mb-2">
                              <strong>Match: </strong>
                              <Badge bg={match.matchPercentage >= 70 ? 'success' : match.matchPercentage >= 50 ? 'warning' : 'danger'}>
                                {match.matchPercentage.toFixed(1)}%
                              </Badge>
                            </p>
                            <p className="mb-2">
                              <strong>Matched Skills:</strong>
                              <br />
                              <small className="text-success">
                                {match.matchedSkills?.slice(0, 5).join(', ') || 'None'}
                              </small>
                            </p>
                            <p className="mb-0">
                              <strong>Missing Skills:</strong>
                              <br />
                              <small className="text-danger">
                                {match.missingSkills?.slice(0, 5).join(', ') || 'None'}
                              </small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DashboardPage;
