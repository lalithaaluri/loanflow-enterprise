import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {Customer} from "../../types/Customer";
import type {Loan} from "../../types/Loan";
import {getCustomers} from "../../services/customerService";
import {getLoans, updateLoan} from "../../services/loanService";

function EditLoan() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [formData, setFormData] = useState({
        customerId: "",
        loanType: "",
        amount: "",
        interestRate: "",
        termMonths: "",
        purpose: "",
    });
    const loadData = async () => {
        const customersData = await getCustomers();
        setCustomers(customersData);

        const loansData: Loan[] = await getLoans();
        const selectedLoan = loansData.find((loan) => loan.id === Number(id));

        if (selectedLoan) {
            setFormData({
                customerId: selectedLoan.customer?.id?.toString() || "",
                loanType: selectedLoan.loanType || "",
                amount: selectedLoan.amount?.toString() || "",
                interestRate: selectedLoan.interestRate?.toString() || "",
                termMonths: selectedLoan.termMonths?.toString() || "",
                purpose: selectedLoan.purpose || "",
            });
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await updateLoan(Number(id), {
            customerId: Number(formData.customerId),
            loanType: formData.loanType,
            amount: Number(formData.amount),
            interestRate: Number(formData.interestRate),
            termMonths: Number(formData.termMonths),
            purpose: formData.purpose,
        });

        navigate("/loans");
    };

    return (
        <div className="page">
            <h1>Edit Loan</h1>

            <form className="form-card" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Loan Type</label>
                    <input
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Interest Rate</label>
                    <input
                        type="number"
                        step="0.01"
                        name="interestRate"
                        value={formData.interestRate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Term Months</label>
                    <input
                        type="number"
                        name="termMonths"
                        value={formData.termMonths}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Purpose</label>
                    <input
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate("/loans")}
                    >
                        Back
                    </button>

                    <button type="submit" className="primary-btn">
                        Update Loan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditLoan;