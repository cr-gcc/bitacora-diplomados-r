import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/auth/hooks/useAuth";
import { LoadingScreen } from "@/components/layouts/components/loading/LoadingScreen";
import { Button } from "@/components/ui/button";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading, sessionError, retrySession } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (sessionError && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-sm w-full bg-white rounded-xl border border-gray-200 p-6 shadow-xs text-center flex flex-col gap-y-4">
                    <h2 className="text-lg font-semibold text-navy">
                        No se pudo conectar con el servidor
                    </h2>
                    <p role="alert" className="text-sm text-gray-600">
                        {sessionError}
                    </p>
                    <Button
                        size="sm"
                        onClick={() => void retrySession()}
                        className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                    >
                        Reintentar
                    </Button>
                </div>
            </div>
        );
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
