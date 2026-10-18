import { createBrowserRouter } from 'react-router'

import { BlankLayout } from '@layouts/BlankLayout'
import { MainLayout } from '@layouts/MainLayout'

import { LoginPage } from '@pages/login/LoginPage'
import { DashboardPage } from '@pages/dashboard/DashboardPage'
import { CalendarPage } from '@pages/calendar/CalendarPage'
import { DiplomasPage } from '@pages/diplomas/DiplomasPage'
import { GroupsPage } from '@pages/groups/GroupsPage'
import { ProfessorsPage } from '@pages/professors/ProfessorsPage'
import { ReportsPage } from '@pages/reports/ReportsPage'
import { SchedulingPage } from '@pages/scheduling/SchedulingPage'

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
            },
            {
                path: '/calendario',
                element: <CalendarPage />
            },
            {
                path: '/diplomados',
                element: <DiplomasPage />
            },
            {
                path: '/programacion',
                element: <SchedulingPage />
            },
            {
                path: '/grupos',
                element: <GroupsPage />
            },
            {
                path: '/profesores',
                element: <ProfessorsPage />
            },
            {
                path: '/reportes',
                element: <ReportsPage />
            },
        ]
    }
])