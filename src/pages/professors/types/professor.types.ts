export interface Professor {
    id: number;
    name: string;
    lastName: string;
    email: string;
    user: string;
    rfc: string;
    active: boolean
}

export interface ProfessorsResponse {
    data: Professor[];
}

export type CreateProfessorPayload = Omit<Professor, "id">;

export type UpdateProfessorPayload = Partial<CreateProfessorPayload>;

