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

import { ProtectedRoute } from "@router/ProtectedRoute";
import { GuestRoute } from "@router/GuestRoute";

export const router = createBrowserRouter([
    {
        element: <GuestRoute />,
        children: [
            {
                element: <BlankLayout />,
                children: [
                    {
                        path: '/login',
                        element: <LoginPage />
                    }
                ]
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
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
                        children: [
                            {
                                index: true,
                                element: <DiplomasPage />
                            },
                            {
                                path: ':slug',
                                element: <GroupsPage />
                            }
                        ]
                    },
                    {
                        path: '/programacion',
                        element: <SchedulingPage />
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
        ]
    }
])