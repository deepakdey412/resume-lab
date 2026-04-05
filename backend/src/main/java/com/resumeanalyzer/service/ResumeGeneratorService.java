package com.resumeanalyzer.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import com.resumeanalyzer.dto.ResumeGeneratorRequest;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class ResumeGeneratorService {

    public byte[] generateResumePDF(ResumeGeneratorRequest request) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 50, 50, 50, 50);
            PdfWriter.getInstance(document, baos);
            document.open();

            // Define fonts
            Font titleFont = new Font(Font.HELVETICA, 24, Font.BOLD, new java.awt.Color(0, 51, 102));
            Font sectionFont = new Font(Font.HELVETICA, 14, Font.BOLD, new java.awt.Color(0, 51, 102));
            Font normalFont = new Font(Font.HELVETICA, 11, Font.NORMAL);
            Font boldFont = new Font(Font.HELVETICA, 11, Font.BOLD);

            // Header - Name
            Paragraph name = new Paragraph(request.getName(), titleFont);
            name.setAlignment(Element.ALIGN_CENTER);
            document.add(name);
            document.add(new Paragraph(" "));

            // Contact Info
            Paragraph contact = new Paragraph();
            contact.setAlignment(Element.ALIGN_CENTER);
            contact.setFont(normalFont);
            StringBuilder contactInfo = new StringBuilder();
            if (request.getEmail() != null) contactInfo.append(request.getEmail());
            if (request.getPhone() != null) contactInfo.append(" | ").append(request.getPhone());
            if (request.getLocation() != null) contactInfo.append(" | ").append(request.getLocation());
            contact.add(contactInfo.toString());
            document.add(contact);
            document.add(new Paragraph(" "));

            // Summary
            if (request.getSummary() != null && !request.getSummary().trim().isEmpty()) {
                addSectionTitle(document, "PROFESSIONAL SUMMARY", sectionFont);
                Paragraph summary = new Paragraph(request.getSummary(), normalFont);
                summary.setAlignment(Element.ALIGN_JUSTIFIED);
                document.add(summary);
                document.add(new Paragraph(" "));
            }

            // Skills
            if (request.getSkills() != null && !request.getSkills().isEmpty()) {
                addSectionTitle(document, "SKILLS", sectionFont);
                Paragraph skills = new Paragraph(String.join(" • ", request.getSkills()), normalFont);
                document.add(skills);
                document.add(new Paragraph(" "));
            }

            // Education
            if (request.getEducation() != null && !request.getEducation().isEmpty()) {
                addSectionTitle(document, "EDUCATION", sectionFont);
                for (String edu : request.getEducation()) {
                    Paragraph education = new Paragraph(edu, normalFont);
                    document.add(education);
                    document.add(new Paragraph(" "));
                }
            }

            // Experience
            if (request.getExperience() != null && !request.getExperience().isEmpty()) {
                addSectionTitle(document, "WORK EXPERIENCE", sectionFont);
                for (String exp : request.getExperience()) {
                    Paragraph experience = new Paragraph(exp, normalFont);
                    document.add(experience);
                    document.add(new Paragraph(" "));
                }
            }

            // Projects
            if (request.getProjects() != null && !request.getProjects().isEmpty()) {
                addSectionTitle(document, "PROJECTS", sectionFont);
                for (String proj : request.getProjects()) {
                    Paragraph project = new Paragraph(proj, normalFont);
                    document.add(project);
                    document.add(new Paragraph(" "));
                }
            }

            document.close();
            return baos.toByteArray();
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage(), e);
        }
    }

    private void addSectionTitle(Document document, String title, Font font) throws DocumentException {
        Paragraph section = new Paragraph(title, font);
        section.setSpacingBefore(5);
        section.setSpacingAfter(10);
        document.add(section);
        document.add(new Paragraph(" "));
    }
}
