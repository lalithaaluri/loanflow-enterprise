package com.lalitha.loanflow.service;

import com.lalitha.loanflow.dto.LoanRequest;
import com.lalitha.loanflow.model.Customer;
import com.lalitha.loanflow.model.LoanApplication;
import com.lalitha.loanflow.repository.CustomerRepository;
import com.lalitha.loanflow.repository.LoanApplicationRepository;
import org.springframework.stereotype.Service;
import com.lalitha.loanflow.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class LoanApplicationService {

    private final LoanApplicationRepository loanApplicationRepository;
    private final CustomerRepository customerRepository;

    public LoanApplicationService(
            LoanApplicationRepository loanApplicationRepository,
            CustomerRepository customerRepository) {

        this.loanApplicationRepository = loanApplicationRepository;
        this.customerRepository = customerRepository;
    }

    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationRepository.findAll();
    }

    public LoanApplication createLoanApplication(LoanRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        LoanApplication loanApplication = new LoanApplication();

        loanApplication.setLoanType(request.getLoanType());
        loanApplication.setAmount(request.getAmount());
        loanApplication.setStatus(request.getStatus());
        loanApplication.setCustomer(customer);

        return loanApplicationRepository.save(loanApplication);
    }

    public List<LoanApplication> getLoansByCustomerId(Long customerId) {
        return loanApplicationRepository.findByCustomerId(customerId);

    }
    public LoanApplication approveLoan(Long loanId) {

        LoanApplication loanApplication = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        loanApplication.setStatus("APPROVED");

        return loanApplicationRepository.save(loanApplication);
    }

    public LoanApplication rejectLoan(Long loanId) {

        LoanApplication loanApplication = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        loanApplication.setStatus("REJECTED");

        return loanApplicationRepository.save(loanApplication);
    }}