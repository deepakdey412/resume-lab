package com.resumeanalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResumeUploadResponse {
    private Long id;
    private String fileName;
    private String message;
    private Integer extractedTextLength;
}
