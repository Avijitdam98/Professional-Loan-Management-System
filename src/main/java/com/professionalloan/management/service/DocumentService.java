//// com.professionalloan.management.service.DocumentService.java
//package com.professionalloan.management.service;
//
//import com.professionalloan.management.model.Document;
//import com.professionalloan.management.model.LoanApplication;
//import com.professionalloan.management.repository.DocumentRepository;
//import com.professionalloan.management.repository.LoanApplicationRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@Service
//public class DocumentService {
//
//    @Autowired
//    private DocumentRepository documentRepo;
//
//    @Autowired
//    private LoanApplicationRepository loanRepo;
//
//    public Document uploadDocument(String applicationId, MultipartFile file) {
//        LoanApplication application = loanRepo.findById(applicationId)
//                .orElseThrow(() -> new RuntimeException("Loan application not found"));
//
//        try {
//            Document doc = new Document();
//            doc.setFileName(file.getOriginalFilename());
//            doc.setFileType(file.getContentType());
//            doc.setFileData(file.getBytes());
//            doc.setLoanApplication(application);
//
//            return documentRepo.save(doc);
//        } catch (Exception e) {
//            throw new RuntimeException("Could not upload file", e);
//        }
//    }
//
//    public List<Document> getDocumentsByApplicationId(String applicationId) {
//        return documentRepo.findByLoanApplication_ApplicationId(applicationId);
//    }
//
//    public Document getDocumentById(Long id) {
//        return documentRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Document not found"));
//    }
//}
