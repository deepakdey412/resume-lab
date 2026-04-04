# Smart Resume Analyzer

A full-stack web application that analyzes resumes and matches them with job roles using skill-based matching algorithms.

## 🚀 Features

- **User Authentication** - Secure JWT-based authentication
- **Resume Upload** - Support for PDF and DOCX files
- **Automatic Analysis** - AI-powered skill extraction and matching
- **Job Matching** - Match resumes with 5 pre-seeded job roles
- **Skills Gap Analysis** - Identify matched and missing skills
- **Dashboard** - View statistics and analysis history
- **Responsive Design** - Works on desktop and mobile

## 📋 Pre-seeded Job Roles

The application comes with 5 job roles and 100+ skills:
1. **Software Engineer** - Java, Spring Boot, REST API, etc.
2. **Data Scientist** - Python, Machine Learning, TensorFlow, etc.
3. **Frontend Developer** - React, JavaScript, HTML, CSS, etc.
4. **DevOps Engineer** - Docker, Kubernetes, AWS, CI/CD, etc.
5. **Product Manager** - Agile, Scrum, Product Strategy, etc.

## 🛠️ Technology Stack

### Backend
- **Java 17** with Spring Boot 3
- **Spring Security** with JWT authentication
- **Spring Data JPA** with H2 database
- **Apache POI** for DOCX parsing
- **PDFBox** for PDF parsing
- **Maven** for dependency management

### Frontend
- **Pure HTML5** - No framework needed!
- **Vanilla JavaScript** (ES6+)
- **Bootstrap 5** for styling
- **Fetch API** for HTTP requests

## 📦 Project Structure

```
smart-resume-analyzer/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/resumeanalyzer/
│   │       │       ├── config/      # Security & CORS config
│   │       │       ├── controller/  # REST controllers
│   │       │       ├── dto/         # Data transfer objects
│   │       │       ├── entity/      # JPA entities
│   │       │       ├── repository/  # JPA repositories
│   │       │       ├── security/    # JWT & auth
│   │       │       └── service/     # Business logic
│   │       └── resources/
│   │           └── application.properties
│   ├── uploads/             # Uploaded resume files
│   ├── pom.xml
│   └── mvnw.cmd
│
└── frontend/                # Single HTML page
    ├── index.html          # Complete application
    └── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven (included via wrapper)
- Any modern web browser

### 1. Start the Backend

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8081`

**Note**: On first run, the application will automatically seed the database with 5 job roles and 100+ skills.

### 2. Open the Frontend

Simply open `frontend/index.html` in your web browser!

Or use a simple HTTP server:

```bash
cd frontend

# Using Python
python -m http.server 3000

# Using Node.js (if installed)
npx http-server -p 3000
```

Then navigate to `http://localhost:3000`

## 📖 Usage Guide

### 1. Sign Up
- Create a new account with your name, email, and password
- You'll be automatically logged in after signup

### 2. Upload Resume
- Click "Upload Resume" in the sidebar
- Select a PDF or DOCX file (max 10MB)
- The system will automatically analyze your resume

### 3. View Results
- See your match percentage with each job role
- View matched skills (green tags)
- Identify missing skills (red tags)
- Get suggestions for improvement

### 4. Dashboard
- View statistics: total resumes, analyses, average match
- See all your uploaded resumes
- Track your progress over time

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Server port
server.port=8081

# Database (H2 in-memory)
spring.datasource.url=jdbc:h2:mem:resumedb
spring.datasource.username=root
spring.datasource.password=root

# JWT Secret
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# File upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Frontend Configuration
Edit the API base URL in `frontend/index.html`:

```javascript
const API_BASE = 'http://localhost:8081/api';
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Resume Management
- `POST /api/resumes/upload` - Upload resume (multipart/form-data)

### Analysis
- `POST /api/analysis/resume/{resumeId}` - Analyze resume
- `GET /api/analysis/resume/{resumeId}/top/{topN}` - Get top N matches

### Dashboard
- `GET /api/dashboard/my-analyses` - Get user dashboard
- `GET /api/dashboard/all-resumes` - Get all user resumes
- `GET /api/dashboard/statistics` - Get user statistics

## 🎨 Features in Detail

### Skill Matching Algorithm
1. **Text Extraction** - Extracts text from PDF/DOCX files
2. **Tokenization** - Breaks text into words and n-grams
3. **Skill Detection** - Matches tokens against job skill database
4. **Scoring** - Calculates match percentage: (matched skills / total skills) × 100
5. **Gap Analysis** - Identifies missing skills for improvement

### Security
- JWT-based authentication
- BCrypt password hashing
- CORS enabled for frontend
- Secure file upload validation

## 🐛 Troubleshooting

### Backend won't start
- Check if Java 17+ is installed: `java -version`
- Check if port 8081 is available
- Check console for error messages

### Frontend can't connect to backend
- Verify backend is running on port 8081
- Check browser console for CORS errors
- Ensure API_BASE URL is correct in index.html

### File upload fails
- Check file size (max 10MB)
- Ensure file is PDF or DOCX format
- Check backend logs for errors

## 📝 Database Schema

### Tables
- **users** - User accounts
- **resumes** - Uploaded resume files
- **job_roles** - Job role definitions
- **job_skills** - Skills required for each job
- **resume_analysis** - Analysis results

## 🤝 Contributing

This is a learning project. Feel free to fork and modify!

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a full-stack demonstration project.

## 🙏 Acknowledgments

- Spring Boot for the excellent backend framework
- Bootstrap for the beautiful UI components
- Apache POI and PDFBox for document parsing
