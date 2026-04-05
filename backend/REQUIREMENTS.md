# Backend Requirements

## System Requirements

- **Java**: JDK 17 or higher
- **Maven**: 3.6+ (or use included Maven Wrapper)
- **MySQL**: 8.0 or higher
- **IDE**: IntelliJ IDEA, Eclipse, or VS Code (optional)

## Dependencies

All dependencies are managed through Maven (pom.xml). Key dependencies include:

### Core Framework
- Spring Boot 3.2.0
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Validation

### Database
- MySQL Connector J (runtime)
- H2 Database (for testing, optional)

### Security & Authentication
- Spring Security
- JWT (JSON Web Tokens)
  - jjwt-api: 0.12.3
  - jjwt-impl: 0.12.3
  - jjwt-jackson: 0.12.3

### File Processing
- Apache POI: 5.2.5 (Word document parsing)
- Apache POI OOXML: 5.2.5
- Apache PDFBox: 3.0.1 (PDF parsing)
- OpenPDF: 1.3.30 (PDF generation)

### API Documentation
- Springdoc OpenAPI: 2.3.0 (Swagger UI)

### Testing
- Spring Boot Starter Test
- Spring Security Test

### Utilities
- Lombok (optional, for reducing boilerplate code)

## Installation

All dependencies will be automatically downloaded when you run:

```bash
mvn clean install
```

Or using Maven Wrapper:

```bash
./mvnw clean install
```

## Database Setup

1. Install MySQL 8.0 or higher
2. Create database (optional, will be auto-created):
   ```sql
   CREATE DATABASE resumelab_db;
   ```
3. Update `application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## Configuration

Edit `backend/src/main/resources/application.properties` to configure:
- Database connection
- Server port
- JWT secret
- File upload limits
- Swagger UI settings
