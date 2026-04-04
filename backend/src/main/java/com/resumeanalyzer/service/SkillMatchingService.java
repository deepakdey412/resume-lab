package com.resumeanalyzer.service;

import com.resumeanalyzer.dto.JobMatchResult;
import com.resumeanalyzer.entity.JobRole;
import com.resumeanalyzer.entity.JobSkill;
import com.resumeanalyzer.entity.Resume;
import com.resumeanalyzer.entity.ResumeAnalysis;
import com.resumeanalyzer.repository.JobRoleRepository;
import com.resumeanalyzer.repository.JobSkillRepository;
import com.resumeanalyzer.repository.ResumeAnalysisRepository;
import com.resumeanalyzer.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SkillMatchingService {

    private final ResumeRepository resumeRepository;
    private final JobRoleRepository jobRoleRepository;
    private final JobSkillRepository jobSkillRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    public SkillMatchingService(ResumeRepository resumeRepository, 
                               JobRoleRepository jobRoleRepository,
                               JobSkillRepository jobSkillRepository, 
                               ResumeAnalysisRepository resumeAnalysisRepository) {
        this.resumeRepository = resumeRepository;
        this.jobRoleRepository = jobRoleRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    @Transactional
    public List<JobMatchResult> analyzeResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        String resumeText = resume.getExtractedText();
        if (resumeText == null || resumeText.trim().isEmpty()) {
            throw new RuntimeException("Resume has no extracted text");
        }

        Set<String> resumeTokens = tokenizeText(resumeText);
        List<JobRole> allJobRoles = jobRoleRepository.findAll();
        List<JobMatchResult> matchResults = new ArrayList<>();

        for (JobRole jobRole : allJobRoles) {
            List<JobSkill> jobSkills = jobSkillRepository.findByJobRoleId(jobRole.getId());
            
            if (jobSkills.isEmpty()) {
                continue;
            }

            SkillMatchData matchData = calculateSkillMatch(resumeTokens, jobSkills);
            
            ResumeAnalysis analysis = new ResumeAnalysis();
            analysis.setResume(resume);
            analysis.setJobRole(jobRole);
            analysis.setMatchScore(matchData.matchPercentage);
            analysis.setMatchedSkills(String.join(", ", matchData.matchedSkills));
            analysis.setMissingSkills(String.join(", ", matchData.missingSkills));
            analysis.setSuggestions(generateSuggestions(matchData));
            
            resumeAnalysisRepository.save(analysis);

            JobMatchResult result = new JobMatchResult(
                    jobRole.getId(),
                    jobRole.getRoleName(),
                    matchData.matchPercentage,
                    matchData.matchedSkills,
                    matchData.missingSkills,
                    analysis.getSuggestions()
            );
            matchResults.add(result);
        }

        matchResults.sort((a, b) -> Double.compare(b.getMatchPercentage(), a.getMatchPercentage()));
        return matchResults;
    }

    public List<JobMatchResult> getTopMatches(Long resumeId, int topN) {
        List<JobMatchResult> allMatches = analyzeResume(resumeId);
        return allMatches.stream()
                .limit(topN)
                .collect(Collectors.toList());
    }

    public JobMatchResult analyzeResumeForSpecificJob(Long resumeId, Long jobRoleId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        JobRole jobRole = jobRoleRepository.findById(jobRoleId)
                .orElseThrow(() -> new RuntimeException("Job role not found"));

        String resumeText = resume.getExtractedText();
        if (resumeText == null || resumeText.trim().isEmpty()) {
            throw new RuntimeException("Resume has no extracted text");
        }

        Set<String> resumeTokens = tokenizeText(resumeText);
        List<JobSkill> jobSkills = jobSkillRepository.findByJobRoleId(jobRoleId);

        if (jobSkills.isEmpty()) {
            throw new RuntimeException("No skills defined for this job role");
        }

        SkillMatchData matchData = calculateSkillMatch(resumeTokens, jobSkills);

        ResumeAnalysis analysis = new ResumeAnalysis();
        analysis.setResume(resume);
        analysis.setJobRole(jobRole);
        analysis.setMatchScore(matchData.matchPercentage);
        analysis.setMatchedSkills(String.join(", ", matchData.matchedSkills));
        analysis.setMissingSkills(String.join(", ", matchData.missingSkills));
        analysis.setSuggestions(generateSuggestions(matchData));

        resumeAnalysisRepository.save(analysis);

        return new JobMatchResult(
                jobRole.getId(),
                jobRole.getRoleName(),
                matchData.matchPercentage,
                matchData.matchedSkills,
                matchData.missingSkills,
                analysis.getSuggestions()
        );
    }

    private Set<String> tokenizeText(String text) {
        if (text == null || text.isEmpty()) {
            return new HashSet<>();
        }

        String cleanedText = text.toLowerCase()
                .replaceAll("[^a-z0-9\\s+#]", " ")
                .replaceAll("\\s+", " ")
                .trim();

        Set<String> tokens = new HashSet<>();
        String[] words = cleanedText.split("\\s+");
        
        for (String word : words) {
            if (!word.isEmpty() && word.length() > 1) {
                tokens.add(word);
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String bigram = words[i] + " " + words[i + 1];
            tokens.add(bigram);
        }

        for (int i = 0; i < words.length - 2; i++) {
            String trigram = words[i] + " " + words[i + 1] + " " + words[i + 2];
            tokens.add(trigram);
        }

        return tokens;
    }

    private SkillMatchData calculateSkillMatch(Set<String> resumeTokens, List<JobSkill> jobSkills) {
        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        for (JobSkill jobSkill : jobSkills) {
            String skillName = jobSkill.getSkillName().toLowerCase().trim();
            
            boolean matched = resumeTokens.contains(skillName);
            
            if (!matched) {
                String[] skillParts = skillName.split("\\s+");
                if (skillParts.length > 1) {
                    matched = Arrays.stream(skillParts)
                            .allMatch(resumeTokens::contains);
                }
            }

            if (matched) {
                matchedSkills.add(jobSkill.getSkillName());
            } else {
                missingSkills.add(jobSkill.getSkillName());
            }
        }

        double matchPercentage = jobSkills.isEmpty() ? 0.0 : 
                (matchedSkills.size() * 100.0) / jobSkills.size();

        return new SkillMatchData(matchPercentage, matchedSkills, missingSkills);
    }

    private String generateSuggestions(SkillMatchData matchData) {
        StringBuilder suggestions = new StringBuilder();

        if (matchData.matchPercentage >= 80) {
            suggestions.append("Excellent match! You have most of the required skills. ");
        } else if (matchData.matchPercentage >= 60) {
            suggestions.append("Good match! Consider strengthening the following skills: ");
        } else if (matchData.matchPercentage >= 40) {
            suggestions.append("Moderate match. Focus on developing these key skills: ");
        } else {
            suggestions.append("Limited match. Significant skill development needed in: ");
        }

        if (!matchData.missingSkills.isEmpty()) {
            List<String> topMissing = matchData.missingSkills.stream()
                    .limit(5)
                    .collect(Collectors.toList());
            suggestions.append(String.join(", ", topMissing));
        }

        return suggestions.toString();
    }

    private static class SkillMatchData {
        double matchPercentage;
        List<String> matchedSkills;
        List<String> missingSkills;

        SkillMatchData(double matchPercentage, List<String> matchedSkills, List<String> missingSkills) {
            this.matchPercentage = matchPercentage;
            this.matchedSkills = matchedSkills;
            this.missingSkills = missingSkills;
        }
    }
}
