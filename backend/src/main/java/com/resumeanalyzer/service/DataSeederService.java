package com.resumeanalyzer.service;

import com.resumeanalyzer.entity.JobRole;
import com.resumeanalyzer.entity.JobSkill;
import com.resumeanalyzer.repository.JobRoleRepository;
import com.resumeanalyzer.repository.JobSkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DataSeederService implements CommandLineRunner {

    private final JobRoleRepository jobRoleRepository;
    private final JobSkillRepository jobSkillRepository;

    public DataSeederService(JobRoleRepository jobRoleRepository, JobSkillRepository jobSkillRepository) {
        this.jobRoleRepository = jobRoleRepository;
        this.jobSkillRepository = jobSkillRepository;
    }

    @Override
    public void run(String... args) {
        seedJobRolesAndSkills();
    }

    private void seedJobRolesAndSkills() {
        seedJavaBackendDeveloper();
        seedFrontendDeveloper();
        seedFullStackDeveloper();
        seedDataScientist();
        seedDevOpsEngineer();
    }

    private void seedJavaBackendDeveloper() {
        Optional<JobRole> existing = jobRoleRepository.findByRoleName("Java Backend Developer");
        if (existing.isPresent()) {
            return;
        }

        JobRole role = new JobRole();
        role.setRoleName("Java Backend Developer");
        role.setDescription("Develops server-side applications using Java and Spring Framework");
        jobRoleRepository.save(role);

        String[] skills = {
            "Java", "Spring Boot", "Spring Framework", "Hibernate", "JPA",
            "REST API", "Microservices", "MySQL", "PostgreSQL", "MongoDB",
            "Maven", "Gradle", "Git", "Docker", "Kubernetes",
            "JUnit", "Mockito", "Redis", "Kafka", "RabbitMQ"
        };

        for (int i = 0; i < skills.length; i++) {
            JobSkill skill = new JobSkill();
            skill.setJobRole(role);
            skill.setSkillName(skills[i]);
            skill.setCategory(i < 5 ? "Core" : i < 15 ? "Framework" : "Tools");
            skill.setPriority(i < 5 ? 1 : i < 10 ? 2 : 3);
            jobSkillRepository.save(skill);
        }
    }

    private void seedFrontendDeveloper() {
        Optional<JobRole> existing = jobRoleRepository.findByRoleName("Frontend Developer");
        if (existing.isPresent()) {
            return;
        }

        JobRole role = new JobRole();
        role.setRoleName("Frontend Developer");
        role.setDescription("Builds user interfaces using modern JavaScript frameworks");
        jobRoleRepository.save(role);

        String[] skills = {
            "JavaScript", "TypeScript", "React", "Angular", "Vue.js",
            "HTML5", "CSS3", "SASS", "Webpack", "npm",
            "Redux", "Next.js", "Tailwind CSS", "Bootstrap", "Material UI",
            "Git", "REST API", "GraphQL", "Jest", "Cypress"
        };

        for (int i = 0; i < skills.length; i++) {
            JobSkill skill = new JobSkill();
            skill.setJobRole(role);
            skill.setSkillName(skills[i]);
            skill.setCategory(i < 5 ? "Core" : i < 15 ? "Framework" : "Tools");
            skill.setPriority(i < 5 ? 1 : i < 10 ? 2 : 3);
            jobSkillRepository.save(skill);
        }
    }

    private void seedFullStackDeveloper() {
        Optional<JobRole> existing = jobRoleRepository.findByRoleName("Full Stack Developer");
        if (existing.isPresent()) {
            return;
        }

        JobRole role = new JobRole();
        role.setRoleName("Full Stack Developer");
        role.setDescription("Develops both frontend and backend applications");
        jobRoleRepository.save(role);

        String[] skills = {
            "JavaScript", "TypeScript", "React", "Node.js", "Express.js",
            "MongoDB", "PostgreSQL", "REST API", "GraphQL", "Docker",
            "Git", "AWS", "HTML5", "CSS3", "Redux",
            "Jest", "Mocha", "Webpack", "CI/CD", "Agile"
        };

        for (int i = 0; i < skills.length; i++) {
            JobSkill skill = new JobSkill();
            skill.setJobRole(role);
            skill.setSkillName(skills[i]);
            skill.setCategory(i < 10 ? "Core" : "Tools");
            skill.setPriority(i < 5 ? 1 : i < 10 ? 2 : 3);
            jobSkillRepository.save(skill);
        }
    }

    private void seedDataScientist() {
        Optional<JobRole> existing = jobRoleRepository.findByRoleName("Data Scientist");
        if (existing.isPresent()) {
            return;
        }

        JobRole role = new JobRole();
        role.setRoleName("Data Scientist");
        role.setDescription("Analyzes data and builds machine learning models");
        jobRoleRepository.save(role);

        String[] skills = {
            "Python", "R", "Machine Learning", "Deep Learning", "TensorFlow",
            "PyTorch", "Scikit-learn", "Pandas", "NumPy", "SQL",
            "Statistics", "Data Visualization", "Jupyter", "Matplotlib", "Seaborn",
            "NLP", "Computer Vision", "Big Data", "Spark", "Hadoop"
        };

        for (int i = 0; i < skills.length; i++) {
            JobSkill skill = new JobSkill();
            skill.setJobRole(role);
            skill.setSkillName(skills[i]);
            skill.setCategory(i < 10 ? "Core" : "Advanced");
            skill.setPriority(i < 5 ? 1 : i < 10 ? 2 : 3);
            jobSkillRepository.save(skill);
        }
    }

    private void seedDevOpsEngineer() {
        Optional<JobRole> existing = jobRoleRepository.findByRoleName("DevOps Engineer");
        if (existing.isPresent()) {
            return;
        }

        JobRole role = new JobRole();
        role.setRoleName("DevOps Engineer");
        role.setDescription("Manages infrastructure and deployment pipelines");
        jobRoleRepository.save(role);

        String[] skills = {
            "Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions",
            "AWS", "Azure", "GCP", "Terraform", "Ansible",
            "Linux", "Bash", "Python", "Monitoring", "Prometheus",
            "Grafana", "ELK Stack", "Nginx", "Apache", "CI/CD"
        };

        for (int i = 0; i < skills.length; i++) {
            JobSkill skill = new JobSkill();
            skill.setJobRole(role);
            skill.setSkillName(skills[i]);
            skill.setCategory(i < 10 ? "Core" : "Tools");
            skill.setPriority(i < 5 ? 1 : i < 10 ? 2 : 3);
            jobSkillRepository.save(skill);
        }
    }
}
