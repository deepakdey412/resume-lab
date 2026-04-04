package com.resumeanalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobMatchResult {
    private Long jobRoleId;
    private String jobRoleName;
    private Double matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String suggestions;
}
