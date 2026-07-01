const API_BASE_URL = "http://localhost:8080/api/auth";

export type LoginResponse = {
    token: string;
    role: string;
};

export async function login(
    username: string,
    password: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
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

export function saveAuth(token: string, role: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getRole() {
    return localStorage.getItem("role");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

export function isAuthenticated() {
    return !!getToken();
}