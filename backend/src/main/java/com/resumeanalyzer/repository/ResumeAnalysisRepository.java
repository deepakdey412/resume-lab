package com.resumeanalyzer.repository;

import com.resumeanalyzer.entity.ResumeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {
    List<ResumeAnalysis> findByResumeId(Long resumeId);
    List<ResumeAnalysis> findByJobRoleId(Long jobRoleId);
}
