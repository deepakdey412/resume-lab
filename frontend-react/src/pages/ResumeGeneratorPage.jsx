import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import resumeGeneratorService from '../api/services/resumeGeneratorService';

const ResumeGeneratorPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: '',
    education: '',
    experience: '',
    projects: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const parseArrayField = (text) => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const resumeData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        summary: formData.summary,
        skills: parseArrayField(formData.skills),
        education: parseArrayField(formData.education),
        experience: parseArrayField(formData.experience),
        projects: parseArrayField(formData.projects),
      };

      const blob = await resumeGeneratorService.generateResumePreview(resumeData);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setSuccess('Resume preview generated! You can now download it.');
    } catch (err) {
      setError('Failed to generate resume preview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setError('');
    setLoading(true);

    try {
      const resumeData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        summary: formData.summary,
        skills: parseArrayField(formData.skills),
        education: parseArrayField(formData.education),
        experience: parseArrayField(formData.experience),
        projects: parseArrayField(formData.projects),
      };

      await resumeGeneratorService.generateResumeDownload(resumeData);
      setSuccess('Resume downloaded successfully!');
    } catch (err) {
      setError('Failed to download resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Resume Generator</h2>
      <p className="text-muted">Create a professional PDF resume from your details.</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Resume Details</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePreview}>
                <h6 className="text-primary">Personal Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>

                <h6 className="text-primary mt-4">Professional Summary</h6>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Brief professional summary..."
                  />
                </Form.Group>

                <h6 className="text-primary mt-4">Skills</h6>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="One skill per line&#10;Java&#10;Python&#10;React"
                  />
                  <Form.Text className="text-muted">Enter one skill per line</Form.Text>
                </Form.Group>

                <h6 className="text-primary mt-4">Education</h6>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="One entry per line&#10;B.S. Computer Science - University Name (2020)&#10;M.S. Software Engineering - University Name (2022)"
                  />
                  <Form.Text className="text-muted">Enter one entry per line</Form.Text>
                </Form.Group>

                <h6 className="text-primary mt-4">Experience</h6>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="One entry per line&#10;Software Engineer at Company (2020-2023)&#10;Junior Developer at Startup (2018-2020)"
                  />
                  <Form.Text className="text-muted">Enter one entry per line</Form.Text>
                </Form.Group>

                <h6 className="text-primary mt-4">Projects</h6>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="projects"
                    value={formData.projects}
                    onChange={handleChange}
                    placeholder="One project per line&#10;E-commerce Platform - Built with React and Node.js&#10;Mobile App - Developed using React Native"
                  />
                  <Form.Text className="text-muted">Enter one project per line</Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Generating...
                      </>
                    ) : (
                      'Preview Resume'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Preview & Download</h5>
            </Card.Header>
            <Card.Body>
              {pdfUrl ? (
                <>
                  <div className="mb-3">
                    <iframe
                      src={pdfUrl}
                      width="100%"
                      height="600px"
                      title="Resume Preview"
                      style={{ border: '1px solid #ddd' }}
                    />
                  </div>
                  <div className="d-grid">
                    <Button variant="success" onClick={handleDownload} disabled={loading}>
                      {loading ? 'Downloading...' : 'Download PDF'}
                    </Button>
                  </div>
                </>
              ) : (
                <Alert variant="info">
                  <h6>Instructions:</h6>
                  <ol>
                    <li>Fill in your details in the form</li>
                    <li>Click "Preview Resume" to see the PDF</li>
                    <li>Click "Download PDF" to save it</li>
                  </ol>
                  <p className="mb-0">
                    <strong>Note:</strong> The resume is not stored in the database.
                  </p>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeGeneratorPage;
