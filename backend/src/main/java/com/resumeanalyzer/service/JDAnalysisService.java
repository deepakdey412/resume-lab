package com.resumeanalyzer.service;

import com.resumeanalyzer.dto.JDAnalysisResponse;
import com.resumeanalyzer.entity.Resume;
import com.resumeanalyzer.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JDAnalysisService {

    private final ResumeRepository resumeRepository;

    public JDAnalysisService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    /**
     * Analyze resume against job description
     * This is a temporary analysis - results are NOT stored in database
     */
    public JDAnalysisResponse analyzeResumeWithJD(Long resumeId, String jobDescription) {
        // Fetch resume from database
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found with ID: " + resumeId));

        String resumeText = resume.getExtractedText();
        if (resumeText == null || resumeText.trim().isEmpty()) {
            throw new RuntimeException("Resume has no extracted text");
        }

        // Clean both texts
        String cleanedResume = cleanText(resumeText);
        String cleanedJD = cleanText(jobDescription);

        // Extract keywords from job description
        Set<String> jdKeywords = extractKeywords(cleanedJD);

        // Find matching and missing keywords
        Set<String> matchedKeywords = new HashSet<>();
        Set<String> missingKeywords = new HashSet<>();

        for (String keyword : jdKeywords) {
            if (cleanedResume.contains(keyword)) {
                matchedKeywords.add(keyword);
            } else {
                missingKeywords.add(keyword);
            }
        }

        // Calculate match percentage
        double matchPercentage = jdKeywords.isEmpty() ? 0.0 : 
                (matchedKeywords.size() * 100.0) / jdKeywords.size();

        // Round to 2 decimal places
        matchPercentage = Math.round(matchPercentage * 100.0) / 100.0;

        // Convert to sorted lists for consistent output
        List<String> missingKeywordsList = new ArrayList<>(missingKeywords);
        Collections.sort(missingKeywordsList);

        return new JDAnalysisResponse(
                matchPercentage,
                missingKeywordsList,
                jdKeywords.size(),
                matchedKeywords.size()
        );
    }

    /**
     * Clean text: lowercase, remove punctuation, normalize whitespace
     */
    private String cleanText(String text) {
        if (text == null) {
            return "";
        }
        
        // Convert to lowercase
        String cleaned = text.toLowerCase();
        
        // Remove punctuation but keep spaces
        cleaned = cleaned.replaceAll("[^a-z0-9\\s]", " ");
        
        // Normalize whitespace (multiple spaces to single space)
        cleaned = cleaned.replaceAll("\\s+", " ");
        
        return cleaned.trim();
    }

    /**
     * Extract keywords from text
     * Filters out common stop words and short words
     */
    private Set<String> extractKeywords(String text) {
        // Common stop words to filter out
        Set<String> stopWords = Set.of(
                "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
                "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
                "to", "was", "will", "with", "this", "but", "they", "have",
                "had", "what", "when", "where", "who", "which", "why", "how", "or",
                "can", "could", "should", "would", "may", "might", "must", "shall",
                "do", "does", "did", "doing", "done", "been", "being", "am", "were",
                "we", "you", "your", "our", "their", "his", "her", "my", "me",
                "us", "them", "all", "any", "both", "each", "few", "more", "most",
                "other", "some", "such", "no", "nor", "not", "only", "own", "same",
                "so", "than", "too", "very", "just", "now", "then", "here", "there"
        );

        // Split text into words
        String[] words = text.split("\\s+");

        // Filter and collect keywords
        return Arrays.stream(words)
                .filter(word -> word.length() > 2) // Filter out very short words
                .filter(word -> !stopWords.contains(word)) // Filter out stop words
                .collect(Collectors.toSet());
    }
}
