package com.resumeanalyzer.service;

import com.resumeanalyzer.dto.DashboardResponse;
import com.resumeanalyzer.dto.ResumeAnalysisDTO;
import com.resumeanalyzer.entity.Resume;
import com.resumeanalyzer.entity.ResumeAnalysis;
import com.resumeanalyzer.entity.User;
import com.resumeanalyzer.repository.ResumeAnalysisRepository;
import com.resumeanalyzer.repository.ResumeRepository;
import com.resumeanalyzer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    public DashboardService(UserRepository userRepository, 
                           ResumeRepository resumeRepository,
                           ResumeAnalysisRepository resumeAnalysisRepository) {
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    public DashboardResponse getUserDashboard(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Resume> resumes = resumeRepository.findByUserId(user.getId());
        
        List<DashboardResponse.ResumeInfo> resumeInfos = resumes.stream()
                .map(resume -> {
                    List<ResumeAnalysis> analyses = resumeAnalysisRepository.findByResumeId(resume.getId());
                    
                    List<ResumeAnalysisDTO> topMatches = analyses.stream()
                            .sorted(Comparator.comparing(ResumeAnalysis::getMatchScore).reversed())
                            .limit(3)
                            .map(this::convertToDTO)
                            .collect(Collectors.toList());

                    return new DashboardResponse.ResumeInfo(
                            resume.getId(),
                            resume.getFileName(),
                            resume.getUploadedAt(),
                            analyses.size(),
                            topMatches
                    );
                })
                .collect(Collectors.toList());

        DashboardResponse.Statistics statistics = calculateStatistics(user.getId());

        return new DashboardResponse(
                user.getFullName(),
                user.getEmail(),
                resumeInfos,
                statistics
        );
    }

    public List<ResumeAnalysisDTO> getResumeAnalyses(Long resumeId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to resume");
        }

        List<ResumeAnalysis> analyses = resumeAnalysisRepository.findByResumeId(resumeId);
        
        return analyses.stream()
                .sorted(Comparator.comparing(ResumeAnalysis::getMatchScore).reversed())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ResumeAnalysisDTO> getTopMatches(Long resumeId, int limit, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to resume");
        }

        List<ResumeAnalysis> analyses = resumeAnalysisRepository.findByResumeId(resumeId);
        
        return analyses.stream()
                .sorted(Comparator.comparing(ResumeAnalysis::getMatchScore).reversed())
                .limit(limit)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DashboardResponse.ResumeInfo> getAllUserResumes(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Resume> resumes = resumeRepository.findByUserId(user.getId());
        
        return resumes.stream()
                .map(resume -> {
                    List<ResumeAnalysis> analyses = resumeAnalysisRepository.findByResumeId(resume.getId());
                    
                    List<ResumeAnalysisDTO> topMatches = analyses.stream()
                            .sorted(Comparator.comparing(ResumeAnalysis::getMatchScore).reversed())
                            .limit(3)
                            .map(this::convertToDTO)
                            .collect(Collectors.toList());

                    return new DashboardResponse.ResumeInfo(
                            resume.getId(),
                            resume.getFileName(),
                            resume.getUploadedAt(),
                            analyses.size(),
                            topMatches
                    );
                })
                .collect(Collectors.toList());
    }

    public DashboardResponse.Statistics getUserStatistics(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return calculateStatistics(user.getId());
    }

    private DashboardResponse.Statistics calculateStatistics(Long userId) {
        List<Resume> resumes = resumeRepository.findByUserId(userId);
        
        List<ResumeAnalysis> allAnalyses = new ArrayList<>();
        for (Resume resume : resumes) {
            allAnalyses.addAll(resumeAnalysisRepository.findByResumeId(resume.getId()));
        }

        int totalResumes = resumes.size();
        int totalAnalyses = allAnalyses.size();
        
        double averageMatchScore = 0.0;
        String bestMatchJobRole = "N/A";
        double bestMatchScore = 0.0;

        if (!allAnalyses.isEmpty()) {
            averageMatchScore = allAnalyses.stream()
                    .mapToDouble(ResumeAnalysis::getMatchScore)
                    .average()
                    .orElse(0.0);

            ResumeAnalysis bestMatch = allAnalyses.stream()
                    .max(Comparator.comparing(ResumeAnalysis::getMatchScore))
                    .orElse(null);

            if (bestMatch != null) {
                bestMatchJobRole = bestMatch.getJobRole().getRoleName();
                bestMatchScore = bestMatch.getMatchScore();
            }
        }

        return new DashboardResponse.Statistics(
                totalResumes,
                totalAnalyses,
                Math.round(averageMatchScore * 100.0) / 100.0,
                bestMatchJobRole,
                Math.round(bestMatchScore * 100.0) / 100.0
        );
    }

    private ResumeAnalysisDTO convertToDTO(ResumeAnalysis analysis) {
        List<String> matchedSkills = parseSkills(analysis.getMatchedSkills());
        List<String> missingSkills = parseSkills(analysis.getMissingSkills());

        return new ResumeAnalysisDTO(
                analysis.getId(),
                analysis.getResume().getId(),
                analysis.getResume().getFileName(),
                analysis.getJobRole().getId(),
                analysis.getJobRole().getRoleName(),
                analysis.getJobRole().getDescription(),
                Math.round(analysis.getMatchScore() * 100.0) / 100.0,
                matchedSkills,
                missingSkills,
                analysis.getSuggestions(),
                analysis.getAnalyzedAt()
        );
    }

    private List<String> parseSkills(String skillsString) {
        if (skillsString == null || skillsString.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.stream(skillsString.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
