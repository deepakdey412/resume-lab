package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.AdminDashboardResponse;
import com.resumeanalyzer.dto.AdminLoginRequest;
import com.resumeanalyzer.dto.AuthResponse;
import com.resumeanalyzer.entity.Feedback;
import com.resumeanalyzer.repository.FeedbackRepository;
import com.resumeanalyzer.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin", description = "Admin operations")
public class AdminController {

    private final AdminService adminService;
    private final FeedbackRepository feedbackRepository;

    public AdminController(AdminService adminService, FeedbackRepository feedbackRepository) {
        this.adminService = adminService;
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping("/login")
    @Operation(
            summary = "Admin login",
            description = "Login with hardcoded admin credentials. " +
                    "Email: admin@gmail.com, Password: admin123"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Login successful",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid credentials"
            )
    })
    public ResponseEntity<AuthResponse> adminLogin(@Valid @RequestBody AdminLoginRequest request) {
        String token = adminService.authenticateAdmin(request.getEmail(), request.getPassword());
        
        AuthResponse response = new AuthResponse(
                token,
                request.getEmail(),
                "Admin"
        );
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Get admin dashboard",
            description = "Get all users and their resume counts. Only accessible by admin."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Dashboard data retrieved successfully",
                    content = @Content(schema = @Schema(implementation = AdminDashboardResponse.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - JWT token required"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - Admin access only"
            )
    })
    public ResponseEntity<AdminDashboardResponse> getAdminDashboard(Authentication authentication) {
        String email = authentication.getName();
        
        if (!adminService.isAdmin(email)) {
            throw new RuntimeException("Access denied. Admin only.");
        }
        
        AdminDashboardResponse dashboard = adminService.getAdminDashboard();
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/feedback")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Get all feedback",
            description = "Fetch all feedback entries. Only accessible by admin."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Feedback list retrieved successfully"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - JWT token required"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - Admin access only"
            )
    })
    public ResponseEntity<List<Feedback>> getAllFeedback(Authentication authentication) {
        String email = authentication.getName();
        
        if (!adminService.isAdmin(email)) {
            throw new RuntimeException("Access denied. Admin only.");
        }
        
        List<Feedback> feedbackList = feedbackRepository.findAll();
        return ResponseEntity.ok(feedbackList);
    }
    
    @DeleteMapping("/feedback/{feedbackId}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(
            summary = "Delete feedback",
            description = "Delete a feedback entry by ID. Only accessible by admin."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Feedback deleted successfully"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - JWT token required"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - Admin access only"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Feedback not found"
            )
    })
    public ResponseEntity<String> deleteFeedback(
            @PathVariable Long feedbackId,
            Authentication authentication) {
        String email = authentication.getName();
        
        if (!adminService.isAdmin(email)) {
            throw new RuntimeException("Access denied. Admin only.");
        }
        
        adminService.deleteFeedback(feedbackId);
        return ResponseEntity.ok("Feedback deleted successfully");
    }
}
