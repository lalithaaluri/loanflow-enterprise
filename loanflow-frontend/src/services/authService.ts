import { API_ENDPOINTS } from "../config/api";

export type LoginResponse = {
    token: string;
    role: string;
};

export async function login(
    username: string,
    password: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_ENDPOINTS.auth}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Invalid username or password");
    }

    return response.json();
}

export function saveAuth(token: string, role: string): void {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function getRole(): string | null {
    return localStorage.getItem("role");
}

export function logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

export function isAuthenticated(): boolean {
    return Boolean(getToken());
}