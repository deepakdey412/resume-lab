import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Spinner } from 'react-bootstrap';
import jdAnalysisService from '../api/services/jdAnalysisService';
import dashboardService from '../api/services/dashboardService';

const JDAnalysisPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const data = await dashboardService.getAllResumes();
      setResumes(data);
    } catch (err) {
      setError('Failed to load resumes');
    } finally {
      setLoadingResumes(false);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setAnalysisResult(null);

    if (!selectedResumeId) {
      setError('Please select a resume');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);

    try {
      const result = await jdAnalysisService.analyzeWithJD(selectedResumeId, jobDescription);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedResumeId('');
    setJobDescription('');
    setAnalysisResult(null);
    setError('');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Job Description Analysis</h2>
      <p className="text-muted">
        Analyze your resume against a custom job description to see how well you match.
      </p>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Analysis Input</h5>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleAnalyze}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Resume</Form.Label>
                  {loadingResumes ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Form.Select
                      value={selectedResumeId}
                      onChange={(e) => setSelectedResumeId(e.target.value)}
                      required
                    >
                      <option value="">-- Select a resume --</option>
                      {resumes.map((resume) => (
                        <option key={resume.resumeId} value={resume.resumeId}>
                          {resume.fileName}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {resumes.length === 0 && !loadingResumes && (
                    <Form.Text className="text-danger">
                      No resumes found. Please upload a resume first.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Paste the complete job description including requirements, responsibilities, and qualifications.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading || !selectedResumeId || !jobDescription.trim()}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          className="me-2"
                        />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Match'
                    )}
                  </Button>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          {analysisResult ? (
            <Card>
              <Card.Header className="bg-success text-white">
                <h5>Analysis Results</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-4">
                  <h1 className="display-4">
                    <Badge
                      bg={
                        analysisResult.matchPercentage >= 70
                          ? 'success'
                          : analysisResult.matchPercentage >= 50
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {analysisResult.matchPercentage.toFixed(1)}%
                    </Badge>
                  </h1>
                  <p className="text-muted">Match Percentage</p>
                </div>

                <Card className="mb-3">
                  <Card.Body>
                    <h6 className="text-success">
                      ✓ Matched Keywords ({analysisResult.matchedKeywords?.length || 0})
                    </h6>
                    {analysisResult.matchedKeywords && analysisResult.matchedKeywords.length > 0 ? (
                      <div>
                        {analysisResult.matchedKeywords.map((keyword, index) => (
                          <Badge key={index} bg="success" className="me-2 mb-2">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No matched keywords</p>
                    )}
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <h6 className="text-danger">
                      ✗ Missing Keywords ({analysisResult.missingKeywords?.length || 0})
                    </h6>
                    {analysisResult.missingKeywords && analysisResult.missingKeywords.length > 0 ? (
                      <div>
                        {analysisResult.missingKeywords.map((keyword, index) => (
                          <Badge key={index} bg="danger" className="me-2 mb-2">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No missing keywords</p>
                    )}
                  </Card.Body>
                </Card>

                <Alert variant="info">
                  <strong>Total Keywords:</strong> {analysisResult.totalKeywords || 0}
                  <br />
                  <strong>Note:</strong> This analysis is temporary and not stored in the database.
                </Alert>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Header>
                <h5>Instructions</h5>
              </Card.Header>
              <Card.Body>
                <h6>How to use:</h6>
                <ol>
                  <li>Select one of your uploaded resumes</li>
                  <li>Paste the job description you want to analyze against</li>
                  <li>Click "Analyze Match" to see results</li>
                </ol>

                <h6 className="mt-3">What you'll get:</h6>
                <ul>
                  <li>Overall match percentage</li>
                  <li>Keywords found in your resume</li>
                  <li>Keywords missing from your resume</li>
                  <li>Suggestions for improvement</li>
                </ul>

                <Alert variant="warning">
                  <strong>Note:</strong> Results are not saved. This is for quick analysis only.
                </Alert>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default JDAnalysisPage;
