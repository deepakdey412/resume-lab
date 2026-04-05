import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PrivateRoute from './utils/PrivateRoute';
import authService from './api/services/authService';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import UploadResumePage from './pages/UploadResumePage';
import JDAnalysisPage from './pages/JDAnalysisPage';
import ResumeGeneratorPage from './pages/ResumeGeneratorPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminPage from './pages/AdminPage';

// Components
import Navbar from './components/Navbar';

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check for user on mount and route change
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [location.pathname]); // Re-check user when route changes

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAdmin = user?.email === 'admin@gmail.com';

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Private Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div>
              <Navbar />
              <Routes>
                {isAdmin ? (
                  // Admin routes - only admin dashboard
                  <>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                  </>
                ) : (
                  // Regular user routes
                  <>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/upload" element={<UploadResumePage />} />
                    <Route path="/jd-analysis" element={<JDAnalysisPage />} />
                    <Route path="/resume-generator" element={<ResumeGeneratorPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                  </>
                )}
              </Routes>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
