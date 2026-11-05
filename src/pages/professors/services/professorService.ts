import { api } from "@/services/api/axios";
import type * as ProfessorTypes from "../types/professor.types";

export const professorService = {
    // All professors
    async getAll(signal?: AbortSignal): Promise<ProfessorTypes.Professor[]> {
        const response = await api.get<ProfessorTypes.ProfessorsResponse>(
            "/api/v1/professors", { signal }
        );
        return response.data.data;
    },

    // Create professor
    async create(
        data: ProfessorTypes.CreateProfessorPayload,
        signal?: AbortSignal
    ): Promise<ProfessorTypes.Professor> {
        const response = await api.post<{ data: ProfessorTypes.Professor }>(
            "/api/v1/professors",
            { active: true, ...data },
            { signal }
        );
        return response.data.data;
    },

    //Update professor
    async update(
        id: number,
        data: ProfessorTypes.UpdateProfessorPayload,
        signal?: AbortSignal
    ): Promise<ProfessorTypes.Professor> {
        const response = await api.patch<{ data: ProfessorTypes.Professor }>(
            `/api/v1/professors/${id}`,
            data,
            { signal }
        );
        return response.data.data;
    },

};