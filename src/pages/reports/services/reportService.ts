import { api } from "@/services/api/axios";
import type * as ReportTypes from "../types/report.types";
import type { GroupsBasicResponse } from "@pages/groups/types/group-modules.types";

export const reportService = {
    async getOnlyGroups(signal?: AbortSignal): Promise<GroupsBasicResponse> {
        const response = await api.get<GroupsBasicResponse>(
            "/api/v1/groups/only",
            { signal }
        );
        return response.data;
    },

    // Get report with filters
    async getReport(filter: ReportTypes.ReportFilters, signal?: AbortSignal): Promise<ReportTypes.ReportResponse> {
        const response = await api.get<ReportTypes.ReportResponse>(
            "/api/v1/report",
            { params: filter, signal }
        );
        return response.data;
    },

    async downloadReport(filter: ReportTypes.ReportFilters, signal?: AbortSignal) {
        const response = await api.get(
            "/api/v1/report/download",
            { params: filter, signal, responseType: "blob" }
        );
        return response.data;
    }


}