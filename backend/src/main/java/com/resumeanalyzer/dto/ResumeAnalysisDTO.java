package com.resumeanalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
}
