import { useEffect, useState } from "react";
import type { Loan } from "../types/Loan";
import { getLoans } from "../services/loanService";

function Loans() {
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

    const getStatusClass = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "approved";
            case "REJECTED":
                return "rejected";
            default:
                return "pending";
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Loans</h2>

                <button className="add-btn">
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
                  {loan.status}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Loans;