import type { LucideIcon } from "lucide-react";

export interface Stat {
    category: string;
    total: number;
}

export interface StatCard {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
}

export interface GroupsDates {
    id: number;
    diploma: string;
    slug: string;
    code: string;
    number: string;
    name: string;
    professor: string;
    start_date: string;
    end_date: string;
}

export interface StatsResponse {
    data: Stat[];
}

export interface GroupsDatesResponse {
    data: GroupsDates[];
}