import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/auth/hooks/useAuth";

export function GuestRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Verificando sesión...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}