import type { Loan } from "../types/Loan";

const API_URL = "http://localhost:8080/api/loans";
const authHeader = "Basic " + btoa("admin:admin123");

export async function getLoans(): Promise<Loan[]> {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: authHeader,
        },
    });

    const data = await response.json();
    return Array.isArray(data) ? data : data.content || [];
}

export async function createLoan(loan: {
    customerId: number;
    loanType: string;
    amount: number;
    interestRate: number;
    termMonths: number;
    purpose: string;
}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
        },
        body: JSON.stringify(loan),
    });

    if (!response.ok) {
        throw new Error("Failed to create loan");
    }

    return await response.json();
}
export async function updateLoan(
    loanId: number,
    loan: {
        customerId: number;
        loanType: string;
        amount: number;
        interestRate: number;
        termMonths: number;
        purpose: string;
    }
) {
    const response = await fetch(`${API_URL}/${loanId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
        },
        body: JSON.stringify(loan),
    });

    if (!response.ok) {
        throw new Error("Failed to update loan");
    }

    return await response.json();
}

export async function deleteLoan(loanId: number) {
    const response = await fetch(`${API_URL}/${loanId}`, {
        method: "DELETE",
        headers: {
            Authorization: authHeader,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete loan");
    }
}
export async function approveLoan(loanId: number) {
    const response = await fetch(`${API_URL}/${loanId}/approve`, {
        method: "PUT",
        headers: {
            Authorization: authHeader,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to approve loan");
    }

    return await response.json();
}

export async function rejectLoan(loanId: number) {
    const response = await fetch(`${API_URL}/${loanId}/reject`, {
        method: "PUT",
        headers: {
            Authorization: authHeader,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to reject loan");
    }

    return await response.json();
}