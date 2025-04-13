package com.professionalloan.management.service;

import com.professionalloan.management.model.LoanApplication;
import com.professionalloan.management.model.User;
import com.professionalloan.management.repository.LoanApplicationRepository;
import com.professionalloan.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanRepo;

    @Autowired
    private UserRepository userRepository;

    public LoanApplication submitApplicationWithFiles(
            String name,
            String profession,
            String purpose,
            BigDecimal loanAmount,
            Integer creditScore,
            String userId,
            MultipartFile pfAccountPdf,
            MultipartFile salarySlip
    ) {
        try {
            User user = userRepository.findById(Long.parseLong(userId))
                    .orElseThrow(() -> new RuntimeException("User not found"));

            LoanApplication application = new LoanApplication();
            application.setApplicationId(UUID.randomUUID().toString());
            application.setName(name);
            application.setProfession(profession);
            application.setPurpose(purpose);
            application.setLoanAmount(loanAmount);
            application.setCreditScore(creditScore);
            application.setStatus("PENDING");
            application.setPfAccountPdf(pfAccountPdf.getBytes());
            application.setSalarySlip(salarySlip.getBytes());
            application.setUser(user);

            return loanRepo.save(application);
        } catch (Exception e) {
            throw new RuntimeException("Failed to submit loan application", e);
        }
    }

    public LoanApplication updateLoanStatus(String applicationId, String status) {
        LoanApplication application = loanRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return loanRepo.save(application);
    }

    public List<LoanApplication> getAllApplications() {
        return loanRepo.findAll();
    }

    public List<LoanApplication> getApplicationsByUserId(Long userId) {
        return loanRepo.findByUser_Id(userId);
    }
    
    public List<LoanApplication> searchByName(String name) {
        return loanRepo.findByNameContainingIgnoreCase(name);
    }

    public List<LoanApplication> searchByApplicationId(String id) {
        return loanRepo.findByApplicationIdContainingIgnoreCase(id);
    }

    
}
