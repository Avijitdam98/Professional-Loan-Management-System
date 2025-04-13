//// com.professionalloan.management.model.Document.java
//package com.professionalloan.management.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "documents")
//public class Document {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long documentId;
//
//    private String fileName;
//
//    private String fileType;
//
//    @Lob
//    private byte[] fileData;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "application_id")
//    private LoanApplication loanApplication;
//
//    // Getters and Setters
//    public Long getDocumentId() {
//        return documentId;
//    }
//
//    public void setDocumentId(Long documentId) {
//        this.documentId = documentId;
//    }
//
//    public String getFileName() {
//        return fileName;
//    }
//
//    public void setFileName(String fileName) {
//        this.fileName = fileName;
//    }
//
//    public String getFileType() {
//        return fileType;
//    }
//
//    public void setFileType(String fileType) {
//        this.fileType = fileType;
//    }
//
//    public byte[] getFileData() {
//        return fileData;
//    }
//
//    public void setFileData(byte[] fileData) {
//        this.fileData = fileData;
//    }
//
//    public LoanApplication getLoanApplication() {
//        return loanApplication;
//    }
//
//    public void setLoanApplication(LoanApplication loanApplication) {
//        this.loanApplication = loanApplication;
//    }
//}
