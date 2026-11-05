export interface Professor {
    id: number;
    name: string;
    lastName: string;
    email: string | null;
    user: string;
    rfc: string;
    active: boolean
}

export interface ProfessorsResponse {
    data: Professor[];
}

export type CreateProfessorPayload = {
    name: string;
    lastName: string;
    email: string | null;
    rfc: string | null;
    user: string;
    active: boolean;
};

export type UpdateProfessorPayload = Partial<CreateProfessorPayload>;

