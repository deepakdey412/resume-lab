#FROM maven:3.9.9-eclipse-temurin-17
#
#WORKDIR /app
#
#COPY . .
#
#RUN mvn clean install -DskipTests
#
#CMD ["sh", "-c", "java -jar target/resumelab-0.0.1-SNAPSHOT.jar"]

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run (lightweight)
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]