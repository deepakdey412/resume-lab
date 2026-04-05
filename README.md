# 🧪 ResumeLab - AI-Powered Resume Analysis Platform

ResumeLab is a full-stack web application that uses AI to analyze resumes, match them with job descriptions, and provide personalized recommendations. Built with Spring Boot (Java) backend and React frontend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [1. Database Setup (MySQL)](#1-database-setup-mysql)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Default Credentials](#default-credentials)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- **Resume Upload & Analysis**: Upload resumes in PDF or DOCX format
- **Job Description Matching**: Match resumes against job descriptions with AI-powered analysis
- **Skill Gap Analysis**: Identify matched and missing skills
- **Resume Generator**: Create professional resumes with AI assistance
- **User Dashboard**: View analytics, statistics, and match history
- **Admin Dashboard**: Manage users and view feedback
- **Feedback System**: Users can submit feedback
- **JWT Authentication**: Secure authentication with JSON Web Tokens
- **Responsive Design**: Modern UI with Bootstrap and custom theming

---

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Hibernate)
- **MySQL 8.0**
- **Apache POI** (Word document parsing)
- **Apache PDFBox** (PDF parsing)
- **OpenPDF** (PDF generation)
- **Swagger/OpenAPI** (API documentation)
- **Maven** (dependency management)

### Frontend
- **React 18**
- **React Router** (routing)
- **Bootstrap 5** & **React Bootstrap** (UI components)
- **Axios** (HTTP client)
- **Recharts** (data visualization)
- **Lottie** (animations)
- **Vite** (build tool)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java -version`

2. **MySQL 8.0 or higher**
   - Download: https://dev.mysql.com/downloads/mysql/
   - Verify installation: `mysql --version`

3. **Node.js 18.x or higher** (includes npm)
   - Download: https://nodejs.org/
   - Verify installation: `node -v` and `npm -v`

4. **Maven 3.6+** (optional, Maven Wrapper included)
   - Download: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -v`

### Optional Software

- **Git** (for cloning the repository)
- **Postman** (for API testing)
- **IDE**: IntelliJ IDEA, Eclipse, or VS Code

---

## 🚀 Installation & Setup

### 1. Database Setup (MySQL)

#### Step 1.1: Start MySQL Server

Make sure your MySQL server is running.

#### Step 1.2: Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE resumelab_db;
```

**Note**: The database will be auto-created if it doesn't exist (configured in application.properties).

#### Step 1.3: Configure Database Credentials

Navigate to `backend/src/main/resources/application.properties` and update:

```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

Replace `your_mysql_password` with your actual MySQL root password.

---

### 2. Backend Setup

#### Step 2.1: Navigate to Backend Directory

```bash
cd backend
```

#### Step 2.2: Install Dependencies

Using Maven:
```bash
mvn clean install
```

Or using Maven Wrapper (Windows):
```bash
mvnw.cmd clean install
```

Or using Maven Wrapper (Linux/Mac):
```bash
./mvnw clean install
```

#### Step 2.3: Run the Backend Server

Using Maven:
```bash
mvn spring-boot:run
```

Or using Maven Wrapper (Windows):
```bash
mvnw.cmd spring-boot:run
```

Or using Maven Wrapper (Linux/Mac):
```bash
./mvnw spring-boot:run
```

The backend server will start on **http://localhost:8081**

#### Step 2.4: Verify Backend is Running

Open your browser and navigate to:
- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **API Docs**: http://localhost:8081/v3/api-docs

You should see the Swagger API documentation page.

---

### 3. Frontend Setup

#### Step 3.1: Navigate to Frontend Directory

Open a new terminal window and run:

```bash
cd frontend-react
```

#### Step 3.2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

#### Step 3.3: Run the Frontend Development Server

```bash
npm run dev
```

The frontend will start on **http://localhost:5173** or **http://localhost:5174**

#### Step 3.4: Verify Frontend is Running

Open your browser and navigate to:
- **Frontend**: http://localhost:5173

You should see the ResumeLab landing page.

---

## 🎯 Running the Application

### Start Both Servers

