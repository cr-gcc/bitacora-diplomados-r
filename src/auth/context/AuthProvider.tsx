import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
    const [sessionError, setSessionError] = useState<string | null>(null);
    const requestIdRef = useRef(0);

    const restoreSession = useCallback(async () => {
        const requestId = ++requestIdRef.current;
        setIsLoading(true);
        setSessionError(null);
        try {
            const authenticatedUser = await authService.me();
            if (requestId === requestIdRef.current) {
                setUser(authenticatedUser);
            }
        } catch (error) {
            if (requestId !== requestIdRef.current) return;

            const status = axios.isAxiosError(error) ? error.response?.status : undefined;
            if (status === 401 || status === 403 || status === 419) {
                setUser(null);
                setSessionError(null);
            } else {
                console.error("No se pudo recuperar la sesión:", error);
                setSessionError(
                    "El servicio no está disponible en este momento. Por favor, intenta iniciar sesión más tarde."
                );
            }
        } finally {
            if (requestId === requestIdRef.current) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        void restoreSession();

        return () => {
            requestIdRef.current++;
        };
    }, [restoreSession]);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        const authenticatedUser = await authService.login(credentials);
        setUser(authenticatedUser);
        setSessionError(null);
    };

    const logout = async (): Promise<void> => {
        await authService.logout();
        setUser(null);
        setSessionError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                sessionError,
                login,
                logout,
                retrySession: restoreSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
