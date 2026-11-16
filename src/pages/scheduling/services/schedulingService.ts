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

    // Update a scheduling
    async update(id: number, scheduling: SchedulingTypes.Scheduling): Promise<SchedulingTypes.SchedulingResponse> {
        const response = await api.put(`/api/v1/schedule-modules/${id}`, scheduling);
        return response.data;
    },

    // Delete a scheduling
    async delete(id: number): Promise<SchedulingTypes.SchedulingResponse> {
        const response = await api.delete(`/api/v1/schedule-modules/${id}`);
        return response.data;
    },
}