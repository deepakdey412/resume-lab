package com.resumeanalyzer.dto;

public class ResumeUploadResponse {
    private Long id;
    private String fileName;
    private String message;
    private Integer extractedTextLength;

    public ResumeUploadResponse() {}

    public ResumeUploadResponse(Long id, String fileName, String message, Integer extractedTextLength) {
        this.id = id;
        this.fileName = fileName;
        this.message = message;
        this.extractedTextLength = extractedTextLength;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getExtractedTextLength() {
        return extractedTextLength;
    }

    public void setExtractedTextLength(Integer extractedTextLength) {
        this.extractedTextLength = extractedTextLength;
    }
}
