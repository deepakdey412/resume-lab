package com.resumeanalyzer.dto;

import java.util.List;

public class JobMatchResult {
    private Long jobRoleId;
    private String jobRoleName;
    private Double matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String suggestions;

    public JobMatchResult() {}

    public JobMatchResult(Long jobRoleId, String jobRoleName, Double matchPercentage, List<String> matchedSkills, List<String> missingSkills, String suggestions) {
        this.jobRoleId = jobRoleId;
        this.jobRoleName = jobRoleName;
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
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
}
