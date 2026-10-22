export type UserRole = "admin" | "user";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    permissions: string[];
}

export interface AuthSession {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextType {
    session: AuthSession | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}