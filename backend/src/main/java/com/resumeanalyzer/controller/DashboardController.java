package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.DashboardResponse;
import com.resumeanalyzer.dto.ResumeAnalysisDTO;
import com.resumeanalyzer.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard", description = "Dashboard and statistics endpoints")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/my-analyses")
    @Operation(summary = "Get user dashboard", description = "Get complete dashboard with all resumes, analyses, and statistics")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dashboard data retrieved successfully",
                    content = @Content(schema = @Schema(implementation = DashboardResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<DashboardResponse> getMyAnalyses(Authentication authentication) {
        String userEmail = authentication.getName();
        DashboardResponse response = dashboardService.getUserDashboard(userEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resume/{resumeId}/analyses")
    @Operation(summary = "Get resume analyses", description = "Get all analyses for a specific resume")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Analyses retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<List<ResumeAnalysisDTO>> getResumeAnalyses(
            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long resumeId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        List<ResumeAnalysisDTO> analyses = dashboardService.getResumeAnalyses(resumeId, userEmail);
        return ResponseEntity.ok(analyses);
    }

    @GetMapping("/resume/{resumeId}/top-matches")
    @Operation(summary = "Get top matches for resume", description = "Get top N job matches for a specific resume")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Top matches retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<List<ResumeAnalysisDTO>> getTopMatches(
            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long resumeId,
            @Parameter(description = "Number of top matches to return (default: 3)")
            @RequestParam(defaultValue = "3") int limit,
            Authentication authentication) {
        String userEmail = authentication.getName();
        List<ResumeAnalysisDTO> topMatches = dashboardService.getTopMatches(resumeId, limit, userEmail);
        return ResponseEntity.ok(topMatches);
    }

    @GetMapping("/all-resumes")
    @Operation(summary = "Get all user resumes", description = "Get all resumes uploaded by the authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resumes retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<List<DashboardResponse.ResumeInfo>> getAllResumes(Authentication authentication) {
        String userEmail = authentication.getName();
        List<DashboardResponse.ResumeInfo> resumes = dashboardService.getAllUserResumes(userEmail);
        return ResponseEntity.ok(resumes);
    }

    @GetMapping("/statistics")
    @Operation(summary = "Get user statistics", description = "Get statistics for the authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Statistics retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<DashboardResponse.Statistics> getStatistics(Authentication authentication) {
        String userEmail = authentication.getName();
        DashboardResponse.Statistics stats = dashboardService.getUserStatistics(userEmail);
        return ResponseEntity.ok(stats);
    }
}