1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   mvnw.cmd spring-boot:run
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend-react
   npm run dev
   ```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081
- **Swagger UI**: http://localhost:8081/swagger-ui.html

---

## 📚 API Documentation (Swagger)

ResumeLab includes comprehensive API documentation using Swagger/OpenAPI.

### Accessing Swagger UI

1. Make sure the backend server is running
2. Open your browser and navigate to: **http://localhost:8081/swagger-ui.html**

### Using Swagger UI

#### 1. **Explore Available Endpoints**

Swagger UI displays all available API endpoints organized by controllers:
- **Auth Controller**: Authentication endpoints (login, signup)
- **Resume Controller**: Resume upload and management
- **Analysis Controller**: Resume analysis endpoints
- **JD Analysis Controller**: Job description analysis
- **Dashboard Controller**: User dashboard data
- **Admin Controller**: Admin operations
- **Feedback Controller**: User feedback
- **Resume Generator Controller**: Resume generation

#### 2. **Test API Endpoints**

For endpoints that require authentication:

**Step 1**: Register a new user or use existing credentials
- Expand **Auth Controller** → **POST /api/auth/signup** or **POST /api/auth/login**
- Click "Try it out"
- Enter request body:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- Click "Execute"
- Copy the JWT token from the response

**Step 2**: Authorize Swagger
- Click the **"Authorize"** button at the top right
- Enter: `Bearer YOUR_JWT_TOKEN` (replace YOUR_JWT_TOKEN with the actual token)
- Click "Authorize"
- Click "Close"

**Step 3**: Test Protected Endpoints
- Now you can test any protected endpoint
- Expand any endpoint → Click "Try it out" → Fill parameters → Click "Execute"

#### 3. **Example: Upload Resume**

1. Authorize with JWT token (see above)
2. Expand **Resume Controller** → **POST /api/resumes/upload**
3. Click "Try it out"
4. Click "Choose File" and select a PDF or DOCX resume
5. Click "Execute"
6. View the response with resume analysis results

#### 4. **Example: Admin Login**

1. Expand **Auth Controller** → **POST /api/auth/admin/login**
2. Click "Try it out"
3. Enter admin credentials:
   ```json
   {
     "email": "admin@gmail.com",
     "password": "admin123"
   }
   ```
4. Click "Execute"
5. Copy the admin JWT token for admin endpoints

### Swagger Features

- **Interactive Testing**: Test all endpoints directly from the browser
- **Request/Response Examples**: See example payloads for each endpoint
- **Schema Documentation**: View detailed request and response schemas
- **Authentication**: Built-in JWT token authorization
- **Download OpenAPI Spec**: Download the API specification in JSON/YAML format

---

## 🔐 Default Credentials

### Admin Account (Pre-configured)
- **Email**: `admin@gmail.com`
- **Password**: `admin123`
- **Access**: Admin dashboard with user management and feedback viewing

### Test User Account
You can create a new user account through:
- **Signup Page**: http://localhost:5173/signup
- **API Endpoint**: POST /api/auth/signup

---

## 📁 Project Structure

```
resumelab/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/resumeanalyzer/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA Entities
│   │   │   │   ├── repository/      # JPA Repositories
│   │   │   │   ├── security/        # Security & JWT
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   └── exception/       # Exception Handlers
│   │   │   └── resources/
│   │   │       └── application.properties  # Configuration
│   │   └── test/                    # Unit Tests
│   ├── uploads/                     # Uploaded resume files
│   ├── pom.xml                      # Maven dependencies
│   ├── mvnw.cmd                     # Maven Wrapper (Windows)
│   └── REQUIREMENTS.md              # Backend requirements
│
├── frontend-react/                  # React Frontend
│   ├── src/
│   │   ├── api/                     # API services & Axios config
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── theme.css                # Global theme styles
│   │   ├── App.jsx                  # Main App component
│   │   └── main.jsx                 # Entry point
│   ├── public/                      # Static assets
│   ├── package.json                 # npm dependencies
│   ├── vite.config.js               # Vite configuration
│   └── REQUIREMENTS.md              # Frontend requirements
│
└── README.md                        # This file
```

---

## 🐛 Troubleshooting

### Backend Issues

#### 1. **Port 8081 Already in Use**

**Error**: `Port 8081 is already in use`

**Solution**:
- Stop the process using port 8081
- Or change the port in `application.properties`:
  ```properties
  server.port=8082
  ```
- Update frontend API URL in `frontend-react/src/api/axiosConfig.js`

#### 2. **MySQL Connection Failed**

**Error**: `Communications link failure` or `Access denied`

**Solution**:
- Verify MySQL is running: `mysql --version`
- Check credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE resumelab_db;`
- Check MySQL port (default: 3306)

