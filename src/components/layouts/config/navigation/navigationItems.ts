import {
    LayoutDashboard,
    CalendarDays,
    BookText,
    ClipboardClock,
    Users,
    ChartNoAxesColumn,
} from "lucide-react";
import type { NavigationItem } from "@components/layouts/types/navigation/navigation.types";

export const navigationItems = [
    {
        label: "Dashboard",
        to: "/",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: "Calendario",
        to: "/calendario",
        icon: CalendarDays,
    },
    {
        label: "Diplomados",
        to: "/diplomados",
        icon: BookText,
    },
    {
        label: "Programación",
        to: "/programacion",
        icon: ClipboardClock,
    },
    {
        label: "Profesores",
        to: "/profesores",
        icon: Users,
    },
    {
        label: "Reportes",
        to: "/reportes",
        icon: ChartNoAxesColumn,
    },
] satisfies NavigationItem[];