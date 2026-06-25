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