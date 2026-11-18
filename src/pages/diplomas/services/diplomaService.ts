import { api } from "@/services/api/axios";
import type { Diploma, DiplomaResponse } from "../types/diploma.types";

export const diplomaService = {
    async getAll(includeGroups = true, signal?: AbortSignal): Promise<Diploma[]> {
        const response = await api.get<DiplomaResponse>(
            "/api/v1/diplomas",
            { params: { groups: includeGroups }, signal }
        );
        return response.data.data;
    },
};