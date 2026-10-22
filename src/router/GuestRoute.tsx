import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/auth/hooks/useAuth";
import { LoadingScreen } from "@/components/layouts/components/loading/LoadingScreen";

export function GuestRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}