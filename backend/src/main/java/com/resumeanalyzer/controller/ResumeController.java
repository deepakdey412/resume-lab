package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.ResumeUploadResponse;
import com.resumeanalyzer.service.ResumeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@Tag(name = "Resume Management", description = "Upload and manage resume files")
@SecurityRequirement(name = "bearerAuth")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    // ✅ UPLOAD RESUME
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload resume", description = "Upload a PDF or DOCX resume file for analysis")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resume uploaded successfully",
                    content = @Content(schema = @Schema(implementation = ResumeUploadResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file format or empty file"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<ResumeUploadResponse> uploadResume(

            @Parameter(
                    description = "Resume file (PDF or DOCX, max 10MB)",
                    required = true,
                    schema = @Schema(type = "string", format = "binary") // ⭐ IMPORTANT FOR SWAGGER
            )
            @RequestPart("file") MultipartFile file,

            Authentication authentication) {

        // ✅ Validation
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String contentType = file.getContentType();
        if (contentType == null ||
                (!contentType.equals("application/pdf") &&
                 !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
            throw new RuntimeException("Only PDF or DOCX files are allowed");
        }

        // ✅ Get user
        String userEmail = authentication.getName();

        // ✅ Service call
        ResumeUploadResponse response = resumeService.uploadResume(file, userEmail);

        return ResponseEntity.ok(response);
    }
    // ✅ GET ALL RESUME NAMES
    @GetMapping("/names")
    @Operation(summary = "Get all resume file names", description = "Fetch all uploaded resume file names for the logged-in user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched resume names"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<List<String>> getAllResumeNames(

            @Parameter(hidden = true)
            Authentication authentication) {

        String userEmail = authentication.getName();

        List<String> names = resumeService.getAllResumeNames(); // or filter by userEmail if needed

        return ResponseEntity.ok(names);
    }

    // ✅ DELETE RESUME
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete resume", description = "Delete a resume by ID (only owner can delete)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resume deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
            @ApiResponse(responseCode = "403", description = "Forbidden - You can only delete your own resumes"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<String> deleteResume(

            @Parameter(description = "Resume ID", required = true)
            @PathVariable Long id,

            Authentication authentication) {

        String userEmail = authentication.getName();

        resumeService.deleteResume(id, userEmail);

        return ResponseEntity.ok("Resume deleted successfully");
    }
}