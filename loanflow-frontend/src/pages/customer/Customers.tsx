import {useEffect, useState} from "react";
import type {Customer} from "../../types/Customer.ts";
import {createCustomer, deleteCustomer, getCustomers, updateCustomer,} from "../../services/customerService.ts";

function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [showForm, setShowForm] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);

    const loadCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const filteredCustomers = customers.filter((customer) => {
        const search = searchTerm.toLowerCase();
        return (
            customer.firstName.toLowerCase().includes(search) ||
            customer.lastName.toLowerCase().includes(search) ||
            customer.email.toLowerCase().includes(search) ||
            customer.phone.toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCustomers = filteredCustomers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setIsEditing(false);
        setEditingCustomerId(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (isEditing) {
                await updateCustomer({
                    id: editingCustomerId!,
                    firstName,
                    lastName,
                    email,
                    phone,
                });
            } else {
                await createCustomer({ firstName, lastName, email, phone });
            }

            resetForm();
            setShowForm(false);
            loadCustomers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this customer?")) return;

        try {
            await deleteCustomer(id);
            loadCustomers();
        } catch (error) {
            console.error(error);
            alert("Failed to delete customer");
        }
    };

    const handleEdit = (customer: Customer) => {
        setIsEditing(true);
        setEditingCustomerId(customer.id);
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setEmail(customer.email);
        setPhone(customer.phone);
        setShowForm(true);
    };

    return (
        <div>
            <div className="page-header">
                <h2>Customers</h2>
                <button className="add-btn" onClick={() => setShowForm(true)}>
                    + Add Customer
                </button>
            </div>

            <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
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

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{isEditing ? "Edit Customer" : "Add Customer"}</h2>

                        <form onSubmit={handleSubmit}>
                            <label>First Name</label>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

                            <label>Last Name</label>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />

                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label>Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />

                            <div className="modal-actions">
                                <button type="button" onClick={() => {
                                    resetForm();
                                    setShowForm(false);
                                }}>
                                    Cancel
                                </button>

                                <button type="submit" className="save-btn">
                                    {isEditing ? "Update Customer" : "Save Customer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {paginatedCustomers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(customer)}>
                                ✏ Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(customer.id)}>
                                🗑 Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {filteredCustomers.length === 0 && (
                <p style={{ marginTop: "16px" }}>No customers found.</p>
            )}

            {filteredCustomers.length > 0 && (
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

export default Customers;