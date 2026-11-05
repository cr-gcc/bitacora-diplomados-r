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