#### 3. **Maven Build Failed**

**Error**: `Failed to execute goal`

**Solution**:
- Clean Maven cache: `mvn clean`
- Delete `target` folder and rebuild
- Check Java version: `java -version` (should be 17+)
- Update Maven: `mvn -v`

#### 4. **File Upload Failed**

**Error**: `Maximum upload size exceeded`

**Solution**:
- Check file size (max 10MB)
- Increase limit in `application.properties`:
  ```properties
  spring.servlet.multipart.max-file-size=20MB
  spring.servlet.multipart.max-request-size=20MB
  ```

### Frontend Issues

#### 1. **npm install Failed**

**Error**: `npm ERR!` during installation

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node -v` (should be 18+)

#### 2. **Port 5173 Already in Use**

**Error**: `Port 5173 is already in use`

**Solution**:
- Vite will automatically use port 5174
- Or stop the process using port 5173
- Or specify a different port: `npm run dev -- --port 3000`

#### 3. **API Connection Failed**

**Error**: `Network Error` or `ERR_CONNECTION_REFUSED`

**Solution**:
- Verify backend is running on http://localhost:8081
- Check API base URL in `src/api/axiosConfig.js`
- Disable browser extensions that might block requests
- Check CORS configuration in backend

#### 4. **White Screen / Blank Page**

**Solution**:
- Check browser console for errors (F12)
- Clear browser cache and reload
- Verify all dependencies installed: `npm install`
- Check if backend is running

### Database Issues

#### 1. **Tables Not Created**

**Solution**:
- Check `spring.jpa.hibernate.ddl-auto=update` in `application.properties`
- Verify database connection
- Check application logs for errors
- Manually create database: `CREATE DATABASE resumelab_db;`

#### 2. **Data Not Persisting**

**Solution**:
- Verify MySQL is running (not H2 in-memory)
- Check database connection in `application.properties`
- Ensure `ddl-auto` is set to `update` not `create-drop`

---

## 📝 Additional Notes

### File Upload Location

Uploaded resumes are stored in: `backend/uploads/resumes/`

### JWT Token Expiration

Default token expiration: 24 hours (86400000 ms)

To change, update in `application.properties`:
```properties
jwt.expiration=86400000
```

### Database Schema

The database schema is automatically created by Hibernate based on JPA entities. Tables include:
- `users` - User accounts
- `resumes` - Uploaded resumes
- `resume_analyses` - Analysis results
- `job_roles` - Job role definitions
- `job_skills` - Skills for each job role
- `feedback` - User feedback

### Production Deployment

For production deployment:

1. **Backend**:
   - Build JAR: `mvn clean package`
   - Run JAR: `java -jar target/smart-resume-analyzer-0.0.1-SNAPSHOT.jar`
   - Configure production database
   - Set secure JWT secret
   - Enable HTTPS

2. **Frontend**:
   - Build: `npm run build`
   - Deploy `dist` folder to web server (Nginx, Apache, etc.)
   - Update API base URL for production backend

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Developer

**Deepak Dey**
- GitHub: [@deepakdey412](https://github.com/deepakdey412)
- LinkedIn: [deepakdey](https://www.linkedin.com/in/deepakdey/)
- Instagram: [@deepax.dev](https://www.instagram.com/deepax.dev)

---

## 🎉 Acknowledgments

- Spring Boot Team
- React Team
- Bootstrap Team
- All open-source contributors

---

**Made with ❤️ for job seekers worldwide**
