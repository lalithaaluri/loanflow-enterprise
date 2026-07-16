const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!configuredApiBaseUrl) {
    throw new Error(
        "VITE_API_BASE_URL is not configured. Add it to the frontend environment file."
    );
}

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, "");

export const API_ENDPOINTS = {
    auth: `${API_BASE_URL}/api/auth`,
    customers: `${API_BASE_URL}/api/customers`,
    loans: `${API_BASE_URL}/api/loans`,
} as const;