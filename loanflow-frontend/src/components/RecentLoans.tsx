import type { Loan } from "../types/Loan";

type Props = {
    loans: Loan[];
};

function RecentLoans({ loans }: Props) {
    return (
        <div className="recent-loans-card">
            <h3>Recent Loan Applications</h3>

            <table className="recent-table">
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Loan Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {[...loans].reverse().slice(0, 5).map((loan) => (
                    <tr key={loan.id}>
                        <td>
                            {loan.customer
                                ? `${loan.customer.firstName} ${loan.customer.lastName}`
                                : "Not Assigned"}
                        </td>

                        <td>{loan.loanType}</td>

                        <td>${loan.amount.toLocaleString()}</td>

                        <td>
                                <span
                                    className={`status ${
                                        loan.status?.toLowerCase() || "pending"
                                    }`}
                                >
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

export default RecentLoans;