import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/auth/hooks/useAuth";
import { LoadingScreen } from "@/components/layouts/components/loading/LoadingScreen";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return <Outlet />;
}