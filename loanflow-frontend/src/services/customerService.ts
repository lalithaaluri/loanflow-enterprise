import type { Customer } from "../types/Customer";

const API_URL = "http://localhost:8080/api/customers";
const authHeader = "Basic " + btoa("admin:admin123");

export async function getCustomers(): Promise<Customer[]> {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: authHeader,
        },
    });

    const data = await response.json();
    return Array.isArray(data) ? data : data.content || [];
}

export async function createCustomer(customer: Omit<Customer, "id">) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error("Failed to create customer");
    }

    return response.json();
}

export async function updateCustomer(customer: Customer) {
    const response = await fetch(`${API_URL}/${customer.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error("Failed to update customer");
    }

    return response.json();
}

export async function deleteCustomer(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: authHeader,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
}