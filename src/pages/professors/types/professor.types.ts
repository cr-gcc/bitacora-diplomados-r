export interface Professor {
    id: number;
    name: string;
    last_name: string;
    email: string;
    user: string;
    rfc: string;
    active: boolean;
}

export interface ProfessorsResponse {
    data: Professor[];
}

export type CreateProfessorPayload = Omit<Professor, "id" | "active">;

export type UpdateProfessorPayload = Partial<Omit<Professor, "id">>;

