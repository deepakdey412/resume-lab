package com.resumeanalyzer.dto;

import java.util.List;

public class JDAnalysisResponse {
    
    private double matchPercentage;
    private List<String> missingKeywords;
    private int totalKeywords;
    private int matchedKeywords;

    public JDAnalysisResponse() {
    }

    public JDAnalysisResponse(double matchPercentage, List<String> missingKeywords, 
                             int totalKeywords, int matchedKeywords) {
        this.matchPercentage = matchPercentage;
        this.missingKeywords = missingKeywords;
        this.totalKeywords = totalKeywords;
        this.matchedKeywords = matchedKeywords;
    }

    public double getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(double matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public List<String> getMissingKeywords() {
        return missingKeywords;
    }

    public void setMissingKeywords(List<String> missingKeywords) {
        this.missingKeywords = missingKeywords;
    }

    public int getTotalKeywords() {
        return totalKeywords;
    }

    public void setTotalKeywords(int totalKeywords) {
        this.totalKeywords = totalKeywords;
    }

    public int getMatchedKeywords() {
        return matchedKeywords;
    }

    public void setMatchedKeywords(int matchedKeywords) {
        this.matchedKeywords = matchedKeywords;
    }
}
