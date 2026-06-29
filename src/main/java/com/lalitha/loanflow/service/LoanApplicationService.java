package com.lalitha.loanflow.service;

import com.lalitha.loanflow.dto.LoanRequest;
import com.lalitha.loanflow.exception.ResourceNotFoundException;
import com.lalitha.loanflow.model.Customer;
import com.lalitha.loanflow.model.LoanApplication;
import com.lalitha.loanflow.repository.CustomerRepository;
import com.lalitha.loanflow.repository.LoanApplicationRepository;
import org.springframework.stereotype.Service;

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
        return loanApplicationRepository.findAllByOrderByIdAsc();
    }

    public List<LoanApplication> getLoansByCustomerId(Long customerId) {
        return loanApplicationRepository.findByCustomerId(customerId);
    }

    public LoanApplication createLoanApplication(LoanRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        LoanApplication loanApplication = new LoanApplication();

        loanApplication.setLoanType(request.getLoanType());
        loanApplication.setAmount(request.getAmount());
        loanApplication.setInterestRate(request.getInterestRate());
        loanApplication.setTermMonths(request.getTermMonths());
        loanApplication.setPurpose(request.getPurpose());

        loanApplication.setStatus(
                request.getStatus() == null || request.getStatus().isBlank()
                        ? "PENDING"
                        : request.getStatus()
        );

        loanApplication.setCustomer(customer);

        return loanApplicationRepository.save(loanApplication);
    }

    public LoanApplication updateLoan(Long loanId, LoanRequest request) {

        LoanApplication loanApplication = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        loanApplication.setLoanType(request.getLoanType());
        loanApplication.setAmount(request.getAmount());
        loanApplication.setInterestRate(request.getInterestRate());
        loanApplication.setTermMonths(request.getTermMonths());
        loanApplication.setPurpose(request.getPurpose());
        loanApplication.setCustomer(customer);

        return loanApplicationRepository.save(loanApplication);
    }

    public void deleteLoan(Long loanId) {

        LoanApplication loanApplication = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        loanApplicationRepository.delete(loanApplication);
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
    }
}