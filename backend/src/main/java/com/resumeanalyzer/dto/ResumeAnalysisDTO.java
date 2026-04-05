package com.resumeanalyzer.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ResumeAnalysisDTO {
    private Long analysisId;
    private Long resumeId;
    private String resumeFileName;
    private Long jobRoleId;
    private String jobRoleName;
    private String jobRoleDescription;
    private Double matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String suggestions;
    private LocalDateTime analyzedAt;

    public ResumeAnalysisDTO() {}

    public ResumeAnalysisDTO(Long analysisId, Long resumeId, String resumeFileName, Long jobRoleId, String jobRoleName, String jobRoleDescription, Double matchPercentage, List<String> matchedSkills, List<String> missingSkills, String suggestions, LocalDateTime analyzedAt) {
        this.analysisId = analysisId;
        this.resumeId = resumeId;
        this.resumeFileName = resumeFileName;
        this.jobRoleId = jobRoleId;
        this.jobRoleName = jobRoleName;
        this.jobRoleDescription = jobRoleDescription;
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
        this.analyzedAt = analyzedAt;
    }

    public Long getAnalysisId() {
        return analysisId;
    }

    public void setAnalysisId(Long analysisId) {
        this.analysisId = analysisId;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getResumeFileName() {
        return resumeFileName;
    }

    public void setResumeFileName(String resumeFileName) {
        this.resumeFileName = resumeFileName;
    }

    public Long getJobRoleId() {
        return jobRoleId;
    }

    public void setJobRoleId(Long jobRoleId) {
        this.jobRoleId = jobRoleId;
    }

    public String getJobRoleName() {
        return jobRoleName;
    }

    public void setJobRoleName(String jobRoleName) {
        this.jobRoleName = jobRoleName;
    }

    public String getJobRoleDescription() {
        return jobRoleDescription;
    }

    public void setJobRoleDescription(String jobRoleDescription) {
        this.jobRoleDescription = jobRoleDescription;
    }

    public Double getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Double matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public String getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }

    public LocalDateTime getAnalyzedAt() {
        return analyzedAt;
    }

    public void setAnalyzedAt(LocalDateTime analyzedAt) {
        this.analyzedAt = analyzedAt;
    }
}
