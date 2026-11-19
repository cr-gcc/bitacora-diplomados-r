import { api } from "@/services/api/axios";
import type { GroupsDates, GroupsDatesResponse } from "@/pages/dashboard/types/dashboard.types";

export const calendarService = {
    async getEventsByMonth(
        year: number,
        month: number,
        signal?: AbortSignal
    ): Promise<GroupsDates[]> {
        const response = await api.get<GroupsDatesResponse>("/api/v1/group-modules/calendar", {
            params: { year, month },
            signal,
        });
        return response.data.data;
    },
};
