import { API_ENDPOINTS } from "../config/api";
import type { Loan } from "../types/Loan";
import { getToken } from "./authService";

type LoanRequest = {
    customerId: number;
    loanType: string;
    amount: number;
    interestRate: number;
    termMonths: number;
    purpose: string;
};

function getAuthHeaders(): HeadersInit {
    const token = getToken();

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function getLoans(): Promise<Loan[]> {
    const response = await fetch(API_ENDPOINTS.loans, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch loans");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : data.content || [];
}

export async function createLoan(
    loan: LoanRequest
): Promise<Loan> {
    const response = await fetch(API_ENDPOINTS.loans, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(loan),
    });

    if (!response.ok) {
        throw new Error("Failed to create loan");
    }

    return response.json();
}

export async function updateLoan(
    loanId: number,
    loan: LoanRequest
): Promise<Loan> {
    const response = await fetch(
        `${API_ENDPOINTS.loans}/${loanId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify(loan),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update loan");
    }

    return response.json();
}

export async function deleteLoan(
    loanId: number
): Promise<void> {
    const response = await fetch(
        `${API_ENDPOINTS.loans}/${loanId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete loan");
    }
}

export async function approveLoan(
    loanId: number
): Promise<Loan> {
    const response = await fetch(
        `${API_ENDPOINTS.loans}/${loanId}/approve`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to approve loan");
    }

    return response.json();
}

export async function rejectLoan(
    loanId: number
): Promise<Loan> {
    const response = await fetch(
        `${API_ENDPOINTS.loans}/${loanId}/reject`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to reject loan");
    }

    return response.json();
}