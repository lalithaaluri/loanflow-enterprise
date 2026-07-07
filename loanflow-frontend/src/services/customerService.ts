import type {Customer} from "../types/Customer";
import {getToken} from "./authService";

const API_URL = "http://localhost:8080/api/customers";

function getAuthHeaders() {
    const token = getToken();

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function getCustomers(): Promise<Customer[]> {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.content || [];
}

export async function createCustomer(customer: Omit<Customer, "id">) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
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
            ...getAuthHeaders(),
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
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
}