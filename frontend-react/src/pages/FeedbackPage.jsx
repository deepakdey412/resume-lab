import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import feedbackService from '../api/services/feedbackService';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await feedbackService.submitFeedback(
        formData.name,
        formData.email,
        formData.message
      );
      setSuccess('Thank you for your feedback! We appreciate your input.');
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to submit feedback. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Feedback</h2>
      <p className="text-muted">
        We'd love to hear from you! Share your thoughts, suggestions, or report any issues.
      </p>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5>Submit Feedback</h5>
            </Card.Header>
            <Card.Body>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="message"
                    placeholder="Share your feedback, suggestions, or report issues..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h5>What kind of feedback can you share?</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-success">✓ Suggestions</h6>
                  <ul>
                    <li>Feature requests</li>
                    <li>Improvements</li>
                    <li>User experience</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-info">✓ Issues</h6>
                  <ul>
                    <li>Bug reports</li>
                    <li>Technical problems</li>
                    <li>Error messages</li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h6 className="text-warning">✓ General Feedback</h6>
                  <ul>
                    <li>Overall experience</li>
                    <li>What you like</li>
                    <li>What could be better</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-primary">✓ Questions</h6>
                  <ul>
                    <li>How to use features</li>
                    <li>Account issues</li>
                    <li>General inquiries</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackPage;
