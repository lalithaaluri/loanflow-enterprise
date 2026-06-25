package com.lalitha.loanflow.controller;

import com.lalitha.loanflow.dto.LoanRequest;
import com.lalitha.loanflow.model.LoanApplication;
import com.lalitha.loanflow.service.LoanApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanApplicationController {

    private final LoanApplicationService loanApplicationService;

    public LoanApplicationController(LoanApplicationService loanApplicationService) {
        this.loanApplicationService = loanApplicationService;
    }

    @GetMapping
    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationService.getAllLoanApplications();
    }

    @GetMapping("/customer/{customerId}")
    public List<LoanApplication> getLoansByCustomerId(@PathVariable Long customerId) {
        return loanApplicationService.getLoansByCustomerId(customerId);
    }

    @PostMapping
    public LoanApplication createLoanApplication(@RequestBody LoanRequest request) {
        return loanApplicationService.createLoanApplication(request);
    }
    @PutMapping("/{loanId}/approve")
    public LoanApplication approveLoan(@PathVariable Long loanId) {
        return loanApplicationService.approveLoan(loanId);
    }

    @PutMapping("/{loanId}/reject")
    public LoanApplication rejectLoan(@PathVariable Long loanId) {
        return loanApplicationService.rejectLoan(loanId);
    }}