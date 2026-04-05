import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import resumeService from '../api/services/resumeService';
import dashboardService from '../api/services/dashboardService';
import analysisService from '../api/services/analysisService';

const UploadResumePage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState({});

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getAllResumes();
      setResumes(data);
    } catch (err) {
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadError('');
    setUploadSuccess('');

    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setUploadError('Only PDF and DOCX files are allowed');
        setFile(null);
        return;
      }

      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadError('Please select a file');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const response = await resumeService.uploadResume(file);
      setUploadSuccess(
        `Resume uploaded successfully! File: ${response.fileName}, Extracted ${response.extractedTextLength} characters`
      );
      setFile(null);
      // Reset file input
      document.getElementById('resumeFile').value = '';
      // Refresh resume list
      fetchResumes();
    } catch (err) {
      setUploadError(
        err.response?.data?.message || 'Upload failed. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      await resumeService.deleteResume(resumeId);
      setUploadSuccess('Resume deleted successfully');
      fetchResumes();
    } catch (err) {
      setUploadError('Failed to delete resume');
    }
  };

  const handleAnalyze = async (resumeId) => {
    setAnalyzing({ ...analyzing, [resumeId]: true });
    try {
      await analysisService.analyzeResume(resumeId);
      setUploadSuccess('Analysis completed! Check the Dashboard for results.');
      fetchResumes();
    } catch (err) {
      setUploadError('Analysis failed. Please try again.');
    } finally {
      setAnalyzing({ ...analyzing, [resumeId]: false });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Upload Resume</h2>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Upload New Resume</h5>
            </Card.Header>
            <Card.Body>
              {uploadSuccess && <Alert variant="success">{uploadSuccess}</Alert>}
              {uploadError && <Alert variant="danger">{uploadError}</Alert>}

              <Form onSubmit={handleUpload}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Resume File</Form.Label>
                  <Form.Control
                    type="file"
                    id="resumeFile"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <Form.Text className="text-muted">
                    Accepted formats: PDF, DOCX (Max size: 10MB)
                  </Form.Text>
                </Form.Group>

                {file && (
                  <Alert variant="info">
                    <strong>Selected:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </Alert>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!file || uploading}
                  className="w-100"
                >
                  {uploading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Uploading...
                    </>
                  ) : (
                    'Upload Resume'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Upload Instructions</h5>
            </Card.Header>
            <Card.Body>
              <h6>Supported Formats:</h6>
              <ul>
                <li>PDF (.pdf)</li>
                <li>Microsoft Word (.docx)</li>
              </ul>

              <h6>File Requirements:</h6>
              <ul>
                <li>Maximum file size: 10MB</li>
                <li>Clear, readable text</li>
                <li>Standard resume format</li>
              </ul>

              <h6>After Upload:</h6>
              <ul>
                <li>Your resume will be parsed automatically</li>
                <li>Click "Analyze" to match with job roles</li>
                <li>View results in the Dashboard</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Header>
          <h5>My Uploaded Resumes</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p className="mt-2">Loading resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <Alert variant="info">
              No resumes uploaded yet. Upload your first resume above!
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Uploaded At</th>
                  <th>Analyses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume) => (
                  <tr key={resume.resumeId}>
                    <td>{resume.fileName}</td>
                    <td>{new Date(resume.uploadedAt).toLocaleString()}</td>
                    <td>
                      <Badge bg="primary">{resume.totalAnalyses || 0}</Badge>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleAnalyze(resume.resumeId)}
                        disabled={analyzing[resume.resumeId]}
                      >
                        {analyzing[resume.resumeId] ? 'Analyzing...' : 'Analyze'}
                      </Button>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate('/dashboard')}
                      >
                        View Results
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(resume.resumeId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UploadResumePage;
