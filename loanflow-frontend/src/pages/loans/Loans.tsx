import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Loan } from "../../types/Loan";
import {
    approveLoan,
    deleteLoan,
    getLoans,
    rejectLoan,
} from "../../services/loanService";

function Loans() {
    const navigate = useNavigate();
    const [loans, setLoans] = useState<Loan[]>([]);

    const loadLoans = async () => {
        try {
            const data = await getLoans();
            setLoans(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadLoans();
    }, []);

    const getStatusClass = (status?: string) => {
        switch (status) {
            case "APPROVED":
                return "approved";
            case "REJECTED":
                return "rejected";
            default:
                return "pending";
        }
    };

    const handleDelete = async (loanId: number) => {
        if (!window.confirm("Are you sure you want to delete this loan?")) {
            return;
        }

        await deleteLoan(loanId);
        await loadLoans();
    };

    const handleApprove = async (loanId: number) => {
        await approveLoan(loanId);
        await loadLoans();
    };

    const handleReject = async (loanId: number) => {
        await rejectLoan(loanId);
        await loadLoans();
    };

    return (
        <div>
            <div className="page-header">
                <h2>Loans</h2>

                <button className="add-btn" onClick={() => navigate("/loans/add")}>
                    + New Loan
                </button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Loan Type</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {loans.map((loan) => (
                    <tr key={loan.id}>
                        <td>{loan.id}</td>
                        <td>{loan.loanType}</td>
                        <td>
                            {loan.customer
                                ? `${loan.customer.firstName} ${loan.customer.lastName}`
                                : "Not Assigned"}
                        </td>
                        <td>${loan.amount.toLocaleString()}</td>
                        <td>
                            <span className={`status ${getStatusClass(loan.status)}`}>
                                {loan.status || "PENDING"}
                            </span>
                        </td>
                        <td>
                            <button
                                className="edit-btn"
                                onClick={() => navigate(`/loans/edit/${loan.id}`)}
                            >
                                Edit
                            </button>

                            {(loan.status || "PENDING").trim().toUpperCase() === "PENDING" && (
                                <>
                                    <button
                                        className="approve-btn"
                                        onClick={() => handleApprove(loan.id)}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() => handleReject(loan.id)}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(loan.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Loans;