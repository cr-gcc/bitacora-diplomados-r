export type UserRole = "admin" | "user";

export interface User {
    id: number;
    name: string;
    email: string;

    // Pendientes de integrar con Spatie
    role?: UserRole;
    permissions?: string[];
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    sessionError: string | null;

    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    retrySession: () => Promise<void>;
}