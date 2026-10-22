import type { AuthSession, LoginCredentials } from "@/auth/types/auth.types";

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthSession> {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (credentials.email !== "admin@example.com" || credentials.password !== "123456") {
            throw new Error("Credenciales incorrectas");
        }

        return {
            user: {
                id: 1,
                name: "Administrador",
                email: credentials.email,
                role: "admin",
                permissions: [
                    "groups.view",
                    "groups.create",
                    "groups.edit",
                    "groups.delete",
                ],
            },
            token: "mock-token-bdv2",
        };
    },
};