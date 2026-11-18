import { api } from "@/services/api/axios";
import type * as DashboardTypes from "../types/dashboard.types";

export const dashboardService = {
    // Get dashboard stats totals
    async getDashboardStats(signal?: AbortSignal):
        Promise<DashboardTypes.Stat[]> {
        const response = await api.get<DashboardTypes.StatsResponse>(
            "/api/v1/dashboard/stats",
            { signal }
        );
        return response.data.data;
    },

    // Get groups by date
    async getCurrentGroups(signal?: AbortSignal):
        Promise<DashboardTypes.GroupsDates[]> {
        const response = await api.get<DashboardTypes.GroupsDatesResponse>(
            `/api/v1/dashboard/current-groups`,
            { signal }
        );
        return response.data.data;
    }
};