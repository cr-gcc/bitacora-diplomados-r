import { useState, type ReactNode } from "react";
import { AuthContext } from "@/auth/context/AuthContext";
import { authService } from "@/auth/services/authService";
import type { AuthSession, LoginCredentials } from "@/auth/types/auth.types";

interface Props {
    children: ReactNode;
}

const STORAGE_KEY = "bdv2_session";

export function AuthProvider({ children }: Props) {
    const [session, setSession] = useState<AuthSession | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) as AuthSession : null;
        } catch {
            return null;
        }
    });

    const login = async (credentials: LoginCredentials): Promise<void> => {
        const newSession = await authService.login(credentials);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
        setSession(newSession);
    };

    const logout = (): void => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user ?? null,
                isAuthenticated: session !== null,
                isLoading: false,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}