import { Outlet } from 'react-router'

export function MainLayout() {
    return (
        <div className="min-h-screen">
            <div className="flex flex-1 flex-col overflow-hidden">
                <main id="main" className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 bg-sky-800">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}