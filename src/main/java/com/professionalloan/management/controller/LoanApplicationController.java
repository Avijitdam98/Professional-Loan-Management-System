package com.professionalloan.management.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.professionalloan.management.model.LoanApplication;
import com.professionalloan.management.service.LoanApplicationService;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:5173")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanService;

    @PostMapping(value = "/apply", consumes = "multipart/form-data")
    public ResponseEntity<LoanApplication> submitApplication(
            @RequestParam("name") String name,
            @RequestParam("profession") String profession,
            @RequestParam("purpose") String purpose,
            @RequestParam("loanAmount") BigDecimal loanAmount,
            @RequestParam("creditScore") Integer creditScore,
            @RequestParam("userId") String userId,
            @RequestParam("pfAccountPdf") MultipartFile pfAccountPdf,
            @RequestParam("salarySlip") MultipartFile salarySlip
    ) {
        LoanApplication savedApplication = loanService.submitApplicationWithFiles(
                name, profession, purpose, loanAmount, creditScore,
                userId, pfAccountPdf, salarySlip
        );
        return ResponseEntity.ok(savedApplication);
    }

    @PutMapping("/update-status/{applicationId}")
    public ResponseEntity<?> updateLoanStatus(
            @PathVariable String applicationId,
            @RequestParam String status) {
        try {
            LoanApplication updated = loanService.updateLoanStatus(applicationId, status);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<LoanApplication>> getAllApplications() { 
        List<LoanApplication> allApplications = loanService.getAllApplications();
        return ResponseEntity.ok(allApplications);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanApplication>> getUserApplications(@PathVariable Long userId) {
        List<LoanApplication> userApplications = loanService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(userApplications);
    }
   
    @GetMapping("/search-by-name")
    public ResponseEntity<List<LoanApplication>> searchByName(@RequestParam String name) {
        List<LoanApplication> results = loanService.searchByName(name);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search-by-id")
    public ResponseEntity<List<LoanApplication>> searchByApplicationId(@RequestParam String id) {
        List<LoanApplication> results = loanService.searchByApplicationId(id);
        return ResponseEntity.ok(results);
    }

    
    

}
