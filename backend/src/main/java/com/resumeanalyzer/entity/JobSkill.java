package com.resumeanalyzer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_skills")
public class JobSkill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_role_id", nullable = false)
    private JobRole jobRole;
    
    @Column(nullable = false)
    private String skillName;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private Integer priority;

    // Constructors
    public JobSkill() {}

    public JobSkill(Long id, JobRole jobRole, String skillName, String category, Integer priority) {
        this.id = id;
        this.jobRole = jobRole;
        this.skillName = skillName;
        this.category = category;
        this.priority = priority;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JobRole getJobRole() {
        return jobRole;
    }

    public void setJobRole(JobRole jobRole) {
        this.jobRole = jobRole;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }
}
