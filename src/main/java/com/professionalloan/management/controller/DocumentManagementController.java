//// com.professionalloan.management.controller.DocumentManagementController.java
//package com.professionalloan.management.controller;
//
//import com.professionalloan.management.model.Document;
//import com.professionalloan.management.service.DocumentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/dms")
//@CrossOrigin(origins = "http://localhost:5173")
//public class DocumentManagementController {
//
//    @Autowired
//    private DocumentService documentService;
//
//    @PostMapping("/upload/{applicationId}")
//    public ResponseEntity<Document> uploadFile(
//            @PathVariable String applicationId,
//            @RequestParam("file") MultipartFile file) {
//
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        Document savedDoc = documentService.uploadDocument(applicationId, file);
//        return ResponseEntity.ok(savedDoc);
//    }
//
//    @GetMapping("/application/{applicationId}")
//    public ResponseEntity<List<Document>> getDocsByAppId(@PathVariable String applicationId) {
//        return ResponseEntity.ok(documentService.getDocumentsByApplicationId(applicationId));
//    }
//
//    @GetMapping("/download/{documentId}")
//    public ResponseEntity<byte[]> downloadDoc(@PathVariable Long documentId) {
//        Document doc = documentService.getDocumentById(documentId);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.parseMediaType(doc.getFileType()));
//        headers.setContentDisposition(ContentDisposition.builder("attachment")
//                .filename(doc.getFileName())
//                .build());
//
//        return new ResponseEntity<>(doc.getFileData(), headers, HttpStatus.OK);
//    }
//}
