import { useEffect, useState } from "react";
import type { Customer } from "../types/Customer";
import type { Loan } from "../types/Loan";
import { getCustomers } from "../services/customerService";
import { getLoans } from "../services/loanService";

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