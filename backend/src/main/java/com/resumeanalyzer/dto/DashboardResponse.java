package com.resumeanalyzer.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DashboardResponse {
    private String userName;
    private String userEmail;
    private List<ResumeInfo> resumes;
    private Statistics statistics;

    public DashboardResponse() {}

    public DashboardResponse(String userName, String userEmail, List<ResumeInfo> resumes, Statistics statistics) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.resumes = resumes;
        this.statistics = statistics;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<ResumeInfo> getResumes() {
        return resumes;
    }

    public void setResumes(List<ResumeInfo> resumes) {
        this.resumes = resumes;
    }

    public Statistics getStatistics() {
        return statistics;
    }

    public void setStatistics(Statistics statistics) {
        this.statistics = statistics;
    }

    public static class ResumeInfo {
        private Long resumeId;
        private String fileName;
        private LocalDateTime uploadedAt;
        private Integer totalAnalyses;
        private List<ResumeAnalysisDTO> topMatches;

        public ResumeInfo() {}

        public ResumeInfo(Long resumeId, String fileName, LocalDateTime uploadedAt, Integer totalAnalyses, List<ResumeAnalysisDTO> topMatches) {
            this.resumeId = resumeId;
            this.fileName = fileName;
            this.uploadedAt = uploadedAt;
            this.totalAnalyses = totalAnalyses;
            this.topMatches = topMatches;
        }

        public Long getResumeId() {
            return resumeId;
        }

        public void setResumeId(Long resumeId) {
            this.resumeId = resumeId;
        }

        public String getFileName() {
            return fileName;
        }

        public void setFileName(String fileName) {
            this.fileName = fileName;
        }

        public LocalDateTime getUploadedAt() {
            return uploadedAt;
        }

        public void setUploadedAt(LocalDateTime uploadedAt) {
            this.uploadedAt = uploadedAt;
        }

        public Integer getTotalAnalyses() {
            return totalAnalyses;
        }

        public void setTotalAnalyses(Integer totalAnalyses) {
            this.totalAnalyses = totalAnalyses;
        }

        public List<ResumeAnalysisDTO> getTopMatches() {
            return topMatches;
        }

        public void setTopMatches(List<ResumeAnalysisDTO> topMatches) {
            this.topMatches = topMatches;
        }
    }

    public static class Statistics {
        private Integer totalResumes;
        private Integer totalAnalyses;
        private Double averageMatchScore;
        private String bestMatchJobRole;
        private Double bestMatchScore;

        public Statistics() {}

        public Statistics(Integer totalResumes, Integer totalAnalyses, Double averageMatchScore, String bestMatchJobRole, Double bestMatchScore) {
            this.totalResumes = totalResumes;
            this.totalAnalyses = totalAnalyses;
            this.averageMatchScore = averageMatchScore;
            this.bestMatchJobRole = bestMatchJobRole;
            this.bestMatchScore = bestMatchScore;
        }

        public Integer getTotalResumes() {
            return totalResumes;
        }

        public void setTotalResumes(Integer totalResumes) {
            this.totalResumes = totalResumes;
        }

        public Integer getTotalAnalyses() {
            return totalAnalyses;
        }

        public void setTotalAnalyses(Integer totalAnalyses) {
            this.totalAnalyses = totalAnalyses;
        }

        public Double getAverageMatchScore() {
            return averageMatchScore;
        }

        public void setAverageMatchScore(Double averageMatchScore) {
            this.averageMatchScore = averageMatchScore;
        }

        public String getBestMatchJobRole() {
            return bestMatchJobRole;
        }

        public void setBestMatchJobRole(String bestMatchJobRole) {
            this.bestMatchJobRole = bestMatchJobRole;
        }

        public Double getBestMatchScore() {
            return bestMatchScore;
        }

        public void setBestMatchScore(Double bestMatchScore) {
            this.bestMatchScore = bestMatchScore;
        }
    }
}
