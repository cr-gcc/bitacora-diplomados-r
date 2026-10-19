import { Sidebar } from '@/components/layouts/Sidebar'
import { Header } from '@/components/layouts/Header'
import { Outlet } from 'react-router'

export function MainLayout() {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main id="main" className="bg-gray-200 flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}