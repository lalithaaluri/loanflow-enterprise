package com.lalitha.loanflow.config;

import com.lalitha.loanflow.model.Customer;
import com.lalitha.loanflow.model.LoanApplication;
import com.lalitha.loanflow.repository.CustomerRepository;
import com.lalitha.loanflow.repository.LoanApplicationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    private static final String DEMO_CUSTOMER_EMAIL =
            "aroha.williams@example.nz";

    @Bean
    CommandLineRunner seedDemoData(
            CustomerRepository customerRepository,
            LoanApplicationRepository loanApplicationRepository) {

        return args -> {

            /*
             * Keep all existing records.
             *
             * The demo records are inserted only when the first demo
             * customer does not already exist. This prevents duplicates
             * whenever the Spring Boot application restarts.
             */
            if (customerRepository.existsByEmail(DEMO_CUSTOMER_EMAIL)) {
                return;
            }

            Customer aroha = customerRepository.save(
                    createCustomer(
                            "Aroha",
                            "Williams",
                            DEMO_CUSTOMER_EMAIL,
                            "021 438 762"
                    )
            );

            Customer james = customerRepository.save(
                    createCustomer(
                            "James",
                            "Thompson",
                            "james.thompson@example.nz",
                            "022 517 9041"
                    )
            );

            Customer priya = customerRepository.save(
                    createCustomer(
                            "Priya",
                            "Patel",
                            "priya.patel@example.nz",
                            "027 682 3154"
                    )
            );

            Customer wiremu = customerRepository.save(
                    createCustomer(
                            "Wiremu",
                            "Ngata",
                            "wiremu.ngata@example.nz",
                            "021 790 246"
                    )
            );

            Customer emily = customerRepository.save(
                    createCustomer(
                            "Emily",
                            "Chen",
                            "emily.chen@example.nz",
                            "022 364 8197"
                    )
            );

            Customer liam = customerRepository.save(
                    createCustomer(
                            "Liam",
                            "Roberts",
                            "liam.roberts@example.nz",
                            "027 451 6382"
                    )
            );

            Customer hana = customerRepository.save(
                    createCustomer(
                            "Hana",
                            "Ropata",
                            "hana.ropata@example.nz",
                            "021 875 430"
                    )
            );

            Customer oliver = customerRepository.save(
                    createCustomer(
                            "Oliver",
                            "Smith",
                            "oliver.smith@example.nz",
                            "022 906 1743"
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Home",
                            685000.00,
                            6.89,
                            360,
                            "Purchase of an owner-occupied home in Auckland",
                            "APPROVED",
                            aroha
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Car",
                            32500.00,
                            10.50,
                            60,
                            "Purchase of a hybrid vehicle",
                            "PENDING",
                            james
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Business",
                            145000.00,
                            9.25,
                            84,
                            "Expansion of a local hospitality business",
                            "APPROVED",
                            priya
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Personal",
                            18000.00,
                            13.90,
                            36,
                            "Home renovation and household expenses",
                            "REJECTED",
                            wiremu
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Education",
                            24000.00,
                            7.50,
                            48,
                            "Postgraduate study and course-related expenses",
                            "PENDING",
                            emily
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Home",
                            520000.00,
                            7.05,
                            300,
                            "First-home purchase in Hamilton",
                            "PENDING",
                            liam
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Car",
                            46800.00,
                            9.75,
                            60,
                            "Purchase of an electric vehicle",
                            "APPROVED",
                            hana
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Business",
                            90000.00,
                            11.20,
                            60,
                            "New equipment for a construction business",
                            "REJECTED",
                            oliver
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Personal",
                            12500.00,
                            12.40,
                            24,
                            "Debt consolidation",
                            "APPROVED",
                            james
                    )
            );

            loanApplicationRepository.save(
                    createLoan(
                            "Education",
                            16500.00,
                            8.10,
                            36,
                            "Professional certification and training",
                            "PENDING",
                            priya
                    )
            );

            System.out.println(
                    "LoanFlow demo data inserted successfully."
            );
        };
    }

    private Customer createCustomer(
            String firstName,
            String lastName,
            String email,
            String phone) {

        Customer customer = new Customer();

        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setEmail(email);
        customer.setPhone(phone);

        return customer;
    }

    private LoanApplication createLoan(
            String loanType,
            Double amount,
            Double interestRate,
            Integer termMonths,
            String purpose,
            String status,
            Customer customer) {

        LoanApplication loan = new LoanApplication();

        loan.setLoanType(loanType);
        loan.setAmount(amount);
        loan.setInterestRate(interestRate);
        loan.setTermMonths(termMonths);
        loan.setPurpose(purpose);
        loan.setStatus(status);
        loan.setCustomer(customer);

        return loan;
    }
}