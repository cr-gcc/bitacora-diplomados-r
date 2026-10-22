import { RouterProvider } from 'react-router'
import { router } from "@router/index";
import { AuthProvider } from "@/auth/context/AuthProvider";
import { LoadingScreen } from '@/components/layouts/components/loading/LoadingScreen';

export default function App() {
    return (
        <AuthProvider>
            <LoadingScreen />
            <RouterProvider router={router} />
        </AuthProvider>
    )
}