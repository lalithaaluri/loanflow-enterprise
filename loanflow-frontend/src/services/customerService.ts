import { API_ENDPOINTS } from "../config/api";
import type { Customer } from "../types/Customer";
import { getToken } from "./authService";

function getAuthHeaders(): HeadersInit {
    const token = getToken();

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function getCustomers(): Promise<Customer[]> {
    const response = await fetch(API_ENDPOINTS.customers, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : data.content || [];
}

export async function createCustomer(
    customer: Omit<Customer, "id">
): Promise<Customer> {
    const response = await fetch(API_ENDPOINTS.customers, {
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

export async function updateCustomer(
    customer: Customer
): Promise<Customer> {
    const response = await fetch(
        `${API_ENDPOINTS.customers}/${customer.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify(customer),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update customer");
    }

    return response.json();
}

export async function deleteCustomer(id: number): Promise<void> {
    const response = await fetch(
        `${API_ENDPOINTS.customers}/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
}