import type {Customer} from "./Customer";

export interface Loan {
    id: number;
    loanType: string;
    amount: number;
    status: string;
    customer: Customer | null;
    interestRate?: number;
    termMonths?: number;
    purpose?: string;
}