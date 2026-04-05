package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.JDAnalysisResponse;
import com.resumeanalyzer.service.JDAnalysisService;
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

@RestController
@RequestMapping("/api/jd-analysis")
@Tag(name = "JD Analysis", description = "Analyze resume against custom job descriptions (temporary analysis, not stored)")
@SecurityRequirement(name = "bearerAuth")
public class JDAnalysisController {

    private final JDAnalysisService jdAnalysisService;

    public JDAnalysisController(JDAnalysisService jdAnalysisService) {
        this.jdAnalysisService = jdAnalysisService;
    }

    @PostMapping("/analyze/{resumeId}")
    @Operation(
            summary = "Analyze resume with job description",
            description = "Analyze a resume against a custom job description. " +
                    "Send the job description as plain text in the request body. " +
                    "Returns match percentage and missing keywords. " +
                    "This is a temporary analysis - results are NOT stored in the database."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Analysis completed successfully",
                    content = @Content(schema = @Schema(implementation = JDAnalysisResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input - missing resume ID or job description"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - JWT token required"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Resume not found"
            )
    })
    public ResponseEntity<JDAnalysisResponse> analyzeWithJobDescription(
            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long resumeId,
            @Parameter(description = "Job Description as plain text", required = true)
            @RequestBody String jobDescription) {
        
        if (jobDescription == null || jobDescription.trim().isEmpty()) {
            throw new RuntimeException("Job Description cannot be empty");
        }
        
        JDAnalysisResponse response = jdAnalysisService.analyzeResumeWithJD(
                resumeId,
                jobDescription
        );
        
        return ResponseEntity.ok(response);
    }
}
