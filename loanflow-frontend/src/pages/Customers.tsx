import { useEffect, useState } from "react";
import type { Customer } from "../types/Customer";
import {
    getCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
} from "../services/customerService";

function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
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

                await createCustomer({
                    firstName,
                    lastName,
                    email,
                    phone,
                });

            }

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");

            setIsEditing(false);
            setEditingCustomerId(null);

            setShowForm(false);

            loadCustomers();

        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmed) return;

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

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{isEditing ? "Edit Customer" : "Add Customer"}</h2>

                        <form onSubmit={handleSubmit}>

                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />

                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />

                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
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
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>

                        <td>
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(customer)}
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(customer.id)}
                            >
                                🗑 Delete

                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Customers;