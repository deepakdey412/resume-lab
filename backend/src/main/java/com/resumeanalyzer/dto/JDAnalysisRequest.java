package com.resumeanalyzer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JDAnalysisRequest {
    
    @NotNull(message = "Resume ID is required")
    private Long resumeId;
    
    @NotBlank(message = "Job Description is required")
    private String jobDescription;

    public JDAnalysisRequest() {
    }

    public JDAnalysisRequest(Long resumeId, String jobDescription) {
        this.resumeId = resumeId;
        this.jobDescription = jobDescription;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}
