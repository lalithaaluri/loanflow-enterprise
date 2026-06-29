import { useEffect, useState } from "react";
import type { Customer } from "../../types/Customer.ts";
import type { Loan } from "../../types/Loan.ts";
import { getCustomers } from "../../services/customerService.ts";
import { getLoans } from "../../services/loanService.ts";

function Dashboard() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);

    const loadDashboard = async () => {
        try {
            const customerData = await getCustomers();
            const loanData = await getLoans();

            setCustomers(customerData);
            setLoans(loanData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const approvedLoans = loans.filter(
        (loan) => loan.status === "APPROVED"
    ).length;

    const rejectedLoans = loans.filter(
        (loan) => loan.status === "REJECTED"
    ).length;

    return (
        <div>
            <h2>Dashboard</h2>

            <div className="cards">
                <div className="card">
                    <h3>Total Customers</h3>
                    <p>{customers.length}</p>
                </div>

                <div className="card">
                    <h3>Total Loans</h3>
                    <p>{loans.length}</p>
                </div>

                <div className="card">
                    <h3>Approved Loans</h3>
                    <p>{approvedLoans}</p>
                </div>

                <div className="card">
                    <h3>Rejected Loans</h3>
                    <p>{rejectedLoans}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;