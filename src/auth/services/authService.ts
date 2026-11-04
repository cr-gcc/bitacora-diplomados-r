import { api } from "@/services/api/axios";
import type { User, LoginCredentials } from "@/auth/types/auth.types";

interface ApiResponse<T> {
    data: T
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        await api.get("/sanctum/csrf-cookie");

        const response = await api.post<ApiResponse<User>>(
            "/api/v1/auth/login",
            credentials
        );

        return response.data.data;
    },

    async me(): Promise<User> {
        const response = await api.get<ApiResponse<User>>(
            "/api/v1/auth/me"
        );

        return response.data.data;
    },

    async logout(): Promise<void> {
        await api.post("/api/v1/auth/logout");
    },
};