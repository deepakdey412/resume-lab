package com.resumeanalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private String userName;
    private String userEmail;
    private List<ResumeInfo> resumes;
    private Statistics statistics;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResumeInfo {
        private Long resumeId;
        private String fileName;
        private LocalDateTime uploadedAt;
        private Integer totalAnalyses;
        private List<ResumeAnalysisDTO> topMatches;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Statistics {
        private Integer totalResumes;
        private Integer totalAnalyses;
        private Double averageMatchScore;
        private String bestMatchJobRole;
        private Double bestMatchScore;
    }
}
