package com.resumeanalyzer.service;

import com.resumeanalyzer.dto.ResumeUploadResponse;
import com.resumeanalyzer.entity.Resume;
import com.resumeanalyzer.entity.User;
import com.resumeanalyzer.repository.ResumeRepository;
import com.resumeanalyzer.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final FileParserService fileParserService;
    private final String uploadDir = "uploads/resumes/";

    public ResumeService(ResumeRepository resumeRepository, UserRepository userRepository, 
                        FileParserService fileParserService) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.fileParserService = fileParserService;
        createUploadDirectory();
    }

    private void createUploadDirectory() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    public ResumeUploadResponse uploadResume(MultipartFile file, String userEmail) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (!fileParserService.isSupportedFileType(file.getOriginalFilename())) {
            throw new IllegalArgumentException("Unsupported file type. Only PDF and DOCX files are allowed");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            String extractedText = fileParserService.parseFile(file);
            String filePath = saveFile(file);

            Resume resume = new Resume();
            resume.setUser(user);
            resume.setFileName(file.getOriginalFilename());
            resume.setFilePath(filePath);
            resume.setExtractedText(extractedText);

            Resume savedResume = resumeRepository.save(resume);

            return new ResumeUploadResponse(
                    savedResume.getId(),
                    savedResume.getFileName(),
                    "Resume uploaded and parsed successfully",
                    extractedText.length()
            );

        } catch (IOException e) {
            throw new RuntimeException("Failed to process resume file: " + e.getMessage(), e);
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        
        Path filePath = Paths.get(uploadDir + uniqueFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        return filePath.toString();
    }
    public List<String> getAllResumeNames() {
        return resumeRepository.findAll()
                .stream()
                .map(resume -> resume.getFileName())
                .toList(); // Java 16+
    }
    
    public void deleteResume(Long resumeId, String userEmail) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        
        // Verify the resume belongs to the user
        if (!resume.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized: You can only delete your own resumes");
        }
        
        // Delete the physical file
        try {
            Path filePath = Paths.get(resume.getFilePath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Log the error but continue with database deletion
            System.err.println("Failed to delete physical file: " + e.getMessage());
        }
        
        // Delete from database
        resumeRepository.delete(resume);
    }
}
