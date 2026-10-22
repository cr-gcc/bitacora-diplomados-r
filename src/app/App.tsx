import { RouterProvider } from 'react-router'
import { router } from "@router/index";
import { AuthProvider } from "@/auth/context/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}