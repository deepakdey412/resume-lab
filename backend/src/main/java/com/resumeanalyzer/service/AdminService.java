package com.resumeanalyzer.service;

import com.resumeanalyzer.dto.AdminDashboardResponse;
import com.resumeanalyzer.entity.User;
import com.resumeanalyzer.repository.FeedbackRepository;
import com.resumeanalyzer.repository.ResumeRepository;
import com.resumeanalyzer.repository.UserRepository;
import com.resumeanalyzer.security.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {
    
    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "admin123";
    
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final FeedbackRepository feedbackRepository;
    
    public AdminService(JwtUtil jwtUtil, UserRepository userRepository, ResumeRepository resumeRepository, FeedbackRepository feedbackRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.feedbackRepository = feedbackRepository;
    }
    
    public String authenticateAdmin(String email, String password) {
        if (ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password)) {
            // Generate JWT token for admin
            return jwtUtil.generateToken(email);
        }
        throw new RuntimeException("Invalid admin credentials");
    }
    
    public boolean isAdmin(String email) {
        return ADMIN_EMAIL.equals(email);
    }
    
    public AdminDashboardResponse getAdminDashboard() {
        List<User> allUsers = userRepository.findAll();
        
        List<AdminDashboardResponse.UserInfo> userInfoList = allUsers.stream()
                .map(user -> {
                    int resumeCount = resumeRepository.countByUserId(user.getId());
                    return new AdminDashboardResponse.UserInfo(
                            user.getId(),
                            user.getEmail(),
                            user.getFullName(),
                            resumeCount
                    );
                })
                .collect(Collectors.toList());
        
        return new AdminDashboardResponse(allUsers.size(), userInfoList);
    }
    
    public void deleteFeedback(Long feedbackId) {
        if (!feedbackRepository.existsById(feedbackId)) {
            throw new RuntimeException("Feedback not found with id: " + feedbackId);
        }
        feedbackRepository.deleteById(feedbackId);
    }
}
