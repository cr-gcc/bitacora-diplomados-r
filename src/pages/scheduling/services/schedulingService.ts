import { api } from "@/services/api/axios";
import * as SchedulingTypes from "../types/scheduling.types";

export const schedulingService = {
    // All schedulings
    async getAll(signal?: AbortSignal): Promise<SchedulingTypes.Scheduling[]> {
        const response = await api.get<SchedulingTypes.SchedulingResponse>(
            "/api/v1/schedule-modules", { signal }
        );
        return response.data.data;
    },

    // Create a new scheduling
    async create(
        data: SchedulingTypes.CreateSchedulingPayload,
        signal?: AbortSignal
    ): Promise<SchedulingTypes.Scheduling> {
        const response = await api.post<{
            data: SchedulingTypes.Scheduling
        }>(
            "/api/v1/schedule-modules",
            data,
            { signal }
        );
        return response.data.data;
    },

    // Link a scheduling to a group module
    async linkScheduling(
        data: SchedulingTypes.LinkSchedulingPayload,
        signal?: AbortSignal) {
        const response = await api.post(
            `/api/v1/schedule-modules/${data.id}/link`,
            data,
            { signal }
        );
        return response.data.data;
    },

    // Delete a scheduling
    async delete(id: number, signal?: AbortSignal): Promise<void> {
        await api.delete(`/api/v1/schedule-modules/${id}`, { signal });
    },
}