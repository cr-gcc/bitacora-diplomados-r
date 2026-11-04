import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { AuthContext } from "@/auth/context/AuthContext";
import { authService } from "@/auth/services/authService";
import type { User, LoginCredentials } from "@/auth/types/auth.types";

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Recuperar la sesión al cargar la aplicación
    useEffect(() => {
        let active = true;
        const restoreSession = async () => {
            try {
                const authenticatedUser = await authService.me();
                if (active) {
                    setUser(authenticatedUser);
                }
            } catch (error) {
                if (!active) return;

                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    setUser(null);
                } else {
                    console.error("No se pudo recuperar la sesión:", error);
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        };

        restoreSession();

        return () => {
            active = false;
        };
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        const authenticatedUser = await authService.login(credentials);
        setUser(authenticatedUser);
    };

    const logout = async (): Promise<void> => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}