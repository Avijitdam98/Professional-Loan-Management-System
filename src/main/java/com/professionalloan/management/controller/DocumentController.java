// src/main/java/com/professionalloan/management/controller/DocumentController.java
package com.professionalloan.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.professionalloan.management.model.LoanApplication;
import com.professionalloan.management.repository.LoanApplicationRepository;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173") // Your frontend port
public class DocumentController {

    @Autowired
    private LoanApplicationRepository loanRepo;

    @GetMapping("/{applicationId}/pf")
    public ResponseEntity<byte[]> getPfDocument(@PathVariable String applicationId) {
        LoanApplication application = loanRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + applicationId));

        byte[] document = application.getPfAccountPdf();

        if (document == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("pf-document.pdf").build());

        return new ResponseEntity<>(document, headers, HttpStatus.OK);
    }

    @GetMapping("/{applicationId}/salary-slip")
    public ResponseEntity<byte[]> getSalarySlip(@PathVariable String applicationId) {
        LoanApplication application = loanRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + applicationId));

        byte[] document = application.getSalarySlip();

        if (document == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("salary-slip.pdf").build());

        return new ResponseEntity<>(document, headers, HttpStatus.OK);
    }
    
//    @PostMapping("/uploadDocuments/{applicantId}")
//    public ResponseEntity<String> uploadDocuments(
//            @PathVariable Long applicantId,
//            @RequestParam("pfDocument") MultipartFile pfDocument,
//            @RequestParam("salarySlip") MultipartFile salarySlip) {
//
//        return documentUploadService.saveDocuments(applicantId, pfDocument, salarySlip);
//    }

}
