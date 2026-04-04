# Smart Resume Analyzer - Frontend

This is a single-page HTML application with vanilla JavaScript. No build process or dependencies required!

## How to Run

1. **Start the Backend Server**
   ```bash
   cd backend
   .\mvnw.cmd spring-boot:run
   ```
   Backend will run on `http://localhost:8081`

2. **Open the Frontend**
   - Simply open `index.html` in your web browser
   - Or use a simple HTTP server:
     ```bash
     # Using Python
     python -m http.server 3000
     
     # Using Node.js (if installed)
     npx http-server -p 3000
     ```
   - Then navigate to `http://localhost:3000`

## Features

- ✅ User Authentication (Login/Signup)
- ✅ Resume Upload (PDF/DOCX)
- ✅ Automatic Resume Analysis
- ✅ Job Match Scoring
- ✅ Skills Gap Analysis
- ✅ Dashboard with Statistics
- ✅ Responsive Design

## API Endpoints Used

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/resumes/upload` - Upload resume
- `POST /api/analysis/resume/{resumeId}` - Analyze resume
- `GET /api/dashboard/my-analyses` - Get dashboard data
- `GET /api/dashboard/all-resumes` - Get all user resumes

## Technology Stack

- Pure HTML5
- Vanilla JavaScript (ES6+)
- Bootstrap 5 (CSS Framework)
- Bootstrap Icons
- Fetch API for HTTP requests

## No Dependencies!

This application requires:
- ✅ No npm install
- ✅ No node_modules
- ✅ No build process
- ✅ No React/Vue/Angular
- ✅ Just open and run!
