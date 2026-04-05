package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.ResumeGeneratorRequest;
import com.resumeanalyzer.service.ResumeGeneratorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume-generator")
@Tag(name = "Resume Generator", description = "Generate professional resume PDFs from user data")
@SecurityRequirement(name = "bearerAuth")
public class ResumeGeneratorController {

    private final ResumeGeneratorService resumeGeneratorService;

    public ResumeGeneratorController(ResumeGeneratorService resumeGeneratorService) {
        this.resumeGeneratorService = resumeGeneratorService;
    }

    @PostMapping("/generate")
    @Operation(
            summary = "Generate resume PDF",
            description = "Generate a professional resume PDF from user-provided data. " +
                    "The PDF can be previewed in browser or downloaded. " +
                    "Use query parameter 'download=true' to force download, otherwise it displays inline for preview. " +
                    "The PDF is NOT stored in the database."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Resume PDF generated successfully",
                    content = @Content(
                            mediaType = "application/pdf",
                            schema = @Schema(type = "string", format = "binary")
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input - validation errors"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - JWT token required"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal server error - PDF generation failed"
            )
    })
    public ResponseEntity<byte[]> generateResume(
            @Valid @RequestBody ResumeGeneratorRequest request,
            @RequestParam(required = false, defaultValue = "false") boolean download) {
        
        byte[] pdfBytes = resumeGeneratorService.generateResumePDF(request);
        
        // Generate filename from user's name
        String filename = request.getName().replaceAll("[^a-zA-Z0-9]", "_") + "_Resume.pdf";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        
        // If download=true, force download. Otherwise, display inline for preview
        if (download) {
            headers.setContentDispositionFormData("attachment", filename);
        } else {
            headers.add("Content-Disposition", "inline; filename=\"" + filename + "\"");
        }
        
        headers.setContentLength(pdfBytes.length);
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
