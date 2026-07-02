import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Loan } from "../../types/Loan";
import { getRole } from "../../services/authService";
import {
    approveLoan,
    deleteLoan,
    getLoans,
    rejectLoan,
} from "../../services/loanService";

function Loans() {
    const navigate = useNavigate();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const role = getRole();
    const isAdmin = role === "ADMIN";

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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const filteredLoans = loans.filter((loan) => {
        const search = searchTerm.toLowerCase();

        const customerName = loan.customer
            ? `${loan.customer.firstName} ${loan.customer.lastName}`.toLowerCase()
            : "";

        const loanStatus = (loan.status || "PENDING").toUpperCase();

        return (
            (loan.loanType.toLowerCase().includes(search) ||
                customerName.includes(search)) &&
            (statusFilter === "ALL" || loanStatus === statusFilter)
        );
    });

    const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLoans = filteredLoans.slice(
        startIndex,
        startIndex + itemsPerPage
    );

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
        if (!window.confirm("Are you sure you want to delete this loan?")) return;
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

            <input
                type="text"
                placeholder="Search loans by type or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                }}
            />

            <button
                className={statusFilter === "ALL" ? "filter-btn active-filter" : "filter-btn"}
                onClick={() => setStatusFilter("ALL")}
            >
                📋 All
            </button>

            <button
                className={statusFilter === "PENDING" ? "filter-btn active-filter" : "filter-btn"}
                onClick={() => setStatusFilter("PENDING")}
            >
                ⏳ Pending
            </button>

            <button
                className={statusFilter === "APPROVED" ? "filter-btn active-filter" : "filter-btn"}
                onClick={() => setStatusFilter("APPROVED")}
            >
                ✅ Approved
            </button>

            <button
                className={statusFilter === "REJECTED" ? "filter-btn active-filter" : "filter-btn"}
                onClick={() => setStatusFilter("REJECTED")}
            >
                ❌ Rejected
            </button>

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
                {paginatedLoans.map((loan) => (
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

                            {isAdmin &&
                                (loan.status || "PENDING").trim().toUpperCase() ===
                                "PENDING" && (
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

                            {isAdmin && (
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(loan.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {filteredLoans.length > 0 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ◀ Previous
                    </button>

                    <span>
            Page {currentPage} of {totalPages}
        </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next ▶
                    </button>
                </div>
            )}
        </div>
    );
}

export default Loans;