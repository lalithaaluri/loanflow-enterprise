import {useEffect, useState} from "react";
import type {Customer} from "../../types/Customer.ts";
import type {Loan} from "../../types/Loan.ts";
import {getCustomers} from "../../services/customerService.ts";
import {getLoans} from "../../services/loanService.ts";
import LoanStatusChart from "../../components/LoanStatusChart";
import RecentLoans from "../../components/RecentLoans";

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

    const pendingLoans = loans.filter(
        (loan) => loan.status === "PENDING"
    ).length;

    return (
        <div>
            <h2>Dashboard Overview</h2>

            <div className="cards">
                <div className="card">
                    <h3>👥 Customers</h3>
                    <p>{customers.length}</p>
                </div>

                <div className="card">
                    <h3>💰 Loans</h3>
                    <p>{loans.length}</p>
                </div>

                <div className="card">
                    <h3>⏳ Pending </h3>
                    <p>{pendingLoans}</p>
                </div>

                <div className="card">
                    <h3>✅ Approved </h3>
                    <p>{approvedLoans}</p>
                </div>

                <div className="card">
                    <h3>❌ Rejected </h3>
                    <p>{rejectedLoans}</p>
                </div>
            </div>

            <div className="dashboard-grid">
                <LoanStatusChart
                    approved={approvedLoans}
                    pending={pendingLoans}
                    rejected={rejectedLoans}
                />

                <RecentLoans loans={loans} />
            </div>
        </div>
    );
}

export default Dashboard;