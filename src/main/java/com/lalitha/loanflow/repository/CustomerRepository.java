package com.lalitha.loanflow.repository;

import com.lalitha.loanflow.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}