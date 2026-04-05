# Use Maven + Java 17 image
FROM maven:3.9.9-eclipse-temurin-17

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the project
RUN mvn clean install -DskipTests

# Run the jar
CMD ["java", "-jar", "target/*.jar"]