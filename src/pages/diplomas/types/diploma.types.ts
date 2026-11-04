export interface Diploma {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    platformUrl: string | null;
}

export interface DiplomaResponse {
    data: Diploma[];
}