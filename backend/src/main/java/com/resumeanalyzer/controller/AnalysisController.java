package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.JobMatchResult;
import com.resumeanalyzer.service.SkillMatchingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
@Tag(name = "Resume Analysis", description = "Analyze resumes and match with job roles")
@SecurityRequirement(name = "bearerAuth")
public class AnalysisController {

    private final SkillMatchingService skillMatchingService;

    public AnalysisController(SkillMatchingService skillMatchingService) {
        this.skillMatchingService = skillMatchingService;
    }

    @PostMapping("/resume/{resumeId}")
    @Operation(summary = "Analyze resume", description = "Analyze resume against all job roles and return match results")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Analysis completed successfully",
                    content = @Content(schema = @Schema(implementation = JobMatchResult.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<List<JobMatchResult>> analyzeResume(
            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long resumeId) {
        List<JobMatchResult> results = skillMatchingService.analyzeResume(resumeId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/resume/{resumeId}/top/{topN}")
    @Operation(summary = "Get top matches", description = "Get top N job matches for a resume")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Top matches retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<List<JobMatchResult>> getTopMatches(
            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long resumeId, 
            @Parameter(description = "Number of top matches to return", required = true)
            @PathVariable int topN) {
        List<JobMatchResult> results = skillMatchingService.getTopMatches(resumeId, topN);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/resume/{resumeId}/job/{jobRoleId}")
    @Operation(summary = "Analyze for specific job", description = "Analyze resume against a specific job role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Analysis completed successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
            @ApiResponse(responseCode = "404", description = "Resume or job role not found")
    })
    public ResponseEntity<JobMatchResult> analyzeForSpecificJob(
            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long resumeId, 
            @Parameter(description = "Job Role ID", required = true)
            @PathVariable Long jobRoleId) {
        JobMatchResult result = skillMatchingService.analyzeResumeForSpecificJob(resumeId, jobRoleId);
        return ResponseEntity.ok(result);
    }
}
