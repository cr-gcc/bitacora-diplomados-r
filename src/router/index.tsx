import { createBrowserRouter } from 'react-router'

import { BlankLayout } from '@layouts/BlankLayout'
import { MainLayout } from '@layouts/MainLayout'

import LoginPage from '@pages/login/LoginPage'
import DashboardPage from '@pages/dashboard/DashboardPage'

export const router = createBrowserRouter([
    {
        element: <BlankLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <DashboardPage />
            }
        ]
    }
])