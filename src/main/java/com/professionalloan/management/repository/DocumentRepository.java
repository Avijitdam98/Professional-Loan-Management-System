//// com.professionalloan.management.repository.DocumentRepository.java
//package com.professionalloan.management.repository;
//
//import com.professionalloan.management.model.Document;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface DocumentRepository extends JpaRepository<Document, Long> {
//    List<Document> findByLoanApplication_ApplicationId(String applicationId);
//}
// 