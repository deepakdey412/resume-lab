package com.resumeanalyzer.controller;

import com.resumeanalyzer.dto.FeedbackRequest;
import com.resumeanalyzer.entity.Feedback;
import com.resumeanalyzer.repository.FeedbackRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@Tag(name = "Feedback", description = "User feedback management")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    public FeedbackController(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping
    @Operation(
            summary = "Submit feedback",
            description = "Submit user feedback. Stores feedback in database with name, email, and message."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Feedback submitted successfully",
                    content = @Content(schema = @Schema(implementation = Map.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input - validation errors"
            )
    })
    public ResponseEntity<Map<String, Object>> submitFeedback(
            @Valid @RequestBody FeedbackRequest request) {
        
        Feedback feedback = new Feedback();
        feedback.setName(request.getName());
        feedback.setEmail(request.getEmail());
        feedback.setMessage(request.getMessage());
        
        Feedback savedFeedback = feedbackRepository.save(feedback);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Feedback submitted successfully");
        response.put("feedbackId", savedFeedback.getId());
        
        return ResponseEntity.ok(response);
    }
}
