import { api } from "@/services/api/axios";
import type { Professor, ProfessorsResponse } from "../types/professor.types";

export const professorService = {
    async getAll(signal?: AbortSignal): Promise<Professor[]> {
        const response = await api.get<ProfessorsResponse>(
            "/api/v1/professors",
            { signal }
        );
        return response.data.data;
    },
